import json

named_lakes = []
districts_summary = {}

with open('tg_waterbodies.geojson', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        line_s = line.strip().rstrip(',')
        if line_s.startswith('{"type": "Feature"') or line_s.startswith('{"type":"Feature"'):
            try:
                feat = json.loads(line_s)
                props = feat.get('properties', {})
                name = props.get('Tank_Name', '').strip() or props.get('TANK_N', '').strip() or props.get('DMV_N', '').strip()
                dist = props.get('D_N', '').strip()
                mandal = props.get('DM_N', '').strip()
                area = props.get('Shape_Area', 0)
                water_spread = props.get('Water_Spre', 0)
                basin = props.get('MJB', '').strip()
                tank_type = props.get('T_TYPE', '').strip()
                
                # Check coords
                geom = feat.get('geometry', {})
                coords = geom.get('coordinates', [])
                
                if dist not in districts_summary:
                    districts_summary[dist] = {
                        'count': 0,
                        'totalArea': 0.0,
                        'totalWaterSpread': 0.0,
                        'mandals': set(),
                        'basins': set()
                    }
                districts_summary[dist]['count'] += 1
                try:
                    districts_summary[dist]['totalArea'] += float(area)
                    districts_summary[dist]['totalWaterSpread'] += float(water_spread)
                except:
                    pass
                if mandal: districts_summary[dist]['mandals'].add(mandal)
                if basin: districts_summary[dist]['basins'].add(basin)

                if dist in ['Hyderabad', 'Rangareddy', 'Medchal', 'Medchal-Malkajgiri'] or (area and float(area) > 500000):
                    named_lakes.append({
                        'name': name or f"{mandal} Lake",
                        'dist': dist,
                        'mandal': mandal,
                        'area': area,
                        'waterSpread': water_spread,
                        'basin': basin,
                        'type': tank_type
                    })
            except Exception as e:
                pass

print(f"Total districts found: {len(districts_summary)}")
for d, s in sorted(districts_summary.items(), key=lambda x: x[1]['count'], reverse=True)[:15]:
    print(f"District: {d} | Tanks: {s['count']} | Mandals: {len(s['mandals'])} | Basins: {list(s['basins'])}")

print(f"\nSample prominent lakes ({len(named_lakes)} identified):")
for l in sorted(named_lakes, key=lambda x: float(x.get('area') or 0), reverse=True)[:20]:
    print(l)
