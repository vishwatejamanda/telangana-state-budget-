// src/pages/ExploreDataPage.tsx
import React, { useState, useMemo } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { formatCrore, exportToCSV } from '@/utils/formatters';
import {
  Search,
  Download,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

import { useYear } from '@/context/YearContext';

export const ExploreDataPage: React.FC = () => {
  const { selectedYear } = useYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortField, setSortField] = useState<'amount' | 'department' | 'subCategory'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const allRecords = budgetDataService.getAllRecords(selectedYear);

  // Extract unique categories & subcategories
  const categories = ['all', ...Array.from(new Set(allRecords.map(r => r.category)))];
  const subCategories = useMemo(() => {
    const list = selectedCategory === 'all'
      ? allRecords
      : allRecords.filter(r => r.category === selectedCategory);
    return ['all', ...Array.from(new Set(list.map(r => r.subCategory)))];
  }, [allRecords, selectedCategory]);

  // Filter records
  const filteredRecords = useMemo(() => {
    return allRecords.filter(rec => {
      // Search match
      const q = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        (rec.department && rec.department.toLowerCase().includes(q)) ||
        (rec.scheme && rec.scheme.toLowerCase().includes(q)) ||
        (rec.majorHeadName && rec.majorHeadName.toLowerCase().includes(q)) ||
        (rec.majorHead && rec.majorHead.toLowerCase().includes(q)) ||
        (rec.demandNo && rec.demandNo.toLowerCase().includes(q)) ||
        (rec.notes && rec.notes.toLowerCase().includes(q));

      if (!matchesSearch) return false;
      if (selectedCategory !== 'all' && rec.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'all' && rec.subCategory !== selectedSubCategory) return false;

      return true;
    });
  }, [allRecords, searchTerm, selectedCategory, selectedSubCategory]);

  // Sort records
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = (a.amount || 0) - (b.amount || 0);
      } else if (sortField === 'department') {
        comparison = (a.department || '').localeCompare(b.department || '');
      } else if (sortField === 'subCategory') {
        comparison = (a.subCategory || '').localeCompare(b.subCategory || '');
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [filteredRecords, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: 'amount' | 'department' | 'subCategory') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    exportToCSV(
      sortedRecords.map(r => ({
        ID: r.id,
        Year: r.year,
        Category: r.category,
        Sub_Category: r.subCategory,
        Department: r.department || '',
        Demand_No: r.demandNo || '',
        Scheme_Name: r.scheme || '',
        Major_Head: r.majorHead || '',
        Description: r.majorHeadName || '',
        Type: r.type || '',
        Amount_Crore: r.amount,
        Unit: r.unit,
        Source_File: r.sourceFile,
        Source_Page: r.sourcePage,
        Notes: r.notes || '',
      })),
      `telangana_budget_${selectedYear}_master_records.csv`
    );
  };

  // Total amount of current filtered view
  const currentFilteredSum = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [filteredRecords]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Master Data Explorer & Records Registry
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Search, filter, inspect, and export all {allRecords.length} structured budget records with source document citations
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-900 rounded-lg hover:bg-brand-800 transition shadow-sm self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Filtered CSV ({filteredRecords.length})</span>
          </button>
        </div>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search across all fields: department, scheme, head, demand, keywords..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
            />
          </div>

          {/* Category Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubCategory('all'); setCurrentPage(1); }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900 text-slate-700 font-medium"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Primary Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedSubCategory}
              onChange={(e) => { setSelectedSubCategory(e.target.value); setCurrentPage(1); }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900 text-slate-700 font-medium"
            >
              {subCategories.map(sc => (
                <option key={sc} value={sc}>
                  {sc === 'all' ? 'All Sub-Categories' : sc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Strip & Quick Reset */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
          <div className="flex items-center space-x-3">
            <span>
              Matching Records: <strong className="text-slate-900 font-bold">{filteredRecords.length}</strong> of {allRecords.length}
            </span>
            <span>•</span>
            <span>
              Cumulative Sum: <strong className="text-brand-900 font-bold font-tabular">{formatCrore(currentFilteredSum)}</strong>
            </span>
          </div>

          {(searchTerm || selectedCategory !== 'all' || selectedSubCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setCurrentPage(1);
              }}
              className="text-brand-900 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Master Data Table */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Sub-Category</th>
                <th
                  onClick={() => handleSort('department')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span>Department / Entity</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Item / Description / Scheme</th>
                <th className="py-3 px-2">Head / Demand</th>
                <th
                  onClick={() => handleSort('amount')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Amount (₹ Cr)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Citation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {r.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium text-[11px]">
                      {r.subCategory}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">
                      {r.department || '—'}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {r.scheme || r.majorHeadName || 'General Item'}
                      </div>
                      {r.notes && (
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {r.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-2 font-mono text-slate-500 text-[11px]">
                      {r.demandNo ? `Demand ${r.demandNo}` : (r.majorHead || '—')}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900 font-tabular text-sm">
                      {formatCrore(r.amount)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className="inline-block text-[10px] font-mono text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded"
                        title={`${r.sourceFile} (Page ${r.sourcePage})`}
                      >
                        P.{r.sourcePage}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No budget records match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-slate-400 pl-2">
              Showing {(currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(currentPage * pageSize, sortedRecords.length)} of {sortedRecords.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
