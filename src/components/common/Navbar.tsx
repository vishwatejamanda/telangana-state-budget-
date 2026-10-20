// src/components/common/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, Landmark, CheckCircle2 } from 'lucide-react';
import { budgetDataService } from '@/services/budgetDataService';
import { formatCrore } from '@/utils/formatters';

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
  const currentInfo = budgetDataService.getYearInfo(currentYear);
  const isBRS = currentInfo.rulingParty === 'BRS' || currentYear.startsWith('2020') || currentYear.startsWith('2021') || currentYear.startsWith('2022') || currentYear.startsWith('2023');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Overview', path: '/overview' },
    { name: 'TGSRTC Transit', path: '/transit', badge: 'Timings' },
    { name: 'Water Bodies Map', path: '/water-bodies', badge: 'Map' },
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

  const congressYears = availableYears.filter(y => y.rulingParty === 'INC' || y.year.startsWith('2024') || y.year.startsWith('2025') || y.year.startsWith('2026'));
  const brsYears = availableYears.filter(y => y.rulingParty === 'BRS' || y.year.startsWith('2020') || y.year.startsWith('2021') || y.year.startsWith('2022') || y.year.startsWith('2023'));

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-subtle">
      {/* Top micro-bar for Government Transparency */}
      <div className={`text-white text-[11px] font-medium py-1 px-4 sm:px-8 transition-colors ${
        isBRS ? 'bg-slate-900 border-b border-pink-900/50' : 'bg-brand-950'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isBRS ? 'bg-pink-400' : 'bg-emerald-400'}`}></span>
            <span>
              Government of Telangana • Finance Department • {currentInfo.governmentTitle || (isBRS ? 'BRS Government' : 'Congress Government')}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-slate-300">
            <span>{currentInfo.presentationDate || 'Presented in Assembly'}</span>
            <span>•</span>
            <span className="text-slate-200">
              CM: <strong className="text-white">{currentInfo.chiefMinister || (isBRS ? 'Sri K. Chandrashekar Rao' : 'Sri A. Revanth Reddy')}</strong>
            </span>
            <span>•</span>
            <span className="text-emerald-300">Audited State Records</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3 shrink-0">
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-subtle transition shrink-0 ${
                isBRS ? 'bg-pink-700 group-hover:bg-pink-800' : 'bg-brand-900 group-hover:bg-brand-800'
              }`}>
                <Landmark className="w-5 h-5 text-amber-300" />
              </div>
              <div className="shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                    Telangana Budget
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                    isBRS 
                      ? 'bg-pink-50 text-pink-900 border-pink-200' 
                      : 'bg-brand-50 text-brand-900 border-brand-200'
                  }`}>
                    {currentYear}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block ${
                    isBRS 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {isBRS ? 'BRS' : 'INC'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
                  Annual Financial Statement & Demands for Grants (2020 to 2027)
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
                className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition inline-flex items-center ${
                  isActive(link.path)
                    ? isBRS ? 'bg-pink-700 text-white shadow-xs' : 'bg-brand-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className={`ml-1 text-[9px] px-1 py-0.2 rounded font-extrabold ${
                    isActive(link.path)
                      ? 'bg-amber-300 text-slate-900'
                      : 'bg-brand-100 text-brand-900'
                  }`}>
                    {link.badge}
                  </span>
                )}
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
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition shadow-2xs border ${
                  isBRS 
                    ? 'text-pink-900 bg-pink-50 hover:bg-pink-100 border-pink-300' 
                    : 'text-brand-900 bg-brand-50 hover:bg-brand-100 border-brand-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isBRS ? 'bg-pink-500' : 'bg-blue-600'}`}></span>
                <span>{currentYear}</span>
                <span className="text-[10px] px-1 py-0.2 rounded font-extrabold bg-white/70">
                  {isBRS ? 'BRS' : 'INC'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {yearDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setYearDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Select Fiscal Year
                      </span>
                      <span className="text-[10px] text-slate-400">8 Official Budgets</span>
                    </div>

                    {/* Section 1: Congress Administration */}
                    <div className="pt-2">
                      <div className="px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50/70 flex items-center justify-between">
                        <span>Congress (INC) Era (2023 - Present)</span>
                        <span className="text-[9px] font-semibold text-blue-600">CM: A. Revanth Reddy</span>
                      </div>
                      {congressYears.map((y) => (
                        <button
                          key={y.year}
                          onClick={() => {
                            onYearChange(y.year);
                            setYearDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left hover:bg-blue-50/50 transition border-l-2 ${
                            currentYear === y.year 
                              ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-950' 
                              : 'border-transparent text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold">{y.year}</span>
                              {y.isCurrent && (
                                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Total: <span className="font-semibold text-slate-800">{formatCrore(y.totalBudget)}</span>
                            </div>
                          </div>
                          {currentYear === y.year && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    {/* Section 2: BRS Administration */}
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <div className="px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-pink-800 bg-pink-50/70 flex items-center justify-between">
                        <span>BRS (TRS) Era (2014 - 2023)</span>
                        <span className="text-[9px] font-semibold text-pink-600">CM: KCR • FM: Harish Rao</span>
                      </div>
                      {brsYears.map((y) => (
                        <button
                          key={y.year}
                          onClick={() => {
                            onYearChange(y.year);
                            setYearDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left hover:bg-pink-50/50 transition border-l-2 ${
                            currentYear === y.year 
                              ? 'border-pink-600 bg-pink-50/80 font-bold text-pink-950' 
                              : 'border-transparent text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold">{y.year}</span>
                              <span className="text-[9px] bg-pink-100 text-pink-800 font-semibold px-1.5 py-0.2 rounded">
                                BRS
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Total: <span className="font-semibold text-slate-800">{formatCrore(y.totalBudget)}</span>
                            </div>
                          </div>
                          {currentYear === y.year && <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 mt-2 pt-2 px-4 pb-1 text-[11px] text-slate-400 text-center">
                      Official Data Source: Telangana IFMIS Portal
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
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                    isActive(link.path)
                      ? isBRS ? 'bg-pink-700 text-white' : 'bg-brand-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded font-extrabold bg-amber-400 text-slate-900">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
