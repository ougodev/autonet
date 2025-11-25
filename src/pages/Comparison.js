import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { protocols, comparisonData } from '../data/protocolsData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import './Comparison.css';

const Comparison = () => {
  const { t, language } = useLanguage();
  const [selectedProtocols, setSelectedProtocols] = useState(['CAN', 'CANFD', 'LIN', 'FlexRay', 'MOST', 'Ethernet']);
  const [activeTab, setActiveTab] = useState('table');

  const protocolList = Object.values(protocols);
  
  // Translate criteria values based on language
  const translateCriteriaValue = (criteriaId, pName, value) => {
    if (!value) return 'N/A';
    
    // For topology values
    if (criteriaId === 'topology') {
      const topologyMap = {
        'Bus linéaire': t('comparisonData.values.linearBus'),
        'Bus Maître-Esclave': t('comparisonData.values.masterSlaveBus'),
        'Bus/Étoile/Hybride': t('comparisonData.values.busStarHybrid'),
        'Anneau': t('comparisonData.values.ring'),
        'Étoile (Switch)': t('comparisonData.values.starSwitch')
      };
      return topologyMap[value.display] || value.display;
    }
    
    // For medium values
    if (criteriaId === 'medium') {
      const mediumMap = {
        '2 fils différentiels': t('comparisonData.values.diffWires2'),
        '1 fil + masse': t('comparisonData.values.wire1Ground'),
        '2 à 4 fils': t('comparisonData.values.wires2to4'),
        'Fibre optique/Coax': t('comparisonData.values.fiberCoax'),
        '1 paire torsadée': t('comparisonData.values.twistedPair')
      };
      return mediumMap[value.display] || value.display;
    }
    
    // For deterministic values
    if (criteriaId === 'deterministic') {
      const deterministicMap = {
        'Non': language === 'en' ? 'No' : 'Non',
        'Oui': language === 'en' ? 'Yes' : 'Oui',
        'Oui (TDMA)': t('comparisonData.values.withTDMA'),
        'Avec TSN': t('comparisonData.values.withTSN')
      };
      return deterministicMap[value.display] || value.display;
    }
    
    // For redundancy values
    if (criteriaId === 'redundancy') {
      const redundancyMap = {
        'Non': language === 'en' ? 'No' : 'Non',
        'Oui (Double canal)': t('comparisonData.values.dualChannel'),
        'Bypass anneau': t('comparisonData.values.ringBypass'),
        'Possible (802.1CB)': t('comparisonData.values.possible802')
      };
      return redundancyMap[value.display] || value.display;
    }
    
    // For cost values
    if (criteriaId === 'cost') {
      const costMap = {
        'Très faible': t('comparisonData.values.veryLow'),
        'Faible': t('comparisonData.values.low'),
        'Faible-Moyen': t('comparisonData.values.lowMedium'),
        'Moyen': t('comparisonData.values.medium'),
        'Moyen (en baisse)': t('comparisonData.values.mediumDecreasing'),
        'Élevé': t('comparisonData.values.high')
      };
      return costMap[value.display] || value.display;
    }
    
    // For payload with "octets"
    if (criteriaId === 'payload' && typeof value.display === 'string') {
      if (value.display === 'Variable') {
        return t('comparisonData.values.variable');
      }
      return value.display.replace('octets', t('comparisonData.values.bytes'));
    }
    
    return value.display;
  };

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

  // Get translated criteria name
  const getCriteriaName = (criteriaId) => {
    const key = `comparisonData.${criteriaId}.name`;
    return t(key);
  };
  
  // Get translated criteria description
  const getCriteriaDesc = (criteriaId) => {
    const key = `comparisonData.${criteriaId}.desc`;
    return t(key);
  };

  // Radar chart data
  const getRadarData = () => {
    const metrics = ['bitrate', 'payload', 'cost', 'deterministic'];
    
    return metrics.map(metricId => {
      const criteria = comparisonData.criteria.find(c => c.id === metricId);
      const dataPoint = { metric: getCriteriaName(metricId) };
      
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
            <h1>{t('comparison.title')}</h1>
            <p className="comparison-intro">
              {t('comparison.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protocol Selector */}
      <section className="protocol-selector section">
        <div className="container">
          <h3>{t('comparison.selectProtocols')}</h3>
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
              {t('comparison.tabs.table')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'charts' ? 'active' : ''}`}
              onClick={() => setActiveTab('charts')}
            >
              {t('comparison.tabs.charts')}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'usecases' ? 'active' : ''}`}
              onClick={() => setActiveTab('usecases')}
            >
              {t('comparison.tabs.usecases')}
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
                      <th>{t('comparison.criteria')}</th>
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
                          <span className="criteria-name">{getCriteriaName(criteria.id)}</span>
                          <span className="criteria-desc">{getCriteriaDesc(criteria.id)}</span>
                        </td>
                        {selectedProtocols.map(pName => {
                          const value = criteria.values[pName];
                          return (
                            <td key={pName} className="value-cell">
                              {translateCriteriaValue(criteria.id, pName, value)}
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
                <h3>{t('comparison.charts.bitrate')}</h3>
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
                <h3>{t('comparison.charts.payload')}</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData('payload')}>
                      <XAxis dataKey="name" stroke="#8892b0" />
                      <YAxis stroke="#8892b0" />
                      <Tooltip 
                        formatter={(value) => `${value} ${t('comparisonData.values.bytes')}`}
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
                <h3>{t('comparison.charts.multiCriteria')}</h3>
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
                    <h3>{t(`comparisonData.useCases.${key}.name`)}</h3>
                    <p>{t(`comparisonData.useCases.${key}.desc`)}</p>
                  </div>
                  
                  <div className="usecase-content">
                    <div className="recommended-protocols">
                      <h4>{t('comparison.usecases.recommended')}</h4>
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
                      <h4>{t('comparison.usecases.examples')}</h4>
                      <ul>
                        {t(`comparisonData.useCases.${key}.examples`).map((example, idx) => (
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
          <h2>{t('comparison.summary.title')}</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#ff6b35' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.reliable.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.reliable.protocol')}</span>
              <p>{t('comparison.summary.reliable.desc')}</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#64ffda' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.fastest.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.fastest.protocol')}</span>
              <p>{t('comparison.summary.fastest.desc')}</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#06d6a0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.cheapest.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.cheapest.protocol')}</span>
              <p>{t('comparison.summary.cheapest.desc')}</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#9d4edd' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.deterministic.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.deterministic.protocol')}</span>
              <p>{t('comparison.summary.deterministic.desc')}</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#00d4ff' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.multimedia.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.multimedia.protocol')}</span>
              <p>{t('comparison.summary.multimedia.desc')}</p>
            </div>

            <div className="summary-card">
              <div className="summary-icon" style={{ color: '#ffd166' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
              <h3>{t('comparison.summary.versatile.title')}</h3>
              <span className="summary-protocol">{t('comparison.summary.versatile.protocol')}</span>
              <p>{t('comparison.summary.versatile.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comparison;
