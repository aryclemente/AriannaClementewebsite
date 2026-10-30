import React from 'react';
import {
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { theme } from '../../theme';

const KEY_PAGES = [
  'Casas de Retiro',
  'Directorio de Parroquias',
  'Ejercicios Espirituales',
  'Mapeo Interactivo SVG',
  'Subsidios de Oración',
  'Módulo de Donaciones',
];

export const Scene1Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Spring animations for cards
  const card1 = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12 } });
  const card2 = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 12 } });
  const card3 = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12 } });

  // Mockup float
  const mockupScale = interpolate(frame, [0, 870], [0.98, 1.03]);
  const mockupY = interpolate(frame, [0, 435, 870], [0, -10, 0]);

  // Scene exit fade
  const sceneExitOpacity = interpolate(frame, [850, 870], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#160910',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '45px 80px',
        opacity: sceneExitOpacity,
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/cep_scene1_concept.mp3')} volume={1} />

      {/* SFX: Intro shimmer */}
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_sparkle.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Pop for concept cards */}
      {[20, 45, 70].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.3} />
        </Sequence>
      ))}

      {/* SFX: Whoosh at exit */}
      <Sequence from={850} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: 950,
          height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122, 28, 48, 0.38) 0%, rgba(245, 192, 0, 0.14) 50%, transparent 80%)',
          filter: 'blur(85px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Info */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 20, // +45% (was 15px)
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: theme.colors.cepGold,
                backgroundColor: 'rgba(245, 192, 0, 0.15)',
                padding: '8px 22px',
                borderRadius: 24,
                border: '1.5px solid rgba(245, 192, 0, 0.4)',
              }}
            >
              Arquitectura Web Institucional • Jesuitas Venezuela
            </span>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 20, // +45% (was 15px)
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              Marzo – Julio 2026
            </span>
          </div>
          <h1
            style={{
              fontFamily: theme.fonts.title,
              fontSize: 76, // +30% (was 58px)
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: -1,
              margin: 0,
            }}
          >
            Ecosistema Digital <span style={{ color: theme.colors.cepGold }}>CEP</span>
          </h1>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 32, // +30% (was 24px)
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            Diseño Web basado en el Manual <em>Oasis</em> &amp; Expansión a 11 Páginas
          </p>
        </div>

        {/* Client & Role Badge (100% Spanish) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.07)',
            padding: '16px 28px',
            borderRadius: 20,
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontFamily: theme.fonts.code, fontSize: 16, color: theme.colors.cepGold, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>
            Especialista Líder
          </span>
          <span style={{ fontFamily: theme.fonts.title, fontSize: 28, color: '#FFFFFF', fontWeight: 900 }}>
            Arianna Clemente
          </span>
          <span style={{ fontFamily: theme.fonts.body, fontSize: 18, color: 'rgba(255, 255, 255, 0.8)' }}>
            Arquitecta Web &amp; Diseñadora de Experiencia
          </span>
        </div>
      </div>

      {/* Main Body Showcase: Unified Act 1 & Act 2 (Left) + Multi-Device Mockup (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.15fr',
          gap: 36,
          alignItems: 'center',
          marginTop: 10,
          zIndex: 10,
        }}
      >
        {/* Left Column: Combined Content (Design from scratch + 11 pages expansion + Key page tags) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Card 1: Diseño Creado Desde Cero basado en Bases Oasis */}
          <div
            style={{
              opacity: card1,
              transform: `translateX(${interpolate(card1, [0, 1], [-30, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(245, 192, 0, 0.4)',
              borderRadius: 22,
              padding: '22px 28px',
              display: 'flex',
              gap: 22,
              alignItems: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: 'rgba(245, 192, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                flexShrink: 0,
                border: '1.5px solid rgba(245, 192, 0, 0.4)',
              }}
            >
              🌱
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>
                  Diseño Creado Desde Cero
                </span>
                <span style={{ fontFamily: theme.fonts.code, fontSize: 18, backgroundColor: theme.colors.cepBurgundy, color: '#FFF', padding: '4px 14px', borderRadius: 14, fontWeight: 800 }}>
                  Manual Oasis
                </span>
              </div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 26, color: 'rgba(255, 255, 255, 0.95)', margin: 0, lineHeight: 1.35, fontWeight: 500 }}>
                Diseño de interfaz sobria y accesible, aplicando las bases del manual institucional Oasis.
              </p>
            </div>
          </div>

          {/* Card 2: Arquitectura y Expansión a 11 Páginas (del Acto 2) */}
          <div
            style={{
              opacity: card2,
              transform: `translateX(${interpolate(card2, [0, 1], [-30, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(0, 163, 137, 0.45)',
              borderRadius: 22,
              padding: '22px 28px',
              display: 'flex',
              gap: 22,
              alignItems: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: 'rgba(0, 163, 137, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                flexShrink: 0,
                border: '1.5px solid rgba(0, 163, 137, 0.5)',
              }}
            >
              🏛️
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>
                  Alcance Expandido a 11 Páginas
                </span>
                <span style={{ fontFamily: theme.fonts.code, fontSize: 18, backgroundColor: 'rgba(0, 163, 137, 0.3)', color: '#38ef7d', padding: '4px 14px', borderRadius: 14, fontWeight: 800 }}>
                  7 → 11 Páginas
                </span>
              </div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 26, color: 'rgba(255, 255, 255, 0.95)', margin: 0, lineHeight: 1.35, fontWeight: 500 }}>
                Arquitectura web escalable en WordPress para centralizar sedes, retiros y recursos pastorales.
              </p>
            </div>
          </div>

          {/* Card 3: Mención directa a las Páginas del Acto 2 en píldoras visuales */}
          <div
            style={{
              opacity: card3,
              transform: `translateX(${interpolate(card3, [0, 1], [-30, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(122, 28, 48, 0.7)',
              borderRadius: 22,
              padding: '18px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: theme.fonts.title, fontSize: 24, fontWeight: 900, color: theme.colors.cepGold }}>
                Módulos &amp; Páginas Desarrolladas:
              </span>
              <span style={{ fontFamily: theme.fonts.code, fontSize: 16, color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '3px 12px', borderRadius: 10, fontWeight: 700 }}>
                11 Secciones
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {KEY_PAGES.map((page, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: theme.fonts.code,
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(245, 192, 0, 0.12)',
                    border: '1px solid rgba(245, 192, 0, 0.35)',
                    padding: '6px 16px',
                    borderRadius: 14,
                  }}
                >
                  ✓ {page}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Mockup with cep.jpg */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${mockupScale}) translateY(${mockupY}px)`,
          }}
        >
          {/* Ambient Behind Mockup */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(245, 192, 0, 0.3) 0%, rgba(122, 28, 48, 0.45) 100%)',
              filter: 'blur(35px)',
              transform: 'scale(0.92)',
              zIndex: 1,
            }}
          />

          {/* Main Visual Card */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)',
              backgroundColor: '#1E0E16',
              zIndex: 2,
            }}
          >
            {/* Top Device Bar (+45% sizes) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 22px',
                backgroundColor: 'rgba(25, 10, 16, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27C93F' }} />
                <span style={{ marginLeft: 14, fontFamily: theme.fonts.code, fontSize: 19, color: theme.colors.cepGold, fontWeight: 800 }}>
                  cepsj.org.ve • Sitio Web Institucional
                </span>
              </div>
              <span style={{ fontFamily: theme.fonts.code, fontSize: 18, backgroundColor: 'rgba(0, 163, 137, 0.25)', color: '#00D2B4', padding: '6px 14px', borderRadius: 12, fontWeight: 800 }}>
                Móvil &amp; Escritorio
              </span>
            </div>

            {/* Mockup Image */}
            <Img
              src={staticFile('screenshots/cep/cep.jpg')}
              style={{
                width: '100%',
                height: 440,
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Bottom floating badge (+45% sizes) */}
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 18,
                right: 18,
                padding: '14px 24px',
                borderRadius: 16,
                backgroundColor: 'rgba(25, 10, 16, 0.94)',
                backdropFilter: 'blur(14px)',
                border: '1.5px solid rgba(255, 255, 255, 0.22)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>✨</span>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 22, fontWeight: 900, color: '#FFFFFF' }}>
                  Plataforma Web en Producción
                </span>
              </div>
              <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: theme.colors.cepGold, fontWeight: 800 }}>
                WordPress • 11 Páginas Modulares
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 16,
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: 'rgba(255, 255, 255, 0.7)' }}>
          Acto 1 de 3: Conceptualización &amp; Arquitectura Web
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 6, borderRadius: 3, backgroundColor: theme.colors.cepGold }} />
          <div style={{ width: 10, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)' }} />
          <div style={{ width: 10, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)' }} />
        </div>
        <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: theme.colors.cepGold, fontWeight: 800 }}>
          Siguiente: Recorrido Técnico por la Plataforma →
        </span>
      </div>
    </div>
  );
};

