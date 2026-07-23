import React from 'react';
import { DollarSign, TrendingUp, ShoppingBag, Percent, Award } from 'lucide-react';

export default function KpiCards({ kpis }) {
  if (!kpis) return null;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-title">
          Total Revenue
          <DollarSign size={16} color="var(--pbi-yellow)" />
        </div>
        <div className="kpi-value">${(kpis.totalSales || 0).toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="trend-badge positive">▲ 14.8%</span>
          <span>vs previous period</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">
          Total Profit
          <TrendingUp size={16} color="var(--pbi-accent-green)" />
        </div>
        <div className="kpi-value">${(kpis.totalProfit || 0).toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="trend-badge positive">▲ 11.2%</span>
          <span>Net Profit Margin</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">
          Profit Margin %
          <Percent size={16} color="var(--pbi-accent-blue)" />
        </div>
        <div className="kpi-value">{kpis.profitMargin || 0}%</div>
        <div className="kpi-footer">
          <span className="trend-badge positive">▲ 2.4%</span>
          <span>Target: 25.0%</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">
          Units Sold
          <ShoppingBag size={16} color="var(--pbi-accent-purple)" />
        </div>
        <div className="kpi-value">{(kpis.totalUnits || 0).toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="trend-badge positive">▲ 8.5%</span>
          <span>Across {kpis.orderCount} orders</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-title">
          Avg Order Value
          <Award size={16} color="var(--pbi-accent-orange)" />
        </div>
        <div className="kpi-value">${(kpis.avgOrderValue || 0).toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="trend-badge positive">▲ 5.1%</span>
          <span>Per transaction</span>
        </div>
      </div>
    </div>
  );
}
