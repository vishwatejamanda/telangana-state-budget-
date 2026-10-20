// src/components/waterbodies/WaterBodiesMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { WaterBodyProperty } from '@/types/waterbodies';
import { Layers, Compass, Maximize2, Droplets, MapPin, Eye } from 'lucide-react';

interface WaterBodiesMapProps {
  hyderabadGeoJSON?: any;
  prominentGeoJSON?: any;
  customGeoJSON?: any;
  selectedDistrict?: string;
  districtCentroid?: [number, number];
  onSelectLake: (lake: WaterBodyProperty) => void;
  showHydLayer: boolean;
  showStateLayer: boolean;
  showCustomLayer: boolean;
}

export const WaterBodiesMap: React.FC<WaterBodiesMapProps> = ({
  hyderabadGeoJSON,
  prominentGeoJSON,
  customGeoJSON,
  selectedDistrict,
  districtCentroid,
  onSelectLake,
  showHydLayer,
  showStateLayer,
  showCustomLayer
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer groups
  const hydLayerGroupRef = useRef<L.GeoJSON | null>(null);
  const stateLayerGroupRef = useRef<L.GeoJSON | null>(null);
  const customLayerGroupRef = useRef<L.GeoJSON | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTile, setActiveTile] = useState<'carto' | 'satellite' | 'dark'>('carto');

  // Tile layer urls
  const tileUrls = {
    carto: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Telangana / Hyderabad
      const map = L.map(mapContainerRef.current, {
        center: [17.5, 78.5],
        zoom: 8,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      tileLayerRef.current = L.tileLayer(tileUrls.carto, {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // keep instance
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    tileLayerRef.current = L.tileLayer(tileUrls[activeTile], {
      attribution: activeTile === 'satellite' ? '&copy; Esri &copy; Maxar' : '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18
    }).addTo(map);

    // Bring GeoJSON layers to front
    if (stateLayerGroupRef.current) stateLayerGroupRef.current.bringToFront();
    if (hydLayerGroupRef.current) hydLayerGroupRef.current.bringToFront();
    if (customLayerGroupRef.current) customLayerGroupRef.current.bringToFront();
  }, [activeTile]);

  // Handle Hyderabad GeoJSON Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (hydLayerGroupRef.current) {
      map.removeLayer(hydLayerGroupRef.current);
      hydLayerGroupRef.current = null;
    }

    if (showHydLayer && hyderabadGeoJSON) {
      hydLayerGroupRef.current = L.geoJSON(hyderabadGeoJSON, {
        style: {
          color: '#0284C7', // Sky Blue
          weight: 1.5,
          opacity: 0.9,
          fillColor: '#38BDF8',
          fillOpacity: 0.55
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const lakeProp: WaterBodyProperty = {
            name: p.name || 'Urban Water Body',
            district: p.district || 'Hyderabad',
            mandal: p.mandal || '',
            village: p.village || '',
            areaSqM: p.areaSqM || 0,
            areaAcres: p.areaAcres || 0,
            waterSpreadHa: p.waterSpreadHa || 0,
            basin: p.basin || 'Krishna Basin',
            type: p.type || 'Urban Lake'
          };

          layer.bindTooltip(
            `<strong>${lakeProp.name}</strong><br/>${lakeProp.district} • ${lakeProp.areaAcres ? `${lakeProp.areaAcres} Acres` : ''}`,
            { sticky: true, className: 'lake-tooltip' }
          );

          layer.on('click', () => {
            onSelectLake(lakeProp);
          });
        }
      }).addTo(map);
    }
  }, [hyderabadGeoJSON, showHydLayer]);

  // Handle Statewide Prominent GeoJSON Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (stateLayerGroupRef.current) {
      map.removeLayer(stateLayerGroupRef.current);
      stateLayerGroupRef.current = null;
    }

    if (showStateLayer && prominentGeoJSON) {
      stateLayerGroupRef.current = L.geoJSON(prominentGeoJSON, {
        style: (feature) => {
          const isGodavari = (feature?.properties?.basin || '').includes('Godavari');
          return {
            color: isGodavari ? '#059669' : '#2563EB',
            weight: 1.5,
            opacity: 0.85,
            fillColor: isGodavari ? '#10B981' : '#3B82F6',
            fillOpacity: 0.5
          };
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const lakeProp: WaterBodyProperty = {
            name: p.name || 'Telangana Reservoir',
            district: p.district || '',
            mandal: p.mandal || '',
            village: p.village || '',
            areaSqM: p.areaSqM || 0,
            areaAcres: p.areaAcres || 0,
            waterSpreadHa: p.waterSpreadHa || 0,
            basin: p.basin || '',
            type: p.type || 'Irrigation Tank'
          };

          layer.bindTooltip(
            `<strong>${lakeProp.name}</strong><br/>${lakeProp.district} (${lakeProp.basin})<br/>Spread: ${lakeProp.waterSpreadHa} Ha`,
            { sticky: true }
          );

          layer.on('click', () => {
            onSelectLake(lakeProp);
          });
        }
      }).addTo(map);
    }
  }, [prominentGeoJSON, showStateLayer]);

  // Handle Custom Uploaded GeoJSON Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (customLayerGroupRef.current) {
      map.removeLayer(customLayerGroupRef.current);
      customLayerGroupRef.current = null;
    }

    if (showCustomLayer && customGeoJSON) {
      customLayerGroupRef.current = L.geoJSON(customGeoJSON, {
        style: {
          color: '#D97706', // Amber / Gold
          weight: 2,
          opacity: 0.95,
          fillColor: '#F59E0B',
          fillOpacity: 0.6
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: '#F59E0B',
            color: '#FFFFFF',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
        onEachFeature: (feature, layer) => {
          const p = feature.properties || {};
          const name = p.name || p.Tank_Name || p.TANK_N || p.DMV_N || 'Custom Waterbody';
          const lakeProp: WaterBodyProperty = {
            name: String(name),
            district: String(p.D_N || p.district || 'Uploaded'),
            mandal: String(p.DM_N || p.mandal || ''),
            village: String(p.DMV_N || p.village || ''),
            areaSqM: Number(p.Shape_Area || p.areaSqM || 0),
            areaAcres: Number(p.areaAcres || Math.round((Number(p.Shape_Area || 0) / 4046.86))),
            waterSpreadHa: Number(p.Water_Spre || p.waterSpreadHa || 0),
            basin: String(p.MJB || p.basin || 'Custom Layer'),
            type: String(p.T_TYPE || p.type || 'Uploaded Feature')
          };

          layer.bindTooltip(`<strong>${lakeProp.name}</strong><br/>${lakeProp.district}`, { sticky: true });
          layer.on('click', () => {
            onSelectLake(lakeProp);
          });
        }
      }).addTo(map);

      // Fit bounds to custom layer
      try {
        const bounds = customLayerGroupRef.current.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
        }
      } catch (e) {
        // ignore
      }
    }
  }, [customGeoJSON, showCustomLayer]);

  // Handle District Zoom
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (districtCentroid && districtCentroid[0] && districtCentroid[1]) {
      map.flyTo(districtCentroid, selectedDistrict === 'Hyderabad' ? 12 : 10, {
        duration: 1.2
      });
    }
  }, [districtCentroid, selectedDistrict]);

  const handleResetZoom = () => {
    mapInstanceRef.current?.flyTo([17.5, 78.5], 8);
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Top Map Bar Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        {/* Reset Zoom */}
        <button
          onClick={handleResetZoom}
          className="px-3 py-1.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md border border-slate-200 transition flex items-center space-x-1.5"
          title="Zoom to full Telangana state extent"
        >
          <Compass className="w-3.5 h-3.5 text-brand-700" />
          <span>Full Telangana Extent</span>
        </button>

        {/* Tile Switcher */}
        <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-200 flex items-center space-x-1 text-xs">
          <button
            onClick={() => setActiveTile('carto')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              activeTile === 'carto' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setActiveTile('satellite')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              activeTile === 'satellite' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setActiveTile('dark')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              activeTile === 'dark' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Bottom Floating Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-lg text-xs flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-sky-400 border border-sky-600"></span>
          <span className="font-semibold text-slate-700">Greater Hyderabad Lakes (1,365)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-700"></span>
          <span className="font-semibold text-slate-700">Godavari Basin Reservoirs</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 border border-blue-800"></span>
          <span className="font-semibold text-slate-700">Krishna Basin Reservoirs</span>
        </div>
        {customGeoJSON && (
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-700 animate-pulse"></span>
            <span className="font-semibold text-amber-900">Custom Uploaded Layer</span>
          </div>
        )}
      </div>

      {/* Help tooltip */}
      <div className="absolute bottom-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] shadow">
        Click any lake to open details & metrics
      </div>
    </div>
  );
};
