// src/pages/ExpenditurePage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { useYear } from '@/context/YearContext';
import { ChartCard } from '@/components/common/ChartCard';
import { KPICard } from '@/components/common/KPICard';
import { formatCrore, formatPercent, exportToCSV } from '@/utils/formatters';
import ReactECharts from 'echarts-for-react';
import { Download, Search, Layers, PieChart, Building, Briefcase } from 'lucide-react';

export const ExpenditurePage: React.FC = () => {
  const { selectedYear } = useYear();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<'all' | 'social' | 'economic' | 'general' | 'capital'>('all');

  const expenditure = budgetDataService.getExpenditureBreakdown(selectedYear);
  const byType = expenditure.byType;
  const byPlan = expenditure.byPlanMechanism;
  const services = expenditure.revenueByService;

  // Flatten subsectors
  const allSubsectors = [
    ...services.socialServices.subSectors.map((s: any) => ({
      ...s,
      serviceGroup: 'Social Services',
      shareOfService: ((s.amount / services.socialServices.total) * 100).toFixed(1),
    })),
    ...services.economicServices.subSectors.map((s: any) => ({
      ...s,
      serviceGroup: 'Economic Services',
      shareOfService: ((s.amount / services.economicServices.total) * 100).toFixed(1),
    })),
    ...services.generalServices.subSectors.map((s: any) => ({
      ...s,
      serviceGroup: 'General Services',
      shareOfService: ((s.amount / services.generalServices.total) * 100).toFixed(1),
    })),
  ];

  const filteredSubsectors = allSubsectors.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.majorHeads && s.majorHeads.some((h: string) => h.includes(searchTerm)));
    if (!matchesSearch) return false;
    if (selectedService === 'social') return s.serviceGroup === 'Social Services';
    if (selectedService === 'economic') return s.serviceGroup === 'Economic Services';
    if (selectedService === 'general') return s.serviceGroup === 'General Services';
    return true;
  });

  const handleExportCSV = () => {
    exportToCSV(
      filteredSubsectors.map(s => ({
        Service_Group: s.serviceGroup,
        Sub_Sector_Name: s.name,
        Amount_Crore: s.amount,
        Major_Heads: s.majorHeads ? s.majorHeads.join(', ') : '',
      })),
      `telangana_budget_${selectedYear}_expenditure.csv`
    );
  };

  // Stacked Service Bars Option
  const serviceDistributionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        let tip = `<div class="p-1 font-sans"><div class="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5">${params[0].axisValue}</div>`;
        for (const item of params) {
          tip += `<div class="flex items-center justify-between text-xs py-0.5 gap-4">
            <span class="flex items-center gap-1.5 text-slate-600">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.color}"></span>
              ${item.seriesName}:
            </span>
            <span class="font-bold text-slate-900">${formatCrore(item.value)}</span>
          </div>`;
        }
        tip += '</div>';
        return tip;
      }
    },
    legend: {
      bottom: '0%',
      icon: 'circle',
      textStyle: { color: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif' },
    },
    grid: { top: '8%', bottom: '16%', left: '4%', right: '4%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Social Services', 'Economic Services', 'General Services', 'Capital Outlay'],
      axisLabel: { color: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600 },
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
        name: 'Pragathi Paddu (Schemes & Development)',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        data: [78000, 58000, 1050, 47267.28],
        itemStyle: { color: '#12243C' },
      },
      {
        name: 'Nirvahana Paddu (Establishment & Salaries)',
        type: 'bar',
        stack: 'total',
        barWidth: '40%',
        data: [28039.2, 16450.47, 52856.06, 0],
        itemStyle: { color: '#7BAFD9', borderRadius: [4, 4, 0, 0] },
      }
    ]
  };

  // Capital Outlay by Department Bar Option
  const capOutlayList = expenditure.capitalOutlayByDepartment || [];
  const capOutlayOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        const item = capOutlayList[params[0].dataIndex];
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Capital Asset Creation</div>
          <div class="font-bold text-slate-900">${item.department}</div>
          <div class="mt-1 flex items-baseline justify-between gap-4">
            <span class="text-sm font-bold text-brand-900">${formatCrore(item.amount)}</span>
            <span class="text-xs text-slate-500 font-medium">${item.sharePct}% of Capital Outlay</span>
          </div>
        </div>`;
      }
    },
    grid: { top: '6%', bottom: '24%', left: '4%', right: '4%', containLabel: true },
    xAxis: {
      type: 'category',
      data: capOutlayList.map((d: any) => d.department.replace(' Department', '')),
      axisLabel: {
        interval: 0,
        rotate: 22,
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
        data: capOutlayList.map((d: any, idx: number) => ({
          value: d.amount,
          itemStyle: {
            color: ['#059669', '#10B981', '#12243C', '#1F4F89', '#2764A9', '#4E8FD5', '#619CD2'][idx % 7],
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

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              State Expenditure & Investment Architecture
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Pragathi Paddu (Schemes) vs. Nirvahana Paddu (Establishment), Service Classification, and Capital Outlays
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-brand-900 bg-white border border-brand-300 rounded-lg hover:bg-brand-50 transition shadow-sm self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Expenditure CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Expenditure"
          value={expenditure.totalExpenditure}
          unit="₹ crore"
          description="Net State Budget Outlay voted + charged"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
        />
        <KPICard
          title="Pragathi Paddu (Schemes)"
          value={byPlan.schemeExpenditure}
          unit="₹ crore"
          description="56.85% of total budget dedicated to development schemes"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
          trend={{ label: '56.85% Share', direction: 'up' }}
        />
        <KPICard
          title="Nirvahana Paddu (Establishment)"
          value={byPlan.establishmentExpenditure}
          unit="₹ crore"
          description="43.15% for salaries, pensions, office ops, debt interest"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={18}
        />
        <KPICard
          title="Capital Outlay (Asset Works)"
          value={byType.capitalExpenditure}
          unit="₹ crore"
          description="+29.6% surge in infrastructure & physical asset creation"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={5}
          signal="positive"
          trend={{ label: '+29.6% Increase', direction: 'up' }}
        />
        <KPICard
          title="Debt Servicing (Interest)"
          value={expenditure.byDevelopmentClassification.debtServicesInterest}
          unit="₹ crore"
          description="Statutory interest obligations on FRBM state debt stock"
          sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
          sourcePage={10}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Service Split Stacked Bar */}
        <div className="lg:col-span-6">
          <ChartCard
            id="service-distribution"
            title="Functional Services by Pragathi vs. Nirvahana Split"
            subtitle="How development schemes and establishment are divided across functional sectors"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={18}
          >
            <ReactECharts option={serviceDistributionOption} style={{ height: '380px', width: '100%' }} opts={{ renderer: 'canvas' }} />
          </ChartCard>
        </div>

        {/* Capital Outlay Bar */}
        <div className="lg:col-span-6">
          <ChartCard
            id="capital-outlay-dept"
            title="Capital Outlay by Priority Department"
            subtitle="Major departments creating lasting physical and social infrastructure (₹47,267.28 Cr)"
            unit="₹ crore"
            sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
            sourcePage={20}
          >
            <ReactECharts option={capOutlayOption} style={{ height: '380px', width: '100%' }} opts={{ renderer: 'canvas' }} />
          </ChartCard>
        </div>
      </div>

      {/* Subsectors Master Table */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Detailed Functional Sector Expenditure Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredSubsectors.length} sectors with corresponding major accounting heads
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search subsector or major head..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900 w-52"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSelectedService('all')}
                className={`px-2.5 py-1 rounded font-medium transition ${selectedService === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All Services
              </button>
              <button
                onClick={() => setSelectedService('social')}
                className={`px-2.5 py-1 rounded font-medium transition ${selectedService === 'social' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Social (45.2%)
              </button>
              <button
                onClick={() => setSelectedService('economic')}
                className={`px-2.5 py-1 rounded font-medium transition ${selectedService === 'economic' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Economic (31.8%)
              </button>
              <button
                onClick={() => setSelectedService('general')}
                className={`px-2.5 py-1 rounded font-medium transition ${selectedService === 'general' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                General (23.0%)
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Service Group</th>
                <th className="py-2.5 px-3">Functional Subsector & Purpose</th>
                <th className="py-2.5 px-3">Major Heads</th>
                <th className="py-2.5 px-3 text-right">Outlay</th>
                <th className="py-2.5 px-3 text-right">Share of Group</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredSubsectors.map((item, idx) => (
                <tr key={`${item.name}-${idx}`} className="hover:bg-slate-50 transition">
                  <td className="py-2 px-3 font-semibold text-slate-700">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 text-brand-900 border border-brand-200">
                      {item.serviceGroup}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-900">{item.name}</td>
                  <td className="py-2 px-3 font-mono text-[11px] text-slate-500">
                    {item.majorHeads ? item.majorHeads.join(', ') : 'Various'}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-slate-900 font-tabular">
                    {formatCrore(item.amount)}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-slate-500 font-tabular">
                    {item.shareOfService}%
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
