// src/components/charts/DepartmentTreemap.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { DepartmentAllocation } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';

interface DepartmentTreemapProps {
  departments: DepartmentAllocation[];
  height?: number;
}

export const DepartmentTreemap: React.FC<DepartmentTreemapProps> = ({
  departments,
  height = 540,
}) => {
  const navigate = useNavigate();

  // Color gradient palette for departments
  const colorPalette = [
    '#12243C', '#1C3A5F', '#1F4F89', '#2764A9', '#3B7EC4',
    '#4E8FD5', '#619CD2', '#7BAFD9', '#95BCE0', '#AECBE8',
    '#2E5B82', '#376E9D', '#4682B4', '#5C93C4', '#78A7D4'
  ];

  const treeData = departments.map((dept, idx) => ({
    name: dept.name,
    value: dept.grandTotalCrore,
    id: dept.id,
    rank: dept.rank,
    sharePct: dept.sharePct,
    establishmentCrore: dept.establishmentCrore,
    schemeCrore: dept.schemeCrore,
    minister: dept.minister,
    itemStyle: {
      color: colorPalette[idx % colorPalette.length],
      borderColor: '#ffffff',
      borderWidth: 2,
      gapWidth: 2,
    },
  }));

  const option = {
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#0f172a', fontSize: 12, fontFamily: 'Inter, sans-serif' },
      formatter: (params: any) => {
        const d = params.data;
        if (!d) return '';
        return `<div class="p-2 font-sans min-w-[220px]">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span class="font-bold text-brand-900">Rank #${d.rank}</span>
            <span>${d.sharePct}% of Budget</span>
          </div>
          <div class="font-bold text-slate-900 text-sm mb-1">${d.name}</div>
          <div class="text-xs text-slate-500 mb-2">Minister: ${d.minister}</div>
          <div class="pt-2 border-t border-slate-100 space-y-1">
            <div class="flex justify-between text-xs">
              <span class="text-slate-600 font-medium">Total Outlay:</span>
              <span class="font-bold text-slate-900">${formatCrore(d.value)}</span>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500">
              <span>Schemes (Pragathi):</span>
              <span>${formatCrore(d.schemeCrore)}</span>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500">
              <span>Establishment:</span>
              <span>${formatCrore(d.establishmentCrore)}</span>
            </div>
          </div>
          <div class="mt-2 text-[10px] text-brand-700 italic">Click tile to view department profile →</div>
        </div>`;
      }
    },
    series: [
      {
        type: 'treemap',
        data: treeData,
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        top: '2%',
        bottom: '2%',
        left: '2%',
        right: '2%',
        label: {
          show: true,
          formatter: (params: any) => {
            const d = params.data;
            if (!d) return params.name;
            return `{title|${d.name}}\n{val|${formatCrore(d.value, true, 0)}}  {pct|(${d.sharePct}%)}`;
          },
          rich: {
            title: {
              fontSize: 12,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 18,
            },
            val: {
              fontSize: 11,
              fontWeight: 600,
              color: '#f1f5f9',
              lineHeight: 16,
            },
            pct: {
              fontSize: 10,
              color: '#cbd5e1',
              lineHeight: 16,
            }
          }
        },
        upperLabel: { show: false },
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 2,
        },
        levels: [
          {
            itemStyle: {
              borderWidth: 2,
              borderColor: '#ffffff',
              gapWidth: 2
            }
          }
        ]
      }
    ]
  };

  const onChartClick = (params: any) => {
    if (params.data?.id) {
      navigate(`/departments/${params.data.id}`);
    }
  };

  return (
    <div className="w-full">
      <ReactECharts
        option={option}
        style={{ height: `${height}px`, width: '100%' }}
        onEvents={{ click: onChartClick }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};
