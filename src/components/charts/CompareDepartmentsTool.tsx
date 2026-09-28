// src/components/charts/CompareDepartmentsTool.tsx
import React, { useState } from 'react';
import { DepartmentAllocation } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';

interface CompareDepartmentsToolProps {
  departments: DepartmentAllocation[];
}

export const CompareDepartmentsTool: React.FC<CompareDepartmentsToolProps> = ({ departments }) => {
  // Default to top 3 departments
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'panchayat-raj-rural-dev',
    'agriculture-cooperation',
    'irrigation-command-area'
  ]);

  const toggleDept = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedDepts = departments.filter(d => selectedIds.includes(d.id));
  const maxTotal = Math.max(...selectedDepts.map(d => d.grandTotalCrore));

  return (
    <div className="space-y-6">
      {/* Selector bar */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Select 2 to 4 Departments to Compare:</h4>
            <p className="text-xs text-slate-500">Currently comparing {selectedDepts.length} departments</p>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-white border border-slate-200 rounded-md text-slate-700">
            {selectedIds.length}/4 selected
          </span>
        </div>

        {/* Quick select pills */}
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
          {departments.map(dept => {
            const isSelected = selectedIds.includes(dept.id);
            return (
              <button
                key={dept.id}
                onClick={() => toggleDept(dept.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center space-x-1.5 transition ${
                  isSelected
                    ? 'bg-brand-900 border-brand-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3" /> : null}
                <span>{dept.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-brand-200' : 'text-slate-400'}`}>
                  (#{dept.rank})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-side comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {selectedDepts.map(dept => {
          const establishmentPct = dept.grandTotalCrore > 0
            ? Math.round((dept.establishmentCrore / dept.grandTotalCrore) * 100)
            : 0;
          const schemePct = 100 - establishmentPct;

          return (
            <div
              key={dept.id}
              className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm hover:border-brand-700 transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-900 border border-brand-200">
                    Rank #{dept.rank}
                  </span>
                  {selectedIds.length > 2 && (
                    <button
                      onClick={() => toggleDept(dept.id)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug mb-1">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Minister: <span className="font-semibold text-slate-700">{dept.minister}</span>
                </p>

                {/* Metrics */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Total Budget Allocation
                    </div>
                    <div className="text-xl font-bold text-brand-900 font-tabular mt-0.5">
                      {formatCrore(dept.grandTotalCrore)}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {dept.sharePct}% of total state budget
                    </div>
                  </div>

                  {/* Relative size bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-900 h-full rounded-full"
                      style={{ width: `${(dept.grandTotalCrore / maxTotal) * 100}%` }}
                    />
                  </div>

                  {/* Establishment vs Scheme breakdown */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                    <div className="text-xs font-semibold text-slate-700">Expenditure Split</div>
                    
                    {/* In-cell stacked bar */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${establishmentPct}%` }}
                        className="bg-slate-600 h-full"
                        title={`Establishment: ${establishmentPct}%`}
                      />
                      <div
                        style={{ width: `${schemePct}%` }}
                        className="bg-brand-800 h-full"
                        title={`Schemes: ${schemePct}%`}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-600 pt-1">
                      <div>
                        <span className="inline-block w-2 h-2 rounded-full bg-slate-600 mr-1"></span>
                        Est: <span className="font-semibold">{formatCrore(dept.establishmentCrore, true, 0)}</span> ({establishmentPct}%)
                      </div>
                      <div>
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-800 mr-1"></span>
                        Scheme: <span className="font-semibold">{formatCrore(dept.schemeCrore, true, 0)}</span> ({schemePct}%)
                      </div>
                    </div>
                  </div>

                  {/* Capital Works */}
                  <div className="flex justify-between text-xs py-1 border-b border-slate-100">
                    <span className="text-slate-600">Capital Works Outlay:</span>
                    <span className="font-bold text-slate-900 font-tabular">
                      {formatCrore(dept.capitalOutlayCrore || dept.capitalWorksCrore || 0)}
                    </span>
                  </div>

                  {/* Demands */}
                  <div className="text-xs py-1 border-b border-slate-100">
                    <span className="text-slate-600">Associated Demands:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dept.demands.map(dm => (
                        <span key={dm} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                          Demand {dm}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Scheme Highlights */}
                  {dept.keySchemes && dept.keySchemes.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Key Schemes & Programs:
                      </span>
                      <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                        {dept.keySchemes.map((ks, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-brand-900 font-bold">•</span>
                            <span>{ks}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* View Department Page Link */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to={`/departments/${dept.id}`}
                  className="flex items-center justify-center space-x-1 w-full py-2 bg-slate-100 hover:bg-brand-900 hover:text-white text-brand-900 text-xs font-semibold rounded-lg transition"
                >
                  <span>Full Department Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
