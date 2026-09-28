// src/components/common/KPICard.tsx
import React, { useState } from 'react';
import { Info, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCrore } from '@/utils/formatters';

export interface KPICardProps {
  label?: string;
  title?: string;
  value: number | string;
  unit?: string;
  subtext?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'positive' | 'negative' | 'neutral' | 'brand';
  };
  source?: {
    file: string;
    page: number;
    notes?: string;
  };
  sourceFile?: string;
  sourcePage?: number;
  signal?: 'positive' | 'negative' | 'neutral' | 'warning';
  trend?: {
    label: string;
    direction?: 'up' | 'down' | 'neutral';
  };
  isCrore?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  title,
  value,
  unit = '₹ crore',
  subtext,
  description,
  badge,
  source,
  sourceFile,
  sourcePage,
  signal,
  trend,
  isCrore = true,
}) => {
  const [showSource, setShowSource] = useState(false);

  const displayLabel = label || title || '';
  const displaySubtext = subtext || description || '';

  const displaySource = source || (sourceFile && sourcePage ? { file: sourceFile, page: sourcePage } : undefined);

  const displayValue = typeof value === 'number'
    ? (isCrore ? formatCrore(value, false) : value.toLocaleString('en-IN'))
    : value;

  const badgeStyles: Record<string, string> = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    negative: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    brand: 'bg-brand-50 text-brand-900 border-brand-200',
  };

  const activeBadgeVariant = badge?.variant || (signal === 'positive' ? 'positive' : signal === 'warning' ? 'warning' : 'neutral');
  const activeBadgeText = badge?.text || trend?.label;

  return (
    <div className="relative bg-white border border-slate-200/90 rounded-xl p-5 shadow-card hover:border-brand-300 transition group flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
            {displayLabel}
          </span>
          {displaySource && (
            <button
              onClick={() => setShowSource(!showSource)}
              className="text-slate-400 hover:text-brand-700 transition p-1 rounded hover:bg-slate-50"
              title="View source citation"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Value Display */}
        <div className="mt-2 flex items-baseline space-x-1.5">
          <span className="text-2xl font-black text-slate-900 tracking-tight font-tabular">
            {displayValue}
          </span>
          {unit && (
            <span className="text-xs font-medium text-slate-500">
              {unit}
            </span>
          )}
        </div>

        {/* Subtext description */}
        {displaySubtext && (
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            {displaySubtext}
          </p>
        )}
      </div>

      {/* Badge / Trend Indicator */}
      {activeBadgeText && (
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center">
          <span
            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded border ${
              badgeStyles[activeBadgeVariant] || badgeStyles.neutral
            }`}
          >
            {trend?.direction === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {trend?.direction === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {activeBadgeText}
          </span>
        </div>
      )}

      {/* Expandable Source Citation Modal / Tooltip */}
      {showSource && displaySource && (
        <div className="absolute inset-x-0 bottom-0 bg-slate-900 text-white p-3.5 rounded-b-xl text-xs z-20 shadow-elevated animate-in fade-in">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-slate-200">Source Document:</span>
            <button
              onClick={() => setShowSource(false)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <div className="font-mono text-[11px] text-slate-300 mt-1 truncate">
            {displaySource.file}
          </div>
          <div className="mt-1 flex items-center justify-between text-slate-400 text-[11px]">
            <span>Page: {displaySource.page}</span>
            {displaySource.notes && (
              <span className="italic">{displaySource.notes}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
