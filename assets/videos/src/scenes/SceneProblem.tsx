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
import { theme } from '../theme';

interface ScreenshotCardProps {
  src: string;
  index: number;
  frame: number;
  fps: number;
  totalFrames: number;
  label: string;
}

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  src,
  index,
  frame,
  fps,
  totalFrames,
  label,
}) => {
  // Staggered entrance animation: spring pop & slide-up
  const enterDelay = 6 + index * 8;
  const enterSpring = spring({
    frame: Math.max(0, frame - enterDelay),
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const enterY = interpolate(enterSpring, [0, 1], [80, 0]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Subtle continuous floating wave
  const floatY = Math.sin((frame + index * 45) / 25) * 6;
  const floatRotate = Math.cos((frame + index * 30) / 35) * 1.2;

  // Staggered exit animation towards the end of the scene (starts at frame 710)
  const exitStart = totalFrames - 40 + index * 4;
  const exitProgress = interpolate(
    frame,
    [exitStart, totalFrames - 5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.75]);
  const exitY = interpolate(exitProgress, [0, 1], [0, 60]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  const combinedScale = enterSpring * exitScale;
  const combinedY = enterY + floatY + exitY;
  const combinedOpacity = enterOpacity * exitOpacity;

  return (
    <div
      style={{
        transform: `translateY(${combinedY}px) scale(${combinedScale}) rotate(${floatRotate}deg)`,
        opacity: combinedOpacity,
        position: 'relative',
        width: 480,
        height: 520,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(239, 68, 68, 0.15)',
        border: '1.5px solid rgba(239, 68, 68, 0.35)',
        backgroundColor: '#150522',
        flexShrink: 0,
      }}
    >
      {/* Red warning ribbon on top */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 5,
          padding: '6px 16px',
          borderRadius: 10,
          backgroundColor: 'rgba(239, 68, 68, 0.9)',
          backdropFilter: 'blur(8px)',
          fontFamily: theme.fonts.code,
          fontSize: 14,
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>

      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          filter: 'brightness(0.88) contrast(1.08)',
        }}
      />
    </div>
  );
};

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TOTAL_FRAMES = 750;

  // Header entrance animation
  const headerOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const headerY = interpolate(frame, [0, 18], [-25, 0], {
    extrapolateRight: 'clamp',
  });

  // Mosaic slow panoramic drift
  const mosaicX = interpolate(frame, [0, TOTAL_FRAMES], [40, -110]);

  // Card warning badge springs
  const badge1Spring = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 11, stiffness: 140 } });
  const badge2Spring = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 11, stiffness: 140 } });
  const badge3Spring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 11, stiffness: 140 } });

  // Scene exit fade
  const sceneExitOpacity = interpolate(frame, [TOTAL_FRAMES - 20, TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0114',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 80px',
        opacity: sceneExitOpacity,
      }}
    >
      {/* Primary Voiceover */}
      <Audio src={staticFile('audio/scene1_problem.mp3')} volume={1} />

      {/* SFX: Entrance Whoosh for Screenshot Cards (frame 6) */}
      <Sequence from={6} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Audio for Warning Badge 1 (frame 30) */}
      <Sequence from={30} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_alert1.wav')} volume={0.65} />
      </Sequence>

      {/* SFX: Audio for Warning Badge 2 (frame 70) */}
      <Sequence from={70} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_alert2.wav')} volume={0.65} />
      </Sequence>

      {/* SFX: Audio for Warning Badge 3 (frame 110) */}
      <Sequence from={110} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_alert3.wav')} volume={0.65} />
      </Sequence>

      {/* SFX: Scene Exit Transition Whoosh (frame 725) */}
      <Sequence from={725} durationInFrames={25}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.4} />
      </Sequence>

      {/* Background Red/Amber Radial Warning Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 950,
          height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(245, 158, 11, 0.12) 50%, transparent 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header Info */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <span
            style={{
              padding: '8px 20px',
              borderRadius: 30,
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1.5px solid rgba(239, 68, 68, 0.4)',
              color: '#F87171',
              fontFamily: theme.fonts.code,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Fase 1: Diagnóstico &amp; Auditoría
          </span>
          <span style={{ color: theme.colors.textDim, fontFamily: theme.fonts.code, fontSize: 15 }}>
            // Caso de Estudio: U.E. Colegio Gonzaga
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
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          El Problema: Sitio Web Fragmentado y Sin Conversión
        </h1>
      </div>

      {/* Center: Animated Screenshots Stream with Alert Overlays */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 580,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Screenshots Stream */}
        <div
          style={{
            display: 'flex',
            gap: 28,
            transform: `translateX(${mosaicX}px)`,
          }}
        >
          {/* Card 1: Campañas (Replaced propuestaeducativa) */}
          <ScreenshotCard
            src={staticFile('screenshots/campanas.png')}
            index={0}
            frame={frame}
            fps={fps}
            totalFrames={TOTAL_FRAMES}
            label="⚠️ Campañas Aisladas"
          />

          {/* Card 2: Galería del Gonzaga (Replaced propuesta_financiamiento_old) */}
          <ScreenshotCard
            src={staticFile('screenshots/galeria_del_gonzaga.png')}
            index={1}
            frame={frame}
            fps={fps}
            totalFrames={TOTAL_FRAMES}
            label="⚠️ Galería Sin Optimizar"
          />

          {/* Card 3: Noticias Antiguas */}
          <ScreenshotCard
            src={staticFile('screenshots/noticiasold.png')}
            index={2}
            frame={frame}
            fps={fps}
            totalFrames={TOTAL_FRAMES}
            label="⚠️ Noticias Desactualizadas"
          />

          {/* Card 4: Misión y Visión Antigua */}
          <ScreenshotCard
            src={staticFile('screenshots/mision_y_vision.png')}
            index={3}
            frame={frame}
            fps={fps}
            totalFrames={TOTAL_FRAMES}
            label="⚠️ Sin Arquitectura Clara"
          />
        </div>

        {/* Warning Badge 1 (frame 30) */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            bottom: 25,
            transform: `scale(${badge1Spring})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 30px',
            borderRadius: 22,
            backgroundColor: 'rgba(20, 2, 30, 0.95)',
            border: '2.5px solid #EF4444',
            boxShadow: '0 16px 40px rgba(239, 68, 68, 0.45)',
            backdropFilter: 'blur(16px)',
            zIndex: 15,
          }}
        >
          <span style={{ fontSize: 38 }}>⚠️</span>
          <div>
            <div style={{ fontFamily: theme.fonts.title, fontSize: 22, fontWeight: 900, color: '#FCA5A5' }}>
              12 Páginas Dispersas
            </div>
            <div style={{ fontFamily: theme.fonts.body, fontSize: 16, color: '#E2E8F0', marginTop: 2 }}>
              Sin jerarquía clara ni arquitectura de contenidos
            </div>
          </div>
        </div>

        {/* Warning Badge 2 (frame 70) */}
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: 35,
            transform: `scale(${badge2Spring})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 30px',
            borderRadius: 22,
            backgroundColor: 'rgba(20, 2, 30, 0.95)',
            border: '2.5px solid #F59E0B',
            boxShadow: '0 16px 40px rgba(245, 158, 11, 0.45)',
            backdropFilter: 'blur(16px)',
            zIndex: 15,
          }}
        >
          <span style={{ fontSize: 38 }}>🚫</span>
          <div>
            <div style={{ fontFamily: theme.fonts.title, fontSize: 22, fontWeight: 900, color: '#FDE68A' }}>
              Cero Conversión de Donaciones
            </div>
            <div style={{ fontFamily: theme.fonts.body, fontSize: 16, color: '#E2E8F0', marginTop: 2 }}>
              Campañas desconectadas y sin pasarela directa
            </div>
          </div>
        </div>

        {/* Warning Badge 3 (frame 110) */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            bottom: 25,
            transform: `scale(${badge3Spring})`,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 30px',
            borderRadius: 22,
            backgroundColor: 'rgba(20, 2, 30, 0.95)',
            border: '2.5px solid #EC4899',
            boxShadow: '0 16px 40px rgba(236, 72, 153, 0.45)',
            backdropFilter: 'blur(16px)',
            zIndex: 15,
          }}
        >
          <span style={{ fontSize: 38 }}>📉</span>
          <div>
            <div style={{ fontFamily: theme.fonts.title, fontSize: 22, fontWeight: 900, color: '#FBCFE8' }}>
              Inconsistencia de Marca
            </div>
            <div style={{ fontFamily: theme.fonts.body, fontSize: 16, color: '#E2E8F0', marginTop: 2 }}>
              Falta de identidad institucional y lentitud en móvil
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle / Captions Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 36px',
          borderRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(14px)',
          width: 'fit-content',
          alignSelf: 'center',
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 20,
            fontWeight: 600,
            color: theme.colors.textWhite,
            textAlign: 'center',
          }}
        >
          💬 "Identificamos 12 páginas dispersas, navegación confusa y falta de mecanismos para canalizar donaciones."
        </span>
      </div>
    </div>
  );
};

