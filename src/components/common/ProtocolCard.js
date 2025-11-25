import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './ProtocolCard.css';

const ProtocolCard = ({ protocol }) => {
  const { t } = useLanguage();
  
  // Get translated data
  const protocolKey = protocol.name === 'CAN FD' ? 'CANFD' : protocol.name.replace(' ', '');
  const translatedData = t(`protocols.${protocolKey}`) || {};
  const description = translatedData.description || protocol.description;
  const applications = translatedData.applications || protocol.applications;
  
  // Get translated topology
  const getTranslatedTopology = (topology) => {
    const topologyMap = {
      'Bus linéaire': t('protocols.topologies.linearBus'),
      'Maître-Esclave (Bus)': t('protocols.topologies.masterSlave'),
      'Bus, Étoile, ou Hybride': t('protocols.topologies.busStarHybrid'),
      'Anneau (Ring)': t('protocols.topologies.ring'),
      'Étoile (Switch central)': t('protocols.topologies.star')
    };
    return topologyMap[topology] || topology;
  };
  
  return (
    <motion.div
      className="protocol-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="protocol-card__accent"
        style={{ backgroundColor: protocol.color }}
      ></div>
      
      <div className="protocol-card__header">
        <div 
          className="protocol-card__icon"
          style={{ 
            backgroundColor: `${protocol.color}20`,
            borderColor: protocol.color 
          }}
        >
          <span style={{ color: protocol.color }}>{protocol.name.charAt(0)}</span>
        </div>
        <div className="protocol-card__meta">
          <span className="protocol-card__year">{protocol.year}</span>
          <span 
            className="protocol-card__badge"
            style={{ 
              backgroundColor: `${protocol.color}20`,
              color: protocol.color 
            }}
          >
            {protocol.characteristics.maxBitrate}
          </span>
        </div>
      </div>

      <h3 className="protocol-card__title">{protocol.name}</h3>
      <p className="protocol-card__fullname">{protocol.fullName}</p>
      
      <p className="protocol-card__description">
        {description.substring(0, 150)}...
      </p>

      <div className="protocol-card__specs">
        <div className="spec">
          <span className="spec__label">{t('protocolCard.payload')}</span>
          <span className="spec__value">{protocol.characteristics.maxPayload}</span>
        </div>
        <div className="spec">
          <span className="spec__label">{t('protocolCard.topology')}</span>
          <span className="spec__value">{getTranslatedTopology(protocol.characteristics.topology)}</span>
        </div>
      </div>

      <div className="protocol-card__tags">
        {applications.slice(0, 3).map((app, index) => (
          <span key={index} className="tag">{app}</span>
        ))}
      </div>

      <Link 
        to={`/protocol/${protocol.id}`} 
        className="protocol-card__link"
        style={{ color: protocol.color }}
      >
        {t('protocolCard.exploreDetail')}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </motion.div>
  );
};

export default ProtocolCard;
