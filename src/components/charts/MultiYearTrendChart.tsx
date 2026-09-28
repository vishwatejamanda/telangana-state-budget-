// src/components/charts/MultiYearTrendChart.tsx
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCrore } from '@/utils/formatters';

interface MultiYearTrendChartProps {
  height?: number;
}

export const MultiYearTrendChart: React.FC<MultiYearTrendChartProps> = ({ height = 400 }) => {
  const [activeSeries, setActiveSeries] = useState<'receipts' | 'expenditure' | 'debt'>('receipts');

  const years = ['2023-24 (Actuals)', '2024-25 (Actuals)', '2025-26 (RE)', '2026-27 (BE)'];

  // Data sets from Volume VI - Brief
  const receiptsData = {
    sotr: [111956.84, 126950.45, 140410.00, 159410.00],
    nonTax: [25390.12, 28140.20, 32150.00, 35518.73],
    centralShare: [18697.80, 22180.50, 26450.00, 29886.72],
    grants: [9850.40, 11200.10, 14200.00, 16448.13],
    total: [165895.16, 188471.25, 213210.00, 241263.58],
  };

  const expData = {
    social: [68450.20, 78920.40, 92450.00, 112374.00],
    economic: [62110.10, 71400.30, 84300.00, 104238.00],
    general: [28900.50, 32100.20, 38100.00, 44895.00],
    capital: [28450.00, 32180.00, 36470.00, 47267.28],
    total: [187910.80, 214600.90, 251320.00, 308774.28],
  };

  const debtData = {
    openMarket: [314546, 357637, 409328, 462926],
    totalDebt: [398655, 447493, 503905, 562363],
    pctGSDP: [27.0, 28.0, 28.3, 28.69],
  };

  let seriesConfig: any[] = [];
  let yAxisConfig: any = {
    type: 'value',
    name: '₹ Crore',
    nameTextStyle: { color: '#64748b', fontSize: 11, padding: [0, 0, 0, 20] },
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
      formatter: (v: number) => `₹${(v / 1000).toFixed(0)}k Cr`
    },
    splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
  };

  if (activeSeries === 'receipts') {
    seriesConfig = [
      {
        name: 'State Own Taxes (SOTR)',
        type: 'line',
        smooth: true,
        data: receiptsData.sotr,
        itemStyle: { color: '#12243C' },
        lineStyle: { width: 3 },
        symbolSize: 7,
      },
      {
        name: 'Non-Tax Revenue',
        type: 'line',
        smooth: true,
        data: receiptsData.nonTax,
        itemStyle: { color: '#2764A9' },
        lineStyle: { width: 2.5 },
        symbolSize: 6,
      },
      {
        name: 'Central Share of Taxes',
        type: 'line',
        smooth: true,
        data: receiptsData.centralShare,
        itemStyle: { color: '#4E8FD5' },
        lineStyle: { width: 2.5 },
        symbolSize: 6,
      },
      {
        name: 'Grants-in-Aid',
        type: 'line',
        smooth: true,
        data: receiptsData.grants,
        itemStyle: { color: '#7BAFD9' },
        lineStyle: { width: 2 },
        symbolSize: 6,
      },
      {
        name: 'Total Revenue Receipts',
        type: 'line',
        smooth: true,
        data: receiptsData.total,
        itemStyle: { color: '#059669' },
        lineStyle: { width: 3.5, type: 'dashed' },
        symbolSize: 8,
      }
    ];
  } else if (activeSeries === 'expenditure') {
    seriesConfig = [
      {
        name: 'Social Services',
        type: 'line',
        smooth: true,
        data: expData.social,
        itemStyle: { color: '#12243C' },
        lineStyle: { width: 3 },
        symbolSize: 7,
      },
      {
        name: 'Economic Services',
        type: 'line',
        smooth: true,
        data: expData.economic,
        itemStyle: { color: '#2764A9' },
        lineStyle: { width: 2.5 },
        symbolSize: 6,
      },
      {
        name: 'Capital Outlay (Asset Creation)',
        type: 'line',
        smooth: true,
        data: expData.capital,
        itemStyle: { color: '#059669' },
        lineStyle: { width: 3 },
        symbolSize: 7,
      },
      {
        name: 'General Services',
        type: 'line',
        smooth: true,
        data: expData.general,
        itemStyle: { color: '#64748b' },
        lineStyle: { width: 2 },
        symbolSize: 6,
      }
    ];
  } else {
    // Debt & % GSDP with dual axis
    yAxisConfig = [
      {
        type: 'value',
        name: 'Debt (₹ Cr)',
        nameTextStyle: { color: '#64748b', fontSize: 11, padding: [0, 0, 0, 20] },
        axisLabel: {
          color: '#64748b',
          fontSize: 11,
          formatter: (v: number) => `₹${(v / 1000).toFixed(0)}k Cr`
        },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
      },
      {
        type: 'value',
        name: '% of GSDP',
        min: 24,
        max: 32,
        axisLabel: { color: '#64748b', fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false },
      }
    ];

    seriesConfig = [
      {
        name: 'Total Outstanding Public Debt',
        type: 'bar',
        barWidth: '38%',
        data: debtData.totalDebt,
        itemStyle: { color: '#1F4F89', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: 'Open Market Loans',
        type: 'bar',
        barWidth: '38%',
        data: debtData.openMarket,
        itemStyle: { color: '#7BAFD9', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: 'Debt as % of GSDP',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: debtData.pctGSDP,
        itemStyle: { color: '#DC2626' },
        lineStyle: { width: 3 },
        symbolSize: 8,
      }
    ];
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        let tip = `<div class="p-1 font-sans">
          <div class="font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1.5">${params[0].axisValue}</div>`;
        for (const item of params) {
          const val = typeof item.value === 'number' && item.value < 100 ? `${item.value}%` : formatCrore(item.value);
          tip += `<div class="flex items-center justify-between text-xs py-0.5 gap-4">
            <span class="flex items-center gap-1.5 text-slate-600">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.color}"></span>
              ${item.seriesName}:
            </span>
            <span class="font-bold text-slate-900">${val}</span>
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
    grid: {
      top: '10%',
      bottom: '16%',
      left: '4%',
      right: '6%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: { color: '#475569', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600 },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisTick: { show: false },
    },
    yAxis: yAxisConfig,
    series: seriesConfig,
  };

  return (
    <div className="w-full">
      {/* Series Selector Buttons */}
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={() => setActiveSeries('receipts')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeSeries === 'receipts'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Revenue Receipts (4-Yr Trend)
        </button>
        <button
          onClick={() => setActiveSeries('expenditure')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeSeries === 'expenditure'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Expenditure Streams (4-Yr Trend)
        </button>
        <button
          onClick={() => setActiveSeries('debt')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            activeSeries === 'debt'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Public Debt & GSDP %
        </button>
      </div>

      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};
