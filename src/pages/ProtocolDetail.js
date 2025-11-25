import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protocols } from '../data/protocolsData';
import FrameVisualizer from '../components/visualizers/FrameVisualizer';
import './ProtocolDetail.css';

const ProtocolDetail = () => {
  const { protocolId } = useParams();
  
  // Find the protocol by id
  const protocol = Object.values(protocols).find(p => p.id === protocolId);
  
  if (!protocol) {
    return (
      <div className="protocol-detail">
        <div className="container">
          <div className="error-state">
            <h3>Protocole non trouvé</h3>
            <p>Le protocole demandé n'existe pas.</p>
            <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
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
              Retour aux protocoles
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

            <p className="protocol-hero__description">{protocol.description}</p>

            <div className="protocol-hero__meta">
              <div className="meta-item">
                <span className="meta-label">Année</span>
                <span className="meta-value">{protocol.year}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Standard</span>
                <span className="meta-value">{protocol.standard}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Inventeur</span>
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
            <h2 className="section-title">Caractéristiques Techniques</h2>
            
            <div className="characteristics-grid">
              <div className="char-card">
                <div className="char-icon" style={{ color: protocol.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <div className="char-content">
                  <span className="char-label">Débit Maximum</span>
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
                  <span className="char-label">Taille Payload</span>
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
                  <span className="char-label">Topologie</span>
                  <span className="char-value">{protocol.characteristics.topology}</span>
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
                  <span className="char-label">Support Physique</span>
                  <span className="char-value">{protocol.characteristics.medium}</span>
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
                  <span className="char-label">Nombre de Noeuds</span>
                  <span className="char-value">{protocol.characteristics.maxNodes || 'Variable'}</span>
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
                  <span className="char-label">Déterminisme</span>
                  <span className="char-value">
                    {protocol.characteristics.deterministic === true ? 'Oui' : 
                     protocol.characteristics.deterministic === false ? 'Non' : 
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
              <h2 className="section-title">Structure de la Trame</h2>
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
              <h2 className="section-title">Mécanisme d'Arbitrage</h2>
              
              <div className="arbitration-card">
                <div className="arbitration-header">
                  <h3>{protocol.arbitration.method}</h3>
                  <p>{protocol.arbitration.description}</p>
                </div>

                <div className="arbitration-rules">
                  <h4>Règles d'Arbitrage</h4>
                  <ul>
                    {protocol.arbitration.rules.map((rule, index) => (
                      <li key={index}>
                        <span className="rule-number">{index + 1}</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {protocol.arbitration.example && (
                  <div className="arbitration-example">
                    <h4>Exemple d'Arbitrage</h4>
                    <div className="example-nodes">
                      {Object.entries(protocol.arbitration.example)
                        .filter(([key]) => key.startsWith('node'))
                        .map(([key, node]) => (
                          <div 
                            key={key} 
                            className={`example-node ${node.wins ? 'winner' : 'loser'}`}
                          >
                            <span className="node-name">{key.replace('node', 'Noeud ')}</span>
                            <span className="node-id">ID: {node.id}</span>
                            <span className="node-binary">{node.binary}</span>
                            <span className={`node-status ${node.wins ? 'wins' : 'loses'}`}>
                              {node.wins ? 'GAGNE' : 'PERD'}
                            </span>
                          </div>
                        ))}
                    </div>
                    <p className="example-explanation">
                      {protocol.arbitration.example.explanation}
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
              <h2 className="section-title">Couche Physique</h2>
              
              <div className="physical-layer-card">
                <p className="physical-description">{protocol.physicalLayer.description}</p>
                
                <div className="voltage-diagram">
                  <h4>Niveaux de Tension</h4>
                  <div className="voltage-levels">
                    <div className="voltage-state recessive">
                      <span className="state-name">Récessif (1)</span>
                      <div className="voltage-values">
                        <span>CAN_H: {protocol.physicalLayer.voltages.recessive.canH}V</span>
                        <span>CAN_L: {protocol.physicalLayer.voltages.recessive.canL}V</span>
                        <span>Diff: {protocol.physicalLayer.voltages.recessive.differential}V</span>
                      </div>
                    </div>
                    <div className="voltage-state dominant">
                      <span className="state-name">Dominant (0)</span>
                      <div className="voltage-values">
                        <span>CAN_H: {protocol.physicalLayer.voltages.dominant.canH}V</span>
                        <span>CAN_L: {protocol.physicalLayer.voltages.dominant.canL}V</span>
                        <span>Diff: {protocol.physicalLayer.voltages.dominant.differential}V</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="termination-info">
                  <h4>Terminaison</h4>
                  <p>{protocol.physicalLayer.termination}</p>
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
              <h2 className="section-title">Gestion des Erreurs</h2>
              
              <div className="error-mechanisms">
                {protocol.errorHandling.mechanisms.map((mechanism, index) => (
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
                  <h4>Compteurs d'Erreurs</h4>
                  <div className="counters-grid">
                    <div className="counter">
                      <span className="counter-abbr">TEC</span>
                      <span className="counter-name">{protocol.errorHandling.errorCounters.TEC}</span>
                    </div>
                    <div className="counter">
                      <span className="counter-abbr">REC</span>
                      <span className="counter-name">{protocol.errorHandling.errorCounters.REC}</span>
                    </div>
                  </div>
                  <div className="error-states">
                    <h5>États d'Erreur</h5>
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
            <h2 className="section-title">Applications</h2>
            
            <div className="applications-grid">
              {protocol.applications.map((app, index) => (
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
                  Avantages
                </h3>
                <ul>
                  {protocol.advantages.map((adv, index) => (
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
                  Inconvénients
                </h3>
                <ul>
                  {protocol.disadvantages.map((dis, index) => (
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
          <h3>Explorer d'autres protocoles</h3>
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
