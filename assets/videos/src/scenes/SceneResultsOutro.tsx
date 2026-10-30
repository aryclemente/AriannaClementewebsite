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

const METRICS = [
  {
    icon: '📊',
    value: '8 Eventos GA4',
    title: 'Telemetría de Conversión',
    desc: 'Embudo de donación y dataLayer configurados para auditar tráfico y éxito de campañas.',
    color: theme.colors.secondary,
  },
  {
    icon: '⚡',
    value: '5 Páginas Clave',
    title: 'Arquitectura Optimizada',
    desc: 'Sintetizado de 12 páginas legadas a 5 maestras con alta velocidad en móvil.',
    color: theme.colors.hotPink,
  },
  {
    icon: '🎓',
    value: '100% Transferido',
    title: 'Capacitación Operativa',
    desc: 'Micro-sesiones grabadas y guías de uso para el equipo de inteligencia digital.',
    color: theme.colors.mint,
  },
  {
    icon: '💙',
    value: '+3,500 Red Activa',
    title: 'Impacto Institucional',
    desc: 'Canalización directa de aportes familiares, exalumnos y voluntariado.',
    color: theme.colors.amber,
  },
];

export const SceneResultsOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Outro signature animation
  const signatureSpring = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  // Final scene fade-out
  const sceneExitOpacity = interpolate(frame, [555, 580], [1, 0], {
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
      <Audio src={staticFile('audio/scene4_results_outro.mp3')} volume={1} />

      {/* SFX: Metric Counter Dings for the 4 Verified Metric Cards */}
      {[15, 25, 35, 45].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_metric.wav')} volume={0.4} />
        </Sequence>
      ))}

      {/* SFX: Premium Signature Chord Swell (frame 160) */}
      <Sequence from={160} durationInFrames={60}>
        <Audio src={staticFile('audio/sfx_signature.wav')} volume={0.45} />
      </Sequence>

      {/* Cyber Mesh Radial Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1100,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 46, 147, 0.25) 0%, rgba(77, 23, 214, 0.3) 50%, transparent 80%)',
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
              backgroundColor: 'rgba(0, 210, 180, 0.2)',
              border: `1.5px solid ${theme.colors.mint}`,
              color: theme.colors.mint,
              fontFamily: theme.fonts.code,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Fase 4: Métricas &amp; Entrega Llave en Mano
          </span>
          <span style={{ color: theme.colors.textDim, fontFamily: theme.fonts.code, fontSize: 15 }}>
            // Resultados Comprobables
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
          Resultados: Plataforma Robusta, Medible y Escalable
        </h1>
      </div>

      {/* 4 Impact Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 22,
          zIndex: 10,
        }}
      >
        {METRICS.map((metric, idx) => {
          const cardSpring = spring({
            frame: Math.max(0, frame - (15 + idx * 10)),
            fps,
            config: { damping: 13, stiffness: 120 },
          });

          return (
            <div
              key={metric.title}
              style={{
                transform: `scale(${cardSpring})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px 24px',
                borderRadius: 22,
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                border: `2px solid ${metric.color}60`,
                boxShadow: `0 14px 30px -5px ${metric.color}30`,
                backdropFilter: 'blur(16px)',
                minHeight: 280,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 44 }}>{metric.icon}</span>
                  <div
                    style={{
                      fontFamily: theme.fonts.code,
                      fontSize: 13,
                      fontWeight: 800,
                      color: metric.color,
                      backgroundColor: `${metric.color}25`,
                      padding: '4px 10px',
                      borderRadius: 10,
                    }}
                  >
                    VERIFICADO
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: 32,
                    fontWeight: 900,
                    color: metric.color,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: 20,
                    fontWeight: 900,
                    color: theme.colors.textWhite,
                    marginBottom: 8,
                  }}
                >
                  {metric.title}
                </div>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    color: theme.colors.primaryFixedDim,
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {metric.desc}
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
                  color: metric.color,
                  fontFamily: theme.fonts.code,
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <span>● En producción activa</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outro / Professional Brand Signature Card */}
      <div
        style={{
          transform: `scale(${signatureSpring})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 38px',
          borderRadius: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.09)',
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          boxShadow: theme.shadows.purpleGlow,
          backdropFilter: 'blur(16px)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {/* Logo / Heart */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              backgroundColor: theme.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: theme.shadows.pinkGlow,
            }}
          >
            💖
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: theme.fonts.title, fontSize: 28, fontWeight: 900, color: theme.colors.textWhite }}>
                Ary Code // Arianna Clemente
              </span>
              <span
                style={{
                  fontFamily: theme.fonts.code,
                  fontSize: 14,
                  fontWeight: 800,
                  color: theme.colors.secondary,
                  backgroundColor: 'rgba(1, 227, 253, 0.15)',
                  padding: '4px 12px',
                  borderRadius: 12,
                }}
              >
                Solutions Architect &amp; Tech Lead
              </span>
            </div>
            <div style={{ fontFamily: theme.fonts.body, fontSize: 16, color: theme.colors.primaryFixedDim, marginTop: 4 }}>
              Sistemas Robustos, Experiencias Digitales de Alta Precisión &amp; WordPress Headless
            </div>
          </div>
        </div>

        {/* Contact Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 15, color: theme.colors.mint, fontWeight: 800 }}>
              ✉ hello.ary.code@gmail.com
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 13, color: theme.colors.textDim }}>
              linkedin.com/in/aryclement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
