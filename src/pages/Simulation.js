import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Simulation.css';

// SVG Icons - Inline pour éviter les imports
const Icons = {
  Rocket: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M12 2.5c0 0-5.25 2.5-5.25 10.5 0 2 .5 3.5.5 3.5l4.75-2 4.75 2s.5-1.5.5-3.5c0-8-5.25-10.5-5.25-10.5zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  Warning: ({ size = 16, color = '#f97316' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  ),
  Broadcast: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49"/>
    </svg>
  ),
  Trophy: ({ size = 16, color = '#fbbf24' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/>
    </svg>
  ),
  Check: ({ size = 16, color = '#22c55e' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  Car: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  ),
  Network: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2z"/>
    </svg>
  ),
  Message: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  Clipboard: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  ),
  Book: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
    </svg>
  ),
  Play: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  ),
  Loading: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  ),
  Bolt: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  ),
  Refresh: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  ),
  Chart: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/>
    </svg>
  ),
  Radar: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
};

// ==================== CAN BUS ARBITRATION SIMULATOR ====================
const CANArbitrationSimulator = () => {
  const [nodes, setNodes] = useState([
    { id: 1, name: 'Engine ECU', priority: 0x100, color: '#ef4444', message: 'Engine RPM: 3500', status: 'idle', winning: false, hasWon: false },
    { id: 2, name: 'Brake ECU', priority: 0x080, color: '#22c55e', message: 'ABS Active', status: 'idle', winning: false, hasWon: false },
    { id: 3, name: 'Airbag ECU', priority: 0x050, color: '#f97316', message: 'Crash Detected!', status: 'idle', winning: false, hasWon: false },
    { id: 4, name: 'Body ECU', priority: 0x200, color: '#3b82f6', message: 'Door Open', status: 'idle', winning: false, hasWon: false },
  ]);
  const [busState, setBusState] = useState('idle');
  const [currentBit, setCurrentBit] = useState(0);
  const [arbitrationBits, setArbitrationBits] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [logs, setLogs] = useState([]);
  const [transmittingMessage, setTransmittingMessage] = useState('');

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-19), { timestamp, message, type }]);
  }, []);

  const startArbitration = useCallback(() => {
    if (isRunning) return;
    
    setIsRunning(true);
    setBusState('arbitrating');
    setCurrentBit(0);
    setArbitrationBits([]);
    setWinner(null);
    setTransmittingMessage('');
    
    // Réinitialiser les nœuds
    setNodes(prev => prev.map(n => ({ ...n, status: 'competing', winning: false, hasWon: false })));
    addLog('→ Arbitration started - All nodes competing', 'start');
    
    // Sélectionner aléatoirement quels nœuds veulent transmettre
    const competingNodes = nodes.filter(() => Math.random() > 0.3);
    if (competingNodes.length === 0) {
      addLog('! No nodes want to transmit', 'warning');
      setIsRunning(false);
      setBusState('idle');
      return;
    }
    
    addLog(`● ${competingNodes.length} nodes want to transmit`, 'info');
    competingNodes.forEach(n => addLog(`   → ${n.name} (ID: 0x${n.priority.toString(16).toUpperCase()})`, 'info'));
    
    // Simuler l'arbitration bit par bit
    let currentCompeting = [...competingNodes];
    let bitIndex = 0;
    const maxBits = 11; // CAN standard ID is 11 bits
    
    const arbitrationInterval = setInterval(() => {
      if (bitIndex >= maxBits || currentCompeting.length <= 1) {
        clearInterval(arbitrationInterval);
        
        const winningNode = currentCompeting.reduce((min, n) => n.priority < min.priority ? n : min, currentCompeting[0]);
        
        setNodes(prev => prev.map(n => ({
          ...n,
          status: n.id === winningNode.id ? 'transmitting' : 'waiting',
          winning: n.id === winningNode.id,
          hasWon: n.id === winningNode.id
        })));
        
        setWinner(winningNode);
        setBusState('transmitting');
        addLog(`★ Winner: ${winningNode.name} (lowest ID wins)`, 'success');
        
        // Simuler la transmission du message
        let charIndex = 0;
        const messageInterval = setInterval(() => {
          if (charIndex <= winningNode.message.length) {
            setTransmittingMessage(winningNode.message.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(messageInterval);
            addLog(`✓ Message transmitted: "${winningNode.message}"`, 'success');
            setBusState('idle');
            setIsRunning(false);
            setNodes(prev => prev.map(n => ({ ...n, status: 'idle', hasWon: false })));
          }
        }, speed / 3);
        
        return;
      }
      
      // Calculer le bit actuel pour chaque nœud en compétition
      const bitMask = 1 << (10 - bitIndex);
      const nodeBits = currentCompeting.map(n => ({
        node: n,
        bit: (n.priority & bitMask) ? 1 : 0
      }));
      
      // Le bus prend la valeur dominante (0)
      const busBit = nodeBits.some(nb => nb.bit === 0) ? 0 : 1;
      
      setArbitrationBits(prev => [...prev, { bit: busBit, position: bitIndex }]);
      setCurrentBit(bitIndex + 1);
      
      // Les nœuds qui ont envoyé 1 mais le bus est à 0 perdent
      const losers = nodeBits.filter(nb => nb.bit === 1 && busBit === 0);
      losers.forEach(l => {
        addLog(`❌ ${l.node.name} lost at bit ${bitIndex} (sent 1, bus was 0)`, 'error');
        setNodes(prev => prev.map(n => n.id === l.node.id ? { ...n, status: 'lost' } : n));
      });
      
      currentCompeting = nodeBits.filter(nb => !(nb.bit === 1 && busBit === 0)).map(nb => nb.node);
      
      bitIndex++;
    }, speed);
    
  }, [isRunning, nodes, speed, addLog]);

  return (
    <div className="simulator-container can-simulator">
      <div className="simulator-header">
        <h2><Icons.Car size={24} color="#ef4444" /> CAN Bus Arbitration Simulator</h2>
        <p>Watch how CAN nodes compete for bus access using priority-based arbitration</p>
      </div>
      
      <div className="simulator-controls">
        <button 
          className={`sim-button ${isRunning ? 'disabled' : ''}`}
          onClick={startArbitration}
          disabled={isRunning}
        >
          {isRunning ? <><Icons.Loading size={14} /> Arbitrating...</> : <><Icons.Play size={14} /> Start Arbitration</>}
        </button>
        <div className="speed-control" key={`speed-can-${speed}`}>
          <label>Speed:</label>
          <input 
            type="range" 
            min="100" 
            max="1000" 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="can-bus-visual">
        <div className="bus-line">
          <div className={`bus-state ${busState}`}>
            {busState === 'idle' && 'BUS IDLE'}
            {busState === 'arbitrating' && `ARBITRATING (Bit ${currentBit}/11)`}
            {busState === 'transmitting' && 'TRANSMITTING'}
          </div>
          <div className="arbitration-bits">
            {arbitrationBits.map((ab, i) => (
              <motion.span 
                key={i}
                className={`bit ${ab.bit === 0 ? 'dominant' : 'recessive'}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {ab.bit}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="nodes-container">
          {nodes.map((node, index) => (
            <motion.div 
              key={node.id}
              className={`can-node ${node.status} ${node.winning ? 'winner' : ''}`}
              style={{ '--node-color': node.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="node-header">
                <span className="node-name">{node.name}</span>
                <span className="node-id">ID: 0x{node.priority.toString(16).toUpperCase()}</span>
              </div>
              <div className="node-binary">
                {node.priority.toString(2).padStart(11, '0').split('').map((bit, i) => (
                  <span key={i} className={`binary-bit ${i < currentBit ? (bit === '0' ? 'dominant' : 'recessive') : ''}`}>
                    {bit}
                  </span>
                ))}
              </div>
              <div className="node-status">
                {node.status === 'idle' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="2"/><rect x="14" y="4" width="4" height="16" rx="2"/></svg>
                    Idle
                  </span>
                )}
                {node.status === 'competing' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M9 12l2 2 4-4"/></svg>
                    Competing
                  </span>
                )}
                {node.status === 'lost' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    Lost
                  </span>
                )}
                {node.status === 'transmitting' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    Transmitting
                  </span>
                )}
                {node.status === 'waiting' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    Waiting
                  </span>
                )}
              </div>
              {node.hasWon && (
                <motion.div 
                  className="winner-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="gold" style={{ marginRight: '0.3rem' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  WINNER
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {winner && transmittingMessage && (
        <motion.div 
          className="message-display"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="message-header"><Icons.Message size={16} /> Transmitted Message:</div>
          <div className="message-content" style={{ color: winner.color }}>
            {transmittingMessage}
            <span className="cursor">|</span>
          </div>
        </motion.div>
      )}

      <div className="log-container">
        <div className="log-header"><Icons.Clipboard size={16} /> Event Log</div>
        <div className="log-content">
          {logs.map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <span className="log-time">[{log.timestamp}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="education-panel">
        <h3><Icons.Book size={18} /> How CAN Arbitration Works</h3>
        <ul>
          <li><strong>Non-destructive:</strong> All nodes can transmit simultaneously without data loss</li>
          <li><strong>Dominant (0) vs Recessive (1):</strong> When nodes send different bits, 0 wins</li>
          <li><strong>Lower ID = Higher Priority:</strong> Node with lowest ID wins arbitration</li>
          <li><strong>CSMA/CD+AMP:</strong> Carrier Sense Multiple Access with Collision Detection and Arbitration on Message Priority</li>
        </ul>
      </div>
    </div>
  );
};

// ==================== LIN BUS SIMULATOR ====================
const LINBusSimulator = () => {
  const [master, setMaster] = useState({ name: 'Master ECU', status: 'idle', currentTask: '' });
  const [slaves, setSlaves] = useState([
    { id: 1, name: 'Window Motor', pid: 0x10, data: 'Position: 75%', status: 'idle', response: null },
    { id: 2, name: 'Mirror Control', pid: 0x11, data: 'Angle: 15°', status: 'idle', response: null },
    { id: 3, name: 'Seat Heater', pid: 0x12, data: 'Temp: Level 2', status: 'idle', response: null },
    { id: 4, name: 'Rain Sensor', pid: 0x13, data: 'Intensity: 60%', status: 'idle', response: null },
  ]);
  const [schedule, setSchedule] = useState([]);
  const [currentSlot, setCurrentSlot] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [busActivity, setBusActivity] = useState([]);
  const [logs, setLogs] = useState([]);
  const [speed, setSpeed] = useState(800);

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-14), { timestamp, message, type }]);
  }, []);

  const addBusActivity = useCallback((type, data) => {
    setBusActivity(prev => [...prev.slice(-7), { type, data, time: Date.now() }]);
  }, []);

  const runSchedule = useCallback(() => {
    if (isRunning) return;
    
    // Créer un schedule aléatoire
    const newSchedule = slaves
      .sort(() => Math.random() - 0.5)
      .map(s => ({ slaveId: s.id, pid: s.pid }));
    
    setSchedule(newSchedule);
    setIsRunning(true);
    setCurrentSlot(-1);
    setBusActivity([]);
    addLog('→ LIN Schedule started', 'start');
    addLog(`● Schedule: ${newSchedule.map(s => `0x${s.pid.toString(16).toUpperCase()}`).join(' → ')}`, 'info');

    let slotIndex = 0;
    
    const scheduleInterval = setInterval(() => {
      if (slotIndex >= newSchedule.length) {
        clearInterval(scheduleInterval);
        setIsRunning(false);
        setCurrentSlot(-1);
        setMaster(prev => ({ ...prev, status: 'idle', currentTask: '' }));
        setSlaves(prev => prev.map(s => ({ ...s, status: 'idle', response: null })));
        addLog('✓ Schedule completed', 'success');
        return;
      }

      const currentPID = newSchedule[slotIndex].pid;
      const targetSlave = slaves.find(s => s.pid === currentPID);
      
      setCurrentSlot(slotIndex);
      
      // Phase 1: Master sends SYNC + PID
      setMaster({ name: 'Master ECU', status: 'sending', currentTask: `Sending PID 0x${currentPID.toString(16).toUpperCase()}` });
      addBusActivity('sync', { byte: '0x55' });
      addLog(`↗ Master: SYNC (0x55) + PID (0x${currentPID.toString(16).toUpperCase()})`, 'master');
      
      setTimeout(() => {
        addBusActivity('pid', { byte: `0x${currentPID.toString(16).toUpperCase()}`, target: targetSlave?.name });
        
        // Phase 2: Slave responds
        setTimeout(() => {
          if (targetSlave) {
            setSlaves(prev => prev.map(s => 
              s.id === targetSlave.id 
                ? { ...s, status: 'responding', response: s.data }
                : { ...s, status: 'idle', response: null }
            ));
            
            addBusActivity('response', { slave: targetSlave.name, data: targetSlave.data });
            addLog(`↙ ${targetSlave.name}: "${targetSlave.data}"`, 'slave');
            
            // Phase 3: Checksum
            setTimeout(() => {
              const checksum = (currentPID + targetSlave.data.length) % 256;
              addBusActivity('checksum', { value: `0x${checksum.toString(16).toUpperCase()}` });
              addLog(`✓ Checksum: 0x${checksum.toString(16).toUpperCase()}`, 'info');
              
              setSlaves(prev => prev.map(s => ({ ...s, status: 'idle', response: null })));
              setMaster(prev => ({ ...prev, status: 'idle', currentTask: '' }));
              
              slotIndex++;
            }, speed / 3);
          }
        }, speed / 3);
      }, speed / 3);
      
    }, speed);
    
  }, [isRunning, slaves, speed, addLog, addBusActivity]);

  return (
    <div className="simulator-container lin-simulator">
      <div className="simulator-header">
        <h2><Icons.Network size={24} color="#22c55e" /> LIN Bus Simulator</h2>
        <p>Master-Slave communication with scheduled polling</p>
      </div>

      <div className="simulator-controls">
        <button 
          className={`sim-button ${isRunning ? 'disabled' : ''}`}
          onClick={runSchedule}
          disabled={isRunning}
        >
          {isRunning ? <><Icons.Loading size={14} /> Running Schedule...</> : <><Icons.Play size={14} /> Run Schedule</>}
        </button>
        <div className="speed-control" key={`speed-lin-${speed}`}>
          <label>Speed:</label>
          <input 
            type="range" 
            min="400" 
            max="1500" 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="lin-topology">
        <motion.div 
          className={`lin-master ${master.status}`}
          animate={{ scale: master.status === 'sending' ? 1.05 : 1 }}
        >
          <div className="master-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div className="master-name">{master.name}</div>
          <div className="master-status">{master.currentTask || 'Idle'}</div>
        </motion.div>

        <div className="lin-bus-line">
          <AnimatePresence>
            {busActivity.map((activity, i) => (
              <motion.div
                key={activity.time}
                className={`bus-packet ${activity.type}`}
                initial={{ x: activity.type === 'response' ? '100%' : '-100%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activity.type === 'sync' && <span>SYNC {activity.data.byte}</span>}
                {activity.type === 'pid' && <span>PID {activity.data.byte}</span>}
                {activity.type === 'response' && <span>⬡ {activity.data.data}</span>}
                {activity.type === 'checksum' && <span>✓ {activity.data.value}</span>}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lin-slaves">
          {slaves.map((slave, index) => (
            <motion.div
              key={slave.id}
              className={`lin-slave ${slave.status}`}
              animate={{ 
                scale: slave.status === 'responding' ? 1.1 : 1,
                boxShadow: slave.status === 'responding' ? '0 0 20px #22c55e' : 'none'
              }}
            >
              <div className="slave-pid">PID: 0x{slave.pid.toString(16).toUpperCase()}</div>
              <div className="slave-name">{slave.name}</div>
              <div className="slave-data">{slave.data}</div>
              {slave.response && (
                <motion.div 
                  className="slave-response"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ↗ Responding...
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="schedule-display">
        <h3>◉ Current Schedule</h3>
        <div className="schedule-slots">
          {schedule.map((slot, i) => (
            <div 
              key={i} 
              className={`schedule-slot ${i === currentSlot ? 'active' : ''} ${i < currentSlot ? 'completed' : ''}`}
            >
              <span className="slot-number">{i + 1}</span>
              <span className="slot-pid">0x{slot.pid.toString(16).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="log-container">
        <div className="log-header"><Icons.Clipboard size={16} /> Communication Log</div>
        <div className="log-content">
          {logs.map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <span className="log-time">[{log.timestamp}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="education-panel">
        <h3><Icons.Book size={18} /> How LIN Bus Works</h3>
        <ul>
          <li><strong>Master-Slave:</strong> Single master controls all communication timing</li>
          <li><strong>Schedule Table:</strong> Pre-defined sequence of PIDs to poll</li>
          <li><strong>Frame Structure:</strong> SYNC (0x55) + PID + Data + Checksum</li>
          <li><strong>Low Cost:</strong> Single wire, 20 kbit/s, for non-critical subsystems</li>
        </ul>
      </div>
    </div>
  );
};

// ==================== FLEXRAY SIMULATOR ====================
const FlexRaySimulator = () => {
  const [cycle, setCycle] = useState(0);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [phase, setPhase] = useState('static'); // static, dynamic, symbol, nit
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [logs, setLogs] = useState([]);
  
  const staticSlots = [
    { id: 1, node: 'Steering ECU', data: 'Angle: 15°', color: '#a855f7' },
    { id: 2, node: 'Brake ECU', data: 'Pressure: 45 bar', color: '#22c55e' },
    { id: 3, node: 'Suspension ECU', data: 'Height: Normal', color: '#3b82f6' },
    { id: 4, node: 'Engine ECU', data: 'Torque: 250 Nm', color: '#ef4444' },
  ];
  
  const dynamicNodes = [
    { id: 1, node: 'Diagnostic', data: 'Status OK', color: '#f97316', minislot: 1 },
    { id: 2, node: 'Config Update', data: 'New params', color: '#06b6d4', minislot: 3 },
  ];

  const [activeStaticSlot, setActiveStaticSlot] = useState(null);
  const [activeDynamicNode, setActiveDynamicNode] = useState(null);

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-14), { timestamp, message, type }]);
  }, []);

  const runFlexRay = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setCycle(0);
    addLog('→ FlexRay Communication Started', 'start');
    
    let currentCycle = 0;
    const maxCycles = 5;
    
    const cycleInterval = setInterval(() => {
      if (currentCycle >= maxCycles) {
        clearInterval(cycleInterval);
        setIsRunning(false);
        setPhase('static');
        setActiveStaticSlot(null);
        setActiveDynamicNode(null);
        addLog('✓ FlexRay cycles completed', 'success');
        return;
      }
      
      setCycle(currentCycle + 1);
      addLog(`◉ Cycle ${currentCycle + 1} started`, 'cycle');
      
      // Static Segment
      setPhase('static');
      let staticSlotIndex = 0;
      
      const staticInterval = setInterval(() => {
        if (staticSlotIndex >= staticSlots.length) {
          clearInterval(staticInterval);
          
          // Dynamic Segment
          setPhase('dynamic');
          setActiveStaticSlot(null);
          addLog('↻ Dynamic segment started', 'info');
          
          let dynamicIndex = 0;
          const dynamicInterval = setInterval(() => {
            if (dynamicIndex >= dynamicNodes.length) {
              clearInterval(dynamicInterval);
              setActiveDynamicNode(null);
              
              // Symbol Window
              setPhase('symbol');
              addLog('📶 Symbol window', 'info');
              
              setTimeout(() => {
                // NIT (Network Idle Time)
                setPhase('nit');
                addLog('◇ Network Idle Time', 'info');
                
                setTimeout(() => {
                  currentCycle++;
                }, speed);
              }, speed / 2);
              
              return;
            }
            
            const dynNode = dynamicNodes[dynamicIndex];
            setActiveDynamicNode(dynNode);
            addLog(`↗ Dynamic: ${dynNode.node} - "${dynNode.data}"`, 'dynamic');
            dynamicIndex++;
          }, speed);
          
          return;
        }
        
        const slot = staticSlots[staticSlotIndex];
        setActiveStaticSlot(slot);
        setCurrentSlot(staticSlotIndex + 1);
        addLog(`● Static Slot ${staticSlotIndex + 1}: ${slot.node} - "${slot.data}"`, 'static');
        staticSlotIndex++;
      }, speed);
      
    }, speed * (staticSlots.length + dynamicNodes.length + 3));
    
  }, [isRunning, speed, addLog, staticSlots.length, dynamicNodes.length]);

  return (
    <div className="simulator-container flexray-simulator">
      <div className="simulator-header">
        <h2><Icons.Bolt size={24} color="#a855f7" /> FlexRay Simulator</h2>
        <p>Time-triggered communication with static and dynamic segments</p>
      </div>

      <div className="simulator-controls">
        <button 
          className={`sim-button ${isRunning ? 'disabled' : ''}`}
          onClick={runFlexRay}
          disabled={isRunning}
        >
          {isRunning ? <><Icons.Loading size={14} /> Running...</> : <><Icons.Play size={14} /> Start FlexRay</>}
        </button>
        <div className="speed-control" key={`speed-flexray-${speed}`}>
          <label>Speed:</label>
          <input 
            type="range" 
            min="150" 
            max="800" 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="flexray-cycle-view">
        <div className="cycle-header">
          <span className="cycle-number">Cycle: {cycle}</span>
          <span className={`phase-indicator ${phase}`}>
            {phase === 'static' && <><Icons.Chart size={14} /> Static Segment</>}
            {phase === 'dynamic' && <><Icons.Refresh size={14} /> Dynamic Segment</>}
            {phase === 'symbol' && '▪ Symbol Window'}
            {phase === 'nit' && '◇ NIT'}
          </span>
        </div>

        <div className="cycle-timeline">
          <div className={`timeline-segment static ${phase === 'static' ? 'active' : ''}`}>
            <span>Static Segment</span>
            <div className="segment-slots">
              {staticSlots.map((slot, i) => (
                <motion.div 
                  key={slot.id}
                  className={`timeline-slot ${activeStaticSlot?.id === slot.id ? 'active' : ''}`}
                  style={{ backgroundColor: activeStaticSlot?.id === slot.id ? slot.color : 'transparent' }}
                  animate={{ scale: activeStaticSlot?.id === slot.id ? 1.2 : 1 }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
          <div className={`timeline-segment dynamic ${phase === 'dynamic' ? 'active' : ''}`}>
            <span>Dynamic</span>
          </div>
          <div className={`timeline-segment symbol ${phase === 'symbol' ? 'active' : ''}`}>
            <span>SW</span>
          </div>
          <div className={`timeline-segment nit ${phase === 'nit' ? 'active' : ''}`}>
            <span>NIT</span>
          </div>
        </div>
      </div>

      <div className="flexray-nodes">
        <div className="static-nodes">
          <h3>Static Slots (TDMA)</h3>
          <div className="nodes-grid">
            {staticSlots.map(slot => (
              <motion.div
                key={slot.id}
                className={`flexray-node ${activeStaticSlot?.id === slot.id ? 'active' : ''}`}
                style={{ '--node-color': slot.color }}
                animate={{ 
                  scale: activeStaticSlot?.id === slot.id ? 1.05 : 1,
                  boxShadow: activeStaticSlot?.id === slot.id ? `0 0 30px ${slot.color}` : 'none'
                }}
              >
                <div className="node-slot">Slot {slot.id}</div>
                <div className="node-name">{slot.node}</div>
                <div className="node-data">{slot.data}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="dynamic-nodes">
          <h3>Dynamic Segment (FTDMA)</h3>
          <div className="nodes-grid">
            {dynamicNodes.map(node => (
              <motion.div
                key={node.id}
                className={`flexray-node dynamic ${activeDynamicNode?.id === node.id ? 'active' : ''}`}
                style={{ '--node-color': node.color }}
                animate={{ 
                  scale: activeDynamicNode?.id === node.id ? 1.05 : 1,
                  boxShadow: activeDynamicNode?.id === node.id ? `0 0 30px ${node.color}` : 'none'
                }}
              >
                <div className="node-slot">Minislot {node.minislot}</div>
                <div className="node-name">{node.node}</div>
                <div className="node-data">{node.data}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="log-container">
        <div className="log-header"><Icons.Clipboard size={16} /> FlexRay Log</div>
        <div className="log-content">
          {logs.map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <span className="log-time">[{log.timestamp}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="education-panel">
        <h3><Icons.Book size={18} /> How FlexRay Works</h3>
        <ul>
          <li><strong>Dual Channel:</strong> Two independent channels (A & B) for redundancy</li>
          <li><strong>TDMA Static:</strong> Guaranteed time slots for critical data</li>
          <li><strong>FTDMA Dynamic:</strong> Flexible mini-slots for event-driven data</li>
          <li><strong>10 Mbit/s:</strong> High bandwidth for safety-critical applications</li>
        </ul>
      </div>
    </div>
  );
};

// ==================== AUTOMOTIVE ETHERNET SIMULATOR ====================
const EthernetSimulator = () => {
  const [switches, setSwitches] = useState([
    { id: 1, name: 'Central Gateway', ports: 8, active: false, traffic: 0 },
    { id: 2, name: 'Domain Switch A', ports: 4, active: false, traffic: 0 },
    { id: 3, name: 'Domain Switch B', ports: 4, active: false, traffic: 0 },
  ]);
  
  const [endpoints, setEndpoints] = useState([
    { id: 1, name: 'ADAS Camera', ip: '192.168.1.10', vlan: 10, bandwidth: '1 Gbps', status: 'idle', switchId: 2 },
    { id: 2, name: 'Radar Sensor', ip: '192.168.1.11', vlan: 10, bandwidth: '100 Mbps', status: 'idle', switchId: 2 },
    { id: 3, name: 'Infotainment', ip: '192.168.2.20', vlan: 20, bandwidth: '1 Gbps', status: 'idle', switchId: 3 },
    { id: 4, name: 'Telematics', ip: '192.168.2.21', vlan: 20, bandwidth: '100 Mbps', status: 'idle', switchId: 3 },
    { id: 5, name: 'OBD Port', ip: '192.168.3.30', vlan: 30, bandwidth: '100 Mbps', status: 'idle', switchId: 1 },
  ]);
  
  const [packets, setPackets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ sent: 0, received: 0, dropped: 0 });
  const [speed, setSpeed] = useState(500);
  const packetIdRef = useRef(0);

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-14), { timestamp, message, type }]);
  }, []);

  const sendPacket = useCallback((source, dest, data) => {
    const packetId = ++packetIdRef.current;
    const newPacket = {
      id: packetId,
      source,
      dest,
      data,
      status: 'sending',
      progress: 0,
      vlan: source.vlan,
    };
    
    setPackets(prev => [...prev, newPacket]);
    setEndpoints(prev => prev.map(e => 
      e.id === source.id ? { ...e, status: 'sending' } : e
    ));
    
    addLog(`↗ ${source.name} → ${dest.name}: "${data}"`, 'packet');
    setStats(prev => ({ ...prev, sent: prev.sent + 1 }));
    
    // Simuler le routage à travers les switches
    const route = [];
    if (source.switchId !== dest.switchId) {
      route.push(switches.find(s => s.id === source.switchId));
      route.push(switches.find(s => s.id === 1)); // Central gateway
      route.push(switches.find(s => s.id === dest.switchId));
    } else {
      route.push(switches.find(s => s.id === source.switchId));
    }
    
    let routeIndex = 0;
    const routeInterval = setInterval(() => {
      if (routeIndex < route.length) {
        const currentSwitch = route[routeIndex];
        setSwitches(prev => prev.map(s => 
          s.id === currentSwitch.id ? { ...s, active: true, traffic: s.traffic + 1 } : s
        ));
        addLog(`↻ Routing through ${currentSwitch.name}`, 'route');
        
        setTimeout(() => {
          setSwitches(prev => prev.map(s => 
            s.id === currentSwitch.id ? { ...s, active: false } : s
          ));
        }, speed / 2);
        
        routeIndex++;
      } else {
        clearInterval(routeInterval);
        
        // Paquet reçu
        setEndpoints(prev => prev.map(e => 
          e.id === dest.id ? { ...e, status: 'receiving' } : 
          e.id === source.id ? { ...e, status: 'idle' } : e
        ));
        
        addLog(`↙ ${dest.name} received: "${data}"`, 'success');
        setStats(prev => ({ ...prev, received: prev.received + 1 }));
        
        setTimeout(() => {
          setPackets(prev => prev.filter(p => p.id !== packetId));
          setEndpoints(prev => prev.map(e => 
            e.id === dest.id ? { ...e, status: 'idle' } : e
          ));
        }, speed / 2);
      }
    }, speed / 2);
    
  }, [switches, speed, addLog]);

  const runSimulation = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setStats({ sent: 0, received: 0, dropped: 0 });
    addLog('→ Ethernet simulation started', 'start');
    
    const scenarios = [
      { from: 0, to: 1, data: 'ADAS Data Stream' },
      { from: 2, to: 3, data: 'Media Request' },
      { from: 4, to: 0, data: 'Diagnostic Query' },
      { from: 1, to: 2, data: 'Sensor Fusion Data' },
      { from: 3, to: 4, data: 'Telemetry Update' },
    ];
    
    let scenarioIndex = 0;
    const simInterval = setInterval(() => {
      if (scenarioIndex >= scenarios.length) {
        clearInterval(simInterval);
        setTimeout(() => {
          setIsRunning(false);
          addLog('✓ Simulation completed', 'success');
        }, speed * 2);
        return;
      }
      
      const scenario = scenarios[scenarioIndex];
      sendPacket(endpoints[scenario.from], endpoints[scenario.to], scenario.data);
      scenarioIndex++;
    }, speed * 3);
    
  }, [isRunning, endpoints, speed, sendPacket, addLog]);

  return (
    <div className="simulator-container ethernet-simulator">
      <div className="simulator-header">
        <h2><Icons.Broadcast size={24} color="#3b82f6" /> Automotive Ethernet Simulator</h2>
        <p>100BASE-T1 / 1000BASE-T1 switched network with VLANs</p>
      </div>

      <div className="simulator-controls">
        <button 
          className={`sim-button ${isRunning ? 'disabled' : ''}`}
          onClick={runSimulation}
          disabled={isRunning}
        >
          {isRunning ? <><Icons.Loading size={14} /> Simulating...</> : <><Icons.Play size={14} /> Start Simulation</>}
        </button>
        <div className="speed-control" key={`speed-ethernet-${speed}`}>
          <label>Speed:</label>
          <input 
            type="range" 
            min="200" 
            max="1000" 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed}ms</span>
        </div>
      </div>

      <div className="ethernet-stats">
        <div className="stat-box sent">
          <span className="stat-value">{stats.sent}</span>
          <span className="stat-label">Packets Sent</span>
        </div>
        <div className="stat-box received">
          <span className="stat-value">{stats.received}</span>
          <span className="stat-label">Received</span>
        </div>
        <div className="stat-box dropped">
          <span className="stat-value">{stats.dropped}</span>
          <span className="stat-label">Dropped</span>
        </div>
      </div>

      <div className="ethernet-topology">
        <div className="switches-layer">
          {switches.map(sw => (
            <motion.div
              key={sw.id}
              className={`ethernet-switch ${sw.active ? 'active' : ''}`}
              animate={{ 
                scale: sw.active ? 1.1 : 1,
                boxShadow: sw.active ? '0 0 30px #3b82f6' : 'none'
              }}
            >
              <div className="switch-icon">⬡</div>
              <div className="switch-name">{sw.name}</div>
              <div className="switch-ports">{sw.ports} ports</div>
              <div className="switch-traffic">Traffic: {sw.traffic}</div>
            </motion.div>
          ))}
        </div>

        <div className="endpoints-layer">
          {endpoints.map(ep => (
            <motion.div
              key={ep.id}
              className={`ethernet-endpoint ${ep.status}`}
              animate={{ 
                scale: ep.status !== 'idle' ? 1.05 : 1,
                boxShadow: ep.status === 'sending' ? '0 0 20px #22c55e' : 
                           ep.status === 'receiving' ? '0 0 20px #3b82f6' : 'none'
              }}
            >
              <div className="endpoint-icon">
                {ep.name.includes('Camera') && <Icons.Radar size={18} color="#06b6d4" />}
                {ep.name.includes('Radar') && <Icons.Broadcast size={18} color="#f97316" />}
                {ep.name.includes('Infotainment') && '▣'}
                {ep.name.includes('Telematics') && '◈'}
                {ep.name.includes('OBD') && '◉'}
              </div>
              <div className="endpoint-name">{ep.name}</div>
              <div className="endpoint-ip">{ep.ip}</div>
              <div className="endpoint-vlan">VLAN {ep.vlan}</div>
              <div className="endpoint-bandwidth">{ep.bandwidth}</div>
              {ep.status !== 'idle' && (
                <motion.div 
                  className={`endpoint-status ${ep.status}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {ep.status === 'sending' && '↗ Sending...'}
                  {ep.status === 'receiving' && '↙ Receiving...'}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="log-container">
        <div className="log-header"><Icons.Clipboard size={16} /> Network Log</div>
        <div className="log-content">
          {logs.map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <span className="log-time">[{log.timestamp}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="education-panel">
        <h3><Icons.Book size={18} /> How Automotive Ethernet Works</h3>
        <ul>
          <li><strong>100BASE-T1:</strong> Single twisted pair, 100 Mbps, for most ECUs</li>
          <li><strong>1000BASE-T1:</strong> Single twisted pair, 1 Gbps, for cameras/ADAS</li>
          <li><strong>VLANs:</strong> Virtual networks for traffic isolation and security</li>
          <li><strong>TSN:</strong> Time-Sensitive Networking for deterministic latency</li>
        </ul>
      </div>
    </div>
  );
};

// ==================== MAIN SIMULATION PAGE ====================
const Simulation = () => {
  const { t } = useLanguage();
  const [activeSimulator, setActiveSimulator] = useState('can');
  
  const simulators = [
    { id: 'can', name: 'CAN Arbitration', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 18.5a1.5 1.5 0 0 1-1 1.5H7a1.5 1.5 0 0 1 0-3h10a1.5 1.5 0 0 1 1 1.5zm1.5-9A2.5 2.5 0 0 1 17 12H7a2.5 2.5 0 0 1 0-5h10a2.5 2.5 0 0 1 2.5 2.5z"/><circle cx="17" cy="9.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></svg>, color: '#ef4444' },
    { id: 'lin', name: 'LIN Bus', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>, color: '#22c55e' },
    { id: 'flexray', name: 'FlexRay', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2l10 10L7 22V2z"/></svg>, color: '#a855f7' },
    { id: 'ethernet', name: 'Automotive Ethernet', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, color: '#3b82f6' },
  ];

  return (
    <div className="simulation-page">
      <motion.div 
        className="simulation-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '2.5rem', height: '2.5rem', display: 'inline-block', marginRight: '1rem' }}>
            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          {t('simulation.title')}
        </h1>
        <p>{t('simulation.subtitle')}</p>
      </motion.div>

      <div className="simulator-tabs">
        {simulators.map(sim => (
          <motion.button
            key={sim.id}
            className={`simulator-tab ${activeSimulator === sim.id ? 'active' : ''}`}
            style={{ '--tab-color': sim.color }}
            onClick={() => setActiveSimulator(sim.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{sim.icon}</span>
            <span className="tab-name">{sim.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSimulator}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSimulator === 'can' && <CANArbitrationSimulator />}
          {activeSimulator === 'lin' && <LINBusSimulator />}
          {activeSimulator === 'flexray' && <FlexRaySimulator />}
          {activeSimulator === 'ethernet' && <EthernetSimulator />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Simulation;
