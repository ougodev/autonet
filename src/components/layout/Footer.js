import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={require('../../img/logo.png')} alt="AutoNet Architecture" className="footer__logo-img" />
              <span>AutoNet Architecture</span>
            </div>
            <p className="footer__description">
              {t('footer.description')}
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__section">
              <h4>{t('footer.protocols')}</h4>
              <ul>
                <li><Link to="/protocol/can">CAN</Link></li>
                <li><Link to="/protocol/canfd">CAN FD</Link></li>
                <li><Link to="/protocol/lin">LIN</Link></li>
                <li><Link to="/protocol/flexray">FlexRay</Link></li>
                <li><Link to="/protocol/most">MOST</Link></li>
                <li><Link to="/protocol/ethernet">Ethernet</Link></li>
              </ul>
            </div>

            <div className="footer__section">
              <h4>{t('footer.resources')}</h4>
              <ul>
                <li><Link to="/comparison">{t('nav.comparison')}</Link></li>
                <li><Link to="/simulation">{t('nav.simulation')}</Link></li>
                <li><Link to="/digital-twin">{t('nav.digitalTwin')}</Link></li>
              </ul>
            </div>

            <div className="footer__section footer__educational">
              <h4>{t('footer.educational.title')}</h4>
              <div className="educational-info">
                <div className="educational-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                  </svg>
                  <span>{t('footer.educational.purpose')}</span>
                </div>
                <p className="educational-desc">
                  {t('footer.educational.purposeDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
          <p className="footer__credits">
            {t('footer.developedBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
