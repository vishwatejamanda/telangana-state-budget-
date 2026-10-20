// src/components/transit/StopsTimeline.tsx
import React, { useState } from 'react';
import { RouteStop } from '@/types/transit';
import { MapPin, Search, Navigation, Building2, Train, Compass } from 'lucide-react';

interface StopsTimelineProps {
  stops: RouteStop[];
  routeName: string;
  onSelectStop?: (stop: RouteStop) => void;
  selectedStopId?: string;
}

export const StopsTimeline: React.FC<StopsTimelineProps> = ({
  stops,
  routeName,
  onSelectStop,
  selectedStopId
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredStops = stops.filter(s =>
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.zone.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const getInterchangeBadge = (name: string, zone: string) => {
    const text = `${name} ${zone}`.toUpperCase();
    if (text.includes('METRO') || text.includes('AMEERPET') || text.includes('PARADISE') || text.includes('HITEC') || text.includes('MIYAPUR')) {
      return { label: 'Metro Interchange', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
    if (text.includes('RAILWAY') || text.includes('SECUNDERABAD') || text.includes('KACHEGUDA') || text.includes('NAMPALLY')) {
      return { label: 'Railway Hub', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    }
    if (text.includes('DEPOT') || text.includes('CBS') || text.includes('MGBS') || text.includes('JBS') || text.includes('BUS STATION')) {
      return { label: 'Major Bus Depot', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
    if (text.includes('AIRPORT') || text.includes('RGIA')) {
      return { label: 'Airport Terminal', color: 'bg-purple-100 text-purple-800 border-purple-200' };
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-brand-700" />
            <span>Complete Stops Sequence ({stops.length} Stops)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any stop to view location, transit connections, and estimated arrival offset.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search stops or zones..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 max-h-[500px] overflow-y-auto pr-2">
        {/* Continuous Transit Line behind dots */}
        <div className="absolute left-3 sm:left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-emerald-500 via-brand-500 to-rose-500"></div>

        {filteredStops.map((stop, idx) => {
          const isStart = stop.seq === 1;
          const isEnd = stop.seq === stops.length;
          const isSelected = selectedStopId === stop.stopId;
          const interchange = getInterchangeBadge(stop.name, stop.zone);
          const estTravelMins = Math.round((stop.dist / 22) * 60);

          return (
            <div
              key={stop.stopId || idx}
              onClick={() => onSelectStop && onSelectStop(stop)}
              className={`relative flex items-start space-x-4 cursor-pointer p-2.5 rounded-xl transition ${
                isSelected
                  ? 'bg-brand-50/80 border border-brand-200 ring-1 ring-brand-300'
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              {/* Dot on line */}
              <div
                className={`absolute -left-6 sm:-left-8 top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${
                  isStart
                    ? 'bg-emerald-500 border-white shadow-md ring-2 ring-emerald-300'
                    : isEnd
                    ? 'bg-rose-500 border-white shadow-md ring-2 ring-rose-300'
                    : isSelected
                    ? 'bg-brand-700 border-white shadow-md ring-2 ring-brand-400'
                    : 'bg-white border-brand-600 shadow-2xs'
                }`}
              >
                {(isStart || isEnd) && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>

              {/* Stop Info Card */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      #{stop.seq}
                    </span>
                    <span className="text-sm font-bold text-slate-900 truncate">
                      {stop.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="font-semibold text-slate-700 font-mono">
                      {stop.dist} km
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">
                      +{estTravelMins}m
                    </span>
                  </div>
                </div>

                {/* Sub details: Zone and Interchange */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {stop.zone && (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                      Zone: {stop.zone}
                    </span>
                  )}
                  {interchange && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${interchange.color}`}>
                      {interchange.label}
                    </span>
                  )}
                  {isStart && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ORIGIN TERMINAL
                    </span>
                  )}
                  {isEnd && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      DESTINATION TERMINUS
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
