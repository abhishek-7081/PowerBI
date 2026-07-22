import React from 'react';
import { Filter, RotateCcw, Globe, Tag, Users } from 'lucide-react';

export default function Sidebar({ filters, setFilters, onReset }) {
  const regions = ['All', 'North America', 'Europe', 'Asia-Pacific', 'Latin America'];
  const categories = ['All', 'Technology', 'Furniture', 'Office Supplies'];
  const segments = ['All', 'Enterprise', 'SMB', 'Consumer'];

  return (
    <aside className="pbi-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Filter size={16} />
          Report Slicers
        </div>
        <button className="btn-reset" onClick={onReset} title="Reset all slicers">
          <RotateCcw size={13} style={{ display: 'inline', marginRight: 2 }} />
          Clear Filters
        </button>
      </div>

      {/* Region Slicer */}
      <div className="slicer-group">
        <div className="slicer-label">
          <span><Globe size={14} style={{ display: 'inline', marginRight: 5 }} /> Region</span>
        </div>
        <select
          className="slicer-select"
          value={filters.region}
          onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
        >
          {regions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Category Slicer (Pills) */}
      <div className="slicer-group">
        <div className="slicer-label">
          <span><Tag size={14} style={{ display: 'inline', marginRight: 5 }} /> Product Category</span>
        </div>
        <div className="slicer-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pill-btn ${filters.category === cat ? 'active' : ''}`}
              onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Segment Slicer */}
      <div className="slicer-group">
        <div className="slicer-label">
          <span><Users size={14} style={{ display: 'inline', marginRight: 5 }} /> Customer Segment</span>
        </div>
        <div className="slicer-pills">
          {segments.map(seg => (
            <button
              key={seg}
              className={`pill-btn ${filters.segment === seg ? 'active' : ''}`}
              onClick={() => setFilters(prev => ({ ...prev, segment: seg }))}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--pbi-border)', fontSize: '0.75rem', color: 'var(--pbi-text-muted)' }}>
        <p style={{ fontWeight: 600, color: 'var(--pbi-text-secondary)' }}>Power BI Engine</p>
        <p>Active Slicers: {[filters.region, filters.category, filters.segment].filter(x => x !== 'All').length || 'None (All Data)'}</p>
      </div>
    </aside>
  );
}
