import csv
from collections import defaultdict, Counter

routes = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/routes.txt', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for r in reader:
        routes[r['route_id']] = r

print(f"Total routes: {len(routes)}")

# Sample routes
sample_route_ids = list(routes.keys())[:10]
for rid in sample_route_ids:
    print(routes[rid])

# Check trips
route_trips = defaultdict(list)
trip_to_route = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/trips.txt', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for r in reader:
        route_trips[r['route_id']].append(r['trip_id'])
        trip_to_route[r['trip_id']] = r['route_id']

print(f"Unique routes with trips: {len(route_trips)}")

# Check stops
stops = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stops.txt', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for r in reader:
        stops[r['stop_id']] = r

print(f"Total stops: {len(stops)}")
for sid in list(stops.keys())[:5]:
    print(stops[sid])

# Check stop_times sample
print("Checking stop_times sample...")
sample_st = []
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stop_times.txt', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for i, r in enumerate(reader):
        sample_st.append(r)
        if i >= 10:
            break

for st in sample_st:
    print(st)
