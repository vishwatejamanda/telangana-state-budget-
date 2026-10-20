// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { budgetDataService } from '@/services/budgetDataService';
import { useYear } from '@/context/YearContext';
import { KPICard } from '@/components/common/KPICard';
import { ChartCard } from '@/components/common/ChartCard';
import { RupeeBreakdown } from '@/components/charts/RupeeBreakdown';
import { TopDepartmentsBar } from '@/components/charts/TopDepartmentsBar';
import { GovernmentSection } from '@/components/common/GovernmentSection';
import { formatCrore } from '@/utils/formatters';
import {
  TrendingUp,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Award,
  Bus,
  Waves,
  Clock,
  MapPin,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { selectedYear, yearInfo, isBRS } = useYear();
  const summary = budgetDataService.getBudgetSummary(selectedYear);
  const departments = budgetDataService.getDepartments(selectedYear);
  const ministers = budgetDataService.getGovernmentProfiles(selectedYear).ministers;
  const metrics = summary.keyMetrics;

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Hero Header */}
      <section className="bg-white border-b border-slate-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isBRS 
                  ? 'bg-pink-50 text-pink-800 border-pink-200' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                <CheckCircle2 className={`w-3.5 h-3.5 mr-1 ${isBRS ? 'text-pink-600' : 'text-emerald-600'}`} />
                {yearInfo.presentationDate ? `Presented in Assembly • ${yearInfo.presentationDate}` : 'Officially Presented'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Government of Telangana • {isBRS ? 'BRS Government' : 'Congress Government'}
              </span>
            </div>

            {/* Fiscal Period Status Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-slate-500">Fiscal Period:</span>
              <span className={`px-3 py-1 font-bold text-xs border rounded-lg shadow-2xs ${
                isBRS 
                  ? 'bg-pink-50 text-pink-900 border-pink-300' 
                  : 'bg-brand-50 text-brand-900 border-brand-200'
              }`}>
                FY {selectedYear} ({summary.status || 'Budget Estimates'})
              </span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight">
              Telangana State Budget {selectedYear}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              An authoritative, official public intelligence portal visualizing the state’s{' '}
              <strong className="text-slate-900 font-semibold">{formatCrore(metrics.totalBudget.value)}</strong> budget
              under the <span className={`font-semibold ${isBRS ? 'text-pink-700' : 'text-blue-700'}`}>
                {yearInfo.governmentTitle || (isBRS ? 'BRS Administration' : 'Congress Administration')}
              </span>, empowering citizens, researchers, and policymakers with complete fiscal clarity.
            </p>
          </div>

          {/* Quick Stat Pill Highlights */}
          <div className="mt-6 flex flex-wrap gap-2.5 pt-4 border-t border-slate-100 text-xs">
            <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Revenue Surplus: <strong className="text-slate-900 font-bold">{formatCrore(metrics.revenueDeficitSurplus.value)}</strong>
            </span>
            <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-800"></span>
              Fiscal Deficit: <strong className="text-slate-900 font-bold">{formatCrore(metrics.fiscalDeficit.value)}</strong>
            </span>
            <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Capital Outlay: <strong className="text-slate-900 font-bold">{formatCrore(metrics.capitalExpenditure.value)}</strong>
            </span>
            <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Total Receipts: <strong className="text-slate-900 font-bold">{formatCrore(metrics.revenueReceipts.value)}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* New Featured OpenData Explorers: TGSRTC Transit & Water Bodies Map */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TGSRTC Transit Explorer Banner */}
        <Link
          to="/transit"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-7 shadow-lg border border-slate-800 hover:border-brand-500 transition duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                <Bus className="w-3.5 h-3.5 mr-1" />
                TGSRTC GTFS Timetables
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                51,980+ Daily Trips
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-amber-300 transition">
              Hyderabad & TGSRTC Bus Routes, Stops & Timings
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Explore 4,130+ bus routes across Hyderabad Metropolitan & Telangana. View high-frequency departures,
              detailed stop-by-stop arrival timings with modern interactive timeline cards.
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-amber-200">
            <span>Explore Bus Schedules & Trajectories</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Water Bodies Map Explorer Banner */}
        <Link
          to="/water-bodies"
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-cyan-950 to-slate-900 text-white p-6 sm:p-7 shadow-lg border border-sky-900 hover:border-cyan-500 transition duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950">
                <Waves className="w-3.5 h-3.5 mr-1" />
                GeoJSON Map Explorer
              </span>
              <span className="text-xs text-cyan-300 font-mono font-bold">
                37,770+ Water Bodies
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-cyan-300 transition">
              Telangana & Hyderabad Water Bodies Map
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Interactive Leaflet geospatial explorer visualizing 1,365 Greater Hyderabad lakes (Hussain Sagar, Osman Sagar, etc.)
              and 37,770+ statewide reservoirs with custom GeoJSON file upload support.
            </p>
          </div>

          <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
            <span>Open Interactive Water Bodies Map</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </section>

      {/* Hero Metrics (8 KPI Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Primary Fiscal Indicators</span>
              <span className="text-xs font-normal text-slate-500">(Summary Statement Figures)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Verified against Volume VI - Brief & Budget Speech (Rs. in crore)
            </p>
          </div>
          <Link
            to="/overview"
            className="text-xs font-semibold text-brand-900 hover:text-brand-700 flex items-center space-x-1"
          >
            <span>Full Balance Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total State Budget Outlay"
            value={metrics.totalBudget.value}
            unit="₹ crore"
            description="Net Annual Financial Statement outlay voted by Legislature + Charged"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
            trend={{ label: 'FY 2026-27 BE', direction: 'neutral' }}
          />

          <KPICard
            title="Total Revenue Receipts"
            value={metrics.revenueReceipts.value}
            unit="₹ crore"
            description="State Own Taxes + Non-tax + Central Devolution + Grants"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
            trend={{ label: '+13.1% YoY', direction: 'up' }}
          />

          <KPICard
            title="Total Expenditure"
            value={metrics.totalExpenditure.value}
            unit="₹ crore"
            description="Revenue Expenditure (₹2,34,406 Cr) + Capital Outlay (₹47,267 Cr) + Net Loans"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
            trend={{ label: 'Pragathi + Nirvahana', direction: 'neutral' }}
          />

          <KPICard
            title="Revenue Surplus (+)"
            value={metrics.revenueDeficitSurplus.value}
            unit="₹ crore"
            description={`Revenues exceed operational expenditure by ${formatCrore(metrics.revenueDeficitSurplus.value)}`}
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
            signal="positive"
            trend={{ label: '+2.84% of TRR', direction: 'up' }}
          />

          <KPICard
            title="Revenue Expenditure"
            value={metrics.revenueExpenditure.value}
            unit="₹ crore"
            description="Salaries, pensions, welfare subsidies, maintenance, and debt servicing"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
          />

          <KPICard
            title="Capital Expenditure (Outlay)"
            value={metrics.capitalExpenditure.value}
            unit="₹ crore"
            description="Asset creation in roads, irrigation, metro, hospitals, and schools"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
            trend={{ label: '+29.6% Increase', direction: 'up' }}
          />

          <KPICard
            title="Gross Fiscal Deficit"
            value={metrics.fiscalDeficit.value}
            unit="₹ crore"
            description={`${metrics.fiscalDeficit.pctOfGSDP}% of GSDP (Strictly below FRBM 3.00% ceiling)`}
            sourceFile="1773983965_FRBM_Fiscal_Policy_statement_2026-27_1773983965_.pdf"
            sourcePage={6}
            signal="warning"
            trend={{ label: '2.98% GSDP', direction: 'neutral' }}
          />

          <KPICard
            title="Outstanding Public Debt"
            value={metrics.outstandingDebt.value}
            unit="₹ crore"
            description={`${metrics.outstandingDebt.pctOfGSDP}% of GSDP (FRBM debt stock)`}
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={11}
            signal="warning"
            trend={{ label: '28.69% GSDP', direction: 'neutral' }}
          />
        </div>
      </section>

      {/* What Every Citizen Should Know Strip (8 key cards) */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-900" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                What Every Citizen Should Know
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              The fundamental facts, statutory ceilings, and headline priorities of Telangana’s 2026-27 budget
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 self-start sm:self-auto">
            8 Key Highlights
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.citizenKeyTakeaways.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-700 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <div className="text-xl font-black text-brand-900 font-tabular mt-1">
                  {item.value}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rupee Breakdown & Top 10 Departments Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rupee Breakdown (7 cols) */}
        <div className="lg:col-span-7">
          <ChartCard
            id="rupee-breakdown"
            title="How Each Rupee is Earned & Spent"
            subtitle="The 100-paise breakdown of state receipts and expenditures"
            unit="paise per ₹1"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={8}
            tableData={[
              ...summary.rupeeComesFrom.map((r) => ({
                Stream: 'Receipt (Comes From)',
                Item: r.name,
                Paise: `${r.paisa}p`,
                Amount: formatCrore(r.amount),
              })),
              ...summary.rupeeGoesTo.map((r) => ({
                Stream: 'Expenditure (Goes To)',
                Item: r.name,
                Paise: `${r.paisa}p`,
                Amount: formatCrore(r.amount),
              })),
            ]}
          >
            <RupeeBreakdown
              comesFrom={summary.rupeeComesFrom}
              goesTo={summary.rupeeGoesTo}
            />
          </ChartCard>
        </div>

        {/* Top 10 Departments Bar Chart (5 cols) */}
        <div className="lg:col-span-5">
          <ChartCard
            id="top-departments"
            title="Top 10 Departments by Allocation"
            subtitle="Departments receiving the largest shares of the state budget"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={18}
            tableData={departments.slice(0, 10).map((d) => ({
              Rank: `#${d.rank}`,
              Department: d.name,
              Allocation: formatCrore(d.grandTotalCrore),
              Share: `${d.sharePct}%`,
              Establishment: formatCrore(d.establishmentCrore),
              Schemes: formatCrore(d.schemeCrore),
            }))}
          >
            <TopDepartmentsBar departments={departments} limit={10} />
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Showing top 10 of 30 departments</span>
              <Link
                to="/departments"
                className="font-bold text-brand-900 hover:text-brand-700 flex items-center space-x-1"
              >
                <span>View All 30 Departments</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ChartCard>
        </div>
      </section>

      {/* Council of Ministers Section */}
      <section>
        <GovernmentSection ministers={ministers} />
      </section>

      {/* Clear Navigation Cards to Sections */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Explore All Budget Dimensions
          </h2>
          <p className="text-xs text-slate-500">
            Dedicated deep-dive modules for every volume, table, and grant
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/overview"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Budget Overview & Flows
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sankey diagrams, waterfall fiscal deficit bridge, and macro economic balance sheets.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>View Overview</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/receipts"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                State Revenue & Receipts
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                State own taxes (SGST, excise, stamps), central devolution, non-tax revenue, and public debt.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Analyze Receipts</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/expenditure"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Expenditure Architecture
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Revenue vs capital, Pragathi Paddu (schemes) vs Nirvahana Paddu (establishment), and debt services.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Explore Outlays</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/departments"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                30 Secretariat Departments
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Rankings, establishment vs scheme splits, capital works, demand mapping, and individual profile pages.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>View Departments</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/schemes"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Flagship Schemes Directory
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Filter and search all 57+ flagship programs, Six Guarantees, SCSDF, and STSDF outlays.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Browse Schemes</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/compare"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Compare Departments
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Side-by-side comparative benchmarking of departmental outlays, expenditure splits, and schemes.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Launch Comparator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/explore"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Master Data Explorer & CSV
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Query, filter, and export the entire database of 238+ extracted budget records with citations.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Explore Master Records</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/data-notes"
            className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-900 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-900 mb-3 group-hover:bg-brand-900 group-hover:text-white transition">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-900 transition">
                Data Inventory & Audit Notes
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Full inventory of all 32 PDF source documents, reconciliation audit, and methodology.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-900">
              <span>Read Audit Report</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
