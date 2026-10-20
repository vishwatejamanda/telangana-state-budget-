// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { YearProvider, useYear } from '@/context/YearContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { SearchModal } from '@/components/common/SearchModal';

// Pages
import { HomePage } from '@/pages/HomePage';
import { OverviewPage } from '@/pages/OverviewPage';
import { ReceiptsPage } from '@/pages/ReceiptsPage';
import { ExpenditurePage } from '@/pages/ExpenditurePage';
import { DepartmentsPage } from '@/pages/DepartmentsPage';
import { DepartmentDetailPage } from '@/pages/DepartmentDetailPage';
import { SchemesPage } from '@/pages/SchemesPage';
import { SectorsPage } from '@/pages/SectorsPage';
import { ComparePage } from '@/pages/ComparePage';
import { ExploreDataPage } from '@/pages/ExploreDataPage';
import { DataNotesPage } from '@/pages/DataNotesPage';
import { TransitExplorerPage } from '@/pages/TransitExplorerPage';
import { WaterBodiesMapPage } from '@/pages/WaterBodiesMapPage';

const AppContent: React.FC = () => {
  const { selectedYear, setSelectedYear } = useYear();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation Bar */}
      <Navbar
        currentYear={selectedYear}
        onYearChange={setSelectedYear}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        year={selectedYear}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/transit" element={<TransitExplorerPage />} />
          <Route path="/tgsrtc" element={<Navigate to="/transit" replace />} />
          <Route path="/water-bodies" element={<WaterBodiesMapPage />} />
          <Route path="/waterbodies" element={<Navigate to="/water-bodies" replace />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route path="/expenditure" element={<ExpenditurePage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:id" element={<DepartmentDetailPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/explore" element={<ExploreDataPage />} />
          <Route path="/data-notes" element={<DataNotesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <YearProvider>
        <AppContent />
      </YearProvider>
    </Router>
  );
};

export default App;
