import React, { useState } from 'react';
import { Calculator, Play, CheckCircle, Code, HelpCircle } from 'lucide-react';

const PRESET_DAX = [
  {
    name: 'Total Revenue',
    formula: 'Total Sales = SUM(Sales[Sales])',
    description: 'Aggregates total gross revenue across all sales transactions.'
  },
  {
    name: 'Net Profit Margin %',
    formula: 'Profit Margin = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Sales]), 0) * 100',
    description: 'Calculates overall profit efficiency percentage using safe DIVIDE.'
  },
  {
    name: 'Technology Sales Filter',
    formula: 'Tech Sales = CALCULATE(SUM(Sales[Sales]), Sales[Category] = "Technology")',
    description: 'Evaluates sum of sales under modified filter context (Category = Technology).'
  },
  {
    name: 'YTD Revenue Growth',
    formula: 'YTD Sales = TOTALYTD(SUM(Sales[Sales]), Sales[Date])',
    description: 'Computes year-to-date cumulative revenue for calendar year.'
  },
  {
    name: 'Average Order Value',
    formula: 'AOV = AVERAGE(Sales[Sales])',
    description: 'Calculates mean revenue per transaction record.'
  }
];

export default function DaxPlayground({ onEvaluateDax }) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_DAX[0]);
  const [daxQuery, setDaxQuery] = useState(PRESET_DAX[0].formula);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await onEvaluateDax(daxQuery);
      setResult(res);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setDaxQuery(preset.formula);
    setResult(null);
  };

  return (
    <div className="dax-container">
      
      {/* Sidebar presets */}
      <div className="dax-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--pbi-text)' }}>
          <Calculator size={16} color="var(--pbi-yellow)" />
          DAX Measures Library
        </div>

        <div className="dax-preset-list">
          {PRESET_DAX.map((preset, idx) => (
            <button
              key={idx}
              className={`dax-preset-btn ${selectedPreset.name === preset.name ? 'active' : ''}`}
              onClick={() => handleSelectPreset(preset)}
            >
              <div className="dax-preset-name">{preset.name}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--pbi-text-secondary)' }}>
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Results */}
      <div className="dax-editor-panel">
        
        <div className="dax-editor-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--pbi-text-secondary)' }}>
              <Code size={16} color="var(--pbi-yellow)" />
              DAX Expression Editor (Tabular Engine)
            </div>
            <button className="btn-pbi btn-primary" onClick={handleRun} disabled={loading}>
              <Play size={14} />
              {loading ? 'Evaluating...' : 'Evaluate DAX'}
            </button>
          </div>

          <textarea
            className="dax-textarea"
            value={daxQuery}
            onChange={(e) => setDaxQuery(e.target.value)}
            placeholder="Write DAX expression..."
          />
        </div>

        {/* Evaluation Output */}
        <div className="dax-result-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--pbi-text)' }}>
            <CheckCircle size={16} color="var(--pbi-accent-green)" />
            Execution Result
          </div>

          {result ? (
            <div>
              <div className="dax-result-val">{result.result}</div>
              <div style={{ fontSize: '0.825rem', color: 'var(--pbi-text-secondary)', marginTop: '0.4rem' }}>
                {result.description}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--pbi-text-muted)', marginTop: '0.5rem' }}>
                Engine Timestamp: {result.timestamp}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', color: 'var(--pbi-text-muted)' }}>
              Click <strong>Evaluate DAX</strong> to execute expression against the in-memory Power BI engine.
            </div>
          )}
        </div>

        {/* Info box */}
        <div style={{ background: 'var(--pbi-card)', border: '1px solid var(--pbi-border)', borderRadius: 10, padding: '1rem', fontSize: '0.8rem', color: 'var(--pbi-text-secondary)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <HelpCircle size={18} color="var(--pbi-yellow)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ color: 'var(--pbi-text)' }}>DAX Best Practice Tip:</strong> Always use `DIVIDE(numerator, denominator, alternate_result)` instead of standard `/` operators to prevent division by zero errors in Power BI.
          </div>
        </div>

      </div>

    </div>
  );
}
