// src/services/budgetDataService.ts

import yearsData from '@/data/years.json';
import budgetSummary2026_27 from '@/data/2026-27/budget_summary.json';
import demands2026_27 from '@/data/2026-27/demands_summary.json';
import departments2026_27 from '@/data/2026-27/department_allocations.json';
import schemes2026_27 from '@/data/2026-27/schemes.json';
import receipts2026_27 from '@/data/2026-27/receipts_breakdown.json';
import expenditure2026_27 from '@/data/2026-27/expenditure_breakdown.json';
import sectors2026_27 from '@/data/2026-27/sector_allocations.json';
import debtGuarantees2026_27 from '@/data/2026-27/debt_and_guarantees.json';
import government2026_27 from '@/data/2026-27/government_profiles.json';
import employee2026_27 from '@/data/2026-27/employee_strength.json';
import scsdfStsdf2026_27 from '@/data/2026-27/scsdf_stsdf.json';
import allRecords2026_27 from '@/data/2026-27/all_records.json';

import {
  YearInfo,
  BudgetSummary,
  DemandRecord,
  DepartmentAllocation,
  SchemeItem,
  SectorItem,
  MinisterProfile,
  FlatRecord
} from '@/types/budget';

// Year map for dynamic loading
const dataByYear: Record<string, any> = {
  '2026-27': {
    summary: budgetSummary2026_27 as BudgetSummary,
    demands: demands2026_27.demands as DemandRecord[],
    demandsMeta: demands2026_27,
    departments: departments2026_27.departments as DepartmentAllocation[],
    schemes: schemes2026_27.schemes as SchemeItem[],
    schemesMeta: schemes2026_27,
    receipts: receipts2026_27,
    expenditure: expenditure2026_27,
    sectors: sectors2026_27 as SectorItem[],
    debtAndGuarantees: debtGuarantees2026_27,
    government: government2026_27,
    employeeStrength: employee2026_27,
    scsdfStsdf: scsdfStsdf2026_27,
    allRecords: allRecords2026_27 as FlatRecord[],
  }
};

export const budgetDataService = {
  getAvailableYears(): YearInfo[] {
    return yearsData as YearInfo[];
  },

  getCurrentYear(): string {
    const current = yearsData.find(y => y.isCurrent);
    return current ? current.year : '2026-27';
  },

  getBudgetSummary(year = '2026-27'): BudgetSummary {
    return dataByYear[year]?.summary || dataByYear['2026-27'].summary;
  },

  getDemands(year = '2026-27'): DemandRecord[] {
    return dataByYear[year]?.demands || dataByYear['2026-27'].demands;
  },

  getDemandsMeta(year = '2026-27'): any {
    return dataByYear[year]?.demandsMeta || dataByYear['2026-27'].demandsMeta;
  },

  getDepartments(year = '2026-27'): DepartmentAllocation[] {
    return dataByYear[year]?.departments || dataByYear['2026-27'].departments;
  },

  getDepartmentById(id: string, year = '2026-27'): DepartmentAllocation | undefined {
    const list = this.getDepartments(year);
    return list.find(d => d.id === id);
  },

  getSchemes(year = '2026-27'): SchemeItem[] {
    return dataByYear[year]?.schemes || dataByYear['2026-27'].schemes;
  },

  getSchemesMeta(year = '2026-27'): any {
    return dataByYear[year]?.schemesMeta || dataByYear['2026-27'].schemesMeta;
  },

  getReceiptsBreakdown(year = '2026-27'): any {
    return dataByYear[year]?.receipts || dataByYear['2026-27'].receipts;
  },

  getExpenditureBreakdown(year = '2026-27'): any {
    return dataByYear[year]?.expenditure || dataByYear['2026-27'].expenditure;
  },

  getSectors(year = '2026-27'): SectorItem[] {
    return dataByYear[year]?.sectors || dataByYear['2026-27'].sectors;
  },

  getSectorById(id: string, year = '2026-27'): SectorItem | undefined {
    return this.getSectors(year).find(s => s.id === id);
  },

  getDebtAndGuarantees(year = '2026-27'): any {
    return dataByYear[year]?.debtAndGuarantees || dataByYear['2026-27'].debtAndGuarantees;
  },

  getGovernmentProfiles(year = '2026-27'): { presentation: any; ministers: MinisterProfile[] } {
    return dataByYear[year]?.government || dataByYear['2026-27'].government;
  },

  getEmployeeStrength(year = '2026-27'): any {
    return dataByYear[year]?.employeeStrength || dataByYear['2026-27'].employeeStrength;
  },

  getScsdfStsdf(year = '2026-27'): any {
    return dataByYear[year]?.scsdfStsdf || dataByYear['2026-27'].scsdfStsdf;
  },

  getAllRecords(year = '2026-27'): FlatRecord[] {
    return dataByYear[year]?.allRecords || dataByYear['2026-27'].allRecords;
  },

  searchGlobal(query: string, year = '2026-27') {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const results: Array<{
      type: 'Department' | 'Scheme' | 'Demand' | 'Sector' | 'Receipt';
      title: string;
      subtitle: string;
      amountCrore?: number;
      link: string;
    }> = [];

    // Search departments
    for (const d of this.getDepartments(year)) {
      if (d.name.toLowerCase().includes(q) || d.minister.toLowerCase().includes(q)) {
        results.push({
          type: 'Department',
          title: d.name,
          subtitle: `Rank #${d.rank} • Minister: ${d.minister}`,
          amountCrore: d.grandTotalCrore,
          link: `/departments/${d.id}`
        });
      }
    }

    // Search schemes
    for (const s of this.getSchemes(year)) {
      if (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
        results.push({
          type: 'Scheme',
          title: s.name,
          subtitle: `${s.category} • ${s.department}`,
          amountCrore: s.amount,
          link: `/schemes?search=${encodeURIComponent(s.name)}`
        });
      }
    }

    // Search demands
    for (const dm of this.getDemands(year)) {
      if (dm.name.toLowerCase().includes(q) || dm.demandNo.toLowerCase() === q || dm.teluguName.includes(q)) {
        results.push({
          type: 'Demand',
          title: `Demand ${dm.demandNo}: ${dm.name}`,
          subtitle: `${dm.teluguName} • ${dm.department}`,
          amountCrore: dm.amountCrore,
          link: `/departments?demand=${dm.demandNo}`
        });
      }
    }

    // Search sectors
    for (const sec of this.getSectors(year)) {
      if (sec.name.toLowerCase().includes(q) || sec.description.toLowerCase().includes(q)) {
        results.push({
          type: 'Sector',
          title: sec.name,
          subtitle: `${sec.sharePct}% of budget`,
          amountCrore: sec.totalAllocationCrore,
          link: `/sectors#${sec.id}`
        });
      }
    }

    return results.slice(0, 15);
  }
};
