// src/components/charts/WaterfallBudget.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCrore } from '@/utils/formatters';

interface WaterfallBudgetProps {
  height?: number;
}

export const WaterfallBudget: React.FC<WaterfallBudgetProps> = ({ height = 480 }) => {
  // Steps in budget fiscal bridge
  // 1. Revenue Receipts: +241,263.58
  // 2. Revenue Expenditure: -234,405.82 -> remaining +6,857.76
  // 3. Revenue Surplus: 6,857.76 (Subtotal)
  // 4. Capital Outlay: -47,267.28
  // 5. Net Loans/Advances: -18,049.19
  // 6. Fiscal Deficit: -58,458.71 (Subtotal)
  // 7. Borrowings & Debt: +58,458.71 -> Balance: Reconciled

  const categories = [
    'Revenue Receipts',
    'Revenue Expenditure',
    'Revenue Surplus',
    'Capital Outlay',
    'Net Lending / Loans',
    'Gross Fiscal Deficit',
    'Borrowings & Public Debt',
    'Consolidated Balance'
  ];

  // For waterfall: base (invisible bar) and delta (visible bar)
  // Cat 0: Revenue Receipts: Base 0, Value 241263.58 (Positive)
  // Cat 1: Revenue Exp: Base 6857.76, Value 234405.82 (Negative from 241263.58 down to 6857.76)
  // Cat 2: Revenue Surplus: Base 0, Value 6857.76 (Subtotal positive)
  // Cat 3: Capital Outlay: Base -40409.52 (relative to surplus), Value 47267.28
  // To avoid confusing negative bases in basic waterfall, let's present the fiscal balance bridge:
  const barData = [
    { name: 'Revenue Receipts', value: 241263.58, type: 'inflow', base: 0, color: '#12243C' },
    { name: 'Revenue Expenditure', value: 234405.82, type: 'outflow', base: 6857.76, color: '#1F4F89' },
    { name: 'Revenue Surplus', value: 6857.76, type: 'subtotal', base: 0, color: '#059669' },
    { name: 'Capital Outlay', value: 47267.28, type: 'outflow', base: 0, color: '#2764A9' },
    { name: 'Net Loans Disbursed', value: 18049.19, type: 'outflow', base: 0, color: '#619CD2' },
    { name: 'Gross Fiscal Deficit', value: 58458.71, type: 'deficit', base: 0, color: '#DC2626' },
    { name: 'Net Borrowings Mobilized', value: 58458.71, type: 'inflow', base: 0, color: '#12243C' },
    { name: 'Net Total Budget Outlay', value: 324234.00, type: 'total', base: 0, color: '#1C3A5F' },
  ];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        const item = barData[params[0].dataIndex];
        const valStr = formatCrore(item.value);
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">${item.type.toUpperCase()}</div>
          <div class="font-bold text-slate-900">${item.name}</div>
          <div class="mt-1 text-sm font-bold text-brand-900">${valStr}</div>
          <div class="text-[11px] text-slate-500 mt-1">
            ${item.type === 'subtotal' ? 'Receipts exceed operational expenses by +₹6,857.76 Cr' : ''}
            ${item.type === 'deficit' ? 'Borrowing requirement (2.98% of GSDP, well within FRBM 3.0%)' : ''}
            ${item.type === 'total' ? 'Net Annual Financial Statement Total' : ''}
          </div>
        </div>`;
      }
    },
    grid: {
      top: '8%',
      bottom: '18%',
      left: '4%',
      right: '4%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: barData.map(d => d.name),
      axisLabel: {
        interval: 0,
        rotate: 24,
        color: '#475569',
        fontSize: 11,
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
      axisLabel: {
        color: '#64748b',
        fontSize: 11,
        formatter: (val: number) => `₹${(val / 1000).toFixed(0)}k Cr`
      },
      splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
    },
    series: [
      {
        type: 'bar',
        barWidth: '42%',
        data: barData.map(d => ({
          value: d.value,
          itemStyle: {
            color: d.color,
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
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};
