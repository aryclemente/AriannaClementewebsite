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
import { theme } from '../../theme';

const PAGES = [
  { num: '01', title: 'Inicio (Home)', tag: 'Slider & Acceso Rápido', color: theme.colors.cepGold },
  { num: '02', title: 'Sobre Nosotros', tag: 'Misión & Visión Ignaciana', color: '#FFFFFF' },
  { num: '03', title: 'Casas de Retiro', tag: 'Directorio de Sedes', color: '#00D2B4' },
  { num: '04', title: 'Parroquias (CPT)', tag: 'Directorio Nacional', color: theme.colors.cepGold },
  { num: '05', title: 'Ejercicios Espirituales', tag: 'Gestor Dinámico de Fechas', color: '#FF2E93' },
  { num: '06', title: 'Recursos Pastorales', tag: 'Subsidios & Oraciones', color: '#00D2B4' },
  { num: '07', title: 'Actualidad & Noticias', tag: 'Centro Informativo', color: '#FFFFFF' },
  { num: '08', title: 'Mapeo SVG Nacional', tag: '6 Redes Apostólicas', color: theme.colors.cepGold },
  { num: '09', title: 'Dona Aquí', tag: 'Pasarela Institucional', color: '#FF2E93' },
  { num: '10', title: 'Contacto & Sedes', tag: 'SMTP Enrutado', color: '#00D2B4' },
  { num: '11', title: 'Agenda de Actividades', tag: 'Calendario Pastoral', color: '#FFFFFF' },
];

export const Scene2Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Spring badges
  const pillar1 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12 } });
  const pillar2 = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12 } });
  const pillar3 = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12 } });

  // Exit transition
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
        backgroundColor: '#140810',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 80px',
        opacity: sceneExitOpacity,
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/cep_scene2_architecture.mp3')} volume={1} />

      {/* SFX: Intro sparkle */}
      <Sequence from={10} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_sparkle.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Staggered pops for cards */}
      {[25, 40, 55, 70, 85, 100].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.25} />
        </Sequence>
      ))}

      {/* SFX: Exit whoosh */}
      <Sequence from={850} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '25%',
          width: 800,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122, 28, 48, 0.3) 0%, rgba(0, 163, 137, 0.15) 50%, transparent 80%)',
          filter: 'blur(90px)',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: theme.colors.cepGold,
                backgroundColor: 'rgba(245, 192, 0, 0.15)',
                padding: '8px 18px',
                borderRadius: 24,
                border: '1.5px solid rgba(245, 192, 0, 0.35)',
              }}
            >
              Arquitectura de Soluciones &amp; Escalabilidad
            </span>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 14,
                color: '#38ef7d',
                backgroundColor: 'rgba(56, 239, 125, 0.15)',
                padding: '6px 14px',
                borderRadius: 16,
                fontWeight: 800,
              }}
            >
              Alcance Expandido: 7 → 11 Páginas
            </span>
          </div>
          <h1
            style={{
              fontFamily: theme.fonts.title,
              fontSize: 58,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: -1,
              margin: 0,
            }}
          >
            Estructuración de Datos &amp; <span style={{ color: theme.colors.cepGold }}>Arquitectura Modular</span>
          </h1>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 24,
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            Custom Post Types (CPTs) y taxonomías jerárquicas para una autogestión total sin dependencia de ingeniería.
          </p>
        </div>

        {/* Metric Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 20,
            padding: '16px 28px',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: theme.fonts.title, fontSize: 38, fontWeight: 900, color: theme.colors.cepGold, lineHeight: 1 }}>
              11
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontWeight: 700 }}>
              Páginas Core
            </span>
          </div>
          <div style={{ width: 1, height: 42, backgroundColor: 'rgba(255, 255, 255, 0.18)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'block', fontFamily: theme.fonts.title, fontSize: 38, fontWeight: 900, color: '#00D2B4', lineHeight: 1 }}>
              100%
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontWeight: 700 }}>
              Autogestionable
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 11 Pages Mosaic (Left) & 3 Engineering Cards (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.18fr 1.02fr',
          gap: 36,
          alignItems: 'center',
          marginTop: 10,
          zIndex: 10,
        }}
      >
        {/* Left Column: The 11 Pages Badge Mosaic */}
        <div
          style={{
            backgroundColor: 'rgba(25, 10, 18, 0.85)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: theme.fonts.title, fontSize: 20, fontWeight: 900, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>📑</span> Mapeo Completo del Ecosistema Web
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 13, color: theme.colors.cepGold, fontWeight: 800 }}>
              11 Páginas Responsivas
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10,
            }}
          >
            {PAGES.map((page, i) => {
              const cardSpring = spring({ frame: Math.max(0, frame - (15 + i * 5)), fps, config: { damping: 14 } });
              return (
                <div
                  key={page.num}
                  style={{
                    opacity: cardSpring,
                    transform: `scale(${cardSpring})`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 12,
                    padding: '9px 13px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: theme.fonts.code,
                      fontSize: 13,
                      fontWeight: 800,
                      color: page.color,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: '4px 7px',
                      borderRadius: 6,
                    }}
                  >
                    {page.num}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: theme.fonts.title, fontSize: 15, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
                      {page.title}
                    </span>
                    <span style={{ fontFamily: theme.fonts.body, fontSize: 12, color: 'rgba(255, 255, 255, 0.65)' }}>
                      {page.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 3 Advanced Architecture Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Card 1: Custom Post Types */}
          <div
            style={{
              opacity: pillar1,
              transform: `translateY(${interpolate(pillar1, [0, 1], [25, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(245, 192, 0, 0.4)',
              borderRadius: 20,
              padding: '22px 26px',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontSize: 28, padding: '10px', backgroundColor: 'rgba(245, 192, 0, 0.15)', borderRadius: 14 }}>
              ⚙️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                  Custom Post Types (CPT)
                </span>
                <span style={{ fontFamily: theme.fonts.code, fontSize: 12, backgroundColor: theme.colors.cepBurgundy, color: '#FFF', padding: '3px 8px', borderRadius: 8, fontWeight: 700 }}>
                  WordPress Core
                </span>
              </div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 15, color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.45 }}>
                Estructuración desacoplada para Parroquias y Sedes: campos personalizados para coordenadas, contacto y horarios de misa.
              </p>
            </div>
          </div>

          {/* Card 2: Gestor Dinámico de Retiros */}
          <div
            style={{
              opacity: pillar2,
              transform: `translateY(${interpolate(pillar2, [0, 1], [25, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(0, 163, 137, 0.4)',
              borderRadius: 20,
              padding: '22px 26px',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontSize: 28, padding: '10px', backgroundColor: 'rgba(0, 163, 137, 0.15)', borderRadius: 14 }}>
              📅
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                  Gestor de Retiros &amp; Ejercicios
                </span>
                <span style={{ fontFamily: theme.fonts.code, fontSize: 12, backgroundColor: 'rgba(0, 163, 137, 0.25)', color: '#38ef7d', padding: '3px 8px', borderRadius: 8, fontWeight: 700 }}>
                  Taxonomías
                </span>
              </div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 15, color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.45 }}>
                Filtrado por fechas, modalidades (online / presencial) y casas de retiro, con actualización inmediata de cupos.
              </p>
            </div>
          </div>

          {/* Card 3: Banco de Recursos y Subsidios */}
          <div
            style={{
              opacity: pillar3,
              transform: `translateY(${interpolate(pillar3, [0, 1], [25, 0])}px)`,
              backgroundColor: 'rgba(35, 14, 24, 0.92)',
              border: '1.5px solid rgba(255, 46, 147, 0.4)',
              borderRadius: 20,
              padding: '22px 26px',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontSize: 28, padding: '10px', backgroundColor: 'rgba(255, 46, 147, 0.15)', borderRadius: 14 }}>
              📖
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <span style={{ fontFamily: theme.fonts.title, fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                  Subsidios de Oración Dinámicos
                </span>
                <span style={{ fontFamily: theme.fonts.code, fontSize: 12, backgroundColor: 'rgba(255, 46, 147, 0.25)', color: '#FF2E93', padding: '3px 8px', borderRadius: 8, fontWeight: 700 }}>
                  Search &amp; Filter
                </span>
              </div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 15, color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.45 }}>
                Buscador optimizado y filtrado por Oraciones, Lecturas y Reflexiones para nutrir la vida espiritual diaria.
              </p>
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
        <span style={{ fontFamily: theme.fonts.code, fontSize: 14, color: 'rgba(255, 255, 255, 0.6)' }}>
          Acto 2 de 4: Arquitectura de la Solución
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: 32, height: 6, borderRadius: 3, backgroundColor: theme.colors.cepGold }} />
          <div style={{ width: 8, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <div style={{ width: 8, height: 6, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        </div>
        <span style={{ fontFamily: theme.fonts.code, fontSize: 14, color: theme.colors.cepGold, fontWeight: 800 }}>
          Siguiente: Tour Técnico &amp; Componentes Estrella →
        </span>
      </div>
    </div>
  );
};
