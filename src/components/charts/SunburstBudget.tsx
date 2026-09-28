// src/components/charts/SunburstBudget.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCrore } from '@/utils/formatters';

interface SunburstBudgetProps {
  height?: number;
}

export const SunburstBudget: React.FC<SunburstBudgetProps> = ({ height = 540 }) => {
  const sunburstData = [
    {
      name: 'Pragathi Paddu\n(Schemes)',
      value: 184316,
      itemStyle: { color: '#12243C' },
      children: [
        {
          name: 'Agriculture & Allied',
          value: 24800,
          itemStyle: { color: '#1C3A5F' },
          children: [
            { name: 'Rythu Bharosa', value: 15000, itemStyle: { color: '#2764A9' } },
            { name: 'Crop Loan Waiver', value: 5000, itemStyle: { color: '#3B7EC4' } },
            { name: 'Farm Power & Allied', value: 4800, itemStyle: { color: '#4E8FD5' } },
          ]
        },
        {
          name: 'Panchayat & Rural',
          value: 29866,
          itemStyle: { color: '#1F4F89' },
          children: [
            { name: 'MGNREGS & Rural Works', value: 12000, itemStyle: { color: '#3B7EC4' } },
            { name: 'Panchayat Grants', value: 11000, itemStyle: { color: '#4E8FD5' } },
            { name: 'Rural Infra', value: 6866, itemStyle: { color: '#619CD2' } },
          ]
        },
        {
          name: 'Welfare Sectors',
          value: 28600,
          itemStyle: { color: '#2764A9' },
          children: [
            { name: 'SC Special Dev Fund', value: 14000, itemStyle: { color: '#4E8FD5' } },
            { name: 'BC & Minority Welfare', value: 8000, itemStyle: { color: '#619CD2' } },
            { name: 'ST Special Dev Fund', value: 6600, itemStyle: { color: '#7BAFD9' } },
          ]
        },
        {
          name: 'Irrigation Projects',
          value: 23450,
          itemStyle: { color: '#3B7EC4' },
          children: [
            { name: 'Major Lift Irrigation', value: 15000, itemStyle: { color: '#619CD2' } },
            { name: 'Medium & Minor Works', value: 8450, itemStyle: { color: '#7BAFD9' } },
          ]
        },
        {
          name: 'Energy & Power',
          value: 19200,
          itemStyle: { color: '#4E8FD5' },
          children: [
            { name: 'Free Agri Power', value: 11500, itemStyle: { color: '#7BAFD9' } },
            { name: 'Gruha Jyothi Subsidy', value: 2418, itemStyle: { color: '#95BCE0' } },
            { name: 'Discom Support', value: 5282, itemStyle: { color: '#AECBE8' } },
          ]
        },
        {
          name: 'Urban Development',
          value: 15400,
          itemStyle: { color: '#619CD2' },
          children: [
            { name: 'Hyderabad Metro & Infra', value: 6000, itemStyle: { color: '#95BCE0' } },
            { name: 'Musi Riverfront', value: 1500, itemStyle: { color: '#AECBE8' } },
            { name: 'Municipal Grants', value: 7900, itemStyle: { color: '#C2D9EE' } },
          ]
        },
        {
          name: 'Education & Health',
          value: 43000,
          itemStyle: { color: '#7BAFD9' },
          children: [
            { name: 'School Education & Infra', value: 18000, itemStyle: { color: '#AECBE8' } },
            { name: 'Arogyasri & Health Infra', value: 11000, itemStyle: { color: '#C2D9EE' } },
            { name: 'Higher & Tech Edu', value: 14000, itemStyle: { color: '#DCEBFA' } },
          ]
        }
      ]
    },
    {
      name: 'Nirvahana Paddu\n(Establishment)',
      value: 139918,
      itemStyle: { color: '#334155' },
      children: [
        {
          name: 'Salaries & Staff Wages',
          value: 49461,
          itemStyle: { color: '#475569' },
          children: [
            { name: 'School & Higher Edu Staff', value: 18500, itemStyle: { color: '#64748b' } },
            { name: 'Police & Law Enforcement', value: 10200, itemStyle: { color: '#94a3b8' } },
            { name: 'Health & Medical Staff', value: 7800, itemStyle: { color: '#cbd5e1' } },
            { name: 'General Administration', value: 12961, itemStyle: { color: '#e2e8f0' } },
          ]
        },
        {
          name: 'Public Debt Servicing',
          value: 44926,
          itemStyle: { color: '#64748b' },
          children: [
            { name: 'Interest Payments (Head 2049)', value: 26500, itemStyle: { color: '#94a3b8' } },
            { name: 'Principal Repayments', value: 18426, itemStyle: { color: '#cbd5e1' } },
          ]
        },
        {
          name: 'Pensions & Gratuities',
          value: 13110,
          itemStyle: { color: '#94a3b8' },
          children: [
            { name: 'Civil Pensions', value: 10500, itemStyle: { color: '#cbd5e1' } },
            { name: 'Gratuities & Commutations', value: 2610, itemStyle: { color: '#e2e8f0' } },
          ]
        },
        {
          name: 'Operations & Maintenance',
          value: 32421,
          itemStyle: { color: '#cbd5e1' },
          children: [
            { name: 'Office Ops & Utilities', value: 18000, itemStyle: { color: '#e2e8f0' } },
            { name: 'Maintenance of Assets', value: 14421, itemStyle: { color: '#f1f5f9' } },
          ]
        }
      ]
    }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        const pct = ((params.value / 324234) * 100).toFixed(2);
        return `<div class="p-1 font-sans">
          <div class="text-[11px] text-slate-500 font-semibold mb-0.5">Budget Segment</div>
          <div class="font-bold text-slate-900">${params.name.replace('\n', ' ')}</div>
          <div class="mt-1 flex items-baseline justify-between gap-4">
            <span class="text-sm font-bold text-brand-900">${formatCrore(params.value)}</span>
            <span class="text-xs text-slate-500 font-medium">${pct}% of Total Budget</span>
          </div>
        </div>`;
      }
    },
    series: {
      type: 'sunburst',
      data: sunburstData,
      radius: ['14%', '92%'],
      label: {
        rotate: 'radial',
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        formatter: (params: any) => {
          if (params.treeDepth === 1) {
            return params.name;
          }
          if (params.treeDepth === 2) {
            return params.name.length > 14 ? params.name.substring(0, 12) + '..' : params.name;
          }
          return params.name.length > 10 ? params.name.substring(0, 8) + '..' : params.name;
        }
      },
      itemStyle: {
        borderRadius: 3,
        borderColor: '#ffffff',
        borderWidth: 1.5,
      },
      levels: [
        {},
        {
          r0: '14%',
          r: '40%',
          itemStyle: { borderWidth: 2 },
          label: { rotate: 'tangential', fontSize: 11, fontWeight: 700 }
        },
        {
          r0: '40%',
          r: '70%',
          label: { align: 'center', fontSize: 10 }
        },
        {
          r0: '70%',
          r: '92%',
          label: { position: 'outside', padding: 3, silent: false, color: '#334155', fontSize: 9 },
          itemStyle: { borderWidth: 1 }
        }
      ]
    }
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
