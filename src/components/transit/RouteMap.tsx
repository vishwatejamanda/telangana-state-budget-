// src/components/transit/RouteMap.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RouteStop } from '@/types/transit';
import { MapPin, Navigation } from 'lucide-react';

interface RouteMapProps {
  stops: RouteStop[];
  routeName: string;
  routeColor?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({ stops, routeName, routeColor = '#1F4F89' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [17.4399, 78.4983],
        zoom: 12,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // CartoDB Voyager tiles for modern transit look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Filter valid coordinate stops
    const validStops = stops.filter(s => s.lat !== 0 && s.lon !== 0);

    if (validStops.length === 0) return;

    const latlngs: [number, number][] = validStops.map(s => [s.lat, s.lon]);

    // Draw route polyline with glowing border
    const routeGlow = L.polyline(latlngs, {
      color: '#FFFFFF',
      weight: 8,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    });
    layerGroup.addLayer(routeGlow);

    const routeLine = L.polyline(latlngs, {
      color: routeColor,
      weight: 5,
      opacity: 0.85,
      dashArray: undefined,
      lineCap: 'round',
      lineJoin: 'round'
    });
    layerGroup.addLayer(routeLine);

    // Add stop markers
    validStops.forEach((stop, idx) => {
      const isStart = idx === 0;
      const isEnd = idx === validStops.length - 1;

      let markerColor = '#1E293B';
      let size = 10;
      let label = `${idx + 1}`;

      if (isStart) {
        markerColor = '#10B981'; // Green
        size = 16;
        label = 'A';
      } else if (isEnd) {
        markerColor = '#EF4444'; // Red
        size = 16;
        label = 'B';
      }

      const customIcon = L.divIcon({
        className: 'custom-bus-stop-icon',
        html: `
          <div style="
            background-color: ${markerColor};
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: ${size > 12 ? '9px' : '0px'};
            font-weight: bold;
            font-family: sans-serif;
          ">
            ${size > 12 ? label : ''}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([stop.lat, stop.lon], { icon: customIcon });

      const popupContent = `
        <div style="font-family: 'Inter', sans-serif; padding: 4px; min-width: 160px;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px;">
            Stop #${stop.seq} • ${isStart ? 'Origin' : isEnd ? 'Destination' : 'Intermediate'}
          </div>
          <div style="font-size: 14px; font-weight: 700; color: #0F172A; margin-top: 2px;">
            ${stop.name}
          </div>
          ${stop.zone ? `<div style="font-size: 11px; color: #475569; margin-top: 2px;">Zone: <strong>${stop.zone}</strong></div>` : ''}
          <div style="font-size: 11px; color: #64748B; margin-top: 4px; padding-top: 4px; border-top: 1px solid #E2E8F0; display: flex; justify-content: space-between;">
            <span>Distance: <strong>${stop.dist} km</strong></span>
            <span>Time: <strong>${stop.sampleTime}</strong></span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      layerGroup.addLayer(marker);
    });

    // Fit bounds
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, [stops, routeColor]);

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 shadow-md text-xs flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-xs"></span>
          <span className="font-semibold text-slate-700">Origin</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-white"></span>
          <span className="text-slate-600">Bus Stops ({stops.length})</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 border border-white shadow-xs"></span>
          <span className="font-semibold text-slate-700">Destination</span>
        </div>
      </div>

      <div className="absolute top-3 left-3 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow flex items-center space-x-2">
        <Navigation className="w-3.5 h-3.5 text-amber-400" />
        <span>{routeName} Route Path</span>
      </div>
    </div>
  );
};
