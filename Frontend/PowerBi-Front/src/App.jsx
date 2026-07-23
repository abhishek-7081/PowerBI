import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import KpiCards from './components/KpiCards';
import ReportView from './components/ReportView';
import DataView from './components/DataView';
import ModelView from './components/ModelView';
import DaxPlayground from './components/DaxPlayground';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

// Fallback initial dataset in case backend is offline
const INITIAL_DATA = [
  { Date: '2024-01-15', Region: 'North America', Category: 'Technology', Product: 'Enterprise Laptops', Sales: 45000, Profit: 12000, Units: 30, Segment: 'Enterprise' },
  { Date: '2024-01-18', Region: 'Europe', Category: 'Technology', Product: 'Cloud Servers', Sales: 62000, Profit: 18500, Units: 20, Segment: 'Enterprise' },
  { Date: '2024-01-22', Region: 'Asia-Pacific', Category: 'Furniture', Product: 'Ergonomic Chairs', Sales: 15000, Profit: 4200, Units: 50, Segment: 'Consumer' },
  { Date: '2024-02-05', Region: 'North America', Category: 'Office Supplies', Product: 'Smart Notebooks', Sales: 8500, Profit: 2800, Units: 120, Segment: 'Consumer' },
  { Date: '2024-02-12', Region: 'Latin America', Category: 'Technology', Product: 'Enterprise Laptops', Sales: 32000, Profit: 8000, Units: 22, Segment: 'SMB' },
  { Date: '2024-02-20', Region: 'Europe', Category: 'Furniture', Product: 'Executive Desks', Sales: 28000, Profit: 9100, Units: 15, Segment: 'Enterprise' },
  { Date: '2024-03-01', Region: 'Asia-Pacific', Category: 'Technology', Product: 'Cloud Servers', Sales: 75000, Profit: 22000, Units: 25, Segment: 'Enterprise' },
  { Date: '2024-03-10', Region: 'North America', Category: 'Furniture', Product: 'Ergonomic Chairs', Sales: 21000, Profit: 5800, Units: 70, Segment: 'SMB' },
  { Date: '2024-03-15', Region: 'Europe', Category: 'Office Supplies', Product: 'Smart Notebooks', Sales: 14000, Profit: 4900, Units: 200, Segment: 'Consumer' },
  { Date: '2024-03-28', Region: 'Latin America', Category: 'Furniture', Product: 'Executive Desks', Sales: 19000, Profit: 6000, Units: 10, Segment: 'Consumer' },
  { Date: '2024-04-04', Region: 'North America', Category: 'Technology', Product: 'Cloud Servers', Sales: 88000, Profit: 27000, Units: 30, Segment: 'Enterprise' },
  { Date: '2024-04-14', Region: 'Asia-Pacific', Category: 'Office Supplies', Product: 'Smart Notebooks', Sales: 11500, Profit: 3800, Units: 160, Segment: 'SMB' },
  { Date: '2024-04-22', Region: 'Europe', Category: 'Technology', Product: 'Enterprise Laptops', Sales: 54000, Profit: 14500, Units: 36, Segment: 'Enterprise' },
  { Date: '2024-05-02', Region: 'Latin America', Category: 'Technology', Product: 'Cloud Servers', Sales: 41000, Profit: 11200, Units: 14, Segment: 'SMB' },
  { Date: '2024-05-11', Region: 'North America', Category: 'Furniture', Product: 'Executive Desks', Sales: 34000, Profit: 11000, Units: 18, Segment: 'Enterprise' },
  { Date: '2024-05-19', Region: 'Asia-Pacific', Category: 'Technology', Product: 'Enterprise Laptops', Sales: 49000, Profit: 13200, Units: 32, Segment: 'Consumer' },
  { Date: '2024-06-01', Region: 'Europe', Category: 'Furniture', Product: 'Ergonomic Chairs', Sales: 26000, Profit: 7400, Units: 85, Segment: 'SMB' },
  { Date: '2024-06-15', Region: 'North America', Category: 'Office Supplies', Product: 'Smart Notebooks', Sales: 16500, Profit: 5500, Units: 230, Segment: 'Enterprise' },
  { Date: '2024-06-25', Region: 'Latin America', Category: 'Office Supplies', Product: 'Smart Notebooks', Sales: 9800, Profit: 3100, Units: 140, Segment: 'Consumer' },
  { Date: '2024-07-05', Region: 'Asia-Pacific', Category: 'Furniture', Product: 'Executive Desks', Sales: 31000, Profit: 10100, Units: 16, Segment: 'Enterprise' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('report');
  const [filters, setFilters] = useState({
    region: 'All',
    category: 'All',
    segment: 'All'
  });

  const [salesData, setSalesData] = useState(INITIAL_DATA);
  const [kpiData, setKpiData] = useState(null);

  // Compute local KPI aggregations
  const computeLocalData = (data) => {
    let filtered = [...data];
    if (filters.region !== 'All') filtered = filtered.filter(d => d.Region === filters.region);
    if (filters.category !== 'All') filtered = filtered.filter(d => d.Category === filters.category);
    if (filters.segment !== 'All') filtered = filtered.filter(d => d.Segment === filters.segment);

    const totalSales = filtered.reduce((a, c) => a + c.Sales, 0);
    const totalProfit = filtered.reduce((a, c) => a + c.Profit, 0);
    const totalUnits = filtered.reduce((a, c) => a + c.Units, 0);
    const profitMargin = totalSales > 0 ? parseFloat(((totalProfit / totalSales) * 100).toFixed(2)) : 0;
    const avgOrderValue = filtered.length > 0 ? parseFloat((totalSales / filtered.length).toFixed(2)) : 0;

    // Monthly trends
    const mMap = {};
    filtered.forEach(i => {
      const m = i.Date.substring(0, 7);
      if (!mMap[m]) mMap[m] = { month: m, sales: 0, profit: 0 };
      mMap[m].sales += i.Sales;
      mMap[m].profit += i.Profit;
    });

    // Region distribution
    const rMap = {};
    filtered.forEach(i => {
      if (!rMap[i.Region]) rMap[i.Region] = { region: i.Region, sales: 0, profit: 0 };
      rMap[i.Region].sales += i.Sales;
      rMap[i.Region].profit += i.Profit;
    });

    // Category distribution
    const cMap = {};
    filtered.forEach(i => {
      if (!cMap[i.Category]) cMap[i.Category] = { category: i.Category, sales: 0, profit: 0 };
      cMap[i.Category].sales += i.Sales;
      cMap[i.Category].profit += i.Profit;
    });

    return {
      filteredRows: filtered,
      kpis: {
        totalSales,
        totalProfit,
        totalUnits,
        profitMargin,
        avgOrderValue,
        orderCount: filtered.length
      },
      charts: {
        monthlyTrends: Object.values(mMap).sort((a, b) => a.month.localeCompare(b.month)),
        regionDistribution: Object.values(rMap),
        categoryDistribution: Object.values(cMap)
      }
    };
  };

  const currentLocal = computeLocalData(salesData);

  const fetchBackendData = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const resKpi = await fetch(`${API_BASE}/kpis?${queryParams}`);
      const resSales = await fetch(`${API_BASE}/sales?${queryParams}`);

      if (resKpi.ok && resSales.ok) {
        const kpiJson = await resKpi.json();
        const salesJson = await resSales.json();

        if (kpiJson.success && salesJson.success) {
          setKpiData(kpiJson);
          setSalesData(salesJson.data);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend API connection offline, using client-side engine');
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({ region: 'All', category: 'All', segment: 'All' });
  };

  const handleEvaluateDax = async (daxQuery) => {
    try {
      const res = await fetch(`${API_BASE}/dax/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ daxQuery })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend API evaluation fallback');
    }

    // Client fallback for DAX evaluation
    const queryLower = (daxQuery || '').toLowerCase();
    let result = '$0';
    let description = 'Client evaluated DAX calculation.';

    if (queryLower.includes('sum(sales[sales])')) {
      result = `$${currentLocal.kpis.totalSales.toLocaleString()}`;
      description = 'Evaluated SUM(Sales[Sales]) across active slicer filter context.';
    } else if (queryLower.includes('profit margin')) {
      result = `${currentLocal.kpis.profitMargin}%`;
      description = 'Evaluated Measure: [Total Profit] / [Total Sales].';
    } else if (queryLower.includes('calculate')) {
      const techSales = salesData.filter(d => d.Category === 'Technology').reduce((a, c) => a + c.Sales, 0);
      result = `$${techSales.toLocaleString()}`;
      description = 'Evaluated CALCULATE with filter context Category = "Technology".';
    } else {
      result = `$${currentLocal.kpis.totalSales.toLocaleString()}`;
      description = 'Evaluated expression against active data model.';
    }

    return {
      result,
      description,
      timestamp: new Date().toISOString()
    };
  };

  const handleExportCSV = () => {
    const dataToExport = currentLocal.filteredRows;
    if (!dataToExport.length) return;

    const headers = Object.keys(dataToExport[0]).join(',');
    const rows = dataToExport.map(r => Object.values(r).join(',')).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(`${headers}\n${rows}`);

    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `PowerBI_Sales_Report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeKpis = kpiData ? kpiData.kpis : currentLocal.kpis;
  const activeCharts = kpiData ? kpiData.charts : currentLocal.charts;

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={fetchBackendData}
        onExportCSV={handleExportCSV}
        recordCount={currentLocal.filteredRows.length}
      />

      <div className="main-content">
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
        />

        <main className="view-canvas">
          {activeTab === 'report' && (
            <>
              <KpiCards kpis={activeKpis} />
              <ReportView charts={activeCharts} salesData={currentLocal.filteredRows} />
            </>
          )}

          {activeTab === 'data' && (
            <DataView salesData={currentLocal.filteredRows} onExportCSV={handleExportCSV} />
          )}

          {activeTab === 'model' && (
            <ModelView />
          )}

          {activeTab === 'dax' && (
            <DaxPlayground onEvaluateDax={handleEvaluateDax} />
          )}
        </main>
      </div>
    </div>
  );
}
