// src/pages/SectorsPage.tsx
import React, { useState } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { ChartCard } from '@/components/common/ChartCard';
import { KPICard } from '@/components/common/KPICard';
import { formatCrore, formatPercent } from '@/utils/formatters';
import ReactECharts from 'echarts-for-react';
import {
  Layers,
  Sprout,
  Waves,
  Users,
  GraduationCap,
  HeartPulse,
  Zap,
  Building2,
  Car,
  Home,
  Shield,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { useYear } from '@/context/YearContext';

export const SectorsPage: React.FC = () => {
  const { selectedYear } = useYear();
  const sectors = budgetDataService.getSectors(selectedYear);

  // Icon mapping
  const getIcon = (id: string) => {
    switch (id) {
      case 'agriculture-allied': return <Sprout className="w-5 h-5 text-emerald-700" />;
      case 'irrigation-water': return <Waves className="w-5 h-5 text-blue-700" />;
      case 'welfare-inclusion': return <Users className="w-5 h-5 text-indigo-700" />;
      case 'education-skills': return <GraduationCap className="w-5 h-5 text-amber-700" />;
      case 'rural-panchayat': return <Home className="w-5 h-5 text-brand-900" />;
      case 'energy-power': return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'urban-infrastructure': return <Building2 className="w-5 h-5 text-slate-700" />;
      case 'health-family-welfare': return <HeartPulse className="w-5 h-5 text-rose-700" />;
      case 'roads-transport': return <Car className="w-5 h-5 text-slate-700" />;
      case 'police-home': return <Shield className="w-5 h-5 text-slate-800" />;
      case 'industries-it': return <Briefcase className="w-5 h-5 text-teal-700" />;
      default: return <Layers className="w-5 h-5 text-slate-700" />;
    }
  };

  // Sector Share Donut Option
  const sectorDonutOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Broad Sector</div>
          <div class="font-bold text-slate-900">${params.name}</div>
          <div class="mt-1 flex items-baseline justify-between gap-4">
            <span class="text-sm font-bold text-brand-900">${formatCrore(params.value)}</span>
            <span class="text-xs text-slate-500 font-medium">${params.percent}% of Budget</span>
          </div>
        </div>`;
      }
    },
    legend: {
      orient: 'vertical',
      right: '2%',
      top: 'middle',
      icon: 'circle',
      textStyle: { color: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif' },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
        label: { show: false },
        data: sectors.map((sec, idx) => ({
          name: sec.name,
          value: sec.totalAllocationCrore,
          itemStyle: {
            color: [
              '#12243C', '#1C3A5F', '#1F4F89', '#2764A9', '#3B7EC4',
              '#4E8FD5', '#619CD2', '#7BAFD9', '#95BCE0', '#AECBE8',
              '#2E5B82', '#376E9D'
            ][idx % 12]
          }
        }))
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
              Sector-Wise Resource Allocation
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Visualizing the 12 priority sectors spanning welfare, agriculture, irrigation, human capital, and urban modernization
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-50 text-brand-900 border border-brand-200 self-start sm:self-auto">
            12 High-Level Sectors
          </span>
        </div>
      </div>

      {/* Sector Donut Visualizer */}
      <ChartCard
        id="sectors-distribution"
        title="Sectoral Share in State Budget 2026-27"
        subtitle="Distribution of total ₹3,24,234.00 crore outlay across developmental sectors"
        unit="₹ crore"
        sourceFile="1773983722_Volume_VI-Brief_1773983722_.pdf"
        sourcePage={18}
        tableData={sectors.map(s => ({
          Sector: s.name,
          Allocation: formatCrore(s.totalAllocationCrore),
          Share: `${s.sharePct}%`,
          Description: s.description,
        }))}
      >
        <ReactECharts option={sectorDonutOption} style={{ height: '420px', width: '100%' }} opts={{ renderer: 'canvas' }} />
      </ChartCard>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sec) => (
          <div
            key={sec.id}
            id={sec.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-brand-700 transition flex flex-col justify-between"
          >
            <div>
              {/* Header with Icon and Share */}
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  {getIcon(sec.id)}
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-brand-900 font-tabular">
                    {formatCrore(sec.totalAllocationCrore)}
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    {sec.sharePct}% of Total Budget
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {sec.name}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {sec.description}
              </p>

              {/* Key Schemes */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  Flagship Schemes:
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {sec.keySchemes.slice(0, 4).map((ks, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-brand-900 font-bold">•</span>
                      <span>{ks}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Department chips */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Departments Involved:
              </div>
              <div className="flex flex-wrap gap-1">
                {sec.departments.map((deptName, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    {deptName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
