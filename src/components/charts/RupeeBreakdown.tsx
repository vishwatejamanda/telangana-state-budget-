// src/components/charts/RupeeBreakdown.tsx
import React, { useState } from 'react';
import { RupeeItem } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { ArrowDownLeft, ArrowUpRight, Coins } from 'lucide-react';

interface RupeeBreakdownProps {
  comesFrom: RupeeItem[];
  goesTo: RupeeItem[];
}

export const RupeeBreakdown: React.FC<RupeeBreakdownProps> = ({ comesFrom, goesTo }) => {
  const [activeTab, setActiveTab] = useState<'comes' | 'goes'>('comes');
  const [selectedItem, setSelectedItem] = useState<RupeeItem | null>(null);

  const currentList = activeTab === 'comes' ? comesFrom : goesTo;

  // Single base color shades for the rupee breakdown
  const shadePalette = [
    '#12243C', // 950
    '#1C3A5F', // 900
    '#1F4F89', // 700
    '#2764A9', // 600
    '#3B7EC4', // 500
    '#619CD2', // 400
    '#95BCE0', // 300
    '#C3D7EB', // 200
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-brand-700" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Where Each Rupee Comes From & Goes To
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standard 100-paise breakdown of state receipts and expenditures for every single rupee mobilized and deployed.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveTab('comes');
              setSelectedItem(null);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'comes'
                ? 'bg-white text-brand-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
            <span>Rupee Comes From</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('goes');
              setSelectedItem(null);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition ${
              activeTab === 'goes'
                ? 'bg-white text-brand-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-700" />
            <span>Rupee Goes To</span>
          </button>
        </div>
      </div>

      {/* Proportional 100-paise Bar Visualizer */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>Proportional Share of 100 Paise</span>
          <span className="font-tabular text-slate-400">Total = 100 Paise (100%)</span>
        </div>
        <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden flex shadow-inner border border-slate-200/80">
          {currentList.map((item, idx) => {
            const widthPct = item.paisa;
            const color = shadePalette[idx % shadePalette.length];
            const isHovered = selectedItem?.name === item.name;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setSelectedItem(item)}
                style={{ width: `${widthPct}%`, backgroundColor: color }}
                className={`h-full transition-all cursor-pointer relative group ${
                  isHovered ? 'opacity-100 scale-y-105 z-10 brightness-110' : 'opacity-90 hover:opacity-100'
                }`}
                title={`${item.name}: ${item.paisa} paise (${formatCrore(item.amount)})`}
              >
                {widthPct >= 7 && (
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white tracking-wider select-none">
                    {item.paisa}p
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Item Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentList.map((item, idx) => {
          const color = shadePalette[idx % shadePalette.length];
          const isSelected = selectedItem?.name === item.name;

          return (
            <div
              key={item.name}
              onMouseEnter={() => setSelectedItem(item)}
              onClick={() => setSelectedItem(isSelected ? null : item)}
              className={`p-3.5 rounded-xl border transition cursor-pointer ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/50 shadow-md ring-1 ring-brand-600'
                  : 'border-slate-200/90 bg-white hover:border-brand-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-baseline space-x-1 pl-2">
                  <span className="text-base font-extrabold text-slate-900 font-tabular">
                    {item.paisa}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">paise</span>
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.description}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Total Outlay:</span>
                <span className="font-bold text-slate-800 font-tabular">
                  {formatCrore(item.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
