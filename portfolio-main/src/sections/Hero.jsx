import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroScene from '../components/HeroScene';

export default function Hero({ isLoaded }) {
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const availabilityRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    // GSAP entrance animation for text
    const tl = gsap.timeline();
    
    tl.fromTo(availabilityRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    tl.fromTo(tagRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );
  }, [isLoaded]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '100px', // header clearance
        paddingBottom: '50px',
        overflow: 'hidden'
      }}
    >
      {/* 3D Scene */}
      <HeroScene />

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          
          {/* Main Hero Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '680px' }}>
            
            {/* Availability status indicator */}
            <div
              ref={availabilityRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(18, 9, 33, 0.6)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '28px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}
            >
              <span className="pulse-dot" style={{ width: '8px', height: '8px', backgroundColor: 'var(--success)', borderRadius: '50%', display: 'inline-block' }}></span>
              Available for selected projects
            </div>

            {/* Sub-identity tag */}
            <p
              ref={tagRef}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.95rem, 3vw, 1.25rem)',
                fontWeight: 600,
                color: 'var(--accent-secondary)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                margin: '0 0 16px'
              }}
            >
              AI & ML Engineer × Data Analyst × Web Developer
            </p>

            {/* Headline */}
            <h1
              ref={titleRef}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-1px',
                margin: '0 0 24px',
                fontFamily: 'var(--font-heading)'
              }}
              className="text-gradient"
            >
              I build smart solutions that turn ideas into impact.
            </h1>

            {/* Description */}
            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '40px',
                fontWeight: 300
              }}
            >
              I combine AI, analytics, and web development to create modern products, dashboards, and applications that are practical, scalable, and user-focused.
            </p>

            {/* Action CTAs */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                width: '100%'
              }}
            >
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, 'work')}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  color: '#fdf8e2',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                  transition: 'transform var(--transition-fast), boxShadow var(--transition-fast)'
                }}
                className="btn-primary-hover"
              >
                View My Work
              </a>
              
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                style={{
                  padding: '16px 32px',
                  background: 'rgba(18, 9, 33, 0.4)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.5px',
                  transition: 'border-color var(--transition-fast), background-color var(--transition-fast)'
                }}
                className="btn-secondary-hover"
              >
                Let's Talk
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Styled states */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .pulse-dot {
          animation: pulse 2s infinite ease-in-out;
          box-shadow: 0 0 8px var(--success);
        }
        .btn-primary-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(139, 92, 246, 0.5) !important;
        }
        .btn-secondary-hover:hover {
          border-color: var(--accent-secondary) !important;
          background-color: rgba(139, 92, 246, 0.1) !important;
        }
        @media (min-width: 992px) {
          .hero-content-grid {
            grid-template-columns: 1.2fr 0.8fr !important;
          }
        }
      `}</style>
    </section>
  );
}
