// src/types/budget.ts

export interface YearInfo {
  year: string;
  label: string;
  active: boolean;
  isCurrent: boolean;
  totalBudget: number;
  presentationDate: string;
  presentedBy: string;
}

export interface MetricItem {
  value: number;
  unit: string;
  raw?: number;
  label: string;
  shareOfTotal?: number;
  growthPctOverRE?: number;
  pctOfGSDP?: number;
  pctOfTRR?: number;
  targetPct?: number;
  type?: string;
  status?: string;
  sourceFile?: string;
  sourcePage?: number;
  notes?: string;
  breakdown?: Record<string, number>;
}

export interface CitizenTakeaway {
  id: string;
  title: string;
  value: string;
  description: string;
  category: string;
}

export interface RupeeItem {
  name: string;
  paisa: number;
  amount: number;
  category: string;
  description: string;
}

export interface MultiYearReceiptTrend {
  year: string;
  centralShare: number;
  stateTaxes: number;
  nonTax: number;
  grantsInAid: number;
  total: number;
}

export interface MultiYearExpenditureTrend {
  year: string;
  generalServices: number;
  socialServices: number;
  economicServices: number;
  grants: number;
  total: number;
}

export interface MultiYearDebtTrend {
  year: string;
  openMarket: number;
  centre: number;
  autonomous: number;
  smallSavingsPF: number;
  reserves: number;
  total: number;
  pctGSDP: number;
}

export interface MultiYearIrrigationTrend {
  year: string;
  majorMedium: number;
  minor: number;
  cad: number;
  floodControl: number;
  total: number;
}

export interface BudgetSummary {
  year: string;
  status: string;
  presentationDate: string;
  financeMinister: string;
  chiefMinister: string;
  keyMetrics: {
    totalBudget: MetricItem;
    revenueReceipts: MetricItem;
    capitalReceipts: MetricItem;
    totalExpenditure: MetricItem;
    revenueExpenditure: MetricItem;
    capitalExpenditure: MetricItem;
    loansAndAdvances: MetricItem;
    publicDebtRepayment: MetricItem;
    fiscalDeficit: MetricItem;
    revenueDeficitSurplus: MetricItem;
    primaryDeficit: MetricItem;
    gsdpEstimates: {
      currentPrices2026_27: number;
      currentPrices2025_26_PAE: number;
      currentPrices2024_25_FRE: number;
      constantPrices2025_26_PAE: number;
      constantPrices2024_25_FRE: number;
      nominalGrowthRate: number;
      realGrowthRate: number;
      unit: string;
      sourceFile: string;
      sourcePage: number;
    };
    totalBorrowings: MetricItem;
    outstandingDebt: MetricItem;
    governmentGuarantees: MetricItem;
    establishmentVsScheme: {
      establishmentExpenditure: number;
      schemeExpenditure: number;
      establishmentSharePct: number;
      schemeSharePct: number;
      total: number;
      unit: string;
      sourceFile: string;
      sourcePage: number;
    };
  };
  citizenKeyTakeaways: CitizenTakeaway[];
  rupeeComesFrom: RupeeItem[];
  rupeeGoesTo: RupeeItem[];
  multiYearTrends: {
    revenueReceipts: MultiYearReceiptTrend[];
    revenueExpenditure: MultiYearExpenditureTrend[];
    publicDebt: MultiYearDebtTrend[];
    irrigationSector: MultiYearIrrigationTrend[];
  };
}

export interface DemandRecord {
  demandNo: string;
  name: string;
  teluguName: string;
  ministerTitle: string;
  ministerName: string;
  department: string;
  volumeBook: string;
  amountRs: number;
  amountCrore: number;
  revenueGrossLakhs: number;
  capitalGrossLakhs: number;
  totalGrossLakhs: number;
  recoveriesLakhs: number;
  revenueNetLakhs: number;
  capitalNetLakhs: number;
  totalNetLakhs: number;
  sourceFile: string;
  sourcePage: number;
  sharePct?: number;
}

export interface DepartmentAllocation {
  id: string;
  rank: number;
  name: string;
  establishmentCrore: number;
  schemeCrore: number;
  grandTotalCrore: number;
  capitalOutlayCrore: number;
  capitalWorksCrore?: number;
  category?: string;
  sharePct: number;
  minister: string;
  demands: string[];
  keySchemes?: string[];
  sourceFile: string;
  sourcePage: number;
}

export interface SchemeItem {
  sNo: number;
  id?: string;
  name: string;
  amount: number;
  category: string;
  department: string;
  description: string;
  majorHead?: string;
  sourcePage?: number;
}

export interface SectorItem {
  id: string;
  name: string;
  totalAllocationCrore: number;
  sharePct: number;
  icon: string;
  description: string;
  departments: string[];
  keySchemes: string[];
}

export interface MinisterProfile {
  id: string;
  name: string;
  shortName: string;
  role: string;
  constituency: string;
  portfolios: string[];
  demandsOverseen: string[];
  totalBudgetOverseenCrore: number;
  photoPlaceholder: string;
  notes?: string;
  departmentIds: string[];
}

export interface FlatRecord {
  id: string;
  year: string;
  category: string;
  subCategory: string;
  department: string | null;
  demandNo: string | null;
  scheme: string | null;
  majorHead: string | null;
  majorHeadName: string | null;
  type: string;
  amount: number;
  unit: string;
  sourceFile: string;
  sourcePage: number;
  notes?: string;
}
