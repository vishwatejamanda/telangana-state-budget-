// src/pages/SchemesPage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { KPICard } from '@/components/common/KPICard';
import { formatCrore, formatPercent, exportToCSV } from '@/utils/formatters';
import {
  Search,
  Download,
  ShieldCheck,
  Sparkles,
  Filter,
  CheckCircle2,
  TrendingUp,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchemesPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<number>(0);

  const schemes = budgetDataService.getSchemes(selectedYear);
  const schemesMeta = budgetDataService.getSchemesMeta(selectedYear);
  const scsdfStsdf = budgetDataService.getScsdfStsdf(selectedYear);

  const categories = ['all', ...Array.from(new Set(schemes.map(s => s.category)))];
  const maxSchemeAmount = Math.max(...schemes.map(s => s.amount));

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    if (s.amount < minAmount) return false;
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV(
      filteredSchemes.map(s => ({
        S_No: s.sNo,
        Scheme_Name: s.name,
        Category: s.category,
        Department: s.department,
        Amount_Crore: s.amount,
        Description: s.description,
      })),
      `telangana_budget_${selectedYear}_schemes.csv`
    );
  };

  // Six Guarantees List
  const sixGuarantees = schemes.filter(s => s.category === 'Six Guarantees');

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Flagship Schemes & Welfare Programs
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Searchable catalog of all {schemes.length} major development initiatives, Six Guarantees, and Special Development Funds
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-brand-900 bg-white border border-brand-300 rounded-lg hover:bg-brand-50 transition shadow-sm self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Schemes CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Pragathi Paddu Total"
          value={184316.0}
          unit="₹ crore"
          description="Total scheme and developmental budget of the state (56.85% of total)"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
          trend={{ label: '56.85% Share', direction: 'up' }}
        />
        <KPICard
          title="Six Guarantees Outlay"
          value={schemesMeta.sixGuaranteesTotal || 53619.0}
          unit="₹ crore"
          description="Rythu Bharosa, Cheyutha, Indiramma Houses, RTC, Gruha Jyothi, Bonus"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={16}
          signal="positive"
        />
        <KPICard
          title="Scheduled Castes Fund (SCSDF)"
          value={scsdfStsdf?.scsdf?.amountCrore || 37741.22}
          unit="₹ crore"
          description="Statutory Pragathi Paddu allocation mandated under SCSDF Act"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={22}
        />
        <KPICard
          title="Scheduled Tribes Fund (STSDF)"
          value={scsdfStsdf?.stsdf?.amountCrore || 18745.16}
          unit="₹ crore"
          description="Statutory Pragathi Paddu allocation mandated under STSDF Act"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={22}
        />
      </div>

      {/* Six Guarantees Feature Strip */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-900" />
            <h2 className="text-base font-bold text-slate-900">
              The Six Guarantees (ఆరు గ్యారెంటీలు)
            </h2>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-brand-900 text-white font-tabular">
            Total: {formatCrore(schemesMeta.sixGuaranteesTotal || 53619.0)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sixGuarantees.map((sg) => (
            <div
              key={sg.sNo}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Guarantee #{sg.sNo}
                  </span>
                  <span className="text-lg font-black text-brand-900 font-tabular">
                    {formatCrore(sg.amount)}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mt-2">{sg.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{sg.department}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{sg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search scheme name, department, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-1.5 text-xs">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-900"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Clear Filter */}
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="text-xs text-brand-900 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Schemes Data Table */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-900 font-semibold">{filteredSchemes.length}</strong> of{' '}
            {schemes.length} major schemes
          </span>
          <span className="text-xs text-slate-400">Amounts in ₹ crore</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-4">Scheme / Program Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Nodal Department</th>
                <th className="py-3 px-4 text-right">Allocation (₹ Cr)</th>
                <th className="py-3 px-4 w-40">Relative Scale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredSchemes.map((s) => {
                const widthPct = (s.amount / maxSchemeAmount) * 100;
                return (
                  <tr key={s.sNo} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono text-slate-400">{s.sNo}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {s.description}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-900 border border-brand-200 whitespace-nowrap">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{s.department}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-tabular text-sm">
                      {formatCrore(s.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-900 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(widthPct, 2)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
