// src/components/common/GovernmentSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MinisterProfile } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { User, Award, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

interface GovernmentSectionProps {
  ministers: MinisterProfile[];
}

export const GovernmentSection: React.FC<GovernmentSectionProps> = ({ ministers }) => {
  const cm = ministers.find(m => m.role === 'Chief Minister');
  const dcm = ministers.find(m => m.role === 'Deputy Chief Minister & Finance Minister' || m.role.includes('Deputy Chief Minister'));
  const cabinetMinisters = ministers.filter(m => m.id !== cm?.id && m.id !== dcm?.id);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-card">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-900 border border-brand-200">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Executive Leadership & Council of Ministers
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ministers responsible for moving Demands for Grants and stewarding departmental outlays.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified against Budget Notice 2026-27 & Volume IX</span>
        </div>
      </div>

      {/* Leadership Duo (CM & Deputy CM) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chief Minister Card */}
        {cm && (
          <div className="bg-gradient-to-br from-brand-50/70 via-white to-slate-50 border border-brand-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
              Head of Government
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-900 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white flex-shrink-0">
                AR
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">
                  {cm.role}
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
                  {cm.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Constituency: <span className="text-slate-800 font-semibold">{cm.constituency}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-100">
              <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Key Portfolios Held:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cm.portfolios.map((p, i) => (
                  <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-brand-100 text-xs">
                <span className="text-slate-500">Demands Under Charge:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {cm.demandsOverseen.join(', ')} ({formatCrore(cm.totalBudgetOverseenCrore)})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Deputy Chief Minister Card */}
        {dcm && (
          <div className="bg-gradient-to-br from-brand-50/70 via-white to-slate-50 border border-brand-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
              Budget Presenter
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-800 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white flex-shrink-0">
                BV
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider">
                  {dcm.role}
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
                  {dcm.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Constituency: <span className="text-slate-800 font-semibold">{dcm.constituency}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-100">
              <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                Key Portfolios Held:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {dcm.portfolios.map((p, i) => (
                  <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200 shadow-2xs">
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-brand-100 text-xs">
                <span className="text-slate-500">Demands Under Charge:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {dcm.demandsOverseen.join(', ')} ({formatCrore(dcm.totalBudgetOverseenCrore)})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cabinet Ministers Grid */}
      <div className="mt-8">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          All Cabinet Ministers & Respective Demands ({cabinetMinisters.length} Ministers)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cabinetMinisters.map((minister) => {
            const initials = minister.name
              .split(' ')
              .filter(w => w !== 'Sri' && w !== 'Smt.' && w !== 'Dr.')
              .map(n => n[0])
              .slice(0, 2)
              .join('');

            return (
              <div
                key={minister.id}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-brand-900 flex items-center justify-center font-bold text-sm border border-slate-200 flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">
                        {minister.name}
                      </h5>
                      <span className="text-[11px] text-slate-500">
                        {minister.constituency}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[11px] text-slate-600 font-medium line-clamp-2">
                      {minister.portfolios.join('; ')}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    Demands: <span className="font-mono text-slate-700 font-bold">{minister.demandsOverseen.join(', ')}</span>
                  </span>
                  {minister.departmentIds && minister.departmentIds.length > 0 && (
                    <Link
                      to={`/departments/${minister.departmentIds[0]}`}
                      className="text-brand-700 font-semibold hover:underline flex items-center space-x-0.5"
                    >
                      <span>View Dept</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
