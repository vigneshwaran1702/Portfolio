import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projects } from '../data/projects';

export default function CaseStudyModal({ projectId, onClose }) {
  const project = projects.find(p => p.id === projectId);
  const modalOverlayRef = useRef(null);
  const modalContentRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Find next project ID for navigation
  const currentIndex = projects.findIndex(p => p.id === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    if (!project) return;

    // Lock body scroll when modal is open
    document.body.classList.add('no-scroll');

    // Escape listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // GSAP Open animation
    const tl = gsap.timeline();
    tl.to(modalOverlayRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.3,
      ease: 'power2.out'
    });
    tl.to(modalContentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.15');

    // Focus close button on open
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, projectId]);

  if (!project) return null;

  const handleNextProjectClick = (e) => {
    e.preventDefault();
    // Fade out then change hash
    gsap.to(modalContentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        window.location.hash = `#project/${nextProject.id}`;
      }
    });
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    gsap.timeline({
      onComplete: onClose
    })
    .to(modalContentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    })
    .to(modalOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2');
  };

  return (
    <div
      ref={modalOverlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(5, 2, 9, 0.95)',
        zIndex: 1000, // higher than navigation
        opacity: 0,
        pointerEvents: 'none',
        overflowY: 'auto',
        padding: 'clamp(20px, 5vw, 60px) var(--space-md)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs-title"
    >
      <div
        ref={modalContentRef}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: 'var(--background-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          opacity: 0,
          transform: 'translateY(40px)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Modal Close Button */}
        <button
          ref={closeButtonRef}
          onClick={handleCloseClick}
          aria-label="Close Case Study"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            padding: '12px',
            borderRadius: '50%',
            background: 'rgba(18, 9, 33, 0.8)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color var(--transition-fast), transform var(--transition-fast)'
          }}
          className="modal-close-hover"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Hero Image */}
        <div style={{ width: '100%', height: '350px', position: 'relative', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={`${project.title} Preview`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(5,2,9,0) 40%, rgba(5,2,9,0.95) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: 'clamp(20px, 5vw, 50px)',
              right: 'clamp(20px, 5vw, 50px)',
            }}
          >
            <p style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', margin: '0 0 8px' }}>
              {project.category}
            </p>
            <h1 id="cs-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0, lineHeight: 1.1 }}>
              {project.title}
            </h1>
          </div>
        </div>

        {/* Grid content */}
        <div
          style={{
            padding: 'clamp(20px, 5vw, 50px)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
          }}
          className="cs-grid-layout"
        >
          {/* Main info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Project Overview</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {project.caseStudy.overview}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>The Challenge</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {project.caseStudy.challenge}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Our Approach</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {project.caseStudy.approach}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--text-primary)' }}>The Solution</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Sidebar info */}
          <div
            style={{
              padding: '24px',
              backgroundColor: 'rgba(18, 9, 33, 0.4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-primary)',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Key Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.caseStudy.technologies.map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontSize: '0.85rem',
                      padding: '6px 12px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      color: 'var(--accent-secondary)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Outcome & Results
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                {project.caseStudy.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div
          style={{
            borderTop: '1px solid var(--border-primary)',
            padding: '30px clamp(20px, 5vw, 50px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(18, 9, 33, 0.2)'
          }}
        >
          <a
            href="#work"
            onClick={handleCloseClick}
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            className="cs-back-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Work
          </a>

          <a
            href={`#project/${nextProject.id}`}
            onClick={handleNextProjectClick}
            style={{
              fontSize: '0.95rem',
              color: 'var(--accent-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}
            className="cs-next-link"
          >
            Next Project ({nextProject.title})
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .modal-close-hover:hover {
          border-color: var(--accent-secondary) !important;
          transform: scale(1.05);
        }
        .cs-back-link:hover {
          color: var(--text-primary) !important;
        }
        .cs-next-link:hover {
          color: var(--text-primary) !important;
        }
        @media (min-width: 768px) {
          .cs-grid-layout {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
