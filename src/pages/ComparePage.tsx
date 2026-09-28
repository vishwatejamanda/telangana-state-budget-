// src/pages/ComparePage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { CompareDepartmentsTool } from '@/components/charts/CompareDepartmentsTool';
import { MultiYearTrendChart } from '@/components/charts/MultiYearTrendChart';
import { ChartCard } from '@/components/common/ChartCard';
import { formatCrore } from '@/utils/formatters';
import { ArrowLeftRight, Calendar, Building2, CheckCircle2, Clock, Info } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'departments' | 'years'>('departments');
  const [selectedYear, setSelectedYear] = useState('2026-27');

  const departments = budgetDataService.getDepartments(selectedYear);
  const years = budgetDataService.getAvailableYears();

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Comparative Analysis Tool
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Benchmark departmental allocations side-by-side or evaluate multi-year fiscal trends
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto text-xs">
            <button
              onClick={() => setActiveTab('departments')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
                activeTab === 'departments'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Compare Departments</span>
            </button>
            <button
              onClick={() => setActiveTab('years')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
                activeTab === 'years'
                  ? 'bg-brand-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Compare Years</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Compare Departments */}
      {activeTab === 'departments' && (
        <section className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Departmental Outlay & Split Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Pick up to 4 Secretariat departments to analyze differences in development spending, wage burdens, and capital works
              </p>
            </div>

            <CompareDepartmentsTool departments={departments} />
          </div>
        </section>
      )}

      {/* Tab 2: Compare Years (Dynamic Architecture) */}
      {activeTab === 'years' && (
        <section className="space-y-6">
          {/* Architecture Status Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Year-Agnostic Comparison Engine Enabled
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The data schema is built year-agnostic (<code className="font-mono text-[11px] bg-slate-200 px-1 py-0.5 rounded">&#123; year, department, scheme, category, amount, unit &#125;</code>).
                  Currently, <strong className="text-slate-900 font-semibold">2026-27</strong> is the primary active baseline.
                  When previous budget files (e.g. 2025-26, 2024-25) or future years are ingested into <code className="font-mono text-[11px] bg-slate-200 px-1 py-0.5 rounded">src/data/&lt;year&gt;/</code>,
                  multi-year selectors and YoY diffing will automatically activate across all pages without modifying any UI component code.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-800">2026-27 (BE)</span>
                <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">● Active Primary Dataset</div>
                <div className="text-slate-500 text-[11px] mt-1">₹3,24,234.00 Cr Net Budget</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-800">2025-26 (RE)</span>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">○ Summary Trend Available</div>
                <div className="text-slate-500 text-[11px] mt-1">₹2,51,320.00 Cr Exp</div>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="font-bold text-slate-800">2024-25 (Actuals)</span>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">○ Summary Trend Available</div>
                <div className="text-slate-500 text-[11px] mt-1">₹2,14,600.90 Cr Exp</div>
              </div>
            </div>
          </div>

          {/* 4-Year Multi-Year Trend Chart */}
          <ChartCard
            id="multi-year-comparison"
            title="Multi-Year Fiscal Trajectory (2023-24 to 2026-27)"
            subtitle="Extracted historical time series from Volume VI - Brief Statement of Receipts & Expenditures"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={9}
          >
            <MultiYearTrendChart height={420} />
          </ChartCard>
        </section>
      )}
    </div>
  );
};
