import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { journeyData } from '../data/journey';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        }
      }
    );

    // Animate central timeline line
    gsap.fromTo(lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );

    // Staggered card reveals
    itemsRef.current.forEach((item, idx) => {
      if (!item) return;

      gsap.fromTo(item,
        { opacity: 0, x: idx % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--background-secondary)',
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      <div className="container">
        
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            maxWidth: '800px',
            margin: '0 auto var(--space-xl)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent-secondary)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            ROADMAP & PATH
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              margin: '0 0 20px'
            }}
          >
            My Digital <span className="text-gradient">Journey</span>
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 300
            }}
          >
            From academic foundations in AI and data science to hands-on work building intelligent systems, analytics projects, and web products.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div
          ref={timelineRef}
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px 0',
          }}
        >
          {/* Central Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '2px',
              height: '100%',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              transform: 'translateX(-50%)',
            }}
            className="timeline-track"
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '0%',
                backgroundColor: 'var(--accent-primary)',
                boxShadow: '0 0 8px var(--accent-secondary)'
              }}
            />
          </div>

          {/* Timeline Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {journeyData.map((item, idx) => (
              <div
                key={item.phase}
                ref={el => itemsRef.current[idx] = el}
                style={{
                  display: 'flex',
                  justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  position: 'relative',
                  width: '100%',
                }}
                className={`timeline-row timeline-row-${idx}`}
              >
                {/* Node indicator */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#fdf8e2',
                    border: '3px solid var(--accent-primary)',
                    boxShadow: '0 0 10px var(--accent-glow)',
                    zIndex: 2,
                  }}
                  className="timeline-node"
                />

                {/* Card block */}
                <div
                  className="glass-panel timeline-card"
                  style={{
                    width: 'calc(50% - 30px)',
                    padding: '24px',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--accent-secondary)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    {item.phase} &bull; {item.period}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '10px'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: 300
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        /* Responsive adjustments for central timeline on small screens */
        @media (max-width: 767px) {
          .timeline-track {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-node {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-row {
            justify-content: flex-start !important;
            padding-left: 45px !important;
          }
          .timeline-card {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
