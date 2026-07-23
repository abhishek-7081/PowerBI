import React from 'react';
import { GitFork, Link, Layers, Key } from 'lucide-react';

export default function ModelView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ background: 'var(--pbi-card)', padding: '1rem 1.25rem', borderRadius: 10, border: '1px solid var(--pbi-border)' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--pbi-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitFork size={18} color="var(--pbi-yellow)" />
          Power BI Data Model Diagram (Star Schema)
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--pbi-text-secondary)', marginTop: '0.25rem' }}>
          Visualizing data relationships between Fact and Dimension tables connected via primary keys with 1:Many relationships.
        </p>
      </div>

      <div className="model-canvas">
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', position: 'relative' }}>
          
          {/* Dimension Table: Calendar */}
          <div className="table-node">
            <div className="table-node-header">
              <span>DimDate</span>
              <Layers size={14} />
            </div>
            <div className="table-node-body">
              <div className="table-field pk">
                <span><Key size={12} style={{ display: 'inline', marginRight: 4 }} /> DateKey</span>
                <span>PK</span>
              </div>
              <div className="table-field"><span>FullDate</span></div>
              <div className="table-field"><span>Year</span></div>
              <div className="table-field"><span>Month</span></div>
              <div className="table-field"><span>Quarter</span></div>
            </div>
          </div>

          {/* Connector Line 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--pbi-yellow)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>1</span>
            <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--pbi-yellow)', margin: '4rem 0' }}></div>
            <span>*</span>
          </div>

          {/* Fact Table: Sales */}
          <div className="table-node" style={{ borderColor: '#3b82f6', width: '250px' }}>
            <div className="table-node-header" style={{ background: '#3b82f6', color: '#fff' }}>
              <span>FactSales</span>
              <Layers size={14} />
            </div>
            <div className="table-node-body">
              <div className="table-field pk" style={{ color: '#60a5fa' }}>
                <span><Key size={12} style={{ display: 'inline', marginRight: 4 }} /> OrderID</span>
                <span>PK</span>
              </div>
              <div className="table-field"><span>Date</span><span>FK</span></div>
              <div className="table-field"><span>Region</span></div>
              <div className="table-field"><span>Category</span></div>
              <div className="table-field"><span>Product</span><span>FK</span></div>
              <div className="table-field"><span>Sales</span></div>
              <div className="table-field"><span>Profit</span></div>
              <div className="table-field"><span>Units</span></div>
            </div>
          </div>

          {/* Connector Line 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--pbi-yellow)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>1</span>
            <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--pbi-yellow)', margin: '4rem 0' }}></div>
            <span>*</span>
          </div>

          {/* Dimension Table: Product */}
          <div className="table-node">
            <div className="table-node-header">
              <span>DimProduct</span>
              <Layers size={14} />
            </div>
            <div className="table-node-body">
              <div className="table-field pk">
                <span><Key size={12} style={{ display: 'inline', marginRight: 4 }} /> ProductID</span>
                <span>PK</span>
              </div>
              <div className="table-field"><span>ProductName</span></div>
              <div className="table-field"><span>Category</span></div>
              <div className="table-field"><span>UnitCost</span></div>
              <div className="table-field"><span>UnitPrice</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
