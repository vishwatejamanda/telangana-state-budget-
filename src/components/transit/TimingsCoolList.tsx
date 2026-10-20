// src/components/transit/TimingsCoolList.tsx
import React, { useState, useMemo } from 'react';
import { RouteStop, TimeOfDay } from '@/types/transit';
import { tgsrtcService } from '@/services/tgsrtcService';
import {
  Clock,
  Zap,
  Sun,
  Sunset,
  Moon,
  Sunrise,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Check,
  Share2
} from 'lucide-react';

interface TimingsCoolListProps {
  departures: string[];
  stops: RouteStop[];
  routeName: string;
  totalDistanceKm: number;
  category: string;
}

export const TimingsCoolList: React.FC<TimingsCoolListProps> = ({
  departures,
  stops,
  routeName,
  totalDistanceKm,
  category
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimeOfDay>('all');
  const [selectedStopId, setSelectedStopId] = useState<string>(stops[0]?.stopId || '');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [copied, setCopied] = useState(false);

  // Selected stop info
  const selectedStop = useMemo(() => {
    return stops.find(s => s.stopId === selectedStopId) || stops[0] || {
      name: 'Origin Terminal',
      dist: 0,
      seq: 1
    };
  }, [stops, selectedStopId]);

  // Next departure live calculation
  const nextInfo = useMemo(() => {
    return tgsrtcService.getNextDeparture(departures);
  }, [departures]);

  // Filtered departures
  const filteredDepartures = useMemo(() => {
    return tgsrtcService.filterDeparturesByPeriod(departures, selectedPeriod);
  }, [departures, selectedPeriod]);

  // Hourly distribution for frequency curve
  const hourlyCounts = useMemo(() => {
    const counts = new Array(24).fill(0);
    departures.forEach(d => {
      const h = parseInt(d.split(':')[0], 10);
      if (!isNaN(h) && h >= 0 && h < 24) counts[h]++;
    });
    return counts;
  }, [departures]);

  const maxHourCount = Math.max(...hourlyCounts, 1);

  // Helper for service type badge
  const getServiceType = (index: number) => {
    if (category.includes('Airport') || category.includes('Pushpak')) return { label: 'Pushpak AC', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (index % 4 === 0) return { label: 'Metro Deluxe', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    if (index % 2 === 0) return { label: 'Metro Express', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    return { label: 'City Ordinary', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `TGSRTC Route ${routeName} Timings:\nFirst Bus: ${departures[0]}\nLast Bus: ${departures[departures.length - 1]}\nTotal Daily Trips: ${departures.length}\nCheck on Telangana Open Data Portal`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Next Departure Hero Banner (Cool live-feel UI) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-5 sm:p-6 shadow-xl border border-slate-800">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                Live Schedule Sync
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300 font-medium">TGSRTC Route {routeName}</span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                {selectedStop.seq > 1 ? `Next Bus Estimated at ${selectedStop.name}` : 'Next Origin Terminal Departure'}
              </div>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-mono">
                  {nextInfo
                    ? (selectedStop.seq > 1
                        ? tgsrtcService.calculateIntermediateArrivalTime(nextInfo.nextTime, selectedStop.dist)
                        : nextInfo.nextTime)
                    : (departures[0] || '--:--')}
                </span>
                {nextInfo && (
                  <span className="text-sm sm:text-base font-semibold px-2.5 py-1 rounded-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    in ~{nextInfo.waitMinutes} mins
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-lg">
              Operating every day with <strong className="text-white">{departures.length} scheduled trips</strong> between{' '}
              <strong className="text-slate-200">{departures[0]}</strong> and <strong className="text-slate-200">{departures[departures.length - 1]}</strong>.
            </p>
          </div>

          {/* Quick Metrics Badge Column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Trips</div>
              <div className="text-xl font-black text-amber-300 font-mono mt-0.5">{departures.length}</div>
              <div className="text-[9px] text-slate-400">Daily services</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">First Bus</div>
              <div className="text-xl font-black text-emerald-300 font-mono mt-0.5">{departures[0] || '--:--'}</div>
              <div className="text-[9px] text-slate-400">Morning start</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Last Bus</div>
              <div className="text-xl font-black text-purple-300 font-mono mt-0.5">{departures[departures.length - 1] || '--:--'}</div>
              <div className="text-[9px] text-slate-400">Night service</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Frequency Heatmap / Hourly Density Curve */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-brand-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Daily Service Frequency Curve (04:00 to 24:00)
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            Peak rush hours highlighted in darker blue
          </span>
        </div>

        {/* CSS Bar Chart */}
        <div className="grid grid-cols-20 sm:grid-cols-20 gap-1 items-end h-16 pt-2 pb-1 border-b border-slate-100">
          {hourlyCounts.slice(4, 24).map((cnt, idx) => {
            const hour = idx + 4;
            const pct = (cnt / maxHourCount) * 100;
            const isPeak = cnt >= maxHourCount * 0.75 && cnt > 0;
            return (
              <div key={hour} className="flex flex-col items-center h-full justify-end group relative">
                <div
                  style={{ height: `${Math.max(pct, 6)}%` }}
                  className={`w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80 ${
                    isPeak
                      ? 'bg-brand-700 shadow-xs'
                      : cnt > 0
                      ? 'bg-brand-300 hover:bg-brand-400'
                      : 'bg-slate-100'
                  }`}
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-8 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20">
                  {hour}:00 - {cnt} buses
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] text-slate-400 pt-1.5 font-mono">
          <span>04:00 (Early Morning)</span>
          <span>09:00 (Morning Rush)</span>
          <span>14:00 (Midday)</span>
          <span>18:00 (Evening Rush)</span>
          <span>23:00 (Night)</span>
        </div>
      </div>

      {/* 3. Interactive Boarding Stop Estimator & Filters */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Boarding Stop Picker */}
          <div className="flex-1 w-full md:w-auto">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-700" />
              <span>Select Boarding Stop for Custom Stop Timings:</span>
            </label>
            <div className="relative">
              <select
                value={selectedStopId}
                onChange={(e) => setSelectedStopId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {stops.map((stop) => (
                  <option key={stop.stopId} value={stop.stopId}>
                    Stop #{stop.seq}: {stop.name} ({stop.dist} km from origin)
                  </option>
                ))}
              </select>
            </div>
            {selectedStop.seq > 1 && (
              <p className="text-[11px] text-brand-800 font-medium mt-1">
                Calculated transit delay from origin: ~{Math.round((selectedStop.dist / 22) * 60)} mins (Distance: {selectedStop.dist} km)
              </p>
            )}
          </div>

          {/* Quick Share / Export Button */}
          <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              title="Copy route schedule summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied Schedule!' : 'Share Timings'}</span>
            </button>

            {/* Grid / List Mode Switcher */}
            <div className="bg-slate-200/80 p-0.5 rounded-xl flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                  viewMode === 'timeline' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Time-of-Day Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/80">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center space-x-1">
            <SlidersHorizontal className="w-3 h-3 text-slate-400" />
            <span>Filter Period:</span>
          </span>

          <button
            onClick={() => setSelectedPeriod('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedPeriod === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>All Departures ({departures.length})</span>
          </button>

          <button
            onClick={() => setSelectedPeriod('morning')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedPeriod === 'morning'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sunrise className="w-3 h-3 text-amber-500" />
            <span>Morning (04:00 - 11:00)</span>
          </button>

          <button
            onClick={() => setSelectedPeriod('afternoon')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedPeriod === 'afternoon'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sun className="w-3 h-3 text-blue-500" />
            <span>Midday (11:00 - 16:00)</span>
          </button>

          <button
            onClick={() => setSelectedPeriod('evening')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedPeriod === 'evening'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Sunset className="w-3 h-3 text-indigo-500" />
            <span>Evening Peak (16:00 - 20:00)</span>
          </button>

          <button
            onClick={() => setSelectedPeriod('night')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              selectedPeriod === 'night'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Moon className="w-3 h-3 text-purple-500" />
            <span>Night (20:00+)</span>
          </button>
        </div>
      </div>

      {/* 4. Timings List / Grid Display */}
      {filteredDepartures.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No scheduled departures for this period</h4>
          <p className="text-xs text-slate-400 mt-1">Try switching to 'All Departures' to view the complete schedule.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredDepartures.map((dep, idx) => {
            const stopArrTime = selectedStop.seq > 1
              ? tgsrtcService.calculateIntermediateArrivalTime(dep, selectedStop.dist)
              : dep;
            const destArrTime = tgsrtcService.calculateIntermediateArrivalTime(dep, totalDistanceKm || 18.5);
            const isNext = nextInfo?.nextTime === dep;
            const service = getServiceType(idx);

            return (
              <div
                key={`${dep}-${idx}`}
                className={`group relative rounded-xl p-3.5 transition-all duration-200 border ${
                  isNext
                    ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-400 shadow-md ring-2 ring-emerald-400/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
                }`}
              >
                {/* Header tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider ${service.color}`}>
                    {service.label}
                  </span>
                  {isNext && (
                    <span className="flex items-center text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse mr-1"></span>
                      Next
                    </span>
                  )}
                </div>

                {/* Main Departure Time */}
                <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900 group-hover:text-brand-700 transition">
                  {stopArrTime}
                </div>

                {/* Origin departure if looking at intermediate stop */}
                {selectedStop.seq > 1 && (
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Departs origin: {dep}
                  </div>
                )}

                {/* Destination arrival */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>Terminus:</span>
                  </span>
                  <span className="font-bold text-slate-800 font-mono">{destArrTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Timeline List Mode */
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          <div className="bg-slate-50 px-4 py-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-2">
            <span className="col-span-3 sm:col-span-2">Trip #</span>
            <span className="col-span-3 sm:col-span-3">Departure Time</span>
            <span className="col-span-3 sm:col-span-3">Service Type</span>
            <span className="col-span-3 sm:col-span-4 text-right">Destination Arrival</span>
          </div>

          {filteredDepartures.map((dep, idx) => {
            const stopArrTime = selectedStop.seq > 1
              ? tgsrtcService.calculateIntermediateArrivalTime(dep, selectedStop.dist)
              : dep;
            const destArrTime = tgsrtcService.calculateIntermediateArrivalTime(dep, totalDistanceKm || 18.5);
            const isNext = nextInfo?.nextTime === dep;
            const service = getServiceType(idx);

            return (
              <div
                key={`${dep}-${idx}`}
                className={`px-4 py-3 grid grid-cols-12 gap-2 items-center text-xs transition ${
                  isNext ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                }`}
              >
                <div className="col-span-3 sm:col-span-2 text-slate-500 font-mono">
                  #{idx + 1}
                  {isNext && (
                    <span className="ml-1.5 text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                      NEXT
                    </span>
                  )}
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <span className="text-sm sm:text-base font-black font-mono text-slate-900">
                    {stopArrTime}
                  </span>
                  {selectedStop.seq > 1 && (
                    <span className="block text-[10px] text-slate-400 font-mono">Orig: {dep}</span>
                  )}
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${service.color}`}>
                    {service.label}
                  </span>
                </div>

                <div className="col-span-3 sm:col-span-4 text-right font-mono font-bold text-slate-800">
                  {destArrTime}
                  <span className="block text-[10px] font-normal text-slate-400">
                    ~{Math.round((totalDistanceKm / 22) * 60)} min trip
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
