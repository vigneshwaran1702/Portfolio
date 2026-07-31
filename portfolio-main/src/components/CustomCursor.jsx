import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!hasHover || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Small dot position
      gsap.to(cursorDotRef.current, {
        x: x,
        y: y,
        duration: 0.05,
        overwrite: 'auto'
      });

      // Outer ring follow position (with lag/easing)
      gsap.to(cursorRingRef.current, {
        x: x,
        y: y,
        duration: 0.15,
        overwrite: 'auto'
      });
    };

    const onMouseEnter = (e) => {
      const target = e.target;
      
      const isLink = target.tagName === 'A' || target.closest('a') || target.tagName === 'BUTTON' || target.closest('button') || target.getAttribute('role') === 'button';
      const viewAttr = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');

      if (isLink || viewAttr) {
        setIsHovered(true);
        if (viewAttr === 'view') {
          setCursorText("VIEW");
        } else {
          setCursorText("");
        }
      }
    };

    const onMouseLeave = () => {
      setIsHovered(false);
      setCursorText("");
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover listeners to elements
    const updateHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], [data-cursor]');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    updateHoverListeners();

    // Create an observer to attach listeners to dynamically added elements (like project cards/modals)
    const observer = new MutationObserver(() => {
      updateHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const elements = document.querySelectorAll('a, button, [role="button"], [data-cursor]');
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner small dot */}
      <div
        ref={cursorDotRef}
        className="custom-cursor cursor-dot"
        style={{
          position: 'fixed',
          top: -3,
          left: -3,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--accent-secondary)',
          borderRadius: '50%',
          zIndex: 99999,
          pointerEvents: 'none',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className="custom-cursor cursor-ring"
        style={{
          position: 'fixed',
          top: -20,
          left: -20,
          width: '40px',
          height: '40px',
          border: '1.5px solid var(--accent-primary)',
          backgroundColor: isHovered && cursorText === "VIEW" ? 'rgba(139, 92, 246, 0.9)' : 'transparent',
          borderColor: isHovered ? 'var(--accent-secondary)' : 'var(--accent-primary)',
          borderRadius: '50%',
          zIndex: 99998,
          pointerEvents: 'none',
          transform: 'translate3d(0, 0, 0)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'width 0.3s, height 0.3s, top 0.3s, left 0.3s, background-color 0.3s, border-color 0.3s',
          ...(isHovered && {
            width: cursorText === "VIEW" ? '60px' : '50px',
            height: cursorText === "VIEW" ? '60px' : '50px',
            top: cursorText === "VIEW" ? -30 : -25,
            left: cursorText === "VIEW" ? -30 : -25,
          })
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#fdf8e2',
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
