import csv
from collections import defaultdict, Counter

routes = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/routes.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        routes[r['route_id']] = r

print(f"Total routes: {len(routes)}")

# Check some route short names
short_names = [r['route_short_name'] for r in routes.values()]
print("Sample route short names:", short_names[:30])

# Check how trips are distributed among routes
route_trip_count = Counter()
trip_routes = {}
with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/trips.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for r in csv.DictReader(f):
        route_trip_count[r['route_id']] += 1
        trip_routes[r['trip_id']] = r['route_id']

print("Top 15 routes by trip count:")
for rid, cnt in route_trip_count.most_common(15):
    print(f"  {routes.get(rid, {}).get('route_short_name')}: {cnt} trips - {routes.get(rid, {}).get('route_long_name')}")

# Check stop_times for these top routes
print("Checking stop_times distribution...")
route_stops = defaultdict(set)
route_timings = defaultdict(list)
trips_seen = set()

with open('Telangana_opendata_gtfs_TGSRTC_25_September_2026/stop_times.txt', 'r', encoding='utf-8', errors='ignore') as f:
    for i, r in enumerate(csv.DictReader(f)):
        tid = r['trip_id']
        rid = trip_routes.get(tid)
        if rid:
            route_stops[rid].add(r['stop_id'])
            if r['stop_sequence'] == '1':
                route_timings[rid].append(r['departure_time'])
        if i % 500000 == 0 and i > 0:
            print(f"Processed {i} stop_times rows...")

print(f"Processed all. Found {len(route_timings)} routes with starting timings.")
sample_rid = list(route_timings.keys())[0]
print(f"Sample route {routes.get(sample_rid, {}).get('route_short_name')} has {len(route_timings[sample_rid])} departures: {sorted(route_timings[sample_rid])[:10]}")
