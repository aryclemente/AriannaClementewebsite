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

export const Scene2BecaDesign: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animations
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const headerY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Spring cards
  const card1 = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } });
  const card2 = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 12 } });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#13041a',
        backgroundImage: 'radial-gradient(ellipse at 20% 80%, #390d47 0%, #13041a 70%)',
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
      <Audio src={staticFile('audio/beca/beca_act2_diseno.mp3')} volume={1} />

      {/* SFX: Intro whoosh */}
      <Sequence from={0} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_whoosh.wav')} volume={0.35} />
      </Sequence>
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.3} />
      </Sequence>
      <Sequence from={50} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_metric.wav')} volume={0.35} />
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
              backgroundColor: '#4d17d6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 8px 20px rgba(77, 23, 214, 0.4)',
            }}
          >
            🎨
          </div>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#00D2B4',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Identidad de Marca &amp; UX/UI
            </div>
            <div
              style={{
                fontSize: '34px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
              }}
            >
              Manual Oficial Fe y Alegría &amp; Tokens de Color
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
            <span>📐</span>
            <span>Diseño Centrado en el Donante</span>
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              backgroundColor: '#FF2E93',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(255, 46, 147, 0.3)',
            }}
          >
            Acto 2: Sistema Visual
          </div>
        </div>
      </div>

      {/* Main Grid: Left Color Tokens vs Right Showcase */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.05fr',
          gap: '50px',
          alignItems: 'center',
          flex: 1,
          padding: '25px 0',
        }}
      >
        {/* Left Column: Tokens & Rules Cards */}
        <div
          style={{
            transform: `scale(${card1}) translateY(${(1 - card1) * 30}px)`,
            opacity: card1,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {/* Main Card: Color Standardization */}
          <div
            style={{
              padding: '24px 28px',
              borderRadius: '22px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#00D2B4', textTransform: 'uppercase' }}>
              Estandarización Cromática Oficial
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>
              Armonía y Alto Contraste en Toda la Experiencia
            </div>
            <div style={{ fontSize: '17px', color: '#D4C4DE', lineHeight: 1.5 }}>
              Sustitución de colores discrepantes por la paleta oficial institucional de Fe y Alegría, asegurando legibilidad sin saturar la vista.
            </div>
          </div>

          {/* Color Palette Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Color 1: Morado Institucional */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: '#350a4d',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#5c1682', border: '2px solid white' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Fondo Morado</div>
                <div style={{ fontSize: '13px', color: '#D4C4DE' }}>Sección Programas</div>
              </div>
            </div>

            {/* Color 2: Naranja Programas */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 122, 0, 0.15)',
                border: '1px solid rgba(255, 122, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#FF7A00', border: '2px solid white' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFBD80' }}>Pastillas Naranjas</div>
                <div style={{ fontSize: '13px', color: '#E0D0EB' }}>Tipos de Beca</div>
              </div>
            </div>

            {/* Color 3: Verde Institucional */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(0, 210, 180, 0.12)',
                border: '1px solid rgba(0, 210, 180, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#00D2B4', border: '2px solid white' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#00D2B4' }}>Verde Institucional</div>
                <div style={{ fontSize: '13px', color: '#E0D0EB' }}>Comprobantes y Éxito</div>
              </div>
            </div>

            {/* Color 4: Rojo Acción */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 46, 147, 0.15)',
                border: '1px solid rgba(255, 46, 147, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#FF2E93', border: '2px solid white' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FF70A6' }}>Rojo Llamado a Acción</div>
                <div style={{ fontSize: '13px', color: '#E0D0EB' }}>Exclusivo para Donar</div>
              </div>
            </div>
          </div>

          {/* Pattern Watermark Highlight */}
          <div
            style={{
              padding: '18px 24px',
              borderRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px dashed rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <span style={{ fontSize: '30px' }}>✨</span>
            <div style={{ fontSize: '16px', color: '#E0D0EB', lineHeight: 1.4 }}>
              <strong>Patrón Gráfico Reescalado:</strong> Marca de agua a gran escala con alta transparencia para dar sofisticación sin entorpecer la lectura.
            </div>
          </div>
        </div>

        {/* Right Column: Beca2.jpg Showcase */}
        <div
          style={{
            transform: `scale(${card2}) translateY(${(1 - card2) * 30}px)`,
            opacity: card2,
            position: 'relative',
            borderRadius: '26px',
            overflow: 'hidden',
            backgroundColor: '#20082c',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              backgroundColor: '#2c0b3d',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '14px', color: '#00D2B4', fontWeight: 700 }}>
              Diseño de Interfaz Responsiva
            </div>
            <div style={{ fontSize: '13px', color: '#D4C4DE' }}>Desktop &amp; Mobile</div>
          </div>

          <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
            <Img
              src={staticFile('screenshots/beca/Beca2.jpg')}
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
                background: 'linear-gradient(to top, rgba(19, 4, 26, 0.85) 0%, transparent 60%)',
              }}
            />

            {/* Bottom Floating Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '14px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(19, 4, 26, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', color: '#FF7A00', fontWeight: 700 }}>Pastillas &amp; Programas</div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>Apadrina por Nivel Formativo</div>
              </div>
              <span style={{ fontSize: '24px' }}>🧡</span>
            </div>
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
        <span>Trabajo remoto conjunto con el equipo de financiamiento de Fe y Alegría</span>
        <span style={{ color: '#00D2B4', fontWeight: 700 }}>Estandarización 100% Completada</span>
      </div>
    </div>
  );
};
