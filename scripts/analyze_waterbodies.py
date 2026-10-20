import os
import json
from collections import Counter

districts = Counter()
total = 0
named_tanks = 0

with open('tg_waterbodies.geojson', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        line_s = line.strip()
        if line_s.startswith('{"type": "Feature"') or line_s.startswith('{"type":"Feature"'):
            total += 1
            idx = line_s.find('"D_N": "')
            if idx != -1:
                end = line_s.find('"', idx + 8)
                d = line_s[idx+8:end]
                districts[d] += 1
            idx_name = line_s.find('"Tank_Name": "')
            if idx_name != -1:
                end_n = line_s.find('"', idx_name + 14)
                name = line_s[idx_name+14:end_n].strip()
                if name: named_tanks += 1

print(f"Total waterbody features: {total}")
print(f"Named tanks count: {named_tanks}")
print("Top districts:", districts.most_common(35))
