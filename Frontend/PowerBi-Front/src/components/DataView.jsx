import React from 'react';
import { Database, Download, FileSpreadsheet } from 'lucide-react';

export default function DataView({ salesData, onExportCSV }) {
  return (
    <div className="table-card">
      <div className="chart-header">
        <div className="chart-title">
          <Database size={18} color="var(--pbi-yellow)" />
          Underlying Dataset View (`Sales` Table)
        </div>
        <button className="btn-pbi btn-primary" onClick={onExportCSV}>
          <Download size={14} />
          Download CSV
        </button>
      </div>

      <div style={{ padding: '0.75rem 0', color: 'var(--pbi-text-secondary)', fontSize: '0.85rem' }}>
        <FileSpreadsheet size={15} style={{ display: 'inline', marginRight: 6 }} />
        Showing <strong>{salesData.length}</strong> imported rows and <strong>8</strong> data columns.
      </div>

      <div className="pbi-table-wrapper" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <table className="pbi-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date [Date]</th>
              <th>Region [Text]</th>
              <th>Category [Text]</th>
              <th>Product [Text]</th>
              <th>Segment [Text]</th>
              <th style={{ textAlign: 'right' }}>Units [Int]</th>
              <th style={{ textAlign: 'right' }}>Sales [Decimal]</th>
              <th style={{ textAlign: 'right' }}>Profit [Decimal]</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row, index) => (
              <tr key={index}>
                <td style={{ color: 'var(--pbi-text-muted)' }}>{index + 1}</td>
                <td>{row.Date}</td>
                <td>{row.Region}</td>
                <td>{row.Category}</td>
                <td style={{ fontWeight: 600 }}>{row.Product}</td>
                <td>{row.Segment}</td>
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
  );
}
