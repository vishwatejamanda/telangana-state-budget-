// src/pages/TransitExplorerPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { BusRoute, RouteDetail, RouteStop, BusStop } from '@/types/transit';
import { tgsrtcService } from '@/services/tgsrtcService';
import { TimingsCoolList } from '@/components/transit/TimingsCoolList';
import { StopsTimeline } from '@/components/transit/StopsTimeline';
import { RouteMap } from '@/components/transit/RouteMap';
import {
  Bus,
  Clock,
  MapPin,
  Navigation,
  Search,
  Filter,
  TrendingUp,
  Sparkles,
  ArrowRightLeft,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const TransitExplorerPage: React.FC = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [stopsIndex, setStopsIndex] = useState<BusStop[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');
  const [selectedRouteDetail, setSelectedRouteDetail] = useState<RouteDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'timings' | 'stops' | 'stopDirectory'>('timings');

  // Load initial data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [allRoutes, allStops] = await Promise.all([
        tgsrtcService.getRoutesIndex(),
        tgsrtcService.getStopsIndex()
      ]);
      setRoutes(allRoutes);
      setStopsIndex(allStops);

      // Default select route 229 (High frequency Secunderabad to Medchal) or 10H (Kondapur) or first
      const defaultRoute = allRoutes.find(r => r.shortName === '229') || allRoutes.find(r => r.shortName === '10H') || allRoutes[0];
      if (defaultRoute) {
        setSelectedRouteId(defaultRoute.id);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Load route detail when selectedRouteId changes
  useEffect(() => {
    if (!selectedRouteId) return;
    async function fetchDetail() {
      setIsLoadingDetail(true);
      const detail = await tgsrtcService.getRouteDetail(selectedRouteId);
      setSelectedRouteDetail(detail);
      setIsLoadingDetail(false);
    }
    fetchDetail();
  }, [selectedRouteId]);

  // Categories list
  const categories = [
    'All',
    'High Frequency Corridor',
    'IT Corridor / Metro Feeder',
    'City Trunk',
    'Suburban & Satellite',
    'Airport Pushpak'
  ];

  // Filtered routes
  const filteredRoutes = useMemo(() => {
    return routes.filter(r => {
      const matchesSearch =
        r.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.longName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.destination.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || r.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [routes, searchQuery, selectedCategory]);

  // Reverse route finder
  const handleReverseRoute = () => {
    if (!selectedRouteDetail) return;
    const curr = selectedRouteDetail.info;
    const reverse = routes.find(
      r => r.shortName === curr.shortName && r.id !== curr.id
    );
    if (reverse) {
      setSelectedRouteId(reverse.id);
    }
  };

  const currentRoute = selectedRouteDetail?.info || routes.find(r => r.id === selectedRouteId);

  // Category badge color
  const getCategoryBadgeClass = (cat: string = '') => {
    if (cat.includes('High Frequency')) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (cat.includes('IT Corridor') || cat.includes('Metro')) return 'bg-cyan-100 text-cyan-900 border-cyan-300';
    if (cat.includes('Airport') || cat.includes('Pushpak')) return 'bg-indigo-100 text-indigo-900 border-indigo-300';
    if (cat.includes('City Trunk')) return 'bg-blue-100 text-blue-900 border-blue-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/40">
              <Bus className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              TGSRTC OpenData GTFS Timetables
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Schedule Sync & Stops Matrix
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Telangana & Hyderabad Transit Explorer
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Explore <strong>4,130+ official TGSRTC bus routes</strong>, <strong>51,980+ daily scheduled trips</strong>,
            and <strong>5,170+ stops</strong> across Hyderabad Metropolitan Area and Telangana districts.
            Inspect detailed departure timings, high-frequency intervals, and complete stop timelines.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap gap-3 pt-3 text-xs">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Total Routes: <strong className="text-white font-bold">{routes.length.toLocaleString()}</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Bus Stops: <strong className="text-white font-bold">{stopsIndex.length > 0 ? stopsIndex.length.toLocaleString() : '5,170+'}</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Daily Services: <strong className="text-white font-bold">51,986 Trips</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filters */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by bus number (e.g. 229, 10H, 300, 49M, 189M, 277D, Pushpak) or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold shrink-0">
            Showing <strong className="text-slate-900">{filteredRoutes.length}</strong> matching routes
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Corridor Type:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Horizontal Scroll Route Selector */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Popular Hyderabad & Telangana Corridors (Click to view timings):
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filteredRoutes.slice(0, 25).map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRouteId(r.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center space-x-2 border ${
                  selectedRouteId === r.id
                    ? 'bg-brand-50 text-brand-900 border-brand-400 shadow-xs ring-2 ring-brand-300'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span className="px-1.5 py-0.5 rounded bg-brand-900 text-white font-mono text-[11px]">
                  {r.shortName}
                </span>
                <span className="truncate max-w-[150px]">{r.destination || r.origin}</span>
                <span className="text-[10px] text-slate-400 font-mono">({r.tripsCount} trips)</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Selected Route Header Card */}
      {currentRoute && (
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            {/* Left Route Title */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black bg-brand-900 text-white px-3.5 py-1 rounded-2xl font-mono shadow-xs">
                  {currentRoute.shortName}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryBadgeClass(currentRoute.category)}`}>
                  {currentRoute.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                  {currentRoute.frequency}
                </span>
              </div>

              {/* Origin -> Destination */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center space-x-1.5 text-base sm:text-lg font-bold text-slate-900">
                  <span className="text-emerald-700">{currentRoute.origin}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-rose-700">{currentRoute.destination}</span>
                </div>

                {/* Reverse Route Toggle */}
                <button
                  onClick={handleReverseRoute}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1 ml-2"
                  title="Switch to reverse direction"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reverse Direction</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 max-w-2xl">
                {currentRoute.longName}
              </p>
            </div>

            {/* Right KPI Stat Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daily Trips</div>
                <div className="text-xl font-black text-brand-900 font-mono mt-0.5">{currentRoute.tripsCount}</div>
                <div className="text-[9px] text-slate-500">Scheduled runs</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Stops</div>
                <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
                  {selectedRouteDetail?.stops.length || currentRoute.stopsCount || 24}
                </div>
                <div className="text-[9px] text-slate-500">Boarding points</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Route Length</div>
                <div className="text-xl font-black text-slate-800 font-mono mt-0.5">
                  {currentRoute.distanceKm || 18.5} km
                </div>
                <div className="text-[9px] text-slate-500">One-way distance</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hours</div>
                <div className="text-sm font-black text-slate-800 font-mono mt-1">
                  {currentRoute.firstBus} - {currentRoute.lastBus}
                </div>
                <div className="text-[9px] text-slate-500">Daily coverage</div>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-200 space-x-2">
            <button
              onClick={() => setActiveTab('timings')}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center space-x-2 border-b-2 ${
                activeTab === 'timings'
                  ? 'border-brand-700 text-brand-900 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 text-brand-700" />
              <span>Timings & Departures List (Cool UI)</span>
            </button>

            <button
              onClick={() => setActiveTab('stops')}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center space-x-2 border-b-2 ${
                activeTab === 'stops'
                  ? 'border-brand-700 text-brand-900 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Navigation className="w-4 h-4 text-brand-700" />
              <span>Stops & Route Trajectory ({selectedRouteDetail?.stops.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('stopDirectory')}
              className={`pb-3 px-4 text-sm font-bold transition flex items-center space-x-2 border-b-2 ${
                activeTab === 'stopDirectory'
                  ? 'border-brand-700 text-brand-900 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-brand-700" />
              <span>Hyderabad Stops Hub</span>
            </button>
          </div>

          {/* Tab 1: Timings as List with Cool UI */}
          {activeTab === 'timings' && selectedRouteDetail && (
            <TimingsCoolList
              departures={selectedRouteDetail.departures}
              stops={selectedRouteDetail.stops}
              routeName={currentRoute.shortName}
              totalDistanceKm={currentRoute.distanceKm}
              category={currentRoute.category}
            />
          )}

          {/* Tab 2: Stops and Route Map */}
          {activeTab === 'stops' && selectedRouteDetail && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Route Map */}
              <div className="lg:col-span-7">
                <RouteMap
                  stops={selectedRouteDetail.stops}
                  routeName={`TGSRTC ${currentRoute.shortName}`}
                  routeColor="#1F4F89"
                />
              </div>

              {/* Stops Timeline */}
              <div className="lg:col-span-5">
                <StopsTimeline
                  stops={selectedRouteDetail.stops}
                  routeName={currentRoute.shortName}
                />
              </div>
            </div>
          )}

          {/* Tab 3: Stops Directory */}
          {activeTab === 'stopDirectory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Hyderabad & Telangana Bus Stops Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Browse major transit hubs and discover all connecting TGSRTC routes.
                  </p>
                </div>
                <span className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                  {stopsIndex.length} Major Hubs Indexed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {stopsIndex.slice(0, 100).map((stop) => (
                  <div
                    key={stop.id}
                    className="p-3.5 bg-slate-50 hover:bg-brand-50/50 rounded-2xl border border-slate-200 hover:border-brand-200 transition space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-xs text-slate-900 leading-snug">
                        {stop.name}
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-white text-brand-800 border border-slate-200 px-1.5 py-0.5 rounded shrink-0 ml-1">
                        {stop.routeCount} routes
                      </span>
                    </div>

                    {stop.zone && (
                      <div className="text-[10px] text-slate-500">
                        Zone: <strong className="text-slate-700">{stop.zone}</strong>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 pt-1">
                      {stop.routes.map((rt) => (
                        <button
                          key={rt}
                          onClick={() => {
                            const match = routes.find(r => r.shortName === rt);
                            if (match) {
                              setSelectedRouteId(match.id);
                              setActiveTab('timings');
                            }
                          }}
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white hover:bg-brand-700 hover:text-white border border-slate-200 text-slate-700 transition font-mono"
                        >
                          {rt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
