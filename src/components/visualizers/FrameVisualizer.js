import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FrameVisualizer.css';

const FrameVisualizer = ({ protocol }) => {
  const [hoveredField, setHoveredField] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState('standard');

  const getFrameData = () => {
    if (protocol.id === 'can' || protocol.id === 'canfd') {
      return protocol.frame?.standard?.fields || protocol.frame?.keyFields || [];
    }
    if (protocol.id === 'lin') {
      return protocol.frame?.structure || [];
    }
    if (protocol.id === 'flexray') {
      return protocol.frame?.structure || protocol.frame?.headerFields || [];
    }
    return [];
  };

  const frameData = getFrameData();
  const totalBits = frameData.reduce((sum, field) => {
    const bits = typeof field.bits === 'number' ? field.bits : 8;
    return sum + bits;
  }, 0);

  const getFieldWidth = (bits) => {
    const numBits = typeof bits === 'number' ? bits : 8;
    return Math.max((numBits / totalBits) * 100, 5);
  };

  const getFieldColor = (index, fieldName) => {
    const colors = [
      '#ff6b35', '#ff8c42', '#ffd166', '#06d6a0', 
      '#00d4ff', '#64ffda', '#9d4edd', '#ef476f'
    ];
    
    // Special colors for specific fields
    if (fieldName.toLowerCase().includes('data')) return '#64ffda';
    if (fieldName.toLowerCase().includes('crc')) return '#ffd166';
    if (fieldName.toLowerCase().includes('id')) return '#ff6b35';
    if (fieldName.toLowerCase().includes('ack')) return '#06d6a0';
    
    return colors[index % colors.length];
  };

  return (
    <div className="frame-visualizer">
      {protocol.id === 'can' && protocol.frame?.extended && (
        <div className="frame-version-toggle">
          <button 
            className={`version-btn ${selectedVersion === 'standard' ? 'active' : ''}`}
            onClick={() => setSelectedVersion('standard')}
          >
            CAN 2.0A (11-bit ID)
          </button>
          <button 
            className={`version-btn ${selectedVersion === 'extended' ? 'active' : ''}`}
            onClick={() => setSelectedVersion('extended')}
          >
            CAN 2.0B (29-bit ID)
          </button>
        </div>
      )}

      <div className="frame-title">
        {protocol.frame?.standard?.name || protocol.frame?.name || `Trame ${protocol.name}`}
      </div>

      <div className="frame-container">
        <div className="frame-bits-ruler">
          {frameData.map((field, index) => {
            const bits = typeof field.bits === 'number' ? field.bits : 8;
            return (
              <div 
                key={index}
                className="ruler-segment"
                style={{ width: `${getFieldWidth(field.bits)}%` }}
              >
                <span className="bit-count">{bits}b</span>
              </div>
            );
          })}
        </div>

        <div className="frame-fields">
          {frameData.map((field, index) => (
            <motion.div
              key={index}
              className={`frame-field ${hoveredField === index ? 'hovered' : ''}`}
              style={{ 
                width: `${getFieldWidth(field.bits)}%`,
                backgroundColor: getFieldColor(index, field.name),
              }}
              onMouseEnter={() => setHoveredField(index)}
              onMouseLeave={() => setHoveredField(null)}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="field-name">{field.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="frame-arrow">
          <div className="arrow-line"></div>
          <div className="arrow-labels">
            <span>Début de trame</span>
            <span>Fin de trame</span>
          </div>
        </div>
      </div>

      {hoveredField !== null && frameData[hoveredField] && (
        <motion.div 
          className="field-details"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="field-details-header"
            style={{ borderColor: getFieldColor(hoveredField, frameData[hoveredField].name) }}
          >
            <h4>{frameData[hoveredField].name}</h4>
            <span className="field-size">
              {typeof frameData[hoveredField].bits === 'number' 
                ? `${frameData[hoveredField].bits} bits` 
                : frameData[hoveredField].bits}
            </span>
          </div>
          <p>{frameData[hoveredField].description}</p>
        </motion.div>
      )}

      {!hoveredField && (
        <div className="field-details field-details--placeholder">
          <p>Survolez un champ pour voir sa description</p>
        </div>
      )}

      {/* Legend */}
      <div className="frame-legend">
        <h4>Légende des champs</h4>
        <div className="legend-grid">
          {frameData.map((field, index) => (
            <div 
              key={index} 
              className="legend-item"
              onMouseEnter={() => setHoveredField(index)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <span 
                className="legend-color"
                style={{ backgroundColor: getFieldColor(index, field.name) }}
              ></span>
              <span className="legend-name">{field.name}</span>
              <span className="legend-bits">
                {typeof field.bits === 'number' ? `${field.bits}b` : field.bits}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Special sections for specific protocols */}
      {protocol.id === 'canfd' && protocol.frame?.dlcMapping && (
        <div className="dlc-mapping">
          <h4>Mapping DLC vers Taille Données</h4>
          <p className="dlc-description">{protocol.frame.dlcMapping.description}</p>
          <div className="dlc-table">
            <div className="dlc-row dlc-header">
              <span>DLC</span>
              {protocol.frame.dlcMapping.values.slice(0, 8).map(item => (
                <span key={item.dlc}>{item.dlc}</span>
              ))}
            </div>
            <div className="dlc-row">
              <span>Octets</span>
              {protocol.frame.dlcMapping.values.slice(0, 8).map(item => (
                <span key={item.dlc}>{item.bytes}</span>
              ))}
            </div>
            <div className="dlc-row dlc-header">
              <span>DLC</span>
              {protocol.frame.dlcMapping.values.slice(8).map(item => (
                <span key={item.dlc}>{item.dlc}</span>
              ))}
            </div>
            <div className="dlc-row dlc-extended">
              <span>Octets</span>
              {protocol.frame.dlcMapping.values.slice(8).map(item => (
                <span key={item.dlc} className="extended-value">{item.bytes}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {protocol.id === 'lin' && protocol.frame?.parts && (
        <div className="frame-parts">
          <h4>Structure de Communication</h4>
          <div className="parts-grid">
            <div className="part-card master">
              <span className="part-label">Maître</span>
              <span className="part-content">{protocol.frame.parts.header}</span>
            </div>
            <div className="part-arrow">→</div>
            <div className="part-card slave">
              <span className="part-label">Esclave</span>
              <span className="part-content">{protocol.frame.parts.response}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameVisualizer;
