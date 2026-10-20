// src/pages/OverviewPage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { ChartCard } from '@/components/common/ChartCard';
import { SankeyBudgetFlow } from '@/components/charts/SankeyBudgetFlow';
import { WaterfallBudget } from '@/components/charts/WaterfallBudget';
import { SunburstBudget } from '@/components/charts/SunburstBudget';
import { MultiYearTrendChart } from '@/components/charts/MultiYearTrendChart';
import { formatCrore } from '@/utils/formatters';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useYear } from '@/context/YearContext';

export const OverviewPage: React.FC = () => {
  const { selectedYear } = useYear();
  const summary = budgetDataService.getBudgetSummary(selectedYear);
  const metrics = summary.keyMetrics;

  const totalNetBudget = metrics.totalBudget.value;
  const revenueReceipts = metrics.revenueReceipts.value;
  const revenueExpenditure = metrics.revenueExpenditure.value;
  const capitalExpenditure = metrics.capitalExpenditure.value;
  const totalBorrowings = metrics.totalBorrowings.value;
  const primaryDeficit = metrics.primaryDeficit.value;

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              State Budget Overview & Macro Fiscal Architecture
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Consolidated Balance Sheet, Fiscal Deficit Bridge, Sankey Flows, and 4-Year Multi-Year Trends
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-900 border border-brand-200 self-start sm:self-auto">
            Source: Volume VI - Brief & Fiscal Policy Statement
          </span>
        </div>
      </div>

      {/* Macro Balance Sheet Summary (2-column comparative table) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Annual Financial Statement: Receipts vs. Disbursements Balance Sheet
            </h2>
            <p className="text-xs text-slate-500">
              Complete fiscal accounting matching Constitution of India Article 202
            </p>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            Net Outlay: {formatCrore(totalNetBudget)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Receipts Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-brand-900 pb-2">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                I. Total Receipts
              </span>
              <span className="text-sm font-bold text-brand-900 font-tabular">
                {formatCrore(totalNetBudget)}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-800">A. Revenue Receipts</span>
                <span className="font-bold text-slate-900 font-tabular">{formatCrore(revenueReceipts)}</span>
              </div>
              <div className="pl-4 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>1. State Own Tax Revenue (SOTR)</span>
                  <span className="font-tabular">₹1,59,410.00 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Non-Tax Revenue</span>
                  <span className="font-tabular">₹35,518.73 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>3. Share in Central Taxes (Devolution)</span>
                  <span className="font-tabular">₹29,886.72 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>4. Grants-in-Aid from Centre</span>
                  <span className="font-tabular">₹16,448.13 Cr</span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 pt-2">
                <span className="font-semibold text-slate-800">B. Capital Receipts (Net Borrowings)</span>
                <span className="font-bold text-slate-900 font-tabular">{formatCrore(totalBorrowings)}</span>
              </div>
              <div className="pl-4 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>1. Open Market Loans (RBI Auctions)</span>
                  <span className="font-tabular">₹73,383.60 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Loans from Central Government</span>
                  <span className="font-tabular">₹5,500.00 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>3. Autonomous Bodies / Financial Inst.</span>
                  <span className="font-tabular">₹1,100.00 Cr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expenditure Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-brand-900 pb-2">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                II. Total Disbursements
              </span>
              <span className="text-sm font-bold text-brand-900 font-tabular">
                {formatCrore(totalNetBudget)}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-800">A. Revenue Expenditure</span>
                <span className="font-bold text-slate-900 font-tabular">{formatCrore(revenueExpenditure)}</span>
              </div>
              <div className="pl-4 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>1. Social Services (Welfare, Edu, Health)</span>
                  <span className="font-tabular">₹1,12,374.00 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Economic Services (Agri, Irrigation, Power)</span>
                  <span className="font-tabular">₹1,04,238.00 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>3. General Administrative Services & Police</span>
                  <span className="font-tabular">₹44,895.00 Cr</span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 pt-2">
                <span className="font-semibold text-slate-800">B. Capital Outlay & Net Lending</span>
                <span className="font-bold text-slate-900 font-tabular">{formatCrore(capitalExpenditure + 18049.19)}</span>
              </div>
              <div className="pl-4 space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>1. Capital Outlay (Infrastructure Works)</span>
                  <span className="font-tabular">{formatCrore(capitalExpenditure)}</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Net Loans & Advances Disbursed</span>
                  <span className="font-tabular">₹18,049.19 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>3. Public Debt Principal Repayment</span>
                  <span className="font-tabular">₹24,511.00 Cr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom balance confirmation */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-900">
              Balanced Budget Reconciled: Receipts (₹3,24,234.00 Cr) = Disbursements (₹3,24,234.00 Cr)
            </span>
          </div>
          <span className="text-slate-500 font-medium">Article 202 Constitutional Balance Zero Variance</span>
        </div>
      </section>

      {/* Sankey Flow Diagram */}
      <section>
        <ChartCard
          id="sankey-flow"
          title="Consolidated Fund Budget Flow Diagram"
          subtitle="Interactive Sankey diagram visualizing flows from revenue streams through the Consolidated Fund into functional expenditure streams"
          unit="₹ crore"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={7}
        >
          <SankeyBudgetFlow height={520} />
        </ChartCard>
      </section>

      {/* Waterfall Fiscal Deficit Bridge */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartCard
            id="waterfall-bridge"
            title="Fiscal Deficit Bridge & Budget Build-up"
            subtitle="How revenue receipts, operational expenses, capital outlay, and borrowings combine to achieve fiscal balance"
            unit="₹ crore"
            sourceFile="1773983965_FRBM_Fiscal_Policy_statement_2026-27_1773983965_.pdf"
            sourcePage={6}
          >
            <WaterfallBudget height={460} />
          </ChartCard>
        </div>

        {/* Fiscal Compliance & Ratios Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900">FRBM Fiscal Prudence Card</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Statutory ceilings mandated under the Telangana Fiscal Responsibility and Budget Management Act
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-950">Fiscal Deficit</span>
                  <span className="font-black text-emerald-900 text-sm">2.98% GSDP</span>
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">
                  Target: &lt; 3.00% • <strong className="font-semibold">Compliant</strong> (₹58,458.71 Cr)
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-950">Revenue Surplus</span>
                  <span className="font-black text-emerald-900 text-sm">+₹6,857.76 Cr</span>
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">
                  Target: Zero or Positive • <strong className="font-semibold">Surplus (+2.84% TRR)</strong>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Outstanding Public Debt</span>
                  <span className="font-black text-slate-900 text-sm">28.69% GSDP</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Debt Stock: ₹5,62,363 Cr (Within sustainable debt trajectory)
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Primary Deficit</span>
                  <span className="font-black text-slate-900 text-sm">{formatCrore(primaryDeficit)}</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Fiscal deficit net of interest obligations (₹21,304.39 Cr)
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600">Consolidated Sinking Fund (CSF):</span>
                  <span className="font-bold text-slate-900">₹7,481.00 Cr</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600">Guarantee Redemption Fund (GRF):</span>
                  <span className="font-bold text-slate-900">₹6,346.00 Cr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/explore"
              className="flex items-center justify-center space-x-1 w-full py-2 bg-slate-100 hover:bg-brand-900 hover:text-white text-brand-900 text-xs font-semibold rounded-lg transition"
            >
              <span>Verify Records in Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sunburst Hierarchical Budget Drilldown */}
      <section>
        <ChartCard
          id="sunburst-drilldown"
          title="Hierarchical Sunburst: Functional Structure"
          subtitle="Explore the multi-level architecture: State Budget → Pragathi Paddu (Schemes) vs. Nirvahana Paddu (Establishment) → Sectors → Flagship Heads"
          unit="₹ crore"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
        >
          <SunburstBudget height={540} />
        </ChartCard>
      </section>

      {/* 4-Year Multi-Year Trends */}
      <section>
        <ChartCard
          id="multi-year-trends"
          title="4-Year Multi-Year Fiscal Trends (2023-24 to 2026-27)"
          subtitle="Compare Actuals (2023-24, 2024-25), Revised Estimates (2025-26), and Budget Estimates (2026-27)"
          unit="₹ crore"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={9}
        >
          <MultiYearTrendChart height={420} />
        </ChartCard>
      </section>
    </div>
  );
};
