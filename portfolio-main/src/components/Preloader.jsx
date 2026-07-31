import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Add no-scroll to body during load
    document.body.classList.add('no-scroll');

    // Progressive counter animation
    const counterObj = { value: 0 };
    const counterTimeline = gsap.to(counterObj, {
      value: 100,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.value));
      },
      onComplete: () => {
        // Slide out animation
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.classList.remove('no-scroll');
            if (onComplete) onComplete();
          }
        });

        exitTl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in'
        });

        exitTl.to(counterRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in'
        }, "-=0.5");

        exitTl.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.8,
          ease: 'power4.inOut'
        }, "-=0.3");
      }
    });

    // Animate letters or texts inside loader
    gsap.fromTo(textRef.current, 
      { letterSpacing: '0px', opacity: 0 },
      { letterSpacing: '4px', opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    return () => {
      counterTimeline.kill();
      document.body.classList.remove('no-scroll');
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fdf8e2', // matches var(--background-primary)
        zIndex: 9999, // ensures it sits above everything
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '20px',
          maxWidth: '90vw',
          textAlign: 'center'
        }}
      >
        <h1
          ref={textRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '4px',
            color: '#f9f9fb',
            margin: 0,
            lineHeight: 1
          }}
        >
          VIGNESHWARAN
        </h1>
        <div
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.25rem',
            color: 'var(--accent-secondary)',
            fontWeight: 300,
            minWidth: '50px',
            textAlign: 'center'
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Modern line loading indicator at the bottom of screen */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: 'var(--accent-primary)',
          width: `${progress}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px var(--accent-secondary)'
        }}
      />
    </div>
  );
}
