import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data';

const LOGO_SVG = (
  <svg width="36" height="36" viewBox="0 0 92 122" xmlns="http://www.w3.org/2000/svg" className="logo-mark">
    <rect x="0" y="0" width="17" height="122" rx="2.5" fill="#CE1126"/>
    <path d="M 17,0 L 60,0 Q 90,0 91,16 C 89,30 80,43 17,61 Z" fill="#CE1126"/>
    <path d="M 29,27 C 36,13 66,11 80,23 C 66,37 36,40 29,27 Z" fill="#0D0D0D"/>
    <ellipse cx="54" cy="25" rx="12" ry="10" fill="#EAE4D9"/>
    <ellipse cx="54" cy="25" rx="7" ry="7" fill="#1A4D8C"/>
    <ellipse cx="54" cy="25" rx="3.5" ry="3.5" fill="#060606"/>
    <ellipse cx="56.2" cy="23" rx="1.4" ry="1.4" fill="#FFFFFF"/>
    <path d="M 29,21 C 44,8 67,8 81,18" fill="none" stroke="#CE1126" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="84" cy="7" rx="5" ry="5" fill="#D4A017"/>
    <ellipse cx="84" cy="7" rx="2.5" ry="2.5" fill="#F0C842"/>
  </svg>
);

const TICKER_ITEMS = [
  "Fatal accident on Mosta bypass — emergency services on scene",
  "Malta weather: 35°C expected by Thursday — stay hydrated!",
  "Hibernians win BOV Premier League title 3-1 vs Valletta FC",
  "New rooftop bar opens in Valletta with Grand Harbour views",
  "Government announces €50M fund for first-time buyers",
  "Record 3.2 million tourists expected in Malta this summer",
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-label">🔴 <span>LIVE</span></div>
        <div className="ticker-track">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo">
            {LOGO_SVG}
            <div>
              <div className="logo-text">MALTA<span>PULSE</span></div>
              <span className="logo-sub">Malta's 24/7 News</span>
            </div>
          </Link>

          <nav className="desktop-nav">
            {NAV_LINKS.slice(0, 9).map(link => (
              <Link key={link.path} to={link.path} className={location.pathname === link.path ? 'active' : ''}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <div className="live-badge"><div className="live-dot" />LIVE</div>
            <a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer" className="btn-fb">
              <span style={{fontWeight:900,fontSize:14}}>f</span> Follow
            </a>
            <button className="burger-btn" onClick={() => setMenuOpen(true)}>☰</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            {LOGO_SVG}
            <div className="logo-text" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:'#fff'}}>
              MALTA<span style={{color:'#CE1126'}}>PULSE</span>
            </div>
          </Link>
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        {NAV_LINKS.map(link => (
          <Link key={link.path} to={link.path} className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
        <div className="mobile-menu-footer">
          <a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer" className="btn-follow" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
            👍 Follow Malta Pulse on Facebook
          </a>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-text">MALTA<span style={{color:'#CE1126'}}>PULSE</span></div>
            <div className="footer-tagline">Malta's 24/7 source for breaking news,<br/>weather, traffic, sports and lifestyle.</div>
          </div>
          <div className="footer-col">
            <h4>News</h4>
            <ul>
              {['Breaking News','Local News','World News','Politics','Business'].map(l=>(
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Lifestyle</h4>
            <ul>
              {['Shows & Events','Lifestyle & Food','Sports','Videos','What\'s Happening'].map(l=>(
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Malta Pulse</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/advertise">Advertise</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="https://facebook.com/MaltaPulse" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Malta Pulse · maltapulse.net</span>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </>
  );
}
