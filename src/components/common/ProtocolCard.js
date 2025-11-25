import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProtocolCard.css';

const ProtocolCard = ({ protocol }) => {
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
        {protocol.description.substring(0, 150)}...
      </p>

      <div className="protocol-card__specs">
        <div className="spec">
          <span className="spec__label">Payload</span>
          <span className="spec__value">{protocol.characteristics.maxPayload}</span>
        </div>
        <div className="spec">
          <span className="spec__label">Topologie</span>
          <span className="spec__value">{protocol.characteristics.topology}</span>
        </div>
      </div>

      <div className="protocol-card__tags">
        {protocol.applications.slice(0, 3).map((app, index) => (
          <span key={index} className="tag">{app}</span>
        ))}
      </div>

      <Link 
        to={`/protocol/${protocol.id}`} 
        className="protocol-card__link"
        style={{ color: protocol.color }}
      >
        Explorer en détail
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </motion.div>
  );
};

export default ProtocolCard;
