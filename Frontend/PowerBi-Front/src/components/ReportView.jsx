import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Search, BarChart2, PieChart as PieIcon, LineChart, Table } from 'lucide-react';

const COLORS = ['#f2c811', '#3b82f6', '#10b981', '#8b5cf6', '#f97316'];

export default function ReportView({ charts, salesData }) {
  const [searchTerm, setSearchTerm] = useState('');

  const monthlyData = charts?.monthlyTrends || [];
  const regionData = charts?.regionDistribution || [];
  const categoryData = charts?.categoryDistribution || [];

  const filteredSales = (salesData || []).filter(item =>
    item.Product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Charts Grid */}
      <div className="charts-grid">
        
        {/* Monthly Trend Area Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <LineChart size={18} color="var(--pbi-yellow)" />
              Revenue & Profit Trend Over Time (DAX YTD)
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f2c811" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f2c811" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pbi-border)" />
                <XAxis dataKey="month" stroke="var(--pbi-text-secondary)" fontSize={12} />
                <YAxis stroke="var(--pbi-text-secondary)" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--pbi-surface)', borderColor: 'var(--pbi-border)', borderRadius: 8, color: '#fff' }}
                  formatter={(val) => [`$${val.toLocaleString()}`, '']}
                />
                <Legend />
                <Area type="monotone" dataKey="sales" name="Total Sales" stroke="#f2c811" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Donut Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">
              <PieIcon size={18} color="var(--pbi-accent-blue)" />
              Sales by Category
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="sales"
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--pbi-surface)', borderColor: 'var(--pbi-border)', borderRadius: 8 }}
                  formatter={(val) => `$${val.toLocaleString()}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Regional Performance Bar Chart */}
      <div className="chart-card">
        <div className="chart-header">
          <div className="chart-title">
            <BarChart2 size={18} color="var(--pbi-accent-purple)" />
            Regional Sales & Profit Comparison
          </div>
        </div>
        <div className="chart-body" style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--pbi-border)" />
              <XAxis dataKey="region" stroke="var(--pbi-text-secondary)" fontSize={12} />
              <YAxis stroke="var(--pbi-text-secondary)" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--pbi-surface)', borderColor: 'var(--pbi-border)', borderRadius: 8 }}
                formatter={(val) => `$${val.toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="sales" name="Sales Revenue" fill="#f2c811" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Net Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Data Matrix Table */}
      <div className="table-card">
        <div className="chart-header">
          <div className="chart-title">
            <Table size={18} color="var(--pbi-yellow)" />
            Sales Transactions Matrix Visual
          </div>
          <div className="table-search">
            <Search size={15} color="var(--pbi-text-muted)" />
            <input
              type="text"
              placeholder="Search product, region, segment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="pbi-table-wrapper">
          <table className="pbi-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Region</th>
                <th>Category</th>
                <th>Product</th>
                <th>Segment</th>
                <th style={{ textAlign: 'right' }}>Units</th>
                <th style={{ textAlign: 'right' }}>Sales ($)</th>
                <th style={{ textAlign: 'right' }}>Profit ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Date}</td>
                  <td>{row.Region}</td>
                  <td>{row.Category}</td>
                  <td style={{ fontWeight: 600 }}>{row.Product}</td>
                  <td>
                    <span style={{
                      padding: '0.15rem 0.45rem',
                      borderRadius: 4,
                      fontSize: '0.725rem',
                      background: 'var(--pbi-surface)',
                      border: '1px solid var(--pbi-border)'
                    }}>
                      {row.Segment}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>{row.Units}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--pbi-yellow)' }}>
                    ${row.Sales.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--pbi-accent-green)' }}>
                    ${row.Profit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
