// src/components/charts/TopDepartmentsBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { DepartmentAllocation } from '@/types/budget';
import { formatCrore } from '@/utils/formatters';
import { ArrowUpRight } from 'lucide-react';

interface TopDepartmentsBarProps {
  departments: DepartmentAllocation[];
  limit?: number;
}

export const TopDepartmentsBar: React.FC<TopDepartmentsBarProps> = ({
  departments,
  limit = 10,
}) => {
  const topList = departments.slice(0, limit);
  const maxVal = Math.max(...topList.map(d => d.grandTotalCrore));

  // Tints for top departments
  const colors = [
    '#12243C', // 1
    '#1C3A5F', // 2
    '#1F4F89', // 3
    '#2764A9', // 4
    '#3B7EC4', // 5
    '#4E8FD5', // 6
    '#619CD2', // 7
    '#7BAFD9', // 8
    '#95BCE0', // 9
    '#AECBE8', // 10
  ];

  return (
    <div className="space-y-3.5">
      {topList.map((dept, index) => {
        const widthPct = (dept.grandTotalCrore / maxVal) * 100;
        const barColor = colors[index % colors.length];

        return (
          <Link
            key={dept.id}
            to={`/departments/${dept.id}`}
            className="block group p-2.5 -mx-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-5 text-[11px] font-bold text-slate-400 group-hover:text-brand-900">
                  #{dept.rank}
                </span>
                <span className="font-semibold text-slate-800 group-hover:text-brand-900 group-hover:underline flex items-center space-x-1">
                  <span>{dept.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
                </span>
              </div>
              <div className="flex items-baseline space-x-2 text-right">
                <span className="font-bold text-slate-900 font-tabular">
                  {formatCrore(dept.grandTotalCrore)}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 font-tabular">
                  ({dept.sharePct}%)
                </span>
              </div>
            </div>

            {/* In-cell progress bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${widthPct}%`, backgroundColor: barColor }}
                className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
              />
            </div>

            {/* Split sub-labels */}
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span>Establishment: {formatCrore(dept.establishmentCrore, true, 0)}</span>
              <span>Pragathi Paddu (Schemes): {formatCrore(dept.schemeCrore, true, 0)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
