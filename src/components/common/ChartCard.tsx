// src/components/common/ChartCard.tsx
import React, { useState } from 'react';
import { Download, Table, BarChart2, Info } from 'lucide-react';
import { downloadChartAsPNG } from '@/utils/formatters';

interface ChartCardProps {
  id: string;
  title: string;
  subtitle?: string;
  unit?: string;
  sourceFile?: string;
  sourcePage?: number;
  children: React.ReactNode;
  tableData?: Array<Record<string, any>>;
  tableColumns?: Array<{ key: string; label: string; format?: (v: any) => string }>;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  id,
  title,
  subtitle,
  unit = '₹ crore',
  sourceFile,
  sourcePage,
  children,
  tableData,
  tableColumns,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [showCitation, setShowCitation] = useState(false);

  const handleDownload = () => {
    downloadChartAsPNG(id, `${id}_visualization.png`);
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-5 shadow-card ${className}`}>
      {/* Header with Title and Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            {unit && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-900 border border-brand-200">
                Unit: {unit}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* Table / Chart Toggle */}
          {tableData && tableData.length > 0 && (
            <button
              onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
              className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
              title="Toggle between chart and data table"
            >
              {viewMode === 'chart' ? (
                <>
                  <Table className="w-3.5 h-3.5 text-slate-500" />
                  <span>Data Table</span>
                </>
              ) : (
                <>
                  <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chart View</span>
                </>
              )}
            </button>
          )}

          {/* Download as PNG */}
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
            title="Download visualization as PNG"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">PNG</span>
          </button>

          {/* Source Info Button */}
          {sourceFile && (
            <button
              onClick={() => setShowCitation(!showCitation)}
              className="p-1 text-slate-400 hover:text-brand-900 transition rounded hover:bg-slate-50"
              title="View source document"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Source Banner if toggled */}
      {showCitation && sourceFile && (
        <div className="my-3 p-2.5 bg-brand-50/60 border border-brand-200 rounded-lg text-xs text-brand-950 flex items-center justify-between">
          <div>
            <span className="font-semibold">Official Source: </span>
            <span className="font-mono text-[11px]">{sourceFile}</span>
            {sourcePage && <span> (Page {sourcePage})</span>}
          </div>
          <button onClick={() => setShowCitation(false)} className="text-slate-400 hover:text-slate-700 ml-2">✕</button>
        </div>
      )}

      {/* Content Area */}
      <div id={id} className="mt-4 min-h-[300px]">
        {viewMode === 'chart' ? (
          children
        ) : (
          <div className="overflow-x-auto max-h-[380px] border border-slate-100 rounded-lg">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px] sticky top-0">
                <tr>
                  {tableColumns?.map((col) => (
                    <th key={col.key} className="py-2.5 px-3">
                      {col.label}
                    </th>
                  )) ||
                    Object.keys(tableData![0]).map((k) => (
                      <th key={k} className="py-2.5 px-3">
                        {k}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-tabular">
                {tableData?.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    {tableColumns
                      ? tableColumns.map((col) => (
                          <td key={col.key} className="py-2 px-3">
                            {col.format ? col.format(row[col.key]) : row[col.key]}
                          </td>
                        ))
                      : Object.values(row).map((val, vIdx) => (
                          <td key={vIdx} className="py-2 px-3">
                            {typeof val === 'number' ? val.toLocaleString('en-IN') : String(val)}
                          </td>
                        ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
