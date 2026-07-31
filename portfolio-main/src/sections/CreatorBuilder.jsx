import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: "01",
    title: "Performance Development",
    desc: "Writing semantic, responsive, and blazing-fast code. Blending frontend React architectures with optimized custom backend WordPress templates."
  },
  {
    num: "02",
    title: "Organic SEO & Auditing",
    desc: "Optimizing layout hierarchies, configuring Schema metadata, index pipelines, and monitoring Google Search Console to scale search traffic."
  },
  {
    num: "03",
    title: "Digital Products",
    desc: "Engineering lightweight web tools and content databases (like pin savers, habit journals) that solve problems for target audiences."
  },
  {
    num: "04",
    title: "Monetized Ecosystems",
    desc: "Building platforms with integrated AdSense, Cloudflare setups, and optimized server configurations to turn web traffic into active revenue."
  }
];

export default function CreatorBuilder() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

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
      id="creator-builder"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--background-secondary)',
        borderBottom: '1px solid var(--border-primary)',
      }}
    >
      <div className="container">
        
        {/* Section Title */}
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
            PHILOSOPHY & VISION
          </span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.15,
              fontWeight: 500,
              margin: '0 0 20px'
            }}
          >
            I don't just build websites.<br />
            <span className="text-gradient">I build things for the internet.</span>
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
            My work combines creative design, optimization mechanics, and organic growth strategies. I build dynamic products and publishing systems engineered to grow.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="glass-panel pillar-card"
              style={{
                padding: '36px var(--space-md)',
                textAlign: 'left',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
              }}
            >
              {/* Number indicator */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'rgba(139, 92, 246, 0.15)',
                  lineHeight: 1,
                }}
              >
                {pillar.num}
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .pillar-card:hover {
          transform: translateY(-4px);
        }
        .pillar-card:hover h3 {
          color: var(--accent-secondary) !important;
        }
      `}</style>
    </section>
  );
}
