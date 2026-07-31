import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MobileMenu({ isOpen, onClose, menuItems }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Escape key listener to close mobile menu
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('no-scroll');

      // GSAP Entrance timeline
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out'
      });

      tl.to(menuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2');

      tl.fromTo(linksRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );
    } else {
      document.body.classList.remove('no-scroll');
      
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = menuRef.current.querySelectorAll('a, button');
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    // Autofocus the close button when menu opens
    firstElement.focus();

    return () => {
      window.removeEventListener('keydown', handleTabTrap);
    };
  }, [isOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    onClose();
    
    // Smooth scroll to element after closing animation
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(5, 2, 9, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 998,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Menu drawer */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(360px, 80vw)',
          height: '100%',
          backgroundColor: 'var(--background-secondary)',
          borderLeft: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 999,
          transform: 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--space-md) var(--space-md) var(--space-xl)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-xl)' }}>
          <button
            onClick={onClose}
            aria-label="Close mobile menu"
            style={{
              padding: '10px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-primary)',
              background: 'var(--surface-primary)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', flexGrow: 1 }}>
          {menuItems.map((item, idx) => (
            <a
              key={item.label}
              ref={el => linksRef.current[idx] = el}
              href={`#${item.target}`}
              onClick={(e) => handleLinkClick(e, item.target)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 400,
                color: 'var(--text-primary)',
                paddingBottom: '4px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.05)',
                display: 'block'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Final CTA */}
        <div ref={el => linksRef.current[menuItems.length] = el} style={{ marginTop: 'auto' }}>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '16px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              color: '#fdf8e2',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </>
  );
}
