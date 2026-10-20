// src/pages/DepartmentsPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { budgetDataService } from '@/services/budgetDataService';
import { ChartCard } from '@/components/common/ChartCard';
import { DepartmentTreemap } from '@/components/charts/DepartmentTreemap';
import { formatCrore, formatPercent, exportToCSV } from '@/utils/formatters';
import {
  Search,
  Download,
  Building2,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

import { useYear } from '@/context/YearContext';

export const DepartmentsPage: React.FC = () => {
  const { selectedYear } = useYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'cards' | 'table' | 'treemap'>('cards');

  const departments = budgetDataService.getDepartments(selectedYear);
  const maxTotal = Math.max(...departments.map(d => d.grandTotalCrore));

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(departments.map(d => d.category || 'General')))];

  const filteredDepts = departments.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.minister.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.demands.some(dm => dm.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;
    if (selectedCategory !== 'all' && (d.category || 'General') !== selectedCategory) return false;
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV(
      filteredDepts.map(d => ({
        Rank: d.rank,
        Department_Name: d.name,
        Category: d.category || 'General',
        Minister_In_Charge: d.minister,
        Demands: d.demands.join(', '),
        Establishment_Expenditure_Crore: d.establishmentCrore,
        Scheme_Expenditure_Crore: d.schemeCrore,
        Grand_Total_Allocation_Crore: d.grandTotalCrore,
        Share_Percentage: d.sharePct,
        Capital_Works_Crore: d.capitalOutlayCrore || d.capitalWorksCrore || 0,
      })),
      `telangana_budget_${selectedYear}_all_departments.csv`
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Secretariat Departments Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Complete allocations, establishment vs. scheme breakdown, ministers in charge, and capital outlays for all 30 departments
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-brand-900 bg-white border border-brand-300 rounded-lg hover:bg-brand-50 transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <Link
              to="/compare"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-900 rounded-lg hover:bg-brand-800 transition shadow-sm"
            >
              <span>Compare Departments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Treemap Section */}
      <ChartCard
        id="department-treemap"
        title="Department Allocation Treemap (Scale of Budgets)"
        subtitle="Visual representation of the relative budgetary size of all 30 Secretariat departments. Click any tile to inspect department profile."
        unit="₹ crore"
        sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
        sourcePage={18}
      >
        <DepartmentTreemap departments={departments} height={460} />
      </ChartCard>

      {/* Search, Filter Bar and View Switcher */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by department name, minister, or demand number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
          />
        </div>

        {/* Category Pills & View Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
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

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 rounded-lg text-xs">
            <button
              onClick={() => setViewStyle('cards')}
              className={`px-3 py-1 rounded font-semibold transition ${
                viewStyle === 'cards' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewStyle('table')}
              className={`px-3 py-1 rounded font-semibold transition ${
                viewStyle === 'table' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-semibold">{filteredDepts.length}</strong> of{' '}
          {departments.length} departments
        </span>
        <span>Standardized to ₹ crore</span>
      </div>

      {/* View 1: Card Grid */}
      {viewStyle === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDepts.map((dept) => {
            const establishmentPct = dept.grandTotalCrore > 0
              ? Math.round((dept.establishmentCrore / dept.grandTotalCrore) * 100)
              : 0;
            const schemePct = 100 - establishmentPct;

            return (
              <Link
                key={dept.id}
                to={`/departments/${dept.id}`}
                className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Rank & Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-900 border border-brand-200">
                      Rank #{dept.rank}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {dept.category || 'General'}
                    </span>
                  </div>

                  {/* Title & Minister */}
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-900 transition leading-snug">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Minister: <span className="font-semibold text-slate-700">{dept.minister}</span>
                  </p>

                  {/* Total Outlay */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Total Outlay
                    </div>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-xl font-black text-brand-900 font-tabular">
                        {formatCrore(dept.grandTotalCrore)}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {dept.sharePct}% of Budget
                      </span>
                    </div>

                    {/* Progress Bar of Size */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-brand-900 h-full rounded-full group-hover:brightness-110 transition"
                        style={{ width: `${(dept.grandTotalCrore / maxTotal) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Split Summary */}
                  <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pragathi (Schemes):</span>
                      <span className="font-semibold text-slate-900 font-tabular">
                        {formatCrore(dept.schemeCrore, true, 0)} ({schemePct}%)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Establishment:</span>
                      <span className="font-semibold text-slate-900 font-tabular">
                        {formatCrore(dept.establishmentCrore, true, 0)} ({establishmentPct}%)
                      </span>
                    </div>
                  </div>

                  {/* Demand Badges */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dept.demands.map((dm) => (
                      <span
                        key={dm}
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        Demand {dm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Link Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-900 group-hover:underline">
                  <span>View Schemes & Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* View 2: Detailed Table View */}
      {viewStyle === 'table' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-4">Department Name</th>
                  <th className="py-3 px-3">Minister In-Charge</th>
                  <th className="py-3 px-3">Demands</th>
                  <th className="py-3 px-3 text-right">Establishment</th>
                  <th className="py-3 px-3 text-right">Schemes (Pragathi)</th>
                  <th className="py-3 px-3 text-right">Total Outlay</th>
                  <th className="py-3 px-3 text-right">Share %</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredDepts.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-bold text-slate-500">#{dept.rank}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      <Link to={`/departments/${dept.id}`} className="hover:text-brand-900 hover:underline">
                        {dept.name}
                      </Link>
                      <div className="text-[10px] text-slate-400 font-normal">{dept.category || 'General'}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{dept.minister}</td>
                    <td className="py-2.5 px-3 text-slate-500">
                      <div className="flex flex-wrap gap-1">
                        {dept.demands.map(dm => (
                          <span key={dm} className="text-[10px] px-1 rounded bg-slate-100 font-mono">
                            {dm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-tabular text-slate-700">
                      {formatCrore(dept.establishmentCrore)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-tabular text-slate-700">
                      {formatCrore(dept.schemeCrore)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-tabular">
                      {formatCrore(dept.grandTotalCrore)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-brand-900 font-tabular">
                      {dept.sharePct}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Link
                        to={`/departments/${dept.id}`}
                        className="inline-flex items-center px-2 py-1 rounded bg-brand-50 text-brand-900 font-semibold hover:bg-brand-900 hover:text-white transition text-[11px]"
                      >
                        Profile →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
