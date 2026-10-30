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

export const Scene1BecaProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const headerY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Spring cards
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });
  const card2 = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12 } });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#16041f',
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, #4a0d3d 0%, #16041f 70%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 70px',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        color: '#FFFFFF',
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/beca/beca_act1_problema.mp3')} volume={1} />

      {/* SFX: Intro whoosh */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.35} />
      </Sequence>

      {/* SFX: Pop sounds for cards */}
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.3} />
      </Sequence>
      <Sequence from={60} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.3} />
      </Sequence>

      {/* Header Bar */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          paddingBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: '#FF2E93',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 8px 20px rgba(255, 46, 147, 0.4)',
            }}
          >
            🎓
          </div>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#FF70A6',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Caso de Estudio • Fe y Alegría Venezuela
            </div>
            <div
              style={{
                fontSize: '34px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
              }}
            >
              Campaña "Beca a un Estudiante 2025"
            </div>
          </div>
        </div>

        {/* Brand Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '15px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>❤️</span>
            <span>Recaudación &amp; Solidaridad</span>
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              backgroundColor: '#00D2B4',
              color: '#0A0A0B',
              fontSize: '15px',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0, 210, 180, 0.3)',
            }}
          >
            Acto 1: El Desafío
          </div>
        </div>
      </div>

      {/* Main Grid: Left Mockup vs Right Pain Points */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.15fr',
          gap: '50px',
          alignItems: 'center',
          flex: 1,
          padding: '25px 0',
        }}
      >
        {/* Left Column: Landing Page Mockup Card */}
        <div
          style={{
            transform: `scale(${card1}) translateY(${(1 - card1) * 30}px)`,
            opacity: card1,
            position: 'relative',
            borderRadius: '26px',
            overflow: 'hidden',
            backgroundColor: '#230a30',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mockup Header bar */}
          <div
            style={{
              backgroundColor: '#2f0f40',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
            </div>
            <div style={{ fontSize: '14px', color: '#BBA4C7', fontWeight: 600 }}>
              donarfeyalegriavzla.org
            </div>
          </div>

          <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
            <Img
              src={staticFile('screenshots/beca/Beca.jpg')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(22, 4, 31, 0.85) 0%, transparent 60%)',
              }}
            />
            {/* Tag over image */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '14px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(22, 4, 31, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', color: '#00D2B4', fontWeight: 700 }}>Landing Page Oficial</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Apadrinamiento Educativo</div>
              </div>
              <span style={{ fontSize: '26px' }}>✨</span>
            </div>
          </div>
        </div>

        {/* Right Column: Problem & Challenge Cards */}
        <div
          style={{
            transform: `scale(${card2}) translateY(${(1 - card2) * 30}px)`,
            opacity: card2,
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {/* Main Problem Headline */}
          <div
            style={{
              padding: '28px 32px',
              borderRadius: '24px',
              backgroundColor: 'rgba(255, 46, 147, 0.12)',
              border: '2px solid rgba(255, 46, 147, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>⚠️</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#FF70A6', textTransform: 'uppercase' }}>
                El Problema Inicial
              </span>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1.35, color: '#FFFFFF' }}>
              Donaciones en WordPress limitadas a un botón genérico sin detalle de los programas.
            </div>
            <div style={{ fontSize: '18px', color: '#E0D0EB', lineHeight: 1.5 }}>
              Los donantes no conocían el destino de su aporte ni las distintas opciones de beca, generando desconfianza y alta tasa de abandono.
            </div>
          </div>

          {/* 3 Challenge Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div
              style={{
                padding: '20px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <span style={{ fontSize: '28px' }}>🎯</span>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#00D2B4' }}>Falta de Claridad</div>
                <div style={{ fontSize: '14px', color: '#C5B5D0' }}>Sin desglose por nivel formativo</div>
              </div>
            </div>

            <div
              style={{
                padding: '20px',
                borderRadius: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <span style={{ fontSize: '28px' }}>⚡</span>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#FF2E93' }}>Fricción en el Pago</div>
                <div style={{ fontSize: '14px', color: '#C5B5D0' }}>Flujos lentos y complejos</div>
              </div>
            </div>
          </div>

          {/* Mission Objective Callout */}
          <div
            style={{
              padding: '22px 28px',
              borderRadius: '20px',
              backgroundColor: '#4d17d6',
              boxShadow: '0 12px 28px rgba(77, 23, 214, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#00D2B4', textTransform: 'uppercase' }}>
                La Misión de Arianna
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                Crear una experiencia empática, transparente y con trazabilidad analítica
              </div>
            </div>
            <span style={{ fontSize: '32px' }}>🚀</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '16px',
          fontSize: '15px',
          color: '#A592B5',
        }}
      >
        <span>Desarrollo Web &amp; UX/UI: Arianna Clemente (AryCode)</span>
        <span style={{ color: '#00D2B4', fontWeight: 700 }}>Fe y Alegría Venezuela • donarfeyalegriavzla.org</span>
      </div>
    </div>
  );
};
