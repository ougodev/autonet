import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './DigitalTwin.css';
import { 
  RadarIcon, UltrasonicIcon, CameraIcon, FuelIcon, TemperatureIcon, BatteryIcon,
  WarningIcon, CriticalAlertIcon, InfoIcon, CheckIcon, CarIcon, NetworkIcon,
  DashboardIcon, BroadcastIcon, EnergyIcon, RefreshIcon, ShieldIcon, StopIcon, ChartIcon
} from '../components/common/Icons';

const DigitalTwin = () => {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState(null);
  const [activeMessages, setActiveMessages] = useState([]);
  const [viewMode, setViewMode] = useState('vehicle');
  const [vehicleData, setVehicleData] = useState({
    speed: 0,
    rpm: 0,
    temperature: 20,
    battery: 100,
    fuel: 85,
    gear: 'P'
  });
  const [networkStats, setNetworkStats] = useState({
    canMessages: 0,
    flexrayFrames: 0,
    ethernetPackets: 0,
    linFrames: 0,
    totalBandwidth: 0
  });
  const [alerts, setAlerts] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationRef = useRef(null);

  // Complete vehicle network topology
  const networkNodes = {
    gateway: {
      id: 'gateway',
      name: 'Central Gateway',
      type: 'gateway',
      protocol: 'Multi-Protocol',
      x: 50,
      y: 45,
      description: 'Point central de routage entre tous les domaines - Gère la sécurité et le filtrage des messages',
      bandwidth: '1 Gbit/s',
      connections: ['powertrain', 'chassis', 'body', 'infotainment', 'adas']
    },
    powertrain: {
      id: 'powertrain',
      name: 'Powertrain Domain',
      type: 'domain',
      protocol: 'CAN FD',
      color: '#ef4444',
      x: 18,
      y: 18,
      description: 'Contrôle moteur, transmission, gestion thermique et systèmes de propulsion',
      bandwidth: '5 Mbit/s',
      ecus: [
        { name: 'ECM', desc: 'Engine Control Module', status: 'active', load: 78 },
        { name: 'TCU', desc: 'Transmission Control Unit', status: 'active', load: 45 },
        { name: 'FPCM', desc: 'Fuel Pump Control Module', status: 'active', load: 22 },
        { name: 'ETC', desc: 'Electronic Throttle Control', status: 'active', load: 56 }
      ]
    },
    chassis: {
      id: 'chassis',
      name: 'Chassis Domain',
      type: 'domain',
      protocol: 'FlexRay',
      color: '#a855f7',
      x: 82,
      y: 18,
      description: 'Systèmes critiques de sécurité active - freinage, direction, suspension',
      bandwidth: '10 Mbit/s',
      ecus: [
        { name: 'ESP', desc: 'Electronic Stability Program', status: 'active', load: 89 },
        { name: 'ABS', desc: 'Anti-lock Braking System', status: 'active', load: 67 },
        { name: 'EPS', desc: 'Electric Power Steering', status: 'active', load: 54 },
        { name: 'CDC', desc: 'Continuous Damping Control', status: 'active', load: 38 }
      ]
    },
    body: {
      id: 'body',
      name: 'Body Domain',
      type: 'domain',
      protocol: 'LIN',
      color: '#22c55e',
      x: 18,
      y: 72,
      description: 'Confort, éclairage, serrures, rétroviseurs et accessoires intérieurs',
      bandwidth: '20 kbit/s',
      ecus: [
        { name: 'BCM', desc: 'Body Control Module', status: 'active', load: 34 },
        { name: 'PEPS', desc: 'Passive Entry/Start', status: 'active', load: 12 },
        { name: 'RCM', desc: 'Rain Sensor Module', status: 'active', load: 8 },
        { name: 'MLM', desc: 'Mirror Control Left', status: 'active', load: 5 }
      ]
    },
    infotainment: {
      id: 'infotainment',
      name: 'Infotainment Domain',
      type: 'domain',
      protocol: 'Ethernet',
      color: '#3b82f6',
      x: 82,
      y: 72,
      description: 'Système multimédia, navigation, connectivité smartphone et services cloud',
      bandwidth: '1 Gbit/s',
      ecus: [
        { name: 'HU', desc: 'Head Unit', status: 'active', load: 72 },
        { name: 'TCU', desc: 'Telematics Control Unit', status: 'active', load: 45 },
        { name: 'AMP', desc: 'Audio Amplifier', status: 'active', load: 28 },
        { name: 'RSE', desc: 'Rear Seat Entertainment', status: 'standby', load: 0 }
      ]
    },
    adas: {
      id: 'adas',
      name: 'ADAS Domain',
      type: 'domain',
      protocol: 'Ethernet',
      color: '#06b6d4',
      x: 50,
      y: 85,
      description: 'Aide à la conduite, détection obstacles, parking automatique et conduite autonome',
      bandwidth: '10 Gbit/s',
      ecus: [
        { name: 'ADAS ECU', desc: 'Central Processing Unit', status: 'active', load: 95 },
        { name: 'FWC', desc: 'Front Camera', status: 'active', load: 88 },
        { name: 'SRR', desc: 'Short Range Radar', status: 'active', load: 76 },
        { name: 'USS', desc: 'Ultrasonic Sensors', status: 'active', load: 42 }
      ]
    }
  };

  // Real-time message generator
  const generateMessage = useCallback(() => {
    const messages = [
      { from: 'powertrain', to: 'gateway', protocol: 'CAN FD', data: `RPM: ${Math.floor(vehicleData.rpm)}`, type: 'telemetry', priority: 'high', size: 64 },
      { from: 'chassis', to: 'gateway', protocol: 'FlexRay', data: `Wheel Speed: ${vehicleData.speed} km/h`, type: 'safety', priority: 'critical', size: 254 },
      { from: 'adas', to: 'gateway', protocol: 'Ethernet', data: `Object: ${Math.floor(Math.random() * 50 + 10)}m`, type: 'sensor', priority: 'critical', size: 1500 },
      { from: 'body', to: 'gateway', protocol: 'LIN', data: 'Lights: ON', type: 'status', priority: 'low', size: 8 },
      { from: 'infotainment', to: 'gateway', protocol: 'Ethernet', data: 'Stream: 4K HDR', type: 'media', priority: 'medium', size: 9000 },
      { from: 'powertrain', to: 'chassis', protocol: 'CAN FD', data: `Torque Request: ${Math.floor(Math.random() * 200)}Nm`, type: 'control', priority: 'high', size: 64 },
      { from: 'chassis', to: 'adas', protocol: 'FlexRay', data: 'ABS Active: NO', type: 'status', priority: 'critical', size: 254 },
      { from: 'adas', to: 'chassis', protocol: 'Ethernet', data: 'Emergency Brake: Standby', type: 'safety', priority: 'critical', size: 64 },
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, [vehicleData]);

  // Start real-time simulation
  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    let time = 0;
    
    simulationRef.current = setInterval(() => {
      time += 0.1;
      
      // Update vehicle data with realistic values
      setVehicleData(prev => ({
        speed: Math.min(120, Math.max(0, prev.speed + (Math.random() - 0.4) * 3)),
        rpm: Math.min(6500, Math.max(800, 800 + prev.speed * 40 + Math.sin(time) * 200)),
        temperature: Math.min(110, Math.max(70, prev.temperature + (Math.random() - 0.5) * 0.5)),
        battery: Math.max(0, prev.battery - 0.001),
        fuel: Math.max(0, prev.fuel - 0.002),
        gear: prev.speed < 20 ? '1' : prev.speed < 40 ? '2' : prev.speed < 60 ? '3' : prev.speed < 80 ? '4' : prev.speed < 100 ? '5' : '6'
      }));

      // Generate network messages
      const msg = generateMessage();
      setActiveMessages(prev => [...prev.slice(-15), { ...msg, id: Date.now() + Math.random() }]);

      // Update network stats
      setNetworkStats(prev => ({
        canMessages: prev.canMessages + (msg.protocol === 'CAN FD' ? 1 : 0),
        flexrayFrames: prev.flexrayFrames + (msg.protocol === 'FlexRay' ? 1 : 0),
        ethernetPackets: prev.ethernetPackets + (msg.protocol === 'Ethernet' ? 1 : 0),
        linFrames: prev.linFrames + (msg.protocol === 'LIN' ? 1 : 0),
        totalBandwidth: prev.totalBandwidth + msg.size
      }));

      // Random alerts
      if (Math.random() < 0.02) {
        setAlerts(prev => [...prev.slice(-4), {
          id: Date.now(),
          type: ['warning', 'info', 'critical'][Math.floor(Math.random() * 3)],
          message: ['ABS Intervention', 'Lane Departure Warning', 'Collision Alert', 'Tire Pressure Low'][Math.floor(Math.random() * 4)],
          time: new Date().toLocaleTimeString()
        }]);
      }
    }, 100);
  }, [generateMessage]);

  const stopSimulation = useCallback(() => {
    setIsSimulating(false);
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);

  const getProtocolColor = (protocol) => {
    const colors = {
      'CAN FD': '#ef4444',
      'FlexRay': '#a855f7',
      'LIN': '#22c55e',
      'Ethernet': '#3b82f6',
      'Multi-Protocol': '#f97316'
    };
    return colors[protocol] || '#06b6d4';
  };

  // 3D Vehicle Component
  const Vehicle3D = () => (
    <div className="vehicle-3d-container">
      <div className="vehicle-body">
        <svg viewBox="0 0 400 200" className="vehicle-svg">
          {/* Car body outline */}
          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Car silhouette */}
          <path 
            d="M50 130 L80 130 L100 100 L150 80 L250 80 L300 100 L320 130 L350 130 L350 150 L50 150 Z"
            fill="url(#carGradient)"
            stroke="#00d4ff"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Wheels */}
          <circle cx="100" cy="150" r="25" fill="#1e293b" stroke="#64748b" strokeWidth="3"/>
          <circle cx="100" cy="150" r="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="2"/>
          <circle cx="300" cy="150" r="25" fill="#1e293b" stroke="#64748b" strokeWidth="3"/>
          <circle cx="300" cy="150" r="12" fill="#0f172a" stroke="#94a3b8" strokeWidth="2"/>
          
          {/* Windows */}
          <path 
            d="M105 98 L145 82 L245 82 L285 98 L285 95 L245 80 L145 80 L105 95 Z"
            fill="rgba(0, 212, 255, 0.2)"
            stroke="#00d4ff"
            strokeWidth="1"
          />
          
          {/* ECU Nodes on vehicle */}
          <g className="ecu-indicators">
            {/* Engine ECU */}
            <motion.circle cx="130" cy="115" r="8" fill="#ef4444" 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <text x="130" y="105" fontSize="8" fill="#fff" textAnchor="middle">ECM</text>
            
            {/* Chassis */}
            <motion.circle cx="200" cy="140" r="8" fill="#a855f7" 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
            />
            <text x="200" y="130" fontSize="8" fill="#fff" textAnchor="middle">ESP</text>
            
            {/* ADAS */}
            <motion.circle cx="280" cy="100" r="8" fill="#06b6d4" 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.6 }}
            />
            <text x="280" y="90" fontSize="8" fill="#fff" textAnchor="middle">CAM</text>
            
            {/* Gateway */}
            <motion.circle cx="200" cy="100" r="10" fill="#f97316" 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <text x="200" y="90" fontSize="8" fill="#fff" textAnchor="middle">GW</text>
          </g>
          
          {/* Network lines */}
          <g className="network-lines" opacity="0.6">
            <motion.line x1="200" y1="100" x2="130" y2="115" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,2"
              animate={{ strokeDashoffset: [0, -12] }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.line x1="200" y1="100" x2="200" y2="140" stroke="#a855f7" strokeWidth="1" strokeDasharray="4,2"
              animate={{ strokeDashoffset: [0, -12] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
            <motion.line x1="200" y1="100" x2="280" y2="100" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,2"
              animate={{ strokeDashoffset: [0, -12] }} 
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
          </g>
        </svg>
      </div>
      
      {/* Sensor indicators around vehicle */}
      <div className="sensor-ring">
        <motion.div className="sensor front-sensor" 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}>
          <RadarIcon size={14} /> Radar
        </motion.div>
        <motion.div className="sensor left-sensor" 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>
          <UltrasonicIcon size={14} /> USS
        </motion.div>
        <motion.div className="sensor right-sensor" 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}>
          <UltrasonicIcon size={14} /> USS
        </motion.div>
        <motion.div className="sensor rear-sensor" 
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>
          <CameraIcon size={14} /> Camera
        </motion.div>
      </div>
    </div>
  );

  // Dashboard Gauges Component
  const DashboardGauges = () => (
    <div className="dashboard-gauges">
      <div className="gauge-container speedometer">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          
          {/* Background arc */}
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Speed arc */}
          <motion.path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="url(#speedGradient)" 
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251"
            initial={{ strokeDashoffset: 251 }}
            animate={{ strokeDashoffset: 251 - (vehicleData.speed / 200) * 251 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Speed value */}
          <text x="100" y="85" textAnchor="middle" fontSize="36" fontFamily="Orbitron" fill="#fff" fontWeight="bold">
            {Math.floor(vehicleData.speed)}
          </text>
          <text x="100" y="105" textAnchor="middle" fontSize="12" fill="#94a3b8">
            km/h
          </text>
        </svg>
        <span className="gauge-label">VITESSE</span>
      </div>

      <div className="gauge-container tachometer">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="12"
            strokeLinecap="round"
          />
          <motion.path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="#ef4444" 
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251"
            initial={{ strokeDashoffset: 251 }}
            animate={{ strokeDashoffset: 251 - (vehicleData.rpm / 7000) * 251 }}
            transition={{ duration: 0.1 }}
          />
          <text x="100" y="85" textAnchor="middle" fontSize="32" fontFamily="Orbitron" fill="#fff" fontWeight="bold">
            {Math.floor(vehicleData.rpm)}
          </text>
          <text x="100" y="105" textAnchor="middle" fontSize="12" fill="#94a3b8">
            RPM
          </text>
        </svg>
        <span className="gauge-label">RÉGIME</span>
      </div>

      <div className="mini-gauges">
        <div className="mini-gauge">
          <div className="mini-gauge-bar">
            <motion.div 
              className="mini-gauge-fill fuel"
              animate={{ width: `${vehicleData.fuel}%` }}
            />
          </div>
          <span className="mini-gauge-label"><FuelIcon size={14} color="#22c55e" /> {vehicleData.fuel.toFixed(0)}%</span>
        </div>
        <div className="mini-gauge">
          <div className="mini-gauge-bar">
            <motion.div 
              className="mini-gauge-fill temp"
              animate={{ width: `${(vehicleData.temperature - 50) / 70 * 100}%` }}
            />
          </div>
          <span className="mini-gauge-label"><TemperatureIcon size={14} color="#f97316" /> {vehicleData.temperature.toFixed(0)}°C</span>
        </div>
        <div className="mini-gauge">
          <div className="mini-gauge-bar">
            <motion.div 
              className="mini-gauge-fill battery"
              animate={{ width: `${vehicleData.battery}%` }}
            />
          </div>
          <span className="mini-gauge-label"><BatteryIcon size={14} color="#3b82f6" /> {vehicleData.battery.toFixed(0)}%</span>
        </div>
        <div className="gear-display">
          <span className="gear-label">GEAR</span>
          <motion.span 
            className="gear-value"
            key={vehicleData.gear}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {vehicleData.gear}
          </motion.span>
        </div>
      </div>
    </div>
  );

  // Network Topology View
  const NetworkTopology = () => (
    <div className="network-topology">
      {/* Afficher la topologie seulement si aucun node n'est sélectionné */}
      {!activeNode && (
        <>
          <svg className="topology-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Connection lines */}
            {Object.values(networkNodes).filter(n => n.type === 'domain').map(node => (
              <g key={`conn-${node.id}`}>
                <motion.line
                  x1="50" y1="45"
                  x2={node.x} y2={node.y}
                  stroke={node.color}
                  strokeWidth="0.8"
                  strokeDasharray="3,2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                {/* Animated data flow */}
                {isSimulating && (
                  <motion.circle
                    r="1.5"
                    fill={node.color}
                    initial={{ cx: 50, cy: 45 }}
                    animate={{ 
                      cx: [50, node.x, 50],
                      cy: [45, node.y, 45]
                    }}
                    transition={{ 
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
              </g>
            ))}
          </svg>
          
          {/* Network nodes */}
          {Object.values(networkNodes).map((node, idx) => (
            <motion.div
              key={node.id}
              className={`topology-node ${node.type} ${activeNode === node.id ? 'active' : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                '--node-color': node.color || '#f97316'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveNode(node.id)}
              whileHover={{ scale: 1.1 }}
            >
              <div className="node-icon">
                {node.type === 'gateway' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zm0 2h12l2 3v11H4V7l2-3zm6 4L9 11h2v6h2v-6h2l-3-3z"/>
                  </svg>
                )}
                {node.id === 'powertrain' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                )}
                {node.id === 'chassis' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                )}
                {node.id === 'body' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
                  </svg>
                )}
                {node.id === 'infotainment' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                  </svg>
                )}
                {node.id === 'adas' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                )}
              </div>
              <div className="node-info">
                <span className="node-name">{node.name}</span>
                <span className="node-protocol" style={{ color: getProtocolColor(node.protocol) }}>
                  {node.protocol}
                </span>
              </div>
              {isSimulating && (
                <motion.div 
                  className="node-pulse"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.div>
          ))}
        </>
      )}

      {/* Panneau de détails en dessous de la topologie */}
      <AnimatePresence>
        {activeNode && networkNodes[activeNode] && (
          <motion.div
            className="node-details-below"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="details-header">
              <div className="details-title">
                <h3>{networkNodes[activeNode].name}</h3>
                <span className="protocol-badge" style={{ background: getProtocolColor(networkNodes[activeNode].protocol) }}>
                  {networkNodes[activeNode].protocol}
                </span>
              </div>
              <button className="details-close" onClick={() => setActiveNode(null)}>✕</button>
            </div>
            <p className="details-desc">{networkNodes[activeNode].description}</p>
            <div className="details-info">
              <span>Bande passante:</span>
              <span className="bandwidth-val">{networkNodes[activeNode].bandwidth}</span>
            </div>
            {networkNodes[activeNode].ecus && (
              <div className="details-ecus">
                <h4>ECUs Connectés</h4>
                <div className="ecus-list">
                  {networkNodes[activeNode].ecus.map((ecu, idx) => (
                    <div key={idx} className="ecu-item-simple">
                      <div className="ecu-top">
                        <span className="ecu-name-s">{ecu.name}</span>
                        <span className={`ecu-status-s ${ecu.status}`}>{ecu.status}</span>
                      </div>
                      <span className="ecu-desc-s">{ecu.desc}</span>
                      <div className="ecu-progress">
                        <div className="progress-bar" style={{ width: `${ecu.load}%`, background: ecu.load > 80 ? '#ef4444' : ecu.load > 50 ? '#eab308' : '#22c55e' }}></div>
                      </div>
                      <span className="ecu-load-s">{ecu.load}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Real-time message log
  const MessageLog = () => (
    <div className="message-log">
      <div className="log-header">
        <span><BroadcastIcon size={18} color="#06b6d4" /> Bus de Messages en Temps Réel</span>
        <div className="message-stats">
          <span className="stat can">CAN: {networkStats.canMessages}</span>
          <span className="stat flexray">FR: {networkStats.flexrayFrames}</span>
          <span className="stat eth">ETH: {networkStats.ethernetPackets}</span>
          <span className="stat lin">LIN: {networkStats.linFrames}</span>
        </div>
      </div>
      <div className="log-messages">
        <AnimatePresence>
          {activeMessages.slice(-8).map((msg) => (
            <motion.div
              key={msg.id}
              className={`log-message ${msg.priority}`}
              style={{ '--msg-color': getProtocolColor(msg.protocol) }}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20 }}
            >
              <span className="msg-protocol">{msg.protocol}</span>
              <span className="msg-route">
                {networkNodes[msg.from]?.name.split(' ')[0]} → {networkNodes[msg.to]?.name.split(' ')[0]}
              </span>
              <span className="msg-data">{msg.data}</span>
              <span className={`msg-priority ${msg.priority}`}>{msg.priority}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  // Alert Panel
  const AlertPanel = () => (
    <div className="alert-panel">
      <div className="alert-header">
        <span><WarningIcon size={18} color="#f97316" /> {t('digitalTwin.alerts.title')}</span>
      </div>
      <div className="alert-list">
        <AnimatePresence>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              className={`alert-item ${alert.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="alert-icon">
                {alert.type === 'critical' ? <CriticalAlertIcon size={16} /> : alert.type === 'warning' ? <WarningIcon size={16} /> : <InfoIcon size={16} />}
              </span>
              <span className="alert-msg">{alert.message}</span>
              <span className="alert-time">{alert.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {alerts.length === 0 && (
          <div className="no-alerts"><CheckIcon size={16} /> {t('digitalTwin.alerts.noAlerts')}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="digital-twin-page">
      {/* Hero Section */}
      <section className="twin-hero">
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>
              <span className="hero-icon"><CarIcon size={32} color="#00ff88" /></span>
              Digital Twin
              <span className="hero-badge">Live</span>
            </h1>
            <p className="hero-subtitle">
              {t('digitalTwin.subtitle')}
            </p>
            
            <div className="hero-controls">
              {!isSimulating ? (
                <motion.button
                  className="control-btn start"
                  onClick={startSimulation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>▶</span> {t('digitalTwin.controls.start')}
                </motion.button>
              ) : (
                <motion.button
                  className="control-btn stop"
                  onClick={stopSimulation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StopIcon size={14} /> {t('digitalTwin.controls.stop')}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* View Mode Selector */}
      <section className="view-selector">
        <div className="container">
          <div className="view-tabs">
            {[
              { id: 'vehicle', name: t('digitalTwin.views.vehicle'), Icon: CarIcon },
              { id: 'network', name: t('digitalTwin.views.network'), Icon: NetworkIcon },
              { id: 'dashboard', name: t('digitalTwin.views.dashboard'), Icon: DashboardIcon },
              { id: 'dataflow', name: t('digitalTwin.views.dataflow'), Icon: BroadcastIcon }
            ].map(tab => (
              <motion.button
                key={tab.id}
                className={`view-tab ${viewMode === tab.id ? 'active' : ''}`}
                onClick={() => setViewMode(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tab-icon"><tab.Icon size={18} /></span>
                <span className="tab-name">{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="twin-main">
        <div className="container">
          <AnimatePresence mode="wait">
            {viewMode === 'vehicle' && (
              <motion.div
                key="vehicle"
                className="view-content vehicle-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="vehicle-section">
                  <Vehicle3D />
                </div>
                <div className="info-section">
                  <DashboardGauges />
                  <AlertPanel />
                </div>
              </motion.div>
            )}

            {viewMode === 'network' && (
              <motion.div
                key="network"
                className="view-content network-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <NetworkTopology />
                {/* Journal des messages en temps réel */}
                <div className="network-message-log">
                  <MessageLog />
                </div>
              </motion.div>
            )}

            {viewMode === 'dashboard' && (
              <motion.div
                key="dashboard"
                className="view-content dashboard-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="dashboard-full">
                  <DashboardGauges />
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-icon"><BroadcastIcon size={24} color="#06b6d4" /></span>
                      <span className="stat-value">{(networkStats.totalBandwidth / 1000).toFixed(1)} KB</span>
                      <span className="stat-label">{t('digitalTwin.stats.totalData')}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon"><EnergyIcon size={24} color="#fbbf24" /></span>
                      <span className="stat-value">{networkStats.canMessages + networkStats.flexrayFrames + networkStats.ethernetPackets + networkStats.linFrames}</span>
                      <span className="stat-label">{t('digitalTwin.stats.totalMessages')}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon"><RefreshIcon size={24} color="#22c55e" /></span>
                      <span className="stat-value">{isSimulating ? t('digitalTwin.stats.active') : t('digitalTwin.stats.stopped')}</span>
                      <span className="stat-label">{t('digitalTwin.stats.networkStatus')}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon"><ShieldIcon size={24} color="#ef4444" /></span>
                      <span className="stat-value">{alerts.filter(a => a.type === 'critical').length}</span>
                      <span className="stat-label">{t('digitalTwin.stats.criticalAlerts')}</span>
                    </div>
                  </div>
                </div>
                <AlertPanel />
              </motion.div>
            )}

            {viewMode === 'dataflow' && (
              <motion.div
                key="dataflow"
                className="view-content dataflow-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MessageLog />
                <div className="protocol-breakdown">
                  <h3><ChartIcon size={20} color="#a855f7" /> {t('digitalTwin.network.breakdown')}</h3>
                  <div className="protocol-bars">
                    {[
                      { name: 'CAN FD', value: networkStats.canMessages, color: '#ef4444' },
                      { name: 'FlexRay', value: networkStats.flexrayFrames, color: '#a855f7' },
                      { name: 'Ethernet', value: networkStats.ethernetPackets, color: '#3b82f6' },
                      { name: 'LIN', value: networkStats.linFrames, color: '#22c55e' }
                    ].map(proto => {
                      const total = networkStats.canMessages + networkStats.flexrayFrames + networkStats.ethernetPackets + networkStats.linFrames;
                      const percentage = total > 0 ? (proto.value / total) * 100 : 0;
                      return (
                        <div key={proto.name} className="protocol-bar-item">
                          <span className="bar-label">{proto.name}</span>
                          <div className="bar-track">
                            <motion.div 
                              className="bar-fill"
                              style={{ background: proto.color }}
                              animate={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="bar-value">{proto.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default DigitalTwin;
