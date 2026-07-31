import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        padding: 'var(--space-lg) 0',
        backgroundColor: 'var(--background-primary)',
        borderTop: '1px solid var(--border-primary)',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
      }}
    >
      <div 
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        {/* Top half */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
          className="footer-top-row"
        >
          {/* Logo and positioning */}
          <div style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 6px',
                letterSpacing: '1px'
              }}
            >
              VINESHWARAN
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              AI & ML Engineer &bull; Data Analyst &bull; Web Developer
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="footer-link-hover">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="footer-link-hover">About</a>
            <a href="#work" onClick={(e) => handleLinkClick(e, 'work')} className="footer-link-hover">Work</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className="footer-link-hover">Skills</a>
            <a href="#journey" onClick={(e) => handleLinkClick(e, 'journey')} className="footer-link-hover">Journey</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="footer-link-hover">Contact</a>
          </div>
        </div>

        {/* Bottom half */}
        <div
          style={{
            borderTop: '1px solid rgba(139, 92, 246, 0.05)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
          className="footer-bottom-row"
        >
          <div>
            &copy; {currentYear} Vigneshwaran. All rights reserved.
          </div>
          <div>
            Built with React &bull; GSAP &bull; Three.js
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-top-row {
            flex-direction: row !important;
            text-align: left !important;
          }
          .footer-top-row > div {
            text-align: left !important;
          }
          .footer-bottom-row {
            flex-direction: row !important;
          }
        }
        .footer-link-hover:hover {
          color: var(--accent-secondary) !important;
        }
      `}</style>
    </footer>
  );
}
