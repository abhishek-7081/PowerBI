import React from 'react';
import { LayoutDashboard, Database, GitFork, Calculator, RefreshCw, Download, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onRefresh, onExportCSV, recordCount }) {
  return (
    <header className="pbi-navbar">
      <div className="brand-section">
        <div className="pbi-logo">Pb</div>
        <div className="project-title">
          Power BI Executive Sales Report
          <span className="badge-mode">DirectQuery • {recordCount} Records</span>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          <LayoutDashboard size={16} />
          Report View
        </button>
        <button
          className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          <Database size={16} />
          Data View
        </button>
        <button
          className={`tab-btn ${activeTab === 'model' ? 'active' : ''}`}
          onClick={() => setActiveTab('model')}
        >
          <GitFork size={16} />
          Model View
        </button>
        <button
          className={`tab-btn ${activeTab === 'dax' ? 'active' : ''}`}
          onClick={() => setActiveTab('dax')}
        >
          <Calculator size={16} />
          DAX Playground
        </button>
      </nav>

      <div className="nav-actions">
        <button className="btn-pbi btn-secondary" onClick={onRefresh} title="Refresh Power BI Model Data">
          <RefreshCw size={15} />
          Refresh
        </button>
        <button className="btn-pbi btn-primary" onClick={onExportCSV} title="Export Dataset to CSV">
          <Download size={15} />
          Export Data
        </button>
      </div>
    </header>
  );
}
