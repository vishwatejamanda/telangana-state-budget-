// src/types/transit.ts

export interface BusRoute {
  id: string;
  shortName: string;
  longName: string;
  origin: string;
  destination: string;
  category: string;
  tripsCount: number;
  stopsCount: number;
  distanceKm: number;
  firstBus: string;
  lastBus: string;
  frequency: string;
}

export interface RouteStop {
  seq: number;
  stopId: string;
  name: string;
  zone: string;
  lat: number;
  lon: number;
  dist: number;
  sampleTime: string;
}

export interface RouteDetail {
  info: BusRoute;
  departures: string[];
  stops: RouteStop[];
}

export interface BusStop {
  id: string;
  name: string;
  zone: string;
  lat: number;
  lon: number;
  routes: string[];
  routeCount: number;
}

export type TimeOfDay = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
