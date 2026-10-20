// src/context/YearContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { budgetDataService } from '@/services/budgetDataService';
import { YearInfo } from '@/types/budget';

interface YearContextType {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  yearInfo: YearInfo;
  availableYears: YearInfo[];
  isBRS: boolean;
  rulingParty: string;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

export const YearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const availableYears = budgetDataService.getAvailableYears();
  const defaultYear = budgetDataService.getCurrentYear();
  
  // Initialize from localStorage if present and valid, else defaultYear
  const [selectedYear, setSelectedYearState] = useState<string>(() => {
    const saved = localStorage.getItem('telangana_budget_selected_year');
    if (saved && availableYears.some(y => y.year === saved)) {
      return saved;
    }
    return defaultYear;
  });

  const setSelectedYear = (year: string) => {
    setSelectedYearState(year);
    try {
      localStorage.setItem('telangana_budget_selected_year', year);
    } catch {
      // ignore localStorage quota errors
    }
  };

  const yearInfo = budgetDataService.getYearInfo(selectedYear);
  const isBRS = yearInfo.rulingParty === 'BRS' || selectedYear.startsWith('2020') || selectedYear.startsWith('2021') || selectedYear.startsWith('2022') || selectedYear.startsWith('2023');
  const rulingParty = yearInfo.rulingParty || (isBRS ? 'BRS' : 'INC');

  return (
    <YearContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
        yearInfo,
        availableYears,
        isBRS,
        rulingParty
      }}
    >
      {children}
    </YearContext.Provider>
  );
};

export const useYear = (): YearContextType => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error('useYear must be used within a YearProvider');
  }
  return context;
};
