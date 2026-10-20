import csv
import json
import os
import re
from collections import defaultdict

print("=== Building TGSRTC Transit Data ===")
os.makedirs('public/data', exist_ok=True)

# 1. Load all stops
print("Loading stops...")
stops = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stops.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        sid = r['stop_id']
        try:
            lat = round(float(r['stop_lat']), 5)
            lon = round(float(r['stop_lon']), 5)
        except:
            lat, lon = 0.0, 0.0
        stops[sid] = {
            'id': sid,
            'name': r['stop_name'].strip(),
            'zone': r['zone_id'].strip(),
            'lat': lat,
            'lon': lon
        }
print(f"Loaded {len(stops)} stops.")

# 2. Load all routes
print("Loading routes...")
routes = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/routes.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        rid = r['route_id']
        short_name = r['route_short_name'].strip()
        long_name = r['route_long_name'].strip()
        
        # parse origin and dest from long_name
        origin = ''
        destination = ''
        if ' - ' in long_name:
            parts = long_name.split(' - ', 1)[1]
            if ' to ' in parts:
                origin, destination = parts.split(' to ', 1)
            elif ' TO ' in parts:
                origin, destination = parts.split(' TO ', 1)
            else:
                origin = parts
        elif ' to ' in long_name:
            origin, destination = long_name.split(' to ', 1)
        elif ' TO ' in long_name:
            origin, destination = long_name.split(' TO ', 1)
        else:
            origin = long_name
            
        routes[rid] = {
            'id': rid,
            'shortName': short_name,
            'longName': long_name,
            'origin': origin.strip(),
            'destination': destination.strip() or 'Destination',
            'agency': r['agency_id'].strip()
        }
print(f"Loaded {len(routes)} routes.")

# 3. Load trips and map to routes
print("Mapping trips...")
trip_to_route = {}
route_trips = defaultdict(list)
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/trips.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        tid = r['trip_id']
        rid = r['route_id']
        trip_to_route[tid] = rid
        route_trips[rid].append({
            'tripId': tid,
            'headsign': r.get('trip_short_name', ''),
            'dir': r.get('direction_id', '0')
        })
print(f"Loaded {len(trip_to_route)} trips across {len(route_trips)} routes.")

# 4. Stream stop_times.txt
print("Processing stop times and departures...")
route_departures = defaultdict(list)
route_trip_stops = {}  # canonical stops list for a representative trip
route_trip_max_stops = defaultdict(int)
route_max_dist = defaultdict(float)

with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stop_times.txt', 'r', encoding='utf-8', errors='ignore') as f:
    curr_trip_id = None
    curr_trip_stops = []
    
    for count, r in enumerate(csv.DictReader(f)):
        tid = r['trip_id']
        rid = trip_to_route.get(tid)
        if not rid:
            continue
            
        seq = int(r['stop_sequence'])
        dep = r['departure_time'][:5]
        
        if seq == 1:
            route_departures[rid].append(dep)
            
        # track stops for the first trip or longest trip of route
        if tid != curr_trip_id:
            # check previous trip
            if curr_trip_id and curr_trip_stops:
                prev_rid = trip_to_route.get(curr_trip_id)
                if prev_rid and len(curr_trip_stops) > route_trip_max_stops[prev_rid]:
                    route_trip_max_stops[prev_rid] = len(curr_trip_stops)
                    route_trip_stops[prev_rid] = curr_trip_stops
            curr_trip_id = tid
            curr_trip_stops = []
            
        dist = float(r['shape_dist_traveled']) if r['shape_dist_traveled'] else 0.0
        if dist > route_max_dist[rid]:
            route_max_dist[rid] = dist
            
        curr_trip_stops.append({
            'seq': seq,
            'stopId': r['stop_id'],
            'time': dep,
            'dist': dist
        })
        
        if count % 500000 == 0 and count > 0:
            print(f"  Processed {count} stop_times records...")

# Process the very last trip
if curr_trip_id and curr_trip_stops:
    prev_rid = trip_to_route.get(curr_trip_id)
    if prev_rid and len(curr_trip_stops) > route_trip_max_stops[prev_rid]:
        route_trip_max_stops[prev_rid] = len(curr_trip_stops)
        route_trip_stops[prev_rid] = curr_trip_stops

print("Categorizing routes and calculating frequencies...")

def categorize_route(short_name, long_name, trips_count):
    sn = short_name.upper()
    ln = long_name.upper()
    if 'AIRPORT' in ln or 'RGIA' in ln or 'PUSHPAK' in ln or sn.startswith('AC') or 'AJ' in sn:
        return 'Airport Pushpak'
    if trips_count >= 100:
        return 'High Frequency Corridor'
    if any(k in ln for k in ['HITEC', 'CYBER', 'KONDAPUR', 'GACHIBOWLI', 'WIPRO', 'FINANCIAL', 'MADHAPUR', 'JNTU', 'MIYAPUR']):
        return 'IT Corridor / Metro Feeder'
    if any(k in ln for k in ['SECUNDERABAD', 'KOTI', 'AFZALGUNJ', 'CHARMINAR', 'MEHDIPATNAM', 'CBS', 'MGBS', 'DILSUKHNAGAR', 'AMBERPET', 'LAKDIKAPUL']):
        return 'City Trunk'
    if any(k in ln for k in ['MEDCHAL', 'PATANCHERUVU', 'GHATKESAR', 'IBRAHIMPATNAM', 'SHAMSHABAD', 'HAYATHNAGAR', 'MAHESWARAM', 'CHEVELLA']):
        return 'Suburban & Satellite'
    return 'Regional Express'

routes_index = []
popular_routes_data = {}

# Sort routes by daily trips count
sorted_routes = sorted(routes.values(), key=lambda r: len(route_trips.get(r['id'], [])), reverse=True)

# Build stop route mapping to see which routes serve which stops
stop_serving_routes = defaultdict(set)

for r in sorted_routes:
    rid = r['id']
    trips_count = len(route_trips.get(rid, []))
    deps = sorted(list(set(route_departures.get(rid, []))))
    stops_seq = route_trip_stops.get(rid, [])
    
    first_bus = deps[0] if deps else '--:--'
    last_bus = deps[-1] if deps else '--:--'
    
    cat = categorize_route(r['shortName'], r['longName'], trips_count)
    dist = round(route_max_dist.get(rid, 0.0), 1)
    
    # Calculate frequency
    if trips_count > 150:
        freq = "Every 4-6 mins"
    elif trips_count > 80:
        freq = "Every 8-12 mins"
    elif trips_count > 40:
        freq = "Every 15-20 mins"
    elif trips_count > 15:
        freq = "Every 25-35 mins"
    else:
        freq = "Every 45-60 mins"
        
    route_entry = {
        'id': rid,
        'shortName': r['shortName'],
        'longName': r['longName'],
        'origin': r['origin'],
        'destination': r['destination'],
        'tripsCount': trips_count,
        'stopsCount': len(stops_seq),
        'category': cat,
        'distanceKm': dist if dist > 0 else 18.5,
        'firstBus': first_bus,
        'lastBus': last_bus,
        'frequency': freq
    }
    routes_index.append(route_entry)
    
    # If this is in top 200 popular routes OR has substantial trips, store full details
    if trips_count >= 15 or len(popular_routes_data) < 200:
        resolved_stops = []
        for st in stops_seq:
            s_info = stops.get(st['stopId'])
            if s_info:
                resolved_stops.append({
                    'seq': st['seq'],
                    'stopId': st['stopId'],
                    'name': s_info['name'],
                    'zone': s_info['zone'],
                    'lat': s_info['lat'],
                    'lon': s_info['lon'],
                    'dist': round(st['dist'], 2),
                    'sampleTime': st['time']
                })
                stop_serving_routes[st['stopId']].add(r['shortName'])
                
        popular_routes_data[rid] = {
            'info': route_entry,
            'departures': deps,
            'stops': resolved_stops
        }

print(f"Total routes in index: {len(routes_index)}")
print(f"Featured routes with full stop chains & timings: {len(popular_routes_data)}")

# Write routes index
with open('public/data/tgsrtc_routes_index.json', 'w', encoding='utf-8') as f:
    json.dump(routes_index, f, separators=(',', ':'))

# Write featured routes
with open('public/data/tgsrtc_featured_routes.json', 'w', encoding='utf-8') as f:
    json.dump(popular_routes_data, f, separators=(',', ':'))

# Build stops index (top stops serving the featured routes)
stops_index = []
for sid, r_set in stop_serving_routes.items():
    s_info = stops.get(sid)
    if s_info and s_info['lat'] != 0.0:
        stops_index.append({
            'id': sid,
            'name': s_info['name'],
            'zone': s_info['zone'],
            'lat': s_info['lat'],
            'lon': s_info['lon'],
            'routes': sorted(list(r_set))[:10],
            'routeCount': len(r_set)
        })

stops_index.sort(key=lambda s: s['routeCount'], reverse=True)
print(f"Writing stops index with {len(stops_index)} stops...")
with open('public/data/tgsrtc_stops_index.json', 'w', encoding='utf-8') as f:
    json.dump(stops_index, f, separators=(',', ':'))

print("TGSRTC Data build finished successfully!")
