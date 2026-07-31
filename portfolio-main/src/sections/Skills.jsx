import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        }
      }
    );

    const cards = gridRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      style={{
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      <div className="container">
        
        {/* Section Heading */}
        <div
          ref={headingRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            marginBottom: 'var(--space-xl)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--accent-secondary)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            EXPERTISE
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Tools I <span className="text-gradient-purple">Build</span> With
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              marginTop: '16px',
              maxWidth: '600px',
              fontWeight: 300,
            }}
          >
            A breakdown of the tools and technologies I use across AI, analytics, backend development, and modern frontend experiences.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
          }}
        >
          {skillsData.map((group) => (
            <div
              key={group.category}
              className="glass-panel skill-group-card"
              style={{
                padding: '30px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                height: '100%',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {group.category}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {group.description}
                </p>
              </div>

              {/* Badges container */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: 'auto',
                }}
              >
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: '0.85rem',
                      padding: '8px 14px',
                      background: 'rgba(139, 92, 246, 0.05)',
                      border: '1px solid var(--border-primary)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'border-color var(--transition-fast), background-color var(--transition-fast), transform var(--transition-fast)',
                    }}
                    className="skill-badge"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .skill-group-card:hover .skill-badge {
          border-color: rgba(139, 92, 246, 0.4);
        }
        .skill-badge:hover {
          border-color: var(--accent-secondary) !important;
          background-color: rgba(139, 92, 246, 0.15) !important;
          color: var(--accent-secondary) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
