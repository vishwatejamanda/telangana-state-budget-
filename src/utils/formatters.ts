// src/utils/formatters.ts

/**
 * Format numbers using Indian digit grouping system (lakhs and crores).
 * Example: 324234 -> "3,24,234", 148185.75 -> "1,48,185.75"
 */
export function formatIndianNumber(num: number | null | undefined, decimals = 2): string {
  if (num === null || num === undefined || isNaN(num)) return "0";
  
  const isNegative = num < 0;
  const absNum = Math.abs(num);
  
  const fixed = absNum.toFixed(decimals);
  const parts = fixed.split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1] && parseInt(parts[1], 10) > 0 ? `.${parts[1]}` : (decimals === 0 ? '' : `.${parts[1]}`);

  // Indian comma separation: last 3 digits, then groups of 2 digits
  let result = '';
  if (integerPart.length > 3) {
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherDigits = integerPart.substring(0, integerPart.length - 3);
    const withCommas = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    result = `${withCommas},${lastThree}`;
  } else {
    result = integerPart;
  }

  // Remove unnecessary trailing zeroes if requested
  if (decimalPart === '.00') {
    return `${isNegative ? '-' : ''}${result}`;
  }

  return `${isNegative ? '-' : ''}${result}${decimalPart}`;
}

/**
 * Formats a budget amount in ₹ Crore with standard notation.
 * Example: 324234 -> "₹3,24,234 Cr", 148185.75 -> "₹1,48,185.75 Cr"
 */
export function formatCrore(amount: number | null | undefined, includeUnit = true, decimals = 2): string {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0 Cr";
  const formatted = formatIndianNumber(amount, decimals);
  return includeUnit ? `₹${formatted} Cr` : `₹${formatted}`;
}

/**
 * Format percentage with sign and decimal precision.
 */
export function formatPercent(value: number | null | undefined, decimals = 1, showSign = false): string {
  if (value === null || value === undefined || isNaN(value)) return "0%";
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Generates and triggers download of a CSV file in the browser.
 */
export function exportToCSV(rows: Record<string, any>[], filename = "telangana_budget_2026_27_export.csv") {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map(row => 
      headers.map(header => {
        const val = row[header];
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Triggers download of an ECharts or SVG container as a PNG image.
 */
export function downloadChartAsPNG(elementId: string, filename = "chart.png") {
  const container = document.getElementById(elementId);
  if (!container) return;

  // Check if there's an HTML canvas (e.g. from ECharts)
  const canvas = container.querySelector("canvas");
  if (canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return;
  }

  // Check if SVG (e.g. from Recharts)
  const svg = container.querySelector("svg");
  if (svg) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvasEl = document.createElement("canvas");
    const rect = svg.getBoundingClientRect();
    canvasEl.width = rect.width * 2;
    canvasEl.height = rect.height * 2;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    const img = new Image();
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
      const dataUrl = canvasEl.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    };
  }
}
