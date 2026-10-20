// src/services/budgetDataService.ts

import yearsData from '@/data/years.json';

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

// Eagerly load all JSON files across all fiscal years
const dataModules = import.meta.glob('../data/*/*.json', { eager: true }) as Record<string, any>;

function getFile<T = any>(year: string, filename: string): T {
  const primaryPath = `../data/${year}/${filename}.json`;
  if (dataModules[primaryPath]) {
    const mod = dataModules[primaryPath];
    return (mod.default !== undefined ? mod.default : mod) as T;
  }
  // Fallback to 2026-27
  const fallbackPath = `../data/2026-27/${filename}.json`;
  const fallbackMod = dataModules[fallbackPath];
  return (fallbackMod?.default !== undefined ? fallbackMod.default : fallbackMod) as T;
}

export const budgetDataService = {
  getAvailableYears(): YearInfo[] {
    return yearsData as YearInfo[];
  },

  getCurrentYear(): string {
    const current = yearsData.find(y => y.isCurrent);
    return current ? current.year : '2026-27';
  },

  getYearInfo(year: string): YearInfo {
    const found = yearsData.find(y => y.year === year);
    return (found || yearsData[0]) as YearInfo;
  },

  getBudgetSummary(year = '2026-27'): BudgetSummary {
    return getFile<BudgetSummary>(year, 'budget_summary');
  },

  getDemands(year = '2026-27'): DemandRecord[] {
    const data = getFile<any>(year, 'demands_summary');
    return (data?.demands || []) as DemandRecord[];
  },

  getDemandsMeta(year = '2026-27'): any {
    return getFile<any>(year, 'demands_summary');
  },

  getDepartments(year = '2026-27'): DepartmentAllocation[] {
    const data = getFile<any>(year, 'department_allocations');
    return (data?.departments || []) as DepartmentAllocation[];
  },

  getDepartmentById(id: string, year = '2026-27'): DepartmentAllocation | undefined {
    const list = this.getDepartments(year);
    return list.find(d => d.id === id);
  },

  getSchemes(year = '2026-27'): SchemeItem[] {
    const data = getFile<any>(year, 'schemes');
    return (data?.schemes || []) as SchemeItem[];
  },

  getSchemesMeta(year = '2026-27'): any {
    return getFile<any>(year, 'schemes');
  },

  getReceiptsBreakdown(year = '2026-27'): any {
    return getFile<any>(year, 'receipts_breakdown');
  },

  getExpenditureBreakdown(year = '2026-27'): any {
    return getFile<any>(year, 'expenditure_breakdown');
  },

  getSectors(year = '2026-27'): SectorItem[] {
    return getFile<SectorItem[]>(year, 'sector_allocations') || [];
  },

  getSectorById(id: string, year = '2026-27'): SectorItem | undefined {
    return this.getSectors(year).find(s => s.id === id);
  },

  getDebtAndGuarantees(year = '2026-27'): any {
    return getFile<any>(year, 'debt_and_guarantees');
  },

  getGovernmentProfiles(year = '2026-27'): { presentation: any; ministers: MinisterProfile[] } {
    return getFile<{ presentation: any; ministers: MinisterProfile[] }>(year, 'government_profiles');
  },

  getEmployeeStrength(year = '2026-27'): any {
    return getFile<any>(year, 'employee_strength');
  },

  getScsdfStsdf(year = '2026-27'): any {
    return getFile<any>(year, 'scsdf_stsdf');
  },

  getAllRecords(year = '2026-27'): FlatRecord[] {
    return getFile<FlatRecord[]>(year, 'all_records') || [];
  },

  getPdfCatalog(year = '2026-27'): any[] {
    return getFile<any[]>(year, 'pdf_catalog') || [];
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
      if (d.name.toLowerCase().includes(q) || (d.minister && d.minister.toLowerCase().includes(q))) {
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
      if (dm.name.toLowerCase().includes(q) || dm.demandNo.toLowerCase() === q || dm.teluguName?.includes(q)) {
        results.push({
          type: 'Demand',
          title: `Demand ${dm.demandNo}: ${dm.name}`,
          subtitle: `${dm.teluguName || ''} • ${dm.department}`,
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
