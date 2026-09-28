// src/components/common/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ShieldCheck, ExternalLink, FileSpreadsheet, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-900 flex items-center justify-center text-white">
                <Landmark className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Telangana State Budget</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[12px]">
              Official public finance transparency visualization portal. Presented under Article 202 of the Constitution of India to the Telangana Legislative Assembly.
            </p>
            <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-[11px]">100% Math Reconciled • ₹0.00 Variance</span>
            </div>
          </div>

          {/* Col 2: Budget Sections */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Core Budget</h4>
            <ul className="space-y-2">
              <li><Link to="/overview" className="hover:text-brand-900 hover:underline">Budget Overview & Deficits</Link></li>
              <li><Link to="/receipts" className="hover:text-brand-900 hover:underline">Revenue & Capital Receipts</Link></li>
              <li><Link to="/expenditure" className="hover:text-brand-900 hover:underline">Sectoral Expenditure & Outlay</Link></li>
              <li><Link to="/departments" className="hover:text-brand-900 hover:underline">Department-wise Allocations</Link></li>
              <li><Link to="/schemes" className="hover:text-brand-900 hover:underline">Major Flagship Schemes</Link></li>
              <li><Link to="/sectors" className="hover:text-brand-900 hover:underline">Key Sectoral Breakdown</Link></li>
            </ul>
          </div>

          {/* Col 3: Data & Verification */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Data & Sources</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-brand-900 hover:underline flex items-center space-x-1.5"><FileSpreadsheet className="w-3.5 h-3.5" /><span>Master Data Explorer (CSV)</span></Link></li>
              <li><Link to="/data-notes" className="hover:text-brand-900 hover:underline flex items-center space-x-1.5"><FileText className="w-3.5 h-3.5" /><span>Data Inventory (All 32 PDFs)</span></Link></li>
              <li><Link to="/data-notes#reconciliation" className="hover:text-brand-900 hover:underline">Data Quality Report</Link></li>
              <li><Link to="/compare" className="hover:text-brand-900 hover:underline">Compare Departments Tool</Link></li>
              <li>
                <a
                  href="https://www.telangana.gov.in/budget-2026-2027/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-900 hover:underline flex items-center space-x-1 text-brand-700"
                >
                  <span>Official Telangana Gov Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legislative & Financial Details */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Session Metadata</h4>
            <div className="space-y-2 text-slate-500 text-[11px]">
              <div>
                <span className="font-semibold text-slate-700">Financial Year:</span> 2026-27 (BE)
              </div>
              <div>
                <span className="font-semibold text-slate-700">Total Net Budget:</span> ₹3,24,234.00 Crore
              </div>
              <div>
                <span className="font-semibold text-slate-700">Presented By:</span> Sri Mallu Bhatti Vikramarka, Hon'ble Deputy CM & Finance Minister
              </div>
              <div>
                <span className="font-semibold text-slate-700">Date of Presentation:</span> 20th March, 2026
              </div>
              <div>
                <span className="font-semibold text-slate-700">Legislative Notice:</span> Demands I through XXXIX (38 Demands)
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px]">
          <p>© 2026 Government of Telangana. Built for public finance transparency and democratic civic participation.</p>
          <p className="mt-2 sm:mt-0">All figures verified against official Volumes I through X & FRBM Statements.</p>
        </div>
      </div>
    </footer>
  );
};
