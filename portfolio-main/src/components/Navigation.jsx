import React, { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

const menuItems = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Work', target: 'work' },
  { label: 'Skills', target: 'skills' },
  { label: 'Journey', target: 'journey' },
  { label: 'Contact', target: 'contact' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 900,
          backgroundColor: isScrolled ? 'rgba(5, 2, 9, 0.75)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--border-primary)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          height: isScrolled ? '70px' : '90px',
          display: 'flex',
          alignItems: 'center',
          transition: 'height 0.4s var(--ease-out-expo), background-color 0.4s, border-color 0.4s',
        }}
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--accent-secondary)' }}>V.</span>IGNESHWARAN
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav-links"
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.target}`}
                  onClick={(e) => handleLinkClick(e, item.target)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)'
                  }}
                  className="nav-link-hover"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '10px 20px',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                color: 'var(--text-primary)',
                letterSpacing: '0.5px',
                transition: 'border-color var(--transition-fast), background-color var(--transition-fast)'
              }}
              className="cta-button-hover"
            >
              Let's Talk
            </a>
          </nav>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '8px',
              border: 'none',
              background: 'none',
            }}
            className="mobile-nav-toggle"
          >
            <span style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }}></span>
            <span style={{ width: '18px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px', alignSelf: 'flex-end' }}></span>
            <span style={{ width: '24px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />

      {/* Styled tags to manage responsiveness for navigation */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
        .nav-link-hover:hover {
          color: var(--accent-secondary) !important;
        }
        .cta-button-hover:hover {
          border-color: var(--accent-secondary) !important;
          background-color: rgba(139, 92, 246, 0.15) !important;
        }
      `}</style>
    </>
  );
}
