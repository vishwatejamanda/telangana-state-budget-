// src/components/waterbodies/LakeDetailModal.tsx
import React from 'react';
import { WaterBodyProperty } from '@/types/waterbodies';
import { Waves, MapPin, Compass, ExternalLink, X, Shield, Droplets, Maximize2 } from 'lucide-react';

interface LakeDetailModalProps {
  lake: WaterBodyProperty | null;
  onClose: () => void;
}

export const LakeDetailModal: React.FC<LakeDetailModalProps> = ({ lake, onClose }) => {
  if (!lake) return null;

  const isKrishna = (lake.basin || '').toLowerCase().includes('krishna');
  const basinColor = isKrishna ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Top Header with Gradient */}
        <div className="relative bg-gradient-to-r from-cyan-900 via-sky-900 to-blue-900 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-semibold text-sky-200 uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <span>Water Resource Profile</span>
          </div>

          <h3 className="text-2xl font-black text-white tracking-tight">
            {lake.name || 'Unnamed Water Body'}
          </h3>

          <p className="text-xs text-sky-100 mt-1 flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {lake.mandal ? `${lake.mandal} Mandal • ` : ''}
              {lake.district} District
            </span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Water Spread Area
              </div>
              <div className="text-xl font-black text-brand-900 font-mono mt-0.5">
                {lake.waterSpreadHa ? `${lake.waterSpreadHa.toLocaleString()} Ha` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                ~{Math.round((lake.waterSpreadHa || 0) * 2.471)} Acres
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Cadastral Shape Area
              </div>
              <div className="text-xl font-black text-cyan-800 font-mono mt-0.5">
                {lake.areaAcres ? `${lake.areaAcres.toLocaleString()} Acres` : 'N/A'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {(lake.areaSqM / 1e6).toFixed(3)} sq km
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 divide-y divide-slate-200/60 text-xs">
            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-medium">Major River Basin</span>
              <span className={`font-bold px-2 py-0.5 rounded-full border text-[11px] ${basinColor}`}>
                {lake.basin || 'Telangana Basin'}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-medium">Waterbody Classification</span>
              <span className="font-bold text-slate-800">{lake.type || 'Irrigation Tank'}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-slate-500 font-medium">District & Revenue Zone</span>
              <span className="font-bold text-slate-800">{lake.district}</span>
            </div>

            {lake.mandal && (
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Mandal</span>
                <span className="font-bold text-slate-800">{lake.mandal}</span>
              </div>
            )}

            {lake.village && (
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Habitation / Village</span>
                <span className="font-bold text-slate-800">{lake.village}</span>
              </div>
            )}
          </div>

          {/* External Links & Actions */}
          <div className="pt-2 flex items-center justify-between">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${lake.name} ${lake.mandal || ''} ${lake.district} Telangana`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-brand-900 text-white text-xs font-bold rounded-xl hover:bg-brand-800 transition shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Search on Google Maps</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
