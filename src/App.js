import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { LanguageProvider } from './context/LanguageContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import ProtocolDetail from './pages/ProtocolDetail';
import Comparison from './pages/Comparison';
import Simulation from './pages/Simulation';
import DigitalTwin from './pages/DigitalTwin';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/protocol/:protocolId" element={<ProtocolDetail />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/simulation" element={<Simulation />} />
                <Route path="/digital-twin" element={<DigitalTwin />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
