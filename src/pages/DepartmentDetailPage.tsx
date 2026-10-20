// src/pages/DepartmentDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { budgetDataService } from '@/services/budgetDataService';
import { KPICard } from '@/components/common/KPICard';
import { ChartCard } from '@/components/common/ChartCard';
import { formatCrore } from '@/utils/formatters';
import {
  ArrowLeft,
  Building2,
  User,
  ShieldCheck,
  FileText,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

import { useYear } from '@/context/YearContext';

export const DepartmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedYear } = useYear();

  const dept = budgetDataService.getDepartmentById(id || '', selectedYear);
  const allDemands = budgetDataService.getDemands(selectedYear);
  const allSchemes = budgetDataService.getSchemes(selectedYear);

  if (!dept) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Department Not Found</h2>
        <p className="text-slate-500 text-sm">
          No department matching the ID "{id}" could be located in the {selectedYear} budget index.
        </p>
        <Link
          to="/departments"
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-brand-900 text-white rounded-lg text-sm font-semibold hover:bg-brand-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Departments</span>
        </Link>
      </div>
    );
  }

  // Find demands associated with this department
  const relatedDemands = allDemands.filter(dm =>
    dept.demands.includes(dm.demandNo) || dm.department.toLowerCase().includes(dept.name.toLowerCase().substring(0, 10))
  );

  // Find schemes associated with this department
  const relatedSchemes = allSchemes.filter(s =>
    s.department.toLowerCase().includes(dept.name.toLowerCase()) ||
    (s.department === 'Agriculture & Cooperation Department' && dept.id === 'agriculture-cooperation') ||
    (s.department === 'Panchayat Raj and Rural Development Department' && dept.id === 'panchayat-raj-rural-dev') ||
    (s.department === 'Irrigation Department' && dept.id === 'irrigation-command-area') ||
    (s.department === 'Energy Department' && dept.id === 'energy') ||
    (s.department === 'Municipal Administration & Urban Development' && dept.id === 'municipal-admn-urban-dev')
  );

  const establishmentPct = dept.grandTotalCrore > 0
    ? Math.round((dept.establishmentCrore / dept.grandTotalCrore) * 100)
    : 0;
  const schemePct = 100 - establishmentPct;

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link to="/departments" className="hover:text-brand-900 flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Departments</span>
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">{dept.name}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand-50 text-brand-900 border border-brand-200">
                Rank #{dept.rank} by Allocation
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                {dept.category || 'Secretariat Department'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans leading-tight">
              {dept.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-brand-900" />
                <span>
                  Minister In-Charge: <strong className="text-slate-900 font-semibold">{dept.minister}</strong>
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>
                  Demands: <strong className="text-slate-900">{dept.demands.map(d => `Demand ${d}`).join(', ')}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Allocation Metric Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 min-w-[240px] text-right self-start lg:self-auto">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Budget Allocation
            </div>
            <div className="text-3xl font-black text-brand-900 font-tabular mt-1">
              {formatCrore(dept.grandTotalCrore)}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">
              {dept.sharePct}% of Total State Budget
            </div>
          </div>
        </div>

        {/* Expenditure Split In-cell Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Budget Composition & Split</span>
            <span className="text-slate-500 font-tabular">
              Schemes: {schemePct}% | Establishment: {establishmentPct}%
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${schemePct}%` }}
              className="bg-brand-900 h-full transition-all duration-700"
              title={`Pragathi Paddu (Schemes): ${schemePct}%`}
            />
            <div
              style={{ width: `${establishmentPct}%` }}
              className="bg-slate-400 h-full transition-all duration-700"
              title={`Nirvahana Paddu (Establishment): ${establishmentPct}%`}
            />
          </div>

          <div className="flex justify-between items-center text-xs mt-2 text-slate-600">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-900"></span>
              <span>
                Pragathi Paddu (Schemes & Programs):{' '}
                <strong className="text-slate-900 font-tabular">{formatCrore(dept.schemeCrore)}</strong> ({schemePct}%)
              </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span>
                Nirvahana Paddu (Establishment & Operations):{' '}
                <strong className="text-slate-900 font-tabular">{formatCrore(dept.establishmentCrore)}</strong> ({establishmentPct}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Detail KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Grand Total Outlay"
          value={dept.grandTotalCrore}
          unit="₹ crore"
          description="Net voted and charged expenditure"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
        />
        <KPICard
          title="Schemes & Development"
          value={dept.schemeCrore}
          unit="₹ crore"
          description="Pragathi Paddu developmental initiatives"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
          trend={{ label: `${schemePct}% share`, direction: 'up' }}
        />
        <KPICard
          title="Establishment & Salaries"
          value={dept.establishmentCrore}
          unit="₹ crore"
          description="Nirvahana Paddu wages, utilities & admin"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
        />
        <KPICard
          title="Capital Works Outlay"
          value={dept.capitalOutlayCrore || dept.capitalWorksCrore || 0}
          unit="₹ crore"
          description="Asset creation, infrastructure & civil works"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={20}
          signal="positive"
        />
      </div>

      {/* Flagship Schemes Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Flagship Programs & Major Schemes
            </h2>
            <p className="text-xs text-slate-500">
              Key developmental programs implemented under this department
            </p>
          </div>
          <Link
            to="/schemes"
            className="text-xs font-semibold text-brand-900 hover:underline flex items-center space-x-1"
          >
            <span>All State Schemes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {relatedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedSchemes.map((s) => (
              <div
                key={s.id || s.sNo}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-900 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {s.category}
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-tabular">
                      {formatCrore(s.amount)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-2">{s.name}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                  <span>Major Head: {s.majorHead || 'Functional Head'}</span>
                  <span className="italic">Page {s.sourcePage || 18}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-500">
            {dept.keySchemes && dept.keySchemes.length > 0 ? (
              <div className="space-y-2">
                <p className="font-semibold text-slate-700">Priority Program Heads:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {dept.keySchemes.map((ks, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 font-medium">
                      {ks}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              'Schemes details integrated within Establishment & Department operational heads.'
            )}
          </div>
        )}
      </section>

      {/* Associated Demands Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Legislative Demands for Grants
          </h2>
          <p className="text-xs text-slate-500">
            Detailed Demands voted by the Telangana Legislative Assembly for this department
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Demand No</th>
                <th className="py-2.5 px-3">Demand Title (English)</th>
                <th className="py-2.5 px-3">Title in Telugu</th>
                <th className="py-2.5 px-3 text-right">Allocation (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">Share of Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {relatedDemands.map((dm) => (
                <tr key={dm.demandNo} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-brand-900">
                    Demand {dm.demandNo}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{dm.name}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-serif">{dm.teluguName}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-tabular">
                    {formatCrore(dm.amountCrore)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-500 font-tabular">
                    {dm.sharePct || ((dm.amountCrore / 324234) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Source & Audit Citation Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-brand-900 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900">Official Document Reference: </span>
          Data extracted from <span className="font-mono text-slate-800">Volume VI - Brief (Pages 18-20)</span>,{' '}
          <span className="font-mono text-slate-800">Notice of Demands for Grants 2026-27</span>, and{' '}
          <span className="font-mono text-slate-800">Volume III Detailed Departmental Estimates</span>.
          All allocations reflect Net Voted + Charged provisions for Financial Year 2026-27.
        </div>
      </div>
    </div>
  );
};
