// src/components/common/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, Landmark, CheckCircle2 } from 'lucide-react';
import { budgetDataService } from '@/services/budgetDataService';

interface NavbarProps {
  currentYear: string;
  onYearChange: (year: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentYear, onYearChange, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const location = useLocation();
  const availableYears = budgetDataService.getAvailableYears();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Overview', path: '/overview' },
    { name: 'Receipts', path: '/receipts' },
    { name: 'Expenditure', path: '/expenditure' },
    { name: 'Departments', path: '/departments' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Sectors', path: '/sectors' },
    { name: 'Compare', path: '/compare' },
    { name: 'Explore Data', path: '/explore' },
    { name: 'Data Notes', path: '/data-notes' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-subtle">
      {/* Top micro-bar for Government Transparency */}
      <div className="bg-brand-950 text-white text-[11px] font-medium py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Government of Telangana • Finance Department • Official Budget Portal</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-slate-300">
            <span>Presented on 20 March 2026</span>
            <span>•</span>
            <span className="text-emerald-300">Audited Reconciliation: 100% Match</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3 shrink-0">
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center text-white shadow-subtle group-hover:bg-brand-800 transition shrink-0">
                <Landmark className="w-5 h-5 text-amber-300" />
              </div>
              <div className="shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                    Telangana Budget
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-900 border border-brand-200 whitespace-nowrap">
                    {currentYear}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                  Annual Financial Statement & Demands for Grants
                </p>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive(link.path)
                    ? 'bg-brand-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls: Year Selector & Search */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none focus:ring-1 focus:ring-brand-500 shrink-0"
              title="Search schemes, departments, demands (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search budget...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-slate-500 bg-white border border-slate-200 rounded shadow-xs font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Year Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold text-brand-900 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition shadow-2xs"
              >
                <span>{currentYear}</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-700" />
              </button>

              {yearDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setYearDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-elevated py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Select Fiscal Year
                    </div>
                    {availableYears.map((y) => (
                      <button
                        key={y.year}
                        onClick={() => {
                          onYearChange(y.year);
                          setYearDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-slate-50 transition ${
                          currentYear === y.year ? 'text-brand-900 bg-brand-50/70 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{y.label}</div>
                          <div className="text-[10px] text-slate-400">Total: ₹3,24,234 Cr</div>
                        </div>
                        {currentYear === y.year && <CheckCircle2 className="w-4 h-4 text-brand-700" />}
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-2 pt-2 px-3 text-[11px] text-slate-500 leading-normal">
                      Future years (2025-26, 2024-25) will load automatically from <code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded font-mono">/src/data/&lt;year&gt;</code>.
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-1 pb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                    isActive(link.path)
                      ? 'bg-brand-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
