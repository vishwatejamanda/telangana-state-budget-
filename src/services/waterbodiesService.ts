// src/services/waterbodiesService.ts
import { WaterBodiesStateSummary, CustomGeoJSONStats } from '@/types/waterbodies';

class WaterBodiesService {
  private summary: WaterBodiesStateSummary | null = null;
  private hyderabadGeoJSON: any | null = null;
  private prominentGeoJSON: any | null = null;

  async getStateSummary(): Promise<WaterBodiesStateSummary | null> {
    if (this.summary) return this.summary;
    try {
      const res = await fetch('/data/tg_waterbodies_summary.json');
      if (!res.ok) throw new Error('Failed to load water bodies summary');
      this.summary = await res.json();
      return this.summary;
    } catch (err) {
      console.error('Error fetching water bodies summary:', err);
      return null;
    }
  }

  async getHyderabadGeoJSON(): Promise<any> {
    if (this.hyderabadGeoJSON) return this.hyderabadGeoJSON;
    try {
      const res = await fetch('/data/hyderabad_waterbodies.geojson');
      if (!res.ok) throw new Error('Failed to load Hyderabad water bodies GeoJSON');
      this.hyderabadGeoJSON = await res.json();
      return this.hyderabadGeoJSON;
    } catch (err) {
      console.error('Error fetching Hyderabad GeoJSON:', err);
      return null;
    }
  }

  async getProminentGeoJSON(): Promise<any> {
    if (this.prominentGeoJSON) return this.prominentGeoJSON;
    try {
      const res = await fetch('/data/tg_waterbodies_prominent.geojson');
      if (!res.ok) throw new Error('Failed to load prominent water bodies GeoJSON');
      this.prominentGeoJSON = await res.json();
      return this.prominentGeoJSON;
    } catch (err) {
      console.error('Error fetching prominent GeoJSON:', err);
      return null;
    }
  }

  parseUploadedGeoJSON(file: File): Promise<{ geojson: any; stats: CustomGeoJSONStats }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const geojson = JSON.parse(content);

          let features = [];
          if (geojson.type === 'FeatureCollection' && Array.isArray(geojson.features)) {
            features = geojson.features;
          } else if (geojson.type === 'Feature') {
            features = [geojson];
          } else {
            throw new Error('Valid GeoJSON Feature or FeatureCollection expected');
          }

          const geomTypes = new Set<string>();
          const propKeys = new Set<string>();
          let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;

          features.forEach((f: any) => {
            if (f.geometry?.type) geomTypes.add(f.geometry.type);
            if (f.properties) {
              Object.keys(f.properties).forEach(k => propKeys.add(k));
            }

            // Quick bbox calculation for polygons & points
            const updateBbox = (coords: any) => {
              if (Array.isArray(coords) && typeof coords[0] === 'number') {
                const lon = coords[0];
                const lat = coords[1];
                if (lat < minLat) minLat = lat;
                if (lat > maxLat) maxLat = lat;
                if (lon < minLon) minLon = lon;
                if (lon > maxLon) maxLon = lon;
              } else if (Array.isArray(coords)) {
                coords.forEach(updateBbox);
              }
            };
            if (f.geometry?.coordinates) {
              updateBbox(f.geometry.coordinates);
            }
          });

          const stats: CustomGeoJSONStats = {
            fileName: file.name,
            fileSizeKB: Math.round(file.size / 1024),
            featureCount: features.length,
            geometryTypes: Array.from(geomTypes),
            propertyKeys: Array.from(propKeys).slice(0, 15),
            boundingBox: minLat <= maxLat ? [minLat, minLon, maxLat, maxLon] : undefined
          };

          resolve({ geojson, stats });
        } catch (err) {
          reject(new Error('Invalid GeoJSON format: ' + (err instanceof Error ? err.message : String(err))));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}

export const waterbodiesService = new WaterBodiesService();
