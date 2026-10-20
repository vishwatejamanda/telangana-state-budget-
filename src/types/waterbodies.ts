// src/types/waterbodies.ts

export interface WaterBodyProperty {
  name: string;
  district: string;
  mandal: string;
  village?: string;
  areaSqM: number;
  areaAcres: number;
  waterSpreadHa: number;
  basin: string;
  type: string;
}

export interface LakeItem {
  name: string;
  mandal: string;
  areaSqM: number;
  areaAcres: number;
  waterSpreadHa: number;
  basin: string;
  subBasin?: string;
  type: string;
}

export interface DistrictWaterSummary {
  district: string;
  count: number;
  totalAreaSqM: number;
  totalAreaSqKm: number;
  totalWaterSpreadHa: number;
  mandalsCount: number;
  mandals: string[];
  basins: string[];
  centroid: [number, number];
  topLakes: LakeItem[];
}

export interface WaterBodiesStateSummary {
  totalWaterBodies: number;
  totalWaterSpreadHa: number;
  totalAreaSqKm: number;
  basinDistribution: Record<string, number>;
  districts: DistrictWaterSummary[];
}

export interface CustomGeoJSONStats {
  fileName: string;
  fileSizeKB: number;
  featureCount: number;
  geometryTypes: string[];
  propertyKeys: string[];
  boundingBox?: [number, number, number, number]; // [minLat, minLon, maxLat, maxLon]
}
