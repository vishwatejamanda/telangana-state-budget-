import csv
import json
import re
from collections import defaultdict

print("Step 1: Reading routes...")
routes = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/routes.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        routes[r['route_id']] = {
            'id': r['route_id'],
            'shortName': r['route_short_name'].strip(),
            'longName': r['route_long_name'].strip(),
            'agency': r['agency_id'].strip(),
            'routeType': r['route_type'].strip()
        }

print(f"Loaded {len(routes)} routes.")

print("Step 2: Reading stops...")
stops = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stops.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        try:
            lat = round(float(r['stop_lat']), 5)
            lon = round(float(r['stop_lon']), 5)
        except:
            lat = 0.0
            lon = 0.0
        stops[r['stop_id']] = {
            'id': r['stop_id'],
            'name': r['stop_name'].strip(),
            'zone': r['zone_id'].strip(),
            'lat': lat,
            'lon': lon
        }
print(f"Loaded {len(stops)} stops.")

print("Step 3: Reading trips...")
route_trips = defaultdict(list)
trip_to_route = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/trips.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        tid = r['trip_id']
        rid = r['route_id']
        route_trips[rid].append({
            'tripId': tid,
            'headsign': r.get('trip_short_name', ''),
            'dir': r.get('direction_id', '0')
        })
        trip_to_route[tid] = rid
print(f"Mapped {len(trip_to_route)} trips.")

print("Step 4: Reading stop_times...")
# We want: for each route:
# - list of departure times for trip starts (stop_sequence == 1)
# - canonical sequence of stops for the route (e.g. using the trip with the most stops or first trip)
# - distance
route_departures = defaultdict(list)
route_canonical_stops = {}
route_canonical_stops_dist = {}
trip_stop_sequences = defaultdict(list)

# To avoid keeping everything in memory, let's stream stop_times
count = 0
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stop_times.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        count += 1
        tid = r['trip_id']
        rid = trip_routes = trip_to_route.get(tid)
        if not rid:
            continue
        
        seq = int(r['stop_sequence'])
        dep = r['departure_time'][:5] # HH:MM
        
        if seq == 1:
            route_departures[rid].append(dep)
        
        # save stops for first trip of each route
        if rid not in route_canonical_stops:
            trip_stop_sequences[tid].append({
                'seq': seq,
                'stopId': r['stop_id'],
                'time': dep,
                'dist': float(r['shape_dist_traveled']) if r['shape_dist_traveled'] else 0.0
            })
            # if we collected sequence, we can check later
        
        if count % 1000000 == 0:
            print(f"Read {count} stop times...")

print(f"Finished reading {count} stop times.")

# Assign canonical stop sequences
for tid, seq_list in trip_stop_sequences.items():
    rid = trip_to_route[tid]
    if rid not in route_canonical_stops or len(seq_list) > len(route_canonical_stops[rid]):
        seq_list.sort(key=lambda x: x['seq'])
        route_canonical_stops[rid] = seq_list

print(f"Routes with departures: {len(route_departures)}")
print(f"Routes with canonical stops: {len(route_canonical_stops)}")
