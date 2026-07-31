import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Header reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Staggered card container reveal
    const cards = cardsContainerRef.current.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            marginBottom: 'var(--space-xl)'
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
              marginBottom: '16px'
            }}
          >
            PORTFOLIO
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              margin: 0
            }}
          >
            Selected <span className="text-gradient-purple">Work</span>
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              marginTop: '16px',
              maxWidth: '600px',
              fontWeight: 300
            }}
          >
            A curated selection of AI-driven applications, data-backed products, and modern web solutions built with focus on impact, usability, and measurable results.
          </p>
        </div>

        {/* Responsive Grid */}
        <div
          ref={cardsContainerRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 450px), 1fr))',
            gap: '30px',
          }}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
