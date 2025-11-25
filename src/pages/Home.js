import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { protocols } from '../data/protocolsData';
import ProtocolCard from '../components/common/ProtocolCard';
import './Home.css';

const Home = () => {
  const protocolList = Object.values(protocols);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__grid"></div>
          <div className="hero__glow"></div>
        </div>
        
        <motion.div 
          className="hero__content container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero__badge">Créé par OUGO</span>
          <h1 className="hero__title">
            Protocoles de Communication
            <span className="text-gradient"> Automobile</span>
          </h1>
          <p className="hero__subtitle">
            Explorez en profondeur les protocoles qui permettent aux véhicules modernes 
            de fonctionner : CAN, CAN FD, LIN, FlexRay, MOST et Ethernet automobile. 
            Comprenez leur architecture, leurs trames et leur fonctionnement temps réel.
          </p>
          <div className="hero__actions">
            <Link to="/comparison" className="btn btn-primary">
              Comparer les Protocoles
            </Link>
            <Link to="/simulation" className="btn btn-outline">
              Voir les Simulations
            </Link>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <span className="stat__value">6</span>
              <span className="stat__label">Protocoles</span>
            </div>
            <div className="stat">
              <span className="stat__value">100+</span>
              <span className="stat__label">ECUs par véhicule</span>
            </div>
            <div className="stat">
              <span className="stat__value">10 Gbit/s</span>
              <span className="stat__label">Débit max Ethernet</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Protocols Overview */}
      <section className="protocols-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Les Protocoles Automobiles</h2>
            <p>
              Découvrez les six protocoles majeurs utilisés dans les réseaux embarqués 
              des véhicules modernes. Chacun répond à des besoins spécifiques.
            </p>
          </motion.div>

          <motion.div 
            className="protocols-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {protocolList.map((protocol) => (
              <motion.div key={protocol.id} variants={itemVariants}>
                <ProtocolCard protocol={protocol} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="architecture-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Architecture Réseau Véhicule</h2>
            <p>
              Un véhicule moderne contient plusieurs domaines fonctionnels, 
              chacun utilisant le protocole le plus adapté à ses besoins.
            </p>
          </motion.div>

          <motion.div 
            className="architecture-diagram"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="architecture-central">
              <div className="gateway-box">
                <span className="gateway-label">Gateway Central</span>
                <span className="gateway-sub">Routage inter-protocoles</span>
              </div>
            </div>

            <div className="architecture-domains">
              <div className="domain domain--powertrain">
                <div className="domain__header" style={{ backgroundColor: 'rgba(255, 107, 53, 0.2)', borderColor: '#ff6b35' }}>
                  <h4>Powertrain</h4>
                  <span className="domain__protocol">CAN / CAN FD</span>
                </div>
                <ul className="domain__ecus">
                  <li>ECU Moteur</li>
                  <li>Transmission</li>
                  <li>Gestion Batterie</li>
                </ul>
              </div>

              <div className="domain domain--chassis">
                <div className="domain__header" style={{ backgroundColor: 'rgba(157, 78, 221, 0.2)', borderColor: '#9d4edd' }}>
                  <h4>Chassis / Safety</h4>
                  <span className="domain__protocol">FlexRay</span>
                </div>
                <ul className="domain__ecus">
                  <li>Direction EPS</li>
                  <li>ABS / ESP</li>
                  <li>Suspension Active</li>
                </ul>
              </div>

              <div className="domain domain--body">
                <div className="domain__header" style={{ backgroundColor: 'rgba(6, 214, 160, 0.2)', borderColor: '#06d6a0' }}>
                  <h4>Body / Confort</h4>
                  <span className="domain__protocol">LIN</span>
                </div>
                <ul className="domain__ecus">
                  <li>Vitres / Rétros</li>
                  <li>Sièges</li>
                  <li>Climatisation</li>
                </ul>
              </div>

              <div className="domain domain--infotainment">
                <div className="domain__header" style={{ backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: '#00d4ff' }}>
                  <h4>Infotainment</h4>
                  <span className="domain__protocol">MOST / Ethernet</span>
                </div>
                <ul className="domain__ecus">
                  <li>Head Unit</li>
                  <li>Amplificateur</li>
                  <li>Écrans</li>
                </ul>
              </div>

              <div className="domain domain--adas">
                <div className="domain__header" style={{ backgroundColor: 'rgba(100, 255, 218, 0.2)', borderColor: '#64ffda' }}>
                  <h4>ADAS</h4>
                  <span className="domain__protocol">Ethernet 1Gbit/s</span>
                </div>
                <ul className="domain__ecus">
                  <li>Caméras</li>
                  <li>Radar / LiDAR</li>
                  <li>Fusion Capteurs</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Fonctionnalités Interactives</h2>
            <p>
              Des outils pédagogiques pour comprendre en profondeur 
              le fonctionnement des réseaux automobiles.
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </div>
              <h3>Comparaison Détaillée</h3>
              <p>
                Comparez les protocoles selon de nombreux critères : débit, payload, 
                topologie, déterminisme, coût et cas d'utilisation.
              </p>
              <Link to="/comparison" className="feature-link">
                Explorer la comparaison
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3>Simulation Temps Réel</h3>
              <p>
                Visualisez l'arbitrage CAN, la transmission de trames, 
                le scheduling LIN et les cycles FlexRay en temps réel.
              </p>
              <Link to="/simulation" className="feature-link">
                Lancer les simulations
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Digital Twin</h3>
              <p>
                Explorez un jumeau numérique d'un réseau véhicule complet 
                avec tous ses domaines et protocoles interconnectés.
              </p>
              <Link to="/digital-twin" className="feature-link">
                Voir le Digital Twin
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Évolution des Protocoles</h2>
            <p>
              L'histoire des protocoles de communication automobile, 
              des années 1980 à aujourd'hui.
            </p>
          </motion.div>

          <div className="timeline">
            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#ff6b35' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">1986</span>
                <h4>CAN - Controller Area Network</h4>
                <p>Bosch développe le CAN pour réduire le câblage complexe dans les véhicules. Premier standard de communication automobile.</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#06d6a0' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">1999</span>
                <h4>LIN - Local Interconnect Network</h4>
                <p>Consortium BMW, VW, Audi crée le LIN comme solution low-cost pour les capteurs et actionneurs simples.</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#00d4ff' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">2001</span>
                <h4>MOST - Media Oriented Systems Transport</h4>
                <p>MOST25 introduit pour le streaming audio/vidéo haute qualité via fibre optique dans les véhicules premium.</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#9d4edd' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">2005</span>
                <h4>FlexRay</h4>
                <p>Premier protocole déterministe pour les applications safety-critical comme le brake-by-wire et steer-by-wire.</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#ff8c42' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">2012</span>
                <h4>CAN FD - Flexible Data-rate</h4>
                <p>Bosch étend le CAN avec des payloads jusqu'à 64 octets et des débits jusqu'à 8 Mbit/s pour l'ADAS.</p>
              </div>
            </motion.div>

            <motion.div 
              className="timeline-item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker" style={{ backgroundColor: '#64ffda' }}></div>
              <div className="timeline-content">
                <span className="timeline-year">2015</span>
                <h4>Automotive Ethernet</h4>
                <p>100BASE-T1 standardisé. Début de la convergence vers l'Ethernet pour unifier tous les domaines véhicule.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Prêt à Explorer ?</h2>
            <p>
              Commencez votre apprentissage des protocoles de communication automobile 
              avec nos simulations interactives et notre digital twin.
            </p>
            <div className="cta-actions">
              <Link to="/simulation" className="btn btn-primary">
                Commencer les Simulations
              </Link>
              <Link to="/digital-twin" className="btn btn-outline">
                Explorer le Digital Twin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
