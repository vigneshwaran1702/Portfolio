import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position inside the card from -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Apply 3D perspective tilt
    gsap.to(card, {
      rotateX: -y * 15, // tilt vertical
      rotateY: x * 15,  // tilt horizontal
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Subtly shift image inside in opposite direction for parallax depth
    gsap.to(imageRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    // Reset card transforms smoothly
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1.05,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const handleFocus = () => {
    // Zoom in image slightly on keyboard focus
    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleBlur = () => {
    // Reset image on blur
    gsap.to(imageRef.current, {
      scale: 1.0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <a
      href={`#project/${project.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-cursor="view"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-primary)',
        backgroundColor: 'rgba(18, 9, 33, 0.3)',
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
        position: 'relative',
        textDecoration: 'none',
        height: '420px',
      }}
      className="project-card-link"
      aria-label={`View Case Study for ${project.title}: ${project.shortDescription}`}
    >
      {/* Visual Image container */}
      <div 
        style={{ 
          width: '100%', 
          height: '240px', 
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img
          ref={imageRef}
          src={project.image}
          alt={`${project.title} screenshot`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.0)',
            transition: 'transform 0.5s var(--ease-out-expo)'
          }}
          loading="lazy"
        />
        {/* Layer glow mask */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(5,2,9,0) 50%, rgba(5,2,9,0.7) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Text Info */}
      <div 
        ref={textRef}
        style={{ 
          padding: '24px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          flexGrow: 1,
          textAlign: 'left'
        }}
      >
        <div>
          <span 
            style={{ 
              fontSize: '0.8rem', 
              color: 'var(--accent-secondary)', 
              textTransform: 'uppercase', 
              fontWeight: 600, 
              letterSpacing: '1px',
              display: 'block',
              marginBottom: '6px'
            }}
          >
            {project.category}
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 500, margin: '0 0 10px', color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
            {project.shortDescription}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                padding: '4px 8px',
                background: 'rgba(139, 92, 246, 0.08)',
                color: 'var(--accent-secondary)',
                border: '1px solid rgba(139, 92, 246, 0.15)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* CSS overrides for styling */}
      <style>{`
        .project-card-link:focus-visible {
          outline: 2px solid var(--focus-ring) !important;
          outline-offset: 4px !important;
        }
      `}</style>
    </a>
  );
}
