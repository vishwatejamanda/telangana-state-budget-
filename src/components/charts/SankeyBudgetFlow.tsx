// src/components/charts/SankeyBudgetFlow.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCrore } from '@/utils/formatters';

interface SankeyBudgetFlowProps {
  height?: number;
}

export const SankeyBudgetFlow: React.FC<SankeyBudgetFlowProps> = ({ height = 500 }) => {
  const nodes = [
    // Source side (Receipts)
    { name: 'State Own Taxes (SOTR)', itemStyle: { color: '#12243C' } },
    { name: 'Non-Tax Revenue', itemStyle: { color: '#1F4F89' } },
    { name: 'Central Tax Devolution', itemStyle: { color: '#2764A9' } },
    { name: 'Grants-in-Aid', itemStyle: { color: '#3B7EC4' } },
    { name: 'Public Debt & Borrowings', itemStyle: { color: '#619CD2' } },

    // Middle node
    { name: 'Consolidated Fund of Telangana', itemStyle: { color: '#12243C' } },

    // Expenditure side
    { name: 'Social Services (Welfare, Health, Edu)', itemStyle: { color: '#1C3A5F' } },
    { name: 'Economic Services (Agri, Irrigation, Power)', itemStyle: { color: '#2764A9' } },
    { name: 'Capital Outlay (Asset Creation)', itemStyle: { color: '#059669' } },
    { name: 'General Administrative Services', itemStyle: { color: '#4E8FD5' } },
    { name: 'Debt Repayment & Loans', itemStyle: { color: '#7BAFD9' } },
  ];

  const links = [
    // Into Consolidated Fund
    { source: 'State Own Taxes (SOTR)', target: 'Consolidated Fund of Telangana', value: 159410.00 },
    { source: 'Non-Tax Revenue', target: 'Consolidated Fund of Telangana', value: 35518.73 },
    { source: 'Central Tax Devolution', target: 'Consolidated Fund of Telangana', value: 29886.72 },
    { source: 'Grants-in-Aid', target: 'Consolidated Fund of Telangana', value: 16448.13 },
    { source: 'Public Debt & Borrowings', target: 'Consolidated Fund of Telangana', value: 82970.42 },

    // Out of Consolidated Fund
    { source: 'Consolidated Fund of Telangana', target: 'Social Services (Welfare, Health, Edu)', value: 112374.00 },
    { source: 'Consolidated Fund of Telangana', target: 'Economic Services (Agri, Irrigation, Power)', value: 104238.00 },
    { source: 'Consolidated Fund of Telangana', target: 'Capital Outlay (Asset Creation)', value: 47267.00 },
    { source: 'Consolidated Fund of Telangana', target: 'General Administrative Services', value: 44895.00 },
    { source: 'Consolidated Fund of Telangana', target: 'Debt Repayment & Loans', value: 15460.00 },
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        if (params.dataType === 'edge') {
          const pct = ((params.value / 324234) * 100).toFixed(2);
          return `<div class="p-1 font-sans">
            <div class="text-[11px] text-slate-500 font-semibold mb-1">Flow Relationship</div>
            <div class="font-bold text-slate-900">${params.data.source} → ${params.data.target}</div>
            <div class="mt-1 flex items-baseline justify-between gap-4">
              <span class="text-sm font-bold text-brand-900">${formatCrore(params.value)}</span>
              <span class="text-xs text-slate-500 font-medium">${pct}% of Total Budget</span>
            </div>
          </div>`;
        }
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Budget Component</div>
          <div class="font-bold text-slate-900">${params.name}</div>
          <div class="text-xs text-slate-600 mt-1">${formatCrore(params.value || 324234)}</div>
        </div>`;
      }
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        nodeAlign: 'justify',
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            opacity: 0.7
          }
        },
        data: nodes,
        links: links,
        top: '5%',
        bottom: '5%',
        left: '2%',
        right: '18%',
        nodeWidth: 20,
        nodeGap: 16,
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.35
        },
        label: {
          position: 'right',
          color: '#1e293b',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          formatter: (params: any) => {
            return `{b|${params.name}}\n{v|${formatCrore(params.value || 324234, true, 0)}}`;
          },
          rich: {
            b: {
              fontWeight: 600,
              fontSize: 11,
              color: '#0f172a',
              lineHeight: 15
            },
            v: {
              fontSize: 10,
              color: '#64748b',
              fontWeight: 500,
              lineHeight: 14
            }
          }
        }
      }
    ]
  };

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};
