// src/components/common/GovernmentSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MinisterProfile } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { useYear } from '@/context/YearContext';
import { Award, ShieldCheck, ChevronRight, Landmark, Calendar, Sparkles } from 'lucide-react';

interface GovernmentSectionProps {
  ministers?: MinisterProfile[];
}

export const GovernmentSection: React.FC<GovernmentSectionProps> = ({ ministers: propMinisters }) => {
  const { selectedYear, setSelectedYear, yearInfo, isBRS, availableYears } = useYear();
  
  // Use prop ministers if provided, else get from current context
  const ministersList = propMinisters && propMinisters.length > 0 ? propMinisters : [];
  
  const cm = ministersList.find(m => m.role === 'Chief Minister');
  const fm = ministersList.find(m => 
    m.role.includes('Finance') || 
    m.id === 'harish-rao' || 
    m.id === 'bhatti-vikramarka' || 
    m.role.includes('Deputy Chief Minister')
  );
  const cabinetMinisters = ministersList.filter(m => m.id !== cm?.id && m.id !== fm?.id);

  // Fallback states for images
  const [cmImgError, setCmImgError] = useState(false);
  const [fmImgError, setFmImgError] = useState(false);

  // Reset image errors when year changes
  React.useEffect(() => {
    setCmImgError(false);
    setFmImgError(false);
  }, [selectedYear]);

  // Determine CM photo and FM photo
  const cmPhoto = cm?.photoUrl || (isBRS ? '/images/leaders/kcr.png' : '/images/leaders/revanth_reddy.jpg');
  const fmPhoto = fm?.photoUrl || (isBRS ? '/images/leaders/harish_rao.jpg' : '/images/leaders/bhatti_vikramarka.png');

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-card transition-all">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`p-2 rounded-xl text-white shadow-xs ${
              isBRS ? 'bg-pink-700' : 'bg-brand-900'
            }`}>
              <Award className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Executive Leadership & Council of Ministers
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Constitutional executive leadership and Ministers responsible for Demands for Grants in FY {selectedYear}.
              </p>
            </div>
          </div>
        </div>

        {/* Administration Era Badge & Verification */}
        <div className="flex flex-wrap items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 shadow-2xs ${
            isBRS 
              ? 'bg-pink-50 border-pink-300 text-pink-900' 
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isBRS ? 'bg-pink-600 animate-pulse' : 'bg-blue-600 animate-pulse'}`}></span>
            <span>{yearInfo.governmentTitle || (isBRS ? 'BRS Government (2014-2023)' : 'Congress Government (2023-Present)')}</span>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Volume IX Demands Verified</span>
          </div>
        </div>
      </div>

      {/* Fiscal Year Quick Filter Selector Bar */}
      <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 shrink-0">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Switch Fiscal Year:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {availableYears.map((y) => {
            const isYearBRS = y.rulingParty === 'BRS' || y.year.startsWith('2020') || y.year.startsWith('2021') || y.year.startsWith('2022') || y.year.startsWith('2023');
            const isSelected = selectedYear === y.year;

            return (
              <button
                key={y.year}
                onClick={() => setSelectedYear(y.year)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 border ${
                  isSelected
                    ? isYearBRS
                      ? 'bg-pink-700 text-white border-pink-700 shadow-xs'
                      : 'bg-brand-900 text-white border-brand-900 shadow-xs'
                    : isYearBRS
                      ? 'bg-pink-50/70 text-pink-900 border-pink-200 hover:bg-pink-100'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title={`${y.label} • ${isYearBRS ? 'BRS Government (KCR)' : 'Congress Government (Revanth Reddy)'}`}
              >
                <span>{y.year}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : isYearBRS ? 'bg-pink-200/80 text-pink-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {isYearBRS ? 'BRS' : 'INC'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Executive Leadership Duo (Chief Minister & Finance Minister) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chief Minister Card */}
        {cm && (
          <div className={`border rounded-2xl p-6 shadow-sm relative overflow-hidden transition ${
            isBRS 
              ? 'bg-gradient-to-br from-pink-50/80 via-white to-pink-50/30 border-pink-200 hover:border-pink-300' 
              : 'bg-gradient-to-br from-brand-50/70 via-white to-slate-50 border-brand-200 hover:border-brand-300'
          }`}>
            <div className={`absolute top-0 right-0 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs ${
              isBRS ? 'bg-pink-700' : 'bg-brand-900'
            }`}>
              Head of Government
            </div>

            <div className="flex items-start space-x-4">
              {/* Photo with fallback */}
              <div className="relative shrink-0">
                {!cmImgError && cmPhoto ? (
                  <img
                    src={cmPhoto}
                    alt={cm.name}
                    onError={() => setCmImgError(true)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-white shadow-md ring-2 ring-slate-200/80 bg-white"
                  />
                ) : (
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white shrink-0 ${
                    isBRS ? 'bg-pink-700' : 'bg-brand-900'
                  }`}>
                    {isBRS ? 'KCR' : 'ARR'}
                  </div>
                )}
                <span className={`absolute -bottom-1 -right-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs text-white ${
                  isBRS ? 'bg-pink-700' : 'bg-blue-700'
                }`}>
                  {isBRS ? 'BRS' : 'INC'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                  isBRS ? 'text-pink-800' : 'text-brand-800'
                }`}>
                  {cm.role}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5 leading-snug">
                  {cm.name}
                </h4>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 font-medium mt-1">
                  <span>Constituency: <strong className="text-slate-900">{cm.constituency}</strong></span>
                  <span>•</span>
                  <span className={`font-semibold ${isBRS ? 'text-pink-700' : 'text-blue-700'}`}>
                    {isBRS ? 'BRS Administration' : 'Congress Administration'}
                  </span>
                </div>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t ${isBRS ? 'border-pink-100' : 'border-brand-100'}`}>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Key Portfolios Held:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cm.portfolios.map((p, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Demands Under Charge:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {cm.demandsOverseen.join(', ')} ({formatCrore(cm.totalBudgetOverseenCrore)})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Finance Minister Card */}
        {fm && (
          <div className={`border rounded-2xl p-6 shadow-sm relative overflow-hidden transition ${
            isBRS 
              ? 'bg-gradient-to-br from-pink-50/80 via-white to-pink-50/30 border-pink-200 hover:border-pink-300' 
              : 'bg-gradient-to-br from-brand-50/70 via-white to-slate-50 border-brand-200 hover:border-brand-300'
          }`}>
            <div className={`absolute top-0 right-0 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs ${
              isBRS ? 'bg-pink-800' : 'bg-brand-800'
            }`}>
              Budget Presenter
            </div>

            <div className="flex items-start space-x-4">
              {/* Photo with fallback */}
              <div className="relative shrink-0">
                {!fmImgError && fmPhoto ? (
                  <img
                    src={fmPhoto}
                    alt={fm.name}
                    onError={() => setFmImgError(true)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-2 border-white shadow-md ring-2 ring-slate-200/80 bg-white"
                  />
                ) : (
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white shrink-0 ${
                    isBRS ? 'bg-pink-800' : 'bg-brand-800'
                  }`}>
                    {isBRS ? 'THR' : 'MBV'}
                  </div>
                )}
                <span className={`absolute -bottom-1 -right-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs text-white ${
                  isBRS ? 'bg-pink-700' : 'bg-blue-700'
                }`}>
                  {isBRS ? 'BRS' : 'INC'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                  isBRS ? 'text-pink-800' : 'text-brand-800'
                }`}>
                  {fm.role}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5 leading-snug">
                  {fm.name}
                </h4>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 font-medium mt-1">
                  <span>Constituency: <strong className="text-slate-900">{fm.constituency}</strong></span>
                  <span>•</span>
                  <span className={`font-semibold ${isBRS ? 'text-pink-700' : 'text-blue-700'}`}>
                    Presented {selectedYear} Budget
                  </span>
                </div>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t ${isBRS ? 'border-pink-100' : 'border-brand-100'}`}>
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Key Portfolios Held:
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {fm.portfolios.map((p, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Demands Under Charge:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {fm.demandsOverseen.join(', ')} ({formatCrore(fm.totalBudgetOverseenCrore)})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cabinet Ministers Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            All Cabinet Ministers & Portfolios ({cabinetMinisters.length} Ministers in FY {selectedYear})
          </h4>
          <span className="text-[11px] font-medium text-slate-400">
            {isBRS ? 'BRS Cabinet' : 'Congress Cabinet'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cabinetMinisters.map((minister) => {
            const initials = minister.name
              .split(' ')
              .filter(w => !['Sri', 'Smt.', 'Dr.', 'Hon\'ble'].includes(w))
              .map(n => n[0])
              .slice(0, 2)
              .join('');

            const hasPhoto = Boolean(minister.photoUrl);

            return (
              <div
                key={minister.id}
                className={`bg-white border rounded-xl p-4 hover:shadow-card transition flex flex-col justify-between ${
                  isBRS 
                    ? 'border-slate-200 hover:border-pink-300' 
                    : 'border-slate-200 hover:border-brand-300'
                }`}
              >
                <div>
                  <div className="flex items-start space-x-3">
                    {hasPhoto ? (
                      <img
                        src={minister.photoUrl}
                        alt={minister.name}
                        className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200 shrink-0 shadow-xs"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs border shrink-0 ${
                        isBRS 
                          ? 'bg-pink-50 text-pink-900 border-pink-200' 
                          : 'bg-slate-100 text-brand-900 border-slate-200'
                      }`}>
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">
                        {minister.name}
                      </h5>
                      <span className="text-[11px] text-slate-500 block truncate">
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
                      className={`font-semibold hover:underline flex items-center space-x-0.5 ${
                        isBRS ? 'text-pink-700' : 'text-brand-700'
                      }`}
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
