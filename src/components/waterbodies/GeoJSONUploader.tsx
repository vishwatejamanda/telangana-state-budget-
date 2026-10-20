// src/components/waterbodies/GeoJSONUploader.tsx
import React, { useState, useRef } from 'react';
import { waterbodiesService } from '@/services/waterbodiesService';
import { CustomGeoJSONStats } from '@/types/waterbodies';
import { Upload, FileCode, CheckCircle2, AlertCircle, X, Layers, Eye } from 'lucide-react';

interface GeoJSONUploaderProps {
  onGeoJSONLoaded: (geojson: any, stats: CustomGeoJSONStats) => void;
  onClearCustomLayer?: () => void;
  activeStats?: CustomGeoJSONStats | null;
}

export const GeoJSONUploader: React.FC<GeoJSONUploaderProps> = ({
  onGeoJSONLoaded,
  onClearCustomLayer,
  activeStats
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.name.endsWith('.geojson') && !file.name.endsWith('.json')) {
      setErrorMsg('Please select a valid .geojson or .json file');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const { geojson, stats } = await waterbodiesService.parseUploadedGeoJSON(file);
      onGeoJSONLoaded(geojson, stats);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse GeoJSON file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Upload className="w-4 h-4 text-cyan-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Upload Custom GeoJSON Layer
          </h4>
        </div>
        {activeStats && onClearCustomLayer && (
          <button
            onClick={onClearCustomLayer}
            className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Remove Custom Layer</span>
          </button>
        )}
      </div>

      {activeStats ? (
        <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-900 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
              <span className="truncate max-w-[200px]">{activeStats.fileName}</span>
            </span>
            <span className="text-[10px] bg-cyan-200/80 text-cyan-900 font-bold px-2 py-0.5 rounded-full">
              {activeStats.featureCount} Features
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-cyan-800 pt-1 border-t border-cyan-200/60">
            <div>Size: <strong>{activeStats.fileSizeKB} KB</strong></div>
            <div>Types: <strong>{activeStats.geometryTypes.join(', ')}</strong></div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
            isDragging
              ? 'border-cyan-500 bg-cyan-50/50'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".geojson,.json"
            onChange={handleFileChange}
            className="hidden"
          />

          <FileCode className="w-8 h-8 text-cyan-600 mx-auto mb-1.5 opacity-80" />
          <p className="text-xs font-semibold text-slate-700">
            {isLoading ? 'Parsing GeoJSON geometry...' : 'Drop any GeoJSON file here or browse'}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Supports polygons, multi-polygons, and coordinates
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center space-x-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
