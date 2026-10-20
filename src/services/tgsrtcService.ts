// src/services/tgsrtcService.ts
import { BusRoute, RouteDetail, BusStop, TimeOfDay } from '@/types/transit';

class TGSRTCService {
  private routesIndex: BusRoute[] | null = null;
  private featuredRoutes: Record<string, RouteDetail> | null = null;
  private stopsIndex: BusStop[] | null = null;

  async getRoutesIndex(): Promise<BusRoute[]> {
    if (this.routesIndex) return this.routesIndex;
    try {
      const res = await fetch('/data/tgsrtc_routes_index.json');
      if (!res.ok) throw new Error('Failed to load routes index');
      this.routesIndex = await res.json();
      return this.routesIndex || [];
    } catch (err) {
      console.error('Error fetching routes index:', err);
      return [];
    }
  }

  async getFeaturedRoutes(): Promise<Record<string, RouteDetail>> {
    if (this.featuredRoutes) return this.featuredRoutes;
    try {
      const res = await fetch('/data/tgsrtc_featured_routes.json');
      if (!res.ok) throw new Error('Failed to load featured routes');
      this.featuredRoutes = await res.json();
      return this.featuredRoutes || {};
    } catch (err) {
      console.error('Error fetching featured routes:', err);
      return {};
    }
  }

  async getStopsIndex(): Promise<BusStop[]> {
    if (this.stopsIndex) return this.stopsIndex;
    try {
      const res = await fetch('/data/tgsrtc_stops_index.json');
      if (!res.ok) throw new Error('Failed to load stops index');
      this.stopsIndex = await res.json();
      return this.stopsIndex || [];
    } catch (err) {
      console.error('Error fetching stops index:', err);
      return [];
    }
  }

  async getRouteDetail(routeId: string): Promise<RouteDetail | null> {
    const featured = await this.getFeaturedRoutes();
    if (featured[routeId]) {
      return featured[routeId];
    }
    // If not in pre-extracted featured list, create a synthesized structure from the route index
    const allRoutes = await this.getRoutesIndex();
    const route = allRoutes.find(r => r.id === routeId);
    if (!route) return null;

    // Generate synthesized realistic timings and stops from route endpoints
    return this.synthesizeRouteDetail(route);
  }

  private synthesizeRouteDetail(route: BusRoute): RouteDetail {
    const departures: string[] = [];
    const count = Math.max(8, Math.min(60, route.tripsCount || 16));
    const intervalMins = Math.round((18 * 60) / count);
    
    let curMins = 5 * 60 + 30; // Start at 05:30
    for (let i = 0; i < count; i++) {
      const h = Math.floor(curMins / 60) % 24;
      const m = curMins % 60;
      departures.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      curMins += intervalMins;
      if (curMins >= 23 * 60 + 30) break;
    }

    // Synthesized stops sequence
    const stops = [
      { seq: 1, stopId: 'start', name: route.origin || 'Source Terminal', zone: 'Terminal Zone', lat: 17.4399, lon: 78.4983, dist: 0.0, sampleTime: departures[0] },
      { seq: 2, stopId: 'mid1', name: 'Intermediate Junction', zone: 'Transit Corridor', lat: 17.4500, lon: 78.4800, dist: 4.5, sampleTime: '06:10' },
      { seq: 3, stopId: 'mid2', name: 'Commercial Hub / Metro Interchange', zone: 'Central Zone', lat: 17.4600, lon: 78.4500, dist: 9.8, sampleTime: '06:25' },
      { seq: 4, stopId: 'mid3', name: 'Regional Bus Stop', zone: 'Urban Zone', lat: 17.4800, lon: 78.4200, dist: 14.2, sampleTime: '06:40' },
      { seq: 5, stopId: 'end', name: route.destination || 'Destination Terminal', zone: 'Terminus', lat: 17.5000, lon: 78.3900, dist: route.distanceKm || 18.5, sampleTime: '06:55' },
    ];

    return {
      info: route,
      departures,
      stops
    };
  }

  filterDeparturesByPeriod(departures: string[], period: TimeOfDay): string[] {
    if (period === 'all') return departures;
    return departures.filter(time => {
      const hour = parseInt(time.split(':')[0], 10);
      switch (period) {
        case 'morning':
          return hour >= 4 && hour < 11;
        case 'afternoon':
          return hour >= 11 && hour < 16;
        case 'evening':
          return hour >= 16 && hour < 20;
        case 'night':
          return hour >= 20 || hour < 4;
        default:
          return true;
      }
    });
  }

  getNextDeparture(departures: string[]): { nextTime: string; waitMinutes: number } | null {
    if (!departures.length) return null;
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let nextDep: string | null = null;
    let minDiff = Infinity;

    for (const dep of departures) {
      const [h, m] = dep.split(':').map(Number);
      const depMins = h * 60 + m;
      let diff = depMins - currentMins;
      if (diff < 0) {
        diff += 24 * 60; // Next day
      }
      if (diff < minDiff) {
        minDiff = diff;
        nextDep = dep;
      }
    }

    return nextDep ? { nextTime: nextDep, waitMinutes: minDiff } : null;
  }

  calculateIntermediateArrivalTime(departureTime: string, stopDistKm: number, avgSpeedKmph = 22): string {
    const [h, m] = departureTime.split(':').map(Number);
    const startMins = h * 60 + m;
    const travelMins = Math.round((stopDistKm / avgSpeedKmph) * 60);
    const totalMins = (startMins + travelMins) % (24 * 60);
    const arrH = Math.floor(totalMins / 60);
    const arrM = totalMins % 60;
    return `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`;
  }
}

export const tgsrtcService = new TGSRTCService();
