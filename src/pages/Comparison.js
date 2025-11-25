import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { protocols, comparisonData } from '../data/protocolsData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './Comparison.css';

const Comparison = () => {
  const [selectedProtocols, setSelectedProtocols] = useState(['CAN', 'CANFD', 'LIN', 'FlexRay', 'MOST', 'Ethernet']);
  const [activeTab, setActiveTab] = useState('table');

  const protocolList = Object.values(protocols);

  const toggleProtocol = (protocolName) => {
    setSelectedProtocols(prev => {
      if (prev.includes(protocolName)) {
        return prev.filter(p => p !== protocolName);
      }
      return [...prev, protocolName];
    });
  };

  // Prepare chart data
  const getChartData = (criteriaId) => {
    const criteria = comparisonData.criteria.find(c => c.id === criteriaId);
    if (!criteria) return [];
    
    return selectedProtocols.map(pName => {
      const value = criteria.values[pName];
      return {
        name: pName,
        value: typeof value?.value === 'number' ? value.value : 0,
        display: value?.display || 'N/A',
        fill: protocols[pName]?.color || '#64ffda'
      };
    });
  };

  // Radar chart data
  const getRadarData = () => {
    const metrics = ['bitrate', 'payload', 'cost', 'deterministic'];
    
    return metrics.map(metricId => {
      const criteria = comparisonData.criteria.find(c => c.id === metricId);
      const dataPoint = { metric: criteria?.name || metricId };
      
      selectedProtocols.forEach(pName => {
        const value = criteria?.values[pName];
        let normalizedValue = 0;
        
        if (metricId === 'bitrate') {
          normalizedValue = Math.log10(value?.value || 1) * 10;
        } else if (metricId === 'payload') {
          normalizedValue = (value?.value || 0) / 15;
        } else if (metricId === 'cost') {
          normalizedValue = (6 - (value?.value || 3)) * 20;
        } else if (metricId === 'deterministic') {
          normalizedValue = value?.value === true ? 100 : value?.value === false ? 20 : 60;
        }
        
        dataPoint[pName] = Math.min(100, Math.max(0, normalizedValue));
      });
      
      return dataPoint;
    });
  };

  const formatBitrate = (value) => {
    if (value >= 1000000000) return `${value / 1000000000} Gbit/s`;
    if (value >= 1000000) return `${value / 1000000} Mbit/s`;
    if (value >= 1000) return `${value / 1000} kbit/s`;
    return `${value} bit/s`;
  };

  return (
    <div className="comparison-page">
      <section className="comparison-hero section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Comparaison des Protocoles</h1>
            <p className="comparison-intro">
              Analysez et comparez les caractéristiques techniques des protocoles 
              de communication automobile selon différents critères.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protocol Selector */}
      <section className="protocol-selector section">
        <div className="container">
          <h3>Sélectionnez les protocoles à comparer</h3>
          <div className="protocol-toggles">
            {protocolList.map(protocol => (
              <button
                key={protocol.id}
                className={`protocol-toggle ${selectedProtocols.includes(protocol.name === 'CAN FD' ? 'CANFD' : protocol.name) ? 'active' : ''}`}
                style={{ 
                  '--protocol-color': protocol.color,
                  borderColor: selectedProtocols.includes(protocol.name === 'CAN FD' ? 'CANFD' : protocol.name) ? protocol.color : 'transparent'
                }}
                onClick={() => toggleProtocol(protocol.name === 'CAN FD' ? 'CANFD' : protocol.name)}
              >
                <span 
                  className="toggle-indicator"
                  style={{ backgroundColor: protocol.color }}
                ></span>
                {protocol.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* View Tabs */}
      <section className="comparison-content section">
        <div className="container">
          <div className="view-tabs">
            <button 
              className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
              onClick={() => setActiveTab('table')}
            >
              Tableau Comparatif
            </button>
            <button 
              className={`tab-btn ${activeTab === 'charts' ? 'active' : ''}`}
              onClick={() => setActiveTab('charts')}
            >
              Graphiques
            </button>
            <button 
              className={`tab-btn ${activeTab === 'usecases' ? 'active' : ''}`}
              onClick={() => setActiveTab('usecases')}
            >
              Cas d'Utilisation
            </button>
          </div>

          {/* Table View */}
          {activeTab === 'table' && (
            <motion.div 
              className="comparison-table-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Critère</th>
                      {selectedProtocols.map(pName => {
                        const protocol = protocolList.find(p => 
                          p.name === pName || (p.name === 'CAN FD' && pName === 'CANFD')
                        );
                        return (
                          <th 
                            key={pName}
                            style={{ color: protocol?.color }}
                          >
                            {protocol?.name || pName}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.criteria.map(criteria => (
                      <tr key={criteria.id}>
                        <td className="criteria-cell">
                          <span className="criteria-name">{criteria.name}</span>
                          <span className="criteria-desc">{criteria.description}</span>
                        </td>
                        {selectedProtocols.map(pName => {
                          const value = criteria.values[pName];
                          return (
                            <td key={pName} className="value-cell">
                              {value?.display || 'N/A'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Charts View */}
          {activeTab === 'charts' && (
            <motion.div 
              className="charts-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Bitrate Chart */}
              <div className="chart-card">
                <h3>Débit Maximum (échelle logarithmique)</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData('bitrate')} layout="vertical">
                      <XAxis 
                        type="number" 
                        scale="log" 
                        domain={['auto', 'auto']}
                        tickFormatter={formatBitrate}
                        stroke="#8892b0"
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={80}
                        stroke="#8892b0"
                      />
                      <Tooltip 
                        formatter={(value) => formatBitrate(value)}
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          border: '1px solid #64ffda',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 4, 4, 0]}
                        fill="#64ffda"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Payload Chart */}
              <div className="chart-card">
                <h3>Taille Payload Maximum (octets)</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData('payload')}>
                      <XAxis dataKey="name" stroke="#8892b0" />
                      <YAxis stroke="#8892b0" />
                      <Tooltip 
                        formatter={(value) => `${value} octets`}
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          border: '1px solid #64ffda',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]}
                        fill="#00d4ff"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="chart-card chart-card--wide">
                <h3>Comparaison Multi-Critères</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={getRadarData()}>
                      <PolarGrid stroke="#495670" />
                      <PolarAngleAxis 
                        dataKey="metric" 
                        stroke="#8892b0"
                        tick={{ fill: '#8892b0', fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]}
                        stroke="#495670"
                      />
                      {selectedProtocols.map(pName => {
                        const protocol = protocolList.find(p => 
                          p.name === pName || p.name === 'CAN FD' && pName === 'CANFD'
                        );
                        return (
                          <Radar
                            key={pName}
                            name={protocol?.name || pName}
                            dataKey={pName}
                            stroke={protocol?.color || '#64ffda'}
                            fill={protocol?.color || '#64ffda'}
                            fillOpacity={0.1}
                          />
                        );
                      })}
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#112240', 
                          border: '1px solid #64ffda',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="radar-legend">
                  {selectedProtocols.map(pName => {
                    const protocol = protocolList.find(p => 
                      p.name === pName || p.name === 'CAN FD' && pName === 'CANFD'
                    );
                    return (
                      <span 
                        key={pName} 
                        className="legend-item"
                        style={{ color: protocol?.color }}
                      >
                        <span 
                          className="legend-dot"
                          style={{ backgroundColor: protocol?.color }}
                        ></span>
                        {protocol?.name || pName}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Use Cases View */}
          {activeTab === 'usecases' && (
            <motion.div 
              className="usecases-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {Object.entries(comparisonData.useCases).map(([key, useCase]) => (
                <div key={key} className="usecase-card">
                  <div className="usecase-header">
                    <h3>{useCase.name}</h3>
                    <p>{useCase.description}</p>
                  </div>
                  
                  <div className="usecase-content">
                    <div className="recommended-protocols">
                      <h4>Protocoles Recommandés</h4>
                      <div className="protocol-badges">
                        {useCase.recommended.map(pName => {
                          const protocol = protocolList.find(p => 
                            p.name === pName || p.name.includes(pName)
                          );
                          return (
                            <span 
                              key={pName}
                              className="protocol-badge"
                              style={{ 
                                backgroundColor: `${protocol?.color || '#64ffda'}20`,
                                borderColor: protocol?.color || '#64ffda',
                                color: protocol?.color || '#64ffda'
                              }}
                            >
                              {pName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="usecase-examples">
                      <h4>Exemples d'Applications</h4>
                      <ul>
                        {useCase.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Summary Cards */}
      <section className="summary-section section">
        <div className="container">
          <h2>Résumé des Forces</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#ff6b35' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Le Plus Fiable</h3>
              <span className="summary-protocol">CAN / CAN FD</span>
              <p>Excellente gestion des erreurs avec 5 mécanismes de détection</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#64ffda' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>Le Plus Rapide</h3>
              <span className="summary-protocol">Automotive Ethernet</span>
              <p>Jusqu'à 10 Gbit/s pour les applications haute performance</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#06d6a0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Le Moins Cher</h3>
              <span className="summary-protocol">LIN</span>
              <p>Un seul fil, parfait pour les capteurs et actionneurs simples</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#9d4edd' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Le Plus Déterministe</h3>
              <span className="summary-protocol">FlexRay</span>
              <p>TDMA garantit des temps de transmission prévisibles</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#00d4ff' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <h3>Meilleur pour le Multimédia</h3>
              <span className="summary-protocol">MOST</span>
              <p>Streaming synchrone optimisé pour l'audio/vidéo</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#ffd166' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h3>Le Plus Polyvalent</h3>
              <span className="summary-protocol">CAN FD</span>
              <p>Combine compatibilité CAN et performances améliorées</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comparison;
