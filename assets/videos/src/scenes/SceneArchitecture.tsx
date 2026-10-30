import React from 'react';
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { theme } from '../theme';

const PAGES = [
  { num: '01', title: 'Inicio (Home)', desc: 'Puerta de entrada de cero fricción y captación inmediata.', icon: '🏠', color: theme.colors.secondary },
  { num: '02', title: 'Propuesta Educativa', desc: '4 ejes pedagógicos estructurados y descarga de PCI.', icon: '🎓', color: theme.colors.hotPink },
  { num: '03', title: 'Sobre Nosotros', desc: 'Línea de tiempo histórica, identidad y galerías.', icon: '🏛️', color: theme.colors.mint },
  { num: '04', title: 'Actualidad & Radio', desc: 'Streaming en vivo de Gonzaga Radio y noticias.', icon: '🎙️', color: theme.colors.amber },
  { num: '05', title: 'Financiamiento', desc: 'Pasarela de aportes, campañas y red de exalumnos.', icon: '💙', color: theme.colors.secondary },
];

export const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Transformation badge animation
  const transformSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });

  // Scene exit fade
  const sceneExitOpacity = interpolate(frame, [740, 760], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#19022c',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 80px',
        opacity: sceneExitOpacity,
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/scene2_architecture.mp3')} volume={1} />

      {/* SFX: Transformation Sparkle / Shimmer (frame 15) */}
      <Sequence from={15} durationInFrames={35}>
        <Audio src={staticFile('audio/sfx_sparkle.wav')} volume={0.45} />
      </Sequence>

      {/* SFX: Staggered Ticks for the 5 Master Page Cards */}
      {[20, 28, 36, 44, 52].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.3} />
        </Sequence>
      ))}

      {/* SFX: Scene Transition Whoosh (frame 740) */}
      <Sequence from={740} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* Cyber Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: 800,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77, 23, 214, 0.4) 0%, rgba(1, 227, 253, 0.15) 60%, transparent 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <span
            style={{
              padding: '8px 20px',
              borderRadius: 30,
              backgroundColor: 'rgba(77, 23, 214, 0.3)',
              border: `1.5px solid ${theme.colors.secondary}`,
              color: theme.colors.secondary,
              fontFamily: theme.fonts.code,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Fase 2: Arquitectura &amp; Reingeniería UX
          </span>
          <span style={{ color: theme.colors.textDim, fontFamily: theme.fonts.code, fontSize: 15 }}>
            // Prototipado en Figma &amp; WordPress Headless
          </span>
        </div>
        <h1
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 58,
            fontWeight: 900,
            color: theme.colors.textWhite,
            letterSpacing: -1,
            margin: 0,
          }}
        >
          De 12 Páginas Dispersas a 5 Páginas Maestras
        </h1>
      </div>

      {/* Transformation Highlight Banner */}
      <div
        style={{
          transform: `scale(${transformSpring})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 32px',
          borderRadius: 22,
          backgroundColor: 'rgba(255, 255, 255, 0.07)',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(14px)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 30 }}>📑</span>
            <div>
              <div style={{ fontFamily: theme.fonts.code, fontSize: 13, color: '#EF4444', fontWeight: 800 }}>ANTES</div>
              <div style={{ fontFamily: theme.fonts.title, fontSize: 20, color: theme.colors.textWhite, fontWeight: 900 }}>12 Páginas Desestructuradas</div>
            </div>
          </div>
          <span style={{ fontSize: 28, color: theme.colors.secondary }}>➔</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 30 }}>✨</span>
            <div>
              <div style={{ fontFamily: theme.fonts.code, fontSize: 13, color: theme.colors.mint, fontWeight: 800 }}>REESTRUCTURACIÓN FIGMA</div>
              <div style={{ fontFamily: theme.fonts.title, fontSize: 20, color: theme.colors.secondary, fontWeight: 900 }}>5 Páginas Maestras Estratégicas</div>
            </div>
          </div>
        </div>

        {/* Brand Palette Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: theme.fonts.code, fontSize: 14, color: theme.colors.textDim }}>Manual de Marca:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 14, backgroundColor: theme.colors.gonzagaBlue, border: '1.5px solid #D4AF37' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: theme.colors.gonzagaGold }} />
            <span style={{ fontFamily: theme.fonts.code, fontSize: 14, color: '#FFFFFF', fontWeight: 800 }}>Azul Marino &amp; Oro</span>
          </div>
        </div>
      </div>

      {/* Grid of the 5 Master Pages */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
          zIndex: 10,
        }}
      >
        {PAGES.map((page, idx) => {
          const cardSpring = spring({
            frame: Math.max(0, frame - (20 + idx * 8)),
            fps,
            config: { damping: 13, stiffness: 130 },
          });

          return (
            <div
              key={page.num}
              style={{
                transform: `scale(${cardSpring})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '26px 22px',
                borderRadius: 22,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: `2px solid ${page.color}60`,
                boxShadow: `0 12px 28px -5px ${page.color}30`,
                minHeight: 280,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 38 }}>{page.icon}</span>
                  <span
                    style={{
                      fontFamily: theme.fonts.code,
                      fontSize: 14,
                      fontWeight: 800,
                      color: page.color,
                      backgroundColor: `${page.color}25`,
                      padding: '4px 10px',
                      borderRadius: 10,
                    }}
                  >
                    {page.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: 22,
                    fontWeight: 900,
                    color: theme.colors.textWhite,
                    margin: '0 0 10px 0',
                    lineHeight: 1.25,
                  }}
                >
                  {page.title}
                </h3>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    color: theme.colors.primaryFixedDim,
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {page.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: page.color,
                  fontFamily: theme.fonts.code,
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <span>✓ Validado UX/UI</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech Badges Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          borderRadius: 16,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          border: '1.5px solid rgba(255, 255, 255, 0.1)',
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: theme.fonts.code, fontSize: 15, color: theme.colors.textDim, fontWeight: 700 }}>
          Stack de Implementación:
        </span>
        <div style={{ display: 'flex', gap: 14 }}>
          {['WordPress CMS', 'Figma Design System', 'Tailwind CSS', 'Google Analytics 4 (GA4)', 'Zero-Lag CDN'].map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 14,
                fontWeight: 700,
                color: theme.colors.textWhite,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '6px 14px',
                borderRadius: 10,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
