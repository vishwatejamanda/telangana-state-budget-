import json
import os
from collections import defaultdict

print("=== Building Telangana & Hyderabad Water Bodies Data ===")
os.makedirs('public/data', exist_ok=True)

# District centroids approximate for quick zoom
DISTRICT_CENTROIDS = {
    'Hyderabad': [17.3850, 78.4867],
    'Rangareddy': [17.3100, 78.4100],
    'Medchal': [17.6294, 78.4814],
    'Medchal-Malkajgiri': [17.6294, 78.4814],
    'Siddipet': [18.1018, 78.8520],
    'Medak': [18.0487, 78.2618],
    'Mahabubnagar': [16.7488, 77.9856],
    'Bhadradri': [17.5550, 80.6150],
    'Nalgonda': [17.0575, 79.2684],
    'Sangareddy': [17.6190, 78.0814],
    'Jayashankar': [18.4286, 79.8654],
    'Nagarkurnool': [16.4854, 78.3340],
    'Kamareddy': [18.3218, 78.3387],
    'Khammam': [17.2473, 80.1514],
    'Karimnagar': [18.4386, 79.1288],
    'Mancherial': [18.8679, 79.4639],
    'Nizamabad': [18.6725, 78.0941],
    'Peddapalle': [18.6161, 79.3787],
    'Yadadri': [17.5147, 78.9482],
    'Wanaparthy': [16.3624, 78.0628],
    'Suryapet': [17.1439, 79.6239],
    'Mahabubabad': [17.5986, 80.0039],
    'Jagtial': [18.7946, 78.9125],
    'Warangal_Rural': [17.9689, 79.5941],
    'Warangal_Urban': [17.9784, 79.6004],
    'Jangaon': [17.7235, 79.1824],
    'Vikarabad': [17.3364, 77.9048],
    'Nirmal': [19.0964, 78.3444],
    'Rajanna': [18.3846, 78.8028],
    'Komarambhem': [19.3644, 79.2961],
    'Jogulamba': [15.8828, 77.9405],
    'Adilabad': [19.6641, 78.5320],
}

districts_data = defaultdict(lambda: {
    'count': 0,
    'totalAreaSqM': 0.0,
    'totalWaterSpreadHa': 0.0,
    'mandals': set(),
    'basins': set(),
    'topLakes': []
})

state_total_count = 0
state_total_area = 0.0
state_total_waterspread = 0.0
basin_distribution = defaultdict(int)

hyd_features = []
prominent_tg_features = []

# Known famous Hyderabad & Telangana lake names mapping or identification
KNOWN_LAKES = {
    'Osman Sagar': {'aka': 'Gandipet', 'desc': 'Historic reservoir built across Musi river in 1920'},
    'Shahmirpet Cheruvu': {'aka': 'Shamirpet Lake', 'desc': 'Scenic artificial lake created during Nizam era'},
    'Dharmasagaram Cheruvu': {'aka': 'Dharmasagar Lake', 'desc': 'Historic Kakatiya reservoir near Warangal'},
    'Pocharam Tank': {'aka': 'Pocharam Reservoir', 'desc': 'Major wildlife and irrigation sanctuary lake'},
    'Begumpet-0': {'aka': 'Hussain Sagar Basin', 'desc': 'Heart of Hyderabad city twin lake basin'},
    'Ganapuram Cheruvu': {'aka': 'Ghanpur Lake', 'desc': 'Large Kakatiya dynasty irrigation lake'},
    'Udaisamudram Cheruvu': {'aka': 'Udaya Samudram', 'desc': 'Major balancing reservoir in Nalgonda'}
}

print("Parsing tg_waterbodies.geojson...")
with open('tg_waterbodies.geojson', 'r', encoding='utf-8', errors='ignore') as f:
    for line_num, line in enumerate(f):
        line_s = line.strip().rstrip(',')
        if not (line_s.startswith('{"type": "Feature"') or line_s.startswith('{"type":"Feature"')):
            continue
            
        try:
            feat = json.loads(line_s)
            props = feat.get('properties', {})
            geom = feat.get('geometry', {})
            
            d_name = props.get('D_N', '').strip() or 'Other'
            mandal = props.get('DM_N', '').strip()
            village = props.get('DMV_N', '').strip()
            raw_name = props.get('Tank_Name', '').strip() or props.get('TANK_N', '').strip()
            
            if not raw_name:
                name = f"{village} Tank" if village else (f"{mandal} Lake" if mandal else "Water Body")
            else:
                name = raw_name
                
            area = float(props.get('Shape_Area', 0) or 0)
            water_spread = float(props.get('Water_Spre', 0) or 0)
            perimeter = float(props.get('Shape_Length', 0) or 0)
            basin = props.get('MJB', '').strip() or 'River Basin'
            sub_basin = props.get('MIB', '').strip()
            tank_type = props.get('T_TYPE', '').strip() or 'Irrigation Tank'
            
            # Aggregation
            d = districts_data[d_name]
            d['count'] += 1
            d['totalAreaSqM'] += area
            d['totalWaterSpreadHa'] += water_spread
            if mandal: d['mandals'].add(mandal)
            if basin: d['basins'].add(basin)
            
            state_total_count += 1
            state_total_area += area
            state_total_waterspread += water_spread
            basin_distribution[basin] += 1
            
            # Track top lakes for district
            lake_info = {
                'name': name,
                'mandal': mandal,
                'areaSqM': round(area, 1),
                'areaAcres': round(area / 4046.86, 1),
                'waterSpreadHa': round(water_spread, 1),
                'basin': basin,
                'subBasin': sub_basin,
                'type': tank_type
            }
            d['topLakes'].append(lake_info)
            
            # GeoJSON feature optimization
            # If in Hyderabad, Medchal, or Rangareddy
            is_hyd_region = d_name in ['Hyderabad', 'Medchal', 'Medchal-Malkajgiri', 'Rangareddy']
            
            # Simplify geometry for fast browser rendering
            # We round coords to 5 decimals (~1 meter precision)
            clean_coords = []
            if geom.get('type') == 'Polygon':
                for ring in geom.get('coordinates', []):
                    # take every 2nd or 3rd point if large polygon to save 60% bandwidth
                    step = 2 if len(ring) > 60 else 1
                    simplified_ring = [[round(p[0], 5), round(p[1], 5)] for i, p in enumerate(ring) if i % step == 0 or i == len(ring)-1]
                    clean_coords.append(simplified_ring)
            elif geom.get('type') == 'MultiPolygon':
                for poly in geom.get('coordinates', []):
                    poly_clean = []
                    for ring in poly:
                        step = 2 if len(ring) > 60 else 1
                        simplified_ring = [[round(p[0], 5), round(p[1], 5)] for i, p in enumerate(ring) if i % step == 0 or i == len(ring)-1]
                        poly_clean.append(simplified_ring)
                    clean_coords.append(poly_clean)
                    
            feat_clean = {
                'type': 'Feature',
                'geometry': {
                    'type': geom.get('type'),
                    'coordinates': clean_coords
                },
                'properties': {
                    'name': name,
                    'district': d_name,
                    'mandal': mandal,
                    'village': village,
                    'areaSqM': round(area, 1),
                    'areaAcres': round(area / 4046.86, 1),
                    'waterSpreadHa': round(water_spread, 1),
                    'basin': basin,
                    'type': tank_type
                }
            }
            
            # Add to Hyderabad dataset if in Hyderabad / Rangareddy / Medchal and reasonable size
            if is_hyd_region:
                if d_name == 'Hyderabad' or area > 100000 or water_spread > 5:
                    hyd_features.append(feat_clean)
                    
            # Add to Prominent Statewide dataset if top size (> 400,000 sq m or top in district)
            if area > 450000 or name in KNOWN_LAKES:
                prominent_tg_features.append(feat_clean)
                
        except Exception as err:
            pass

print(f"Total water bodies parsed: {state_total_count}")
print(f"Hyderabad region featured lakes: {len(hyd_features)}")
print(f"Prominent statewide water bodies: {len(prominent_tg_features)}")

# Format District summaries
districts_summary_list = []
for d_name, d_val in districts_data.items():
    if not d_name or d_name == 'Other':
        continue
    # sort top lakes by area
    sorted_lakes = sorted(d_val['topLakes'], key=lambda x: x['areaSqM'], reverse=True)[:10]
    
    districts_summary_list.append({
        'district': d_name,
        'count': d_val['count'],
        'totalAreaSqM': round(d_val['totalAreaSqM'], 1),
        'totalAreaSqKm': round(d_val['totalAreaSqM'] / 1e6, 2),
        'totalWaterSpreadHa': round(d_val['totalWaterSpreadHa'], 1),
        'mandalsCount': len(d_val['mandals']),
        'mandals': sorted(list(d_val['mandals'])),
        'basins': sorted(list(d_val['basins'])),
        'centroid': DISTRICT_CENTROIDS.get(d_name, [17.5, 78.5]),
        'topLakes': sorted_lakes
    })

districts_summary_list.sort(key=lambda x: x['count'], reverse=True)

final_summary = {
    'totalWaterBodies': state_total_count,
    'totalWaterSpreadHa': round(state_total_waterspread, 1),
    'totalAreaSqKm': round(state_total_area / 1e6, 1),
    'basinDistribution': dict(basin_distribution),
    'districts': districts_summary_list
}

with open('public/data/tg_waterbodies_summary.json', 'w', encoding='utf-8') as f:
    json.dump(final_summary, f, indent=2)

# Write Hyderabad lakes GeoJSON
hyd_geojson = {
    'type': 'FeatureCollection',
    'features': hyd_features
}
with open('public/data/hyderabad_waterbodies.geojson', 'w', encoding='utf-8') as f:
    json.dump(hyd_geojson, f, separators=(',', ':'))

# Write Prominent Statewide GeoJSON
prominent_geojson = {
    'type': 'FeatureCollection',
    'features': prominent_tg_features
}
with open('public/data/tg_waterbodies_prominent.geojson', 'w', encoding='utf-8') as f:
    json.dump(prominent_geojson, f, separators=(',', ':'))

print("Water bodies data generated successfully!")
