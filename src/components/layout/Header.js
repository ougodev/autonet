import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/comparison', label: 'Comparaison' },
    { path: '/simulation', label: 'Simulation' },
    { path: '/digital-twin', label: 'Digital Twin' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <img src={require('../../img/logo.png')} alt="AutoNet Architecture" style={{ width: '65px', height: '65px', objectFit: 'contain', borderRadius: '10px' }} />
          </motion.div>
          <div className="logo-text">
            <span className="logo-title">AutoNet Architecture</span>
            <span className="logo-subtitle">Protocols</span>
          </div>
        </Link>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? 'nav-link--active' : ''}`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
