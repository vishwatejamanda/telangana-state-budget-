// src/pages/WaterBodiesMapPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { WaterBodiesStateSummary, WaterBodyProperty, CustomGeoJSONStats } from '@/types/waterbodies';
import { waterbodiesService } from '@/services/waterbodiesService';
import { WaterBodiesMap } from '@/components/waterbodies/WaterBodiesMap';
import { GeoJSONUploader } from '@/components/waterbodies/GeoJSONUploader';
import { LakeDetailModal } from '@/components/waterbodies/LakeDetailModal';
import {
  Droplets,
  Waves,
  MapPin,
  Layers,
  Search,
  Filter,
  Compass,
  Download,
  Upload,
  Info,
  Maximize2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const WaterBodiesMapPage: React.FC = () => {
  const [summary, setSummary] = useState<WaterBodiesStateSummary | null>(null);
  const [hyderabadGeoJSON, setHyderabadGeoJSON] = useState<any>(null);
  const [prominentGeoJSON, setProminentGeoJSON] = useState<any>(null);
  const [customGeoJSON, setCustomGeoJSON] = useState<any>(null);
  const [customStats, setCustomStats] = useState<CustomGeoJSONStats | null>(null);

  // Filters & State
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedBasin, setSelectedBasin] = useState<string>('All');
  const [searchLakeQuery, setSearchLakeQuery] = useState<string>('');
  const [selectedLake, setSelectedLake] = useState<WaterBodyProperty | null>(null);

  // Layer Visibility
  const [showHydLayer, setShowHydLayer] = useState<boolean>(true);
  const [showStateLayer, setShowStateLayer] = useState<boolean>(true);
  const [showCustomLayer, setShowCustomLayer] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [sum, hydGeo, promGeo] = await Promise.all([
        waterbodiesService.getStateSummary(),
        waterbodiesService.getHyderabadGeoJSON(),
        waterbodiesService.getProminentGeoJSON()
      ]);
      setSummary(sum);
      setHyderabadGeoJSON(hydGeo);
      setProminentGeoJSON(promGeo);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // District centroid for zoom
  const currentDistrictData = useMemo(() => {
    if (!summary || selectedDistrict === 'All') return null;
    return summary.districts.find(d => d.district === selectedDistrict) || null;
  }, [summary, selectedDistrict]);

  // Filtered Top Lakes list for the sidebar/table
  const displayedLakes = useMemo(() => {
    if (!summary) return [];
    let list: any[] = [];

    if (selectedDistrict === 'All') {
      summary.districts.forEach(d => {
        d.topLakes.forEach(l => {
          list.push({ ...l, district: d.district });
        });
      });
    } else {
      const d = summary.districts.find(item => item.district === selectedDistrict);
      if (d) {
        list = d.topLakes.map(l => ({ ...l, district: d.district }));
      }
    }

    if (selectedBasin !== 'All') {
      list = list.filter(l => l.basin.includes(selectedBasin));
    }

    if (searchLakeQuery.trim()) {
      const q = searchLakeQuery.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        (l.mandal && l.mandal.toLowerCase().includes(q)) ||
        (l.district && l.district.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => b.areaSqM - a.areaSqM).slice(0, 50);
  }, [summary, selectedDistrict, selectedBasin, searchLakeQuery]);

  const handleCustomGeoJSON = (geojson: any, stats: CustomGeoJSONStats) => {
    setCustomGeoJSON(geojson);
    setCustomStats(stats);
    setShowCustomLayer(true);
  };

  const handleClearCustom = () => {
    setCustomGeoJSON(null);
    setCustomStats(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-r from-sky-950 via-cyan-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-sky-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Waves className="w-3.5 h-3.5 mr-1.5 text-cyan-300" />
              Telangana Irrigation & Geospatial OpenData
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-sky-300 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              37,770+ Water Bodies & Urban Lakes Repository
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Telangana & Hyderabad Water Bodies Map
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            A comprehensive geospatial visualization of <strong>37,773 lakes, cheruvulu, tanks, and major irrigation reservoirs</strong>{' '}
            across Telangana state and Greater Hyderabad / HMDA. Explore water spread areas, Godavari & Krishna river basins,
            and upload your own custom GeoJSON files to inspect on the interactive map.
          </p>

          {/* Quick Stat Pill Highlights */}
          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Total Water Bodies: <strong className="text-white font-bold">{summary?.totalWaterBodies.toLocaleString() || '37,773'}</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Water Spread: <strong className="text-white font-bold">{summary?.totalWaterSpreadHa.toLocaleString() || '23,800'} Ha</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Hyderabad Urban Lakes: <strong className="text-white font-bold">1,365 Lakes</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Districts: <strong className="text-white font-bold">32 Districts</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Map Filter & Layer Control Bar */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Lake Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search lakes (e.g. Osman Sagar, Shamirpet, Hussain Sagar, Durgam Cheruvu)..."
              value={searchLakeQuery}
              onChange={(e) => setSearchLakeQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            />
          </div>

          {/* District Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="All">All Telangana Districts (32 Districts)</option>
              {summary?.districts.map(d => (
                <option key={d.district} value={d.district}>
                  {d.district} District ({d.count} water bodies)
                </option>
              ))}
            </select>
          </div>

          {/* Basin Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedBasin}
              onChange={(e) => setSelectedBasin(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="All">All River Basins</option>
              <option value="Godavari">Godavari River Basin</option>
              <option value="Krishna">Krishna River Basin</option>
            </select>
          </div>
        </div>

        {/* Layer Visibility Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Map Layers:</span>
            </span>

            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
              <input
                type="checkbox"
                checked={showHydLayer}
                onChange={(e) => setShowHydLayer(e.target.checked)}
                className="rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Greater Hyderabad Lakes (1,365)</span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <input
                type="checkbox"
                checked={showStateLayer}
                onChange={(e) => setShowStateLayer(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Statewide Reservoirs & Major Tanks</span>
            </label>

            {customGeoJSON && (
              <label className="flex items-center space-x-2 text-xs font-semibold text-amber-900 cursor-pointer bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-300">
                <input
                  type="checkbox"
                  checked={showCustomLayer}
                  onChange={(e) => setShowCustomLayer(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Custom Uploaded Layer ({customStats?.featureCount} feats)</span>
              </label>
            )}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {selectedDistrict !== 'All' ? (
              <span>Selected: <strong className="text-slate-900">{selectedDistrict}</strong> ({currentDistrictData?.count} tanks)</span>
            ) : (
              <span>Full State View</span>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Map and GeoJSON Uploader Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Map */}
        <div className="lg:col-span-8 space-y-4">
          <WaterBodiesMap
            hyderabadGeoJSON={hyderabadGeoJSON}
            prominentGeoJSON={prominentGeoJSON}
            customGeoJSON={customGeoJSON}
            selectedDistrict={selectedDistrict}
            districtCentroid={currentDistrictData?.centroid}
            onSelectLake={(lake) => setSelectedLake(lake)}
            showHydLayer={showHydLayer}
            showStateLayer={showStateLayer}
            showCustomLayer={showCustomLayer}
          />
        </div>

        {/* Right Column: GeoJSON Uploader & District Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Custom GeoJSON File Uploader */}
          <GeoJSONUploader
            onGeoJSONLoaded={handleCustomGeoJSON}
            onClearCustomLayer={handleClearCustom}
            activeStats={customStats}
          />

          {/* Current District / State Focus Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {selectedDistrict === 'All' ? 'Statewide Summary' : `${selectedDistrict} District`}
                </h4>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {selectedDistrict === 'All' ? 'Telangana Water Resources' : `${selectedDistrict} Water Profile`}
                </div>
              </div>
              <Droplets className="w-5 h-5 text-cyan-600" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium block">Total Waterbodies</span>
                <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">
                  {currentDistrictData ? currentDistrictData.count.toLocaleString() : summary?.totalWaterBodies.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 font-medium block">Water Spread</span>
                <span className="text-lg font-black text-cyan-800 font-mono mt-0.5 block">
                  {currentDistrictData ? `${currentDistrictData.totalWaterSpreadHa.toLocaleString()} Ha` : `${summary?.totalWaterSpreadHa.toLocaleString()} Ha`}
                </span>
              </div>
            </div>

            {currentDistrictData && (
              <div className="text-xs space-y-2 pt-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mandals Covered:</span>
                  <span className="font-bold text-slate-800">{currentDistrictData.mandalsCount} Mandals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">River Basin:</span>
                  <span className="font-bold text-slate-800">{currentDistrictData.basins.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Lake Area:</span>
                  <span className="font-bold text-slate-800">{currentDistrictData.totalAreaSqKm} sq km</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Prominent Lakes & Reservoirs Table / Cards */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              Prominent Lakes & Reservoirs ({displayedLakes.length} displayed)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Major water bodies ranked by surface area. Click any lake to view comprehensive cadastral metrics and Google Maps satellite imagery.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedLakes.map((lake, idx) => (
            <div
              key={`${lake.name}-${idx}`}
              onClick={() => setSelectedLake({
                name: lake.name,
                district: lake.district,
                mandal: lake.mandal,
                areaSqM: lake.areaSqM,
                areaAcres: lake.areaAcres,
                waterSpreadHa: lake.waterSpreadHa,
                basin: lake.basin,
                type: lake.type
              })}
              className="group p-4 bg-slate-50 hover:bg-cyan-50/60 rounded-2xl border border-slate-200 hover:border-cyan-300 transition cursor-pointer space-y-2.5 shadow-xs hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-xs text-slate-900 group-hover:text-cyan-900 transition leading-snug">
                  {lake.name}
                </span>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-cyan-800 shrink-0 ml-1">
                  {lake.areaAcres ? `${lake.areaAcres.toLocaleString()} Ac` : ''}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{lake.mandal ? `${lake.mandal}, ` : ''}{lake.district}</span>
              </div>

              <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-500">
                <span className={`px-2 py-0.5 rounded-full font-bold border ${
                  lake.basin.includes('Godavari') ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  {lake.basin}
                </span>
                <span className="text-cyan-700 font-semibold group-hover:underline flex items-center">
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Lake Detail Modal */}
      <LakeDetailModal
        lake={selectedLake}
        onClose={() => setSelectedLake(null)}
      />
    </div>
  );
};
