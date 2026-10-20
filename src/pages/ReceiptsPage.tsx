// src/pages/ReceiptsPage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { useYear } from '@/context/YearContext';
import { ChartCard } from '@/components/common/ChartCard';
import { KPICard } from '@/components/common/KPICard';
import { formatCrore, formatPercent, exportToCSV } from '@/utils/formatters';
import ReactECharts from 'echarts-for-react';
import { Download, Search, Coins, Layers, ArrowUpRight, Filter } from 'lucide-react';

export const ReceiptsPage: React.FC = () => {
  const { selectedYear } = useYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sotr' | 'central' | 'nonTax' | 'capital'>('all');

  const receipts = budgetDataService.getReceiptsBreakdown(selectedYear);
  const rev = receipts.revenueReceipts;
  const cap = receipts.capitalReceipts;

  // Flatten all items for unified search and table
  const allItems = [
    ...rev.stateOwnTaxes.items.map((i: any) => ({ ...i, stream: 'State Own Taxes (SOTR)', color: '#12243C' })),
    ...rev.centralShare.items.map((i: any) => ({ ...i, stream: 'Central Tax Devolution', color: '#1F4F89' })),
    ...rev.nonTaxRevenue.items.map((i: any) => ({ ...i, stream: 'Non-Tax Revenue', color: '#2764A9' })),
    ...rev.grantsInAid.items.map((i: any) => ({ ...i, stream: 'Grants-in-Aid', color: '#4E8FD5' })),
    ...cap.items.map((i: any) => ({ ...i, stream: 'Capital Receipts (Borrowings)', color: '#619CD2' })),
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.head.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'sotr') return item.stream === 'State Own Taxes (SOTR)';
    if (activeTab === 'central') return item.stream === 'Central Tax Devolution';
    if (activeTab === 'nonTax') return item.stream === 'Non-Tax Revenue';
    if (activeTab === 'capital') return item.stream === 'Capital Receipts (Borrowings)';
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV(
      filteredItems.map(item => ({
        Major_Head: item.head,
        Receipt_Name: item.name,
        Receipt_Stream: item.stream,
        Amount_Crore: item.amount,
        Share_Percentage: item.sharePct,
      })),
      `telangana_budget_${selectedYear}_receipts.csv`
    );
  };

  // SOTR Bar Chart Option
  const sotrChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        const item = rev.stateOwnTaxes.items[params[0].dataIndex];
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Head ${item.head}</div>
          <div class="font-bold text-slate-900">${item.name}</div>
          <div class="mt-1 flex items-baseline justify-between gap-4">
            <span class="text-sm font-bold text-brand-900">${formatCrore(item.amount)}</span>
            <span class="text-xs text-slate-500 font-medium">${item.sharePct}% of SOTR</span>
          </div>
        </div>`;
      }
    },
    grid: { top: '6%', bottom: '26%', left: '4%', right: '4%', containLabel: true },
    xAxis: {
      type: 'category',
      data: rev.stateOwnTaxes.items.map((i: any) => i.name.split(' (')[0]),
      axisLabel: {
        interval: 0,
        rotate: 24,
        color: '#475569',
        fontSize: 10,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
      },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '₹ Crore',
      nameTextStyle: { color: '#64748b', fontSize: 11, padding: [0, 0, 0, 20] },
      axisLabel: { color: '#64748b', fontSize: 11, formatter: (v: number) => `₹${(v / 1000).toFixed(0)}k Cr` },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    series: [
      {
        type: 'bar',
        barWidth: '40%',
        data: rev.stateOwnTaxes.items.map((i: any, idx: number) => ({
          value: i.amount,
          itemStyle: {
            color: ['#12243C', '#1C3A5F', '#1F4F89', '#2764A9', '#3B7EC4', '#4E8FD5', '#619CD2'][idx % 7],
            borderRadius: [4, 4, 0, 0],
          }
        })),
        label: {
          show: true,
          position: 'top',
          color: '#334155',
          fontSize: 10,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          formatter: (params: any) => formatCrore(params.value, true, 0),
        }
      }
    ]
  };

  // Receipts Composition Donut Chart
  const compositionDonutOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Revenue Pillar</div>
          <div class="font-bold text-slate-900">${params.name}</div>
          <div class="mt-1 flex items-baseline justify-between gap-4">
            <span class="text-sm font-bold text-brand-900">${formatCrore(params.value)}</span>
            <span class="text-xs text-slate-500 font-medium">${params.percent}%</span>
          </div>
        </div>`;
      }
    },
    legend: {
      bottom: '2%',
      left: 'center',
      icon: 'circle',
      textStyle: { color: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif' },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '72%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
        label: { show: false },
        data: [
          { value: rev.stateOwnTaxes.total, name: 'State Own Taxes (SOTR)', itemStyle: { color: '#12243C' } },
          { value: rev.nonTaxRevenue.total, name: 'Non-Tax Revenue', itemStyle: { color: '#1F4F89' } },
          { value: rev.centralShare.total, name: 'Central Tax Share', itemStyle: { color: '#2764A9' } },
          { value: rev.grantsInAid.total, name: 'Grants-in-Aid', itemStyle: { color: '#4E8FD5' } },
          { value: cap.total, name: 'Borrowings & Capital Receipts', itemStyle: { color: '#7BAFD9' } },
        ]
      }
    ]
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              State Receipts & Revenue Architecture
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Detailed breakdown of State Own Taxes, Non-Tax Revenue, Central Transfers, and Capital Receipts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-brand-900 bg-white border border-brand-300 rounded-lg hover:bg-brand-50 transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Receipts CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="State Own Taxes (SOTR)"
          value={rev.stateOwnTaxes.total}
          unit="₹ crore"
          description="SGST, VAT, Excise, Stamps & Transport"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
          trend={{ label: '61.4% of TRR', direction: 'up' }}
        />
        <KPICard
          title="Non-Tax Revenue"
          value={rev.nonTaxRevenue.total}
          unit="₹ crore"
          description="Land regularization, mining royalties, user fees"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
        />
        <KPICard
          title="Central Tax Devolution"
          value={rev.centralShare.total}
          unit="₹ crore"
          description="State share in divisible pool of Union taxes"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
        />
        <KPICard
          title="Grants-in-Aid"
          value={rev.grantsInAid.total}
          unit="₹ crore"
          description="CSS transfers & Finance Commission grants"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
        />
        <KPICard
          title="Capital Receipts & Debt"
          value={cap.total}
          unit="₹ crore"
          description="Market borrowings & central project loans"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
          signal="warning"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOTR Bar Chart */}
        <div className="lg:col-span-7">
          <ChartCard
            id="sotr-breakdown"
            title="State Own Tax Revenue (SOTR) by Head"
            subtitle="Major state tax pillars generating ₹1,48,185.75 crore"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={5}
          >
            <ReactECharts option={sotrChartOption} style={{ height: '380px', width: '100%' }} opts={{ renderer: 'canvas' }} />
          </ChartCard>
        </div>

        {/* Total Composition Donut */}
        <div className="lg:col-span-5">
          <ChartCard
            id="receipts-composition"
            title="Receipts Composition: Own vs. Central vs. Borrowings"
            subtitle="The share of each revenue stream in total state resources"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={8}
          >
            <ReactECharts option={compositionDonutOption} style={{ height: '380px', width: '100%' }} opts={{ renderer: 'canvas' }} />
          </ChartCard>
        </div>
      </div>

      {/* Comprehensive Receipts Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Master Receipts Registry: Major Head Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredItems.length} heads extracted from Volume VI and Statement of Receipts
            </p>
          </div>

          {/* Filter tabs and search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search head or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900 w-48"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded font-medium transition ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('sotr')}
                className={`px-2.5 py-1 rounded font-medium transition ${activeTab === 'sotr' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                SOTR
              </button>
              <button
                onClick={() => setActiveTab('central')}
                className={`px-2.5 py-1 rounded font-medium transition ${activeTab === 'central' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Central
              </button>
              <button
                onClick={() => setActiveTab('nonTax')}
                className={`px-2.5 py-1 rounded font-medium transition ${activeTab === 'nonTax' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Non-Tax
              </button>
              <button
                onClick={() => setActiveTab('capital')}
                className={`px-2.5 py-1 rounded font-medium transition ${activeTab === 'capital' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Borrowings
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Major Head</th>
                <th className="py-2.5 px-3">Classification & Receipt Description</th>
                <th className="py-2.5 px-3">Revenue Stream</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Share of Stream</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredItems.map((item, idx) => (
                <tr key={`${item.head}-${idx}`} className="hover:bg-slate-50 transition">
                  <td className="py-2 px-3 font-mono font-bold text-slate-700">{item.head}</td>
                  <td className="py-2 px-3 font-medium text-slate-900">{item.name}</td>
                  <td className="py-2 px-3 text-slate-500">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {item.stream}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900 font-tabular">
                    {formatCrore(item.amount)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-slate-500 font-tabular">
                    {formatPercent(item.sharePct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
