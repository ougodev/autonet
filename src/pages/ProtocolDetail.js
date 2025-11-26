import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protocols } from '../data/protocolsData';
import FrameVisualizer from '../components/visualizers/FrameVisualizer';
import { useLanguage } from '../context/LanguageContext';
import './ProtocolDetail.css';

const ProtocolDetail = () => {
  const { protocolId } = useParams();
  const { t, language } = useLanguage();
  
  // Find the protocol by id
  const protocol = Object.values(protocols).find(p => p.id === protocolId);
  
  // Get protocol key for translations (handle special cases like 'can' -> 'CAN')
  const getProtocolKey = () => {
    if (!protocol) return null;
    const mapping = {
      'can': 'CAN',
      'canfd': 'CANFD',
      'lin': 'LIN',
      'flexray': 'FlexRay',
      'most': 'MOST',
      'ethernet': 'Ethernet'
    };
    return mapping[protocolId] || protocolId.toUpperCase();
  };
  
  const protocolKey = getProtocolKey();
  
  // Helper to get translated data or fallback to original
  const getTranslatedData = (field) => {
    const translatedData = t(`protocolsDetailData.${protocolKey}.${field}`);
    // If translation returns the key itself, use original data
    if (typeof translatedData === 'string' && translatedData.includes('protocolsDetailData')) {
      return protocol?.[field];
    }
    return translatedData;
  };
  
  // Get nested translated data
  const getNestedTranslatedData = (path) => {
    const translatedData = t(`protocolsDetailData.${protocolKey}.${path}`);
    if (typeof translatedData === 'string' && translatedData.includes('protocolsDetailData')) {
      // Navigate to the nested property in original protocol data
      const parts = path.split('.');
      let result = protocol;
      for (const part of parts) {
        result = result?.[part];
      }
      return result;
    }
    return translatedData;
  };
  
  if (!protocol) {
    return (
      <div className="protocol-detail">
        <div className="container">
          <div className="error-state">
            <h3>{t('protocolDetail.notFound')}</h3>
            <p>{t('protocolDetail.notFoundDesc')}</p>
            <Link to="/" className="btn btn-primary">{t('protocolDetail.backHome')}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="protocol-detail">
      {/* Hero Section */}
      <section 
        className="protocol-hero"
        style={{ '--protocol-color': protocol.color }}
      >
        <div className="protocol-hero__bg">
          <div className="protocol-hero__glow"></div>
        </div>
        
        <div className="container">
          <motion.div 
            className="protocol-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {t('protocolDetail.backToProtocols')}
            </Link>

            <div className="protocol-hero__header">
              <div 
                className="protocol-hero__icon"
                style={{ 
                  backgroundColor: `${protocol.color}20`,
                  borderColor: protocol.color,
                  color: protocol.color
                }}
              >
                {protocol.name.charAt(0)}
              </div>
              <div>
                <h1>{protocol.name}</h1>
                <p className="protocol-hero__fullname">{protocol.fullName}</p>
              </div>
            </div>

            <p className="protocol-hero__description">{getTranslatedData('description') || protocol.description}</p>

            <div className="protocol-hero__meta">
              <div className="meta-item">
                <span className="meta-label">{t('protocolDetail.year')}</span>
                <span className="meta-value">{protocol.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('protocolDetail.standard')}</span>
                <span className="meta-value">{protocol.standard}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">{t('protocolDetail.inventor')}</span>
                <span className="meta-value">{protocol.inventor}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t('protocolDetail.technicalCharacteristics')}</h2>
            
            <div className="characteristics-grid">
              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.maxBitrate')}</span>
                  <span className="char-value">{protocol.characteristics.maxBitrate}</span>
                </div>
              </div>

              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.payloadSize')}</span>
                  <span className="char-value">{protocol.characteristics.maxPayload}</span>
                </div>
              </div>

              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.topology')}</span>
                  <span className="char-value">{getTranslatedData('topology') || protocol.characteristics.topology}</span>
                </div>
              </div>

              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.physicalMedium')}</span>
                  <span className="char-value">{getTranslatedData('medium') || protocol.characteristics.medium}</span>
                </div>
              </div>

              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.nodeCount')}</span>
                  <span className="char-value">{getTranslatedData('maxNodes') || protocol.characteristics.maxNodes || 'Variable'}</span>
                </div>
              </div>

              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">{t('protocolDetail.determinism')}</span>
                  <span className="char-value">
                    {protocol.characteristics.deterministic === true ? t('common.yes') : 
                     protocol.characteristics.deterministic === false ? t('common.no') : 
                     protocol.characteristics.deterministic}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Frame Structure Section */}
      {protocol.frame && (
        <section className="section frame-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('protocolDetail.frameStructure')}</h2>
              <FrameVisualizer protocol={protocol} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Arbitration Section (for CAN) */}
      {protocol.arbitration && (
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('protocolDetail.arbitrationMechanism')}</h2>
              
              <div className="arbitration-card">
                <div className="arbitration-header">
                  <h3>{getNestedTranslatedData('arbitration.method') || protocol.arbitration.method}</h3>
                  <p>{getNestedTranslatedData('arbitration.description') || protocol.arbitration.description}</p>
                </div>

                <div className="arbitration-rules">
                  <h4>{t('protocolDetail.arbitrationRules')}</h4>
                  <ul>
                    {(getNestedTranslatedData('arbitration.rules') || protocol.arbitration.rules).map((rule, index) => (
                      <li key={index}>
                        <span className="rule-number">{index + 1}</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {protocol.arbitration.example && (
                  <div className="arbitration-example">
                    <h4>{t('protocolDetail.arbitrationExample')}</h4>
                    <div className="example-nodes">
                      {Object.entries(protocol.arbitration.example)
                        .filter(([key]) => key.startsWith('node'))
                        .map(([key, node]) => (
                          <div 
                            key={key} 
                            className={`example-node ${node.wins ? 'winner' : 'loser'}`}
                          >
                            <span className="node-name">{t('protocolDetail.node')} {key.replace('node', '')}</span>
                            <span className="node-id">ID: {node.id}</span>
                            <span className="node-binary">{node.binary}</span>
                            <span className={`node-status ${node.wins ? 'wins' : 'loses'}`}>
                              {node.wins ? t('protocolDetail.wins') : t('protocolDetail.loses')}
                            </span>
                          </div>
                        ))}
                    </div>
                    <p className="example-explanation">
                      {getNestedTranslatedData('arbitration.explanation') || protocol.arbitration.example.explanation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Physical Layer Section */}
      {protocol.physicalLayer && (
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('protocolDetail.physicalLayer')}</h2>
              
              <div className="physical-layer-card">
                <p className="physical-description">{getNestedTranslatedData('physicalLayer.description') || protocol.physicalLayer.description}</p>
                
                <div className="voltage-diagram">
                  <h4>{t('protocolDetail.voltageLevels')}</h4>
                  <div className="voltage-levels">
                    <div className="voltage-state recessive">
                      <span className="state-name">{t('protocolDetail.recessive')} (1)</span>
                      <div className="voltage-values">
                        <span>CAN_H: {protocol.physicalLayer.voltages.recessive.canH}V</span>
                        <span>CAN_L: {protocol.physicalLayer.voltages.recessive.canL}V</span>
                        <span>Diff: {protocol.physicalLayer.voltages.recessive.differential}V</span>
                      </div>
                    </div>
                    <div className="voltage-state dominant">
                      <span className="state-name">{t('protocolDetail.dominant')} (0)</span>
                      <div className="voltage-values">
                        <span>CAN_H: {protocol.physicalLayer.voltages.dominant.canH}V</span>
                        <span>CAN_L: {protocol.physicalLayer.voltages.dominant.canL}V</span>
                        <span>Diff: {protocol.physicalLayer.voltages.dominant.differential}V</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="termination-info">
                  <h4>{t('protocolDetail.termination')}</h4>
                  <p>{getNestedTranslatedData('physicalLayer.termination') || protocol.physicalLayer.termination}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error Handling Section */}
      {protocol.errorHandling && (
        <section className="section error-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">{t('protocolDetail.errorHandling')}</h2>
              
              <div className="error-mechanisms">
                {(getNestedTranslatedData('errorHandling.mechanisms') || protocol.errorHandling.mechanisms).map((mechanism, index) => (
                  <div key={index} className="error-card">
                    <div 
                      className="error-number"
                      style={{ backgroundColor: `${protocol.color}20`, color: protocol.color }}
                    >
                      {index + 1}
                    </div>
                    <div className="error-content">
                      <h4>{mechanism.name}</h4>
                      <p>{mechanism.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {protocol.errorHandling.errorCounters && (
                <div className="error-counters">
                  <h4>{t('protocolDetail.errorCounters')}</h4>
                  <div className="counters-grid">
                    <div className="counter">
                      <span className="counter-abbr">TEC</span>
                      <span className="counter-name">{getNestedTranslatedData('errorHandling.TEC') || protocol.errorHandling.errorCounters.TEC}</span>
                    </div>
                    <div className="counter">
                      <span className="counter-abbr">REC</span>
                      <span className="counter-name">{getNestedTranslatedData('errorHandling.REC') || protocol.errorHandling.errorCounters.REC}</span>
                    </div>
                  </div>
                  <div className="error-states">
                    <h5>{t('protocolDetail.errorStates')}</h5>
                    <div className="states-list">
                      {protocol.errorHandling.errorCounters.states.map((state, index) => (
                        <span key={index} className="error-state-badge">{state}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t('protocolDetail.applications')}</h2>
            
            <div className="applications-grid">
              {(getTranslatedData('applications') || protocol.applications).map((app, index) => (
                <div 
                  key={index} 
                  className="application-item"
                  style={{ borderLeftColor: protocol.color }}
                >
                  <span 
                    className="app-number"
                    style={{ backgroundColor: `${protocol.color}20`, color: protocol.color }}
                  >
                    {index + 1}
                  </span>
                  <span className="app-name">{app}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages & Disadvantages */}
      <section className="section pros-cons-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pros-cons-grid">
              <div className="pros-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t('protocolDetail.advantages')}
                </h3>
                <ul>
                  {(getTranslatedData('advantages') || protocol.advantages).map((adv, index) => (
                    <li key={index}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div className="cons-card">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  {t('protocolDetail.disadvantages')}
                </h3>
                <ul>
                  {(getTranslatedData('disadvantages') || protocol.disadvantages).map((dis, index) => (
                    <li key={index}>{dis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation to other protocols */}
      <section className="section nav-section">
        <div className="container">
          <h3>{t('protocolDetail.exploreOther')}</h3>
          <div className="protocol-nav-grid">
            {Object.values(protocols)
              .filter(p => p.id !== protocol.id)
              .map(p => (
                <Link 
                  key={p.id} 
                  to={`/protocol/${p.id}`}
                  className="protocol-nav-item"
                  style={{ borderColor: p.color }}
                >
                  <span 
                    className="nav-icon"
                    style={{ backgroundColor: `${p.color}20`, color: p.color }}
                  >
                    {p.name.charAt(0)}
                  </span>
                  <span className="nav-name">{p.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProtocolDetail;
