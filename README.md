# Telangana State Budget 2026-27 Public Intelligence & Data Visualization Portal

An authoritative, production-ready, 100% data-verified web portal visualizing the complete Telangana State Budget 2026-27 (**₹3,24,234.00 crore**), built with React, Vite, TypeScript, Tailwind CSS, Apache ECharts, and Recharts.

---

## 1. Project Overview & Architecture

### Core Tech Stack
- **Framework:** React 18 + Vite 6 + TypeScript 5
- **Styling:** Tailwind CSS (Strict editorial White Theme, single Imperial Navy `#12243C` base color family, neutral greys, emerald for surplus, crimson for deficits)
- **Data Visualizations:** Apache ECharts (`echarts-for-react`) and Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6

### Design & Editorial Standards
- **Theme:** White theme ONLY with high-contrast WCAG AA readability.
- **Data-Driven:** Zero hardcoded figures in UI components; all numbers are dynamically driven from structured JSON databases in `src/data/<year>/`.
- **Units:** Standardized to **₹ crore** with Indian digit grouping (e.g., ₹2,91,159 Cr).
- **Transparency:** Every chart includes tooltips with exact values and % shares, unit badges, downloadable PNG exports, data table toggles, and official source document citations.

---

## 2. Directory & File Structure

```text
d:/Telangana/
├── 2026-27/                              # Original official PDF budget documents (32 files, ~380 MB)
├── DATA_INVENTORY.md                     # Complete inventory of all 32 PDF files & extracted tables
├── DATA_QUALITY.md                       # Comprehensive mathematical reconciliation report
├── README.md                             # Documentation, verification audit & deployment guide
├── package.json                          # Dependencies & build scripts
├── vite.config.ts                        # Vite configuration with '@' alias
├── tailwind.config.js                    # Design tokens, imperial navy palette, fonts
├── tsconfig.json                         # Strict TypeScript configuration
├── dist/                                 # Production optimized build bundle
├── src/
│   ├── main.tsx                          # App entry point
│   ├── App.tsx                           # Root router and layout container
│   ├── index.css                         # Tailored typography, font-tabular, and animations
│   ├── types/
│   │   └── budget.ts                     # Strict TypeScript interfaces & year-agnostic schemas
│   ├── utils/
│   │   └── formatters.ts                 # Indian currency formatter (₹ Cr), CSV exporter, PNG downloader
│   ├── services/
│   │   └── budgetDataService.ts          # Unified budget service & global search engine
│   ├── data/
│   │   ├── years.json                    # Multi-year index metadata
│   │   └── 2026-27/
│   │       ├── budget_summary.json       # Macro totals, FRBM indicators, 4-yr trends, citizen takeaways
│   │       ├── demands_summary.json      # All 38 Legislative Demands for Grants (Gross Voted & Charged)
│   │       ├── department_allocations.json # All 30 Secretariat departments with Pragathi vs Nirvahana split
│   │       ├── schemes.json              # 57+ flagship programs, Six Guarantees outlays
│   │       ├── receipts_breakdown.json   # SOTR, Central devolution, Non-tax, and Borrowings
│   │       ├── expenditure_breakdown.json# Functional service classifications & capital outlay
│   │       ├── sector_allocations.json   # 12 high-level priority sectors
│   │       ├── debt_and_guarantees.json  # Public debt stock, SPV guarantees, Sinking & GRF funds
│   │       ├── government_profiles.json  # Cabinet Ministers & Portfolios verified from official sources
│   │       ├── employee_strength.json    # 8,15,312 cadre strength, salaries and pensions
│   │       ├── scsdf_stsdf.json          # Scheduled Castes & Tribes statutory funds
│   │       └── all_records.json          # 238+ flat records for tabular explorer and CSV export
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx                # Sticky navbar with year selector & Cmd+K search trigger
│   │   │   ├── Footer.tsx                # Portal footer with source references & disclaimer
│   │   │   ├── KPICard.tsx               # Reusable metric card with source citation modal & trends
│   │   │   ├── ChartCard.tsx             # Universal chart wrapper (PNG download, data table toggle)
│   │   │   ├── SearchModal.tsx           # Global search dialog (Ctrl/Cmd+K)
│   │   │   └── GovernmentSection.tsx     # Executive leadership duo & Council of Ministers grid
│   │   └── charts/
│   │       ├── RupeeBreakdown.tsx        # 100-paise visualizer (How Rupee is Earned & Spent)
│   │       ├── TopDepartmentsBar.tsx     # In-cell ranked department bar chart
│   │       ├── SankeyBudgetFlow.tsx      # ECharts Sankey flow diagram (Receipts -> Consolidated Fund -> Exp)
│   │       ├── WaterfallBudget.tsx       # ECharts Waterfall fiscal deficit & budget build-up bridge
│   │       ├── DepartmentTreemap.tsx     # ECharts Treemap for department allocations and shares
│   │       ├── SunburstBudget.tsx        # ECharts Sunburst for hierarchical drilldown
│   │       ├── MultiYearTrendChart.tsx   # ECharts Line/Bar dual-axis 4-year trends
│   │       └── CompareDepartmentsTool.tsx# Interactive side-by-side department comparator
│   └── pages/
│       ├── HomePage.tsx                  # Hero metrics, citizen strip, rupee visualizer, top depts, ministers
│       ├── OverviewPage.tsx              # Balance sheet, Sankey flow, Waterfall, and FRBM card
│       ├── ReceiptsPage.tsx              # SOTR, non-tax, devolution, grants, and borrowings
│       ├── ExpenditurePage.tsx           # Pragathi vs Nirvahana, service classification, capital works
│       ├── DepartmentsPage.tsx           # 30 departments directory with treemap and table views
│       ├── DepartmentDetailPage.tsx      # Deep dive into individual department allocations & schemes
│       ├── SchemesPage.tsx               # Searchable catalog of 57+ schemes & Six Guarantees
│       ├── SectorsPage.tsx               # 12 sectors with outlays and key programs
│       ├── ComparePage.tsx               # Department comparator & multi-year comparison engine
│       ├── ExploreDataPage.tsx           # Master explorer of all 238+ records with CSV export
│       └── DataNotesPage.tsx             # 32 source documents inventory & reconciliation proofs
```

---

## 3. How to Run Locally

### Prerequisites
- Node.js (v18.0 or newer recommended)
- npm or yarn

### Steps
1. Navigate to the project root:
   ```bash
   cd d:/Telangana
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://127.0.0.1:5173/`.

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

To preview the production bundle locally:
```bash
npm run preview
```

---

## 4. How to Add a New Year's Data (Multi-Year Extensibility)

The application has been engineered with a **year-agnostic schema**. Adding a previous year (e.g. `2025-26`) or subsequent year (e.g. `2027-28`) requires zero changes to the UI components:

1. **Create the New Directory:**
   Create a folder under `src/data/<year>/` (e.g. `src/data/2025-26/`).
2. **Populate Standard JSON Files:**
   Populate the standard schema files matching the structure of `src/data/2026-27/`:
   - `budget_summary.json`
   - `demands_summary.json`
   - `department_allocations.json`
   - `schemes.json`
   - `receipts_breakdown.json`
   - `expenditure_breakdown.json`
   - `sector_allocations.json`
   - `debt_and_guarantees.json`
   - `government_profiles.json`
   - `employee_strength.json`
   - `scsdf_stsdf.json`
   - `all_records.json`
3. **Update Years Index (`src/data/years.json`):**
   Add the new year object to `src/data/years.json`:
   ```json
   {
     "year": "2025-26",
     "label": "FY 2025-26 (RE)",
     "active": true,
     "isCurrent": false,
     "totalBudget": 275891.0,
     "presentationDate": "July 2025",
     "presentedBy": "Sri Mallu Bhatti Vikramarka"
   }
   ```
4. **Register in Service (`src/services/budgetDataService.ts`):**
   Import the files and append the entry into `dataByYear`:
   ```ts
   import budgetSummary2025_26 from '@/data/2025-26/budget_summary.json';
   // ...
   const dataByYear: Record<string, any> = {
     '2026-27': { ... },
     '2025-26': { summary: budgetSummary2025_26, ... }
   };
   ```
5. **Immediate Multi-Year Activation:**
   The year dropdown in the header and the Year-over-Year comparison tab on `/compare` will automatically activate the new year dataset across all pages.

---

## 5. Pre-Finishing Verification Audit: Numbers on Home Page

Every numerical value displayed on the Home Page has been verified against the official primary PDF source documents:

| Metric Displayed on Home Page | Portal Value | Official Source Document | Exact Page | Verified Table / Statement | Variance |
|---|:---:|---|:---:|---|:---:|
| **Total State Budget Outlay** | ₹3,24,234.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Budget at a Glance (Net Budget) | **₹0.00** |
| **Total Revenue Receipts (TRR)**| ₹2,41,263.58 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Revenue Account Receipts Total | **₹0.00** |
| **Total Expenditure** | ₹3,24,234.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Total Disbursements (Consolidated Fund) | **₹0.00** |
| **Revenue Expenditure** | ₹2,34,405.82 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Revenue Account Disbursements Total | **₹0.00** |
| **Capital Expenditure (Outlay)**| ₹47,267.28 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Capital Account Capital Outlay | **₹0.00** |
| **Revenue Surplus (+)** | +₹6,857.76 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 5 | Revenue Surplus (+2.84% of TRR) | **₹0.00** |
| **Gross Fiscal Deficit** | ₹58,458.71 Cr | `1773983965_FRBM_Fiscal_Policy.pdf` | Page 6 | Section 5 Fiscal Balance Table | **₹0.00** |
| **Fiscal Deficit % of GSDP** | 2.98% of GSDP | `1773983965_FRBM_Fiscal_Policy.pdf` | Page 6 | Paragraph 4 (Compliant with 3.0% cap) | **0.00%** |
| **Outstanding Public Debt** | ₹5,62,363.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 11 | Outstanding Public Debt Table | **₹0.00** |
| **Debt % of GSDP** | 28.69% of GSDP | `1773983722_Volume_VI-Brief.pdf` | Page 11 | Debt-to-GSDP Ratio for 2026-27 BE | **0.00%** |
| **Nominal GSDP Estimate** | ₹19,61,701.68 Cr | `1773983965_FRBM_Fiscal_Policy.pdf` | Page 4 | Table 2 Macro-Economic Aggregates | **₹0.00** |
| **Pragathi Paddu (Schemes)** | ₹1,84,316.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 18 | Table 11 Pragathi Paddu Total | **₹0.00** |
| **Nirvahana Paddu (Est.)** | ₹1,39,918.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 18 | Table 11 Nirvahana Paddu Total | **₹0.00** |
| **State Own Tax Revenue (SOTR)**| ₹1,59,410.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 7 | Table 2 Statement of Revenue Receipts | **₹0.00** |
| **Non-Tax Revenue** | ₹35,518.73 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 7 | Table 2 Statement of Revenue Receipts | **₹0.00** |
| **Central Tax Devolution** | ₹29,886.72 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 7 | Table 2 Share in Central Taxes | **₹0.00** |
| **Grants-in-Aid** | ₹16,448.13 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 7 | Table 2 Grants-in-Aid from Centre | **₹0.00** |
| **Panchayat Raj & Rural Dev** | ₹33,688.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 18 | Table 11 Department Allocations Rank #1 | **₹0.00** |
| **Agriculture & Cooperation** | ₹26,890.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 18 | Table 11 Department Allocations Rank #2 | **₹0.00** |
| **Irrigation & Water Resources**| ₹22,615.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 18 | Table 11 Department Allocations Rank #3 | **₹0.00** |
| **Rythu Bharosa** | ₹18,000.00 Cr | `1773983749_Pragathi_Paddu_VII-I.pdf`| Page 8 | Flagship Scheme Allocation Item 1 | **₹0.00** |
| **Cheyutha Social Pensions** | ₹14,861.00 Cr | `1773983749_Pragathi_Paddu_VII-I.pdf`| Page 12 | Flagship Scheme Allocation Item 2 | **₹0.00** |
| **Indiramma Houses** | ₹5,500.00 Cr | `1773983749_Pragathi_Paddu_VII-I.pdf`| Page 14 | Housing for Poor Families Allocation | **₹0.00** |
| **Mahalaxmi TSRTC Free Travel** | ₹4,305.00 Cr | `1773983749_Pragathi_Paddu_VII-I.pdf`| Page 19 | TSRTC Concessional Reimbursement | **₹0.00** |
| **Gruha Jyothi (Free Power)** | ₹3,450.00 Cr | `1773983749_Pragathi_Paddu_VII-I.pdf`| Page 21 | Domestic Electricity Subsidy (200 units)| **₹0.00** |
| **SCSDF Statutory Fund** | ₹37,741.22 Cr | `1773983773_SCSDF_Vol_VII-II.pdf` | Page 8 | SCSDF Mandated Allocation Total | **₹0.00** |
| **STSDF Statutory Fund** | ₹18,745.16 Cr | `1773983796_STSDF_Volume_VII-III.pdf`| Page 9 | STSDF Mandated Allocation Total | **₹0.00** |
| **Total Guarantees Exposure** | ₹3,01,835.00 Cr | `1773983668_Volume-V-1_Telugu.pdf` | Page 14 | Statement of Government Guarantees | **₹0.00** |
| **Consolidated Sinking Fund** | ₹7,481.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 15 | Reserve Funds Statement (CSF) | **₹0.00** |
| **Guarantee Redemption Fund** | ₹6,346.00 Cr | `1773983722_Volume_VI-Brief.pdf` | Page 15 | Reserve Funds Statement (GRF) | **₹0.00** |

---

## 6. How to Deploy to Production

### Option A: Static Hosting (Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront)
1. Build the static distribution:
   ```bash
   npm run build
   ```
2. The `dist/` directory contains standard static HTML, CSS, and JS assets.
3. Configure rewrite rules for Single Page Application (SPA) routing:
   - For **Vercel** (`vercel.json`):
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
   - For **Netlify** (`_redirects` file in `public/`):
     ```text
     /*    /index.html   200
     ```
   - For **Nginx**:
     ```nginx
     location / {
       try_files $uri $uri/ /index.html;
     }
     ```

### Option B: Docker Container
A standard multi-stage Docker build can be deployed on AWS ECS, GCP Cloud Run, or Kubernetes:
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 7. Data Transparency & Open Government Attributions
- **Source:** Finance Department, Government of Telangana ([telangana.gov.in/budget-2026-2027/](https://www.telangana.gov.in/budget-2026-2027/))
- **Completeness:** All 32 PDF source documents (1,900+ pages) parsed and mathematically reconciled.
- **Licensing & Public Domain:** Budget documents are public government records presented under Article 202 of the Constitution of India.
