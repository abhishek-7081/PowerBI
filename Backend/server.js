import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// for csv file reading
// Helper function to read and parse CSV
function getSalesData() {
  const filePath = path.join(__dirname, 'data', 'sales_analytics.csv');
  if (!fs.existsSync(filePath)) return [];

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');
  if (lines.length <= 1) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      if (['Sales', 'Profit', 'Units'].includes(h)) {
        obj[h] = parseFloat(values[i]) || 0;
      } else {
        obj[h] = values[i];
      }
    });
    return obj;
  });
}


// Get raw sales transactions with optional query filters
app.get('/api/sales', (req, res) => {
  try {
    let data = getSalesData();
    const { region, category, segment } = req.query;

    if (region && region !== 'All') {
      data = data.filter(d => d.Region === region);
    }
    if (category && category !== 'All') {
      data = data.filter(d => d.Category === category);
    }
    if (segment && segment !== 'All') {
      data = data.filter(d => d.Segment === segment);
    }

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Aggregate KPIs and visual summary metrics
app.get('/api/kpis', (req, res) => {
  try {
    let data = getSalesData();
    const { region, category, segment } = req.query;

    if (region && region !== 'All') data = data.filter(d => d.Region === region);
    if (category && category !== 'All') data = data.filter(d => d.Category === category);
    if (segment && segment !== 'All') data = data.filter(d => d.Segment === segment);

    const totalSales = data.reduce((acc, curr) => acc + curr.Sales, 0);
    const totalProfit = data.reduce((acc, curr) => acc + curr.Profit, 0);
    const totalUnits = data.reduce((acc, curr) => acc + curr.Units, 0);
    const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
    const avgOrderValue = data.length > 0 ? totalSales / data.length : 0;

    // Monthly breakdown
    const monthlyMap = {};
    data.forEach(item => {
      const month = item.Date.substring(0, 7); // YYYY-MM
      if (!monthlyMap[month]) monthlyMap[month] = { month, sales: 0, profit: 0 };
      monthlyMap[month].sales += item.Sales;
      monthlyMap[month].profit += item.Profit;
    });

    const monthlyTrends = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    // Region breakdown
    const regionMap = {};
    data.forEach(item => {
      if (!regionMap[item.Region]) regionMap[item.Region] = { region: item.Region, sales: 0, profit: 0 };
      regionMap[item.Region].sales += item.Sales;
      regionMap[item.Region].profit += item.Profit;
    });

    // Category breakdown
    const categoryMap = {};
    data.forEach(item => {
      if (!categoryMap[item.Category]) categoryMap[item.Category] = { category: item.Category, sales: 0, profit: 0 };
      categoryMap[item.Category].sales += item.Sales;
      categoryMap[item.Category].profit += item.Profit;
    });

    res.json({
      success: true,
      kpis: {
        totalSales,
        totalProfit,
        totalUnits,
        profitMargin: parseFloat(profitMargin.toFixed(2)),
        avgOrderValue: parseFloat(avgOrderValue.toFixed(2)),
        orderCount: data.length
      },
      charts: {
        monthlyTrends,
        regionDistribution: Object.values(regionMap),
        categoryDistribution: Object.values(categoryMap)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Evaluate DAX Simulation Engine
app.post('/api/dax/evaluate', (req, res) => {
  try {
    const { daxQuery } = req.body;
    const data = getSalesData();
    let result = null;
    let description = '';

    const queryLower = (daxQuery || '').toLowerCase().trim();

    if (queryLower.includes('sum(sales[sales])')) {
      const sum = data.reduce((acc, curr) => acc + curr.Sales, 0);
      result = `$${sum.toLocaleString()}`;
      description = 'Calculated total sum of Sales column across all records.';
    } else if (queryLower.includes('sum(sales[profit])')) {
      const sum = data.reduce((acc, curr) => acc + curr.Profit, 0);
      result = `$${sum.toLocaleString()}`;
      description = 'Calculated total sum of Profit column across all records.';
    } else if (queryLower.includes('calculate') && queryLower.includes('technology')) {
      const techSales = data.filter(d => d.Category === 'Technology').reduce((acc, curr) => acc + curr.Sales, 0);
      result = `$${techSales.toLocaleString()}`;
      description = 'Calculated Sales filtered by Category = "Technology" using DAX CALCULATE().';
    } else if (queryLower.includes('profit margin')) {
      const sales = data.reduce((acc, curr) => acc + curr.Sales, 0);
      const profit = data.reduce((acc, curr) => acc + curr.Profit, 0);
      result = sales > 0 ? `${((profit / sales) * 100).toFixed(2)}%` : '0%';
      description = 'Evaluated measure: [Total Profit] / [Total Sales].';
    } else {
      const total = data.reduce((acc, curr) => acc + curr.Sales, 0);
      result = `$${total.toLocaleString()}`;
      description = 'Evaluated DAX Expression against Sales table model.';
    }

    res.json({
      success: true,
      query: daxQuery,
      result,
      description,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`⚡ Power BI Backend Server running on http://localhost:${PORT}`);
});
