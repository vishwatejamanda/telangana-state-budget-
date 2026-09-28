// src/components/common/SearchModal.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Building2, Layers, BookOpen, ArrowRight } from 'lucide-react';
import { budgetDataService } from '@/services/budgetDataService';
import { formatCrore } from '@/utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  year?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, year = '2026-27' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(budgetDataService.searchGlobal(query, year));
    } else {
      setResults([]);
    }
  }, [query, year]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (link: string) => {
    onClose();
    navigate(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schemes (e.g. Rythu Bharosa), departments, demands..."
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {query.trim().length < 2 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Type at least 2 characters to search across schemes, departments, demands, and sectors.
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">Rythu Bharosa</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">Irrigation</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">Education</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">Demand IX</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleSelect(res.link)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/70 border border-transparent hover:border-brand-200 cursor-pointer transition group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-brand-100 flex items-center justify-center text-slate-600 group-hover:text-brand-900 transition">
                      {res.type === 'Department' && <Building2 className="w-4 h-4" />}
                      {res.type === 'Scheme' && <Layers className="w-4 h-4" />}
                      {res.type === 'Demand' && <BookOpen className="w-4 h-4" />}
                      {res.type === 'Sector' && <Layers className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-brand-950">
                          {res.title}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {res.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {res.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {res.amountCrore !== undefined && (
                      <span className="text-xs font-bold text-slate-900 font-tabular">
                        {formatCrore(res.amountCrore)}
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-700 transition" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Navigate with click or arrow keys</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
