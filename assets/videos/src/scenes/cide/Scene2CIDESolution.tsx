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

export const Scene2CIDESolution: React.FC = () => {
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
        backgroundColor: '#070d18',
        backgroundImage: 'radial-gradient(ellipse at 20% 80%, #1e3a8a 0%, #070d18 70%)',
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
      <Audio src={staticFile('audio/cide/cide_act2_solucion.mp3')} volume={1} />

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
              padding: '10px 18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(16, 185, 129, 0.18)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '15px',
                fontWeight: 800,
                color: '#34d399',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Solución a Medida • Backend WordPress
            </span>
          </div>

          <div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 900,
                margin: 0,
                letterSpacing: '-0.5px',
              }}
            >
              Plugin Propio: <span style={{ color: '#38bdf8' }}>Consulta en Tiempo Real</span> &amp; Autoservicio
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#94a3b8',
                margin: '4px 0 0 0',
              }}
            >
              Arquitectura PHP nativa sobre el sitio principal de CIDE con validación dual
            </p>
          </div>
        </div>

        <div
          style={{
            padding: '10px 22px',
            borderRadius: '14px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: '#38bdf8',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Acto 2: Arquitectura &amp; Solución</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 1.05fr',
          gap: '40px',
          alignItems: 'center',
          flex: 1,
          padding: '25px 0',
        }}
      >
        {/* Left Column: 3 Architectural Pillars */}
        <div
          style={{
            opacity: card1,
            transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {/* Pillar 1: Consulta Dual por Cédula e ID */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              🔍
            </div>
            <div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#38bdf8' }}>
                1. Interfaz de Consulta Dual (Cédula / DNI &amp; ID Certificado)
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                Desarrollo de un formulario responsivo y rápido que interroga la base de datos principal mediante peticiones optimizadas, permitiendo a cualquier estudiante encontrar su diploma al instante.
              </p>
            </div>
          </div>

          {/* Pillar 2: Centralización y Eliminación de Servidor Secundario */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              🏢
            </div>
            <div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#34d399' }}>
                2. Centralización en el Portal Oficial (cidelatam.org)
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                Se acabó la duplicación manual de eventos: el marketing de cursos, las inscripciones y la emisión quedaron integradas en un solo WordPress con Theme Child y código PHP limpio.
              </p>
            </div>
          </div>

          {/* Pillar 3: Descanso de Servidor SMTP & Video Tutoriales */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              📹
            </div>
            <div>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#c084fc' }}>
                3. Alivio del Servidor SMTP &amp; Capacitación Audiovisual
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                Arianna produjo video tutoriales para el equipo de CIDE y para los alumnos, reduciendo a cero las incidencias manuales por correos rebotados y dejando descansar el servidor de correo.
              </p>
            </div>
          </div>

          {/* Quick Stat Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 22px',
              borderRadius: '16px',
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span style={{ fontSize: '20px' }}>⭐</span>
            <span style={{ fontSize: '15px', color: '#e2e8f0' }}>
              <strong>Autonomía Operativa:</strong> Descarga inmediata en el navegador sin depender de enlaces de email.
            </span>
          </div>
        </div>

        {/* Right Column: Visual Evidence (sistema.png / BANNER-CERT.png) */}
        <div
          style={{
            opacity: card2,
            transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Main Visual Box */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.65)',
              backgroundColor: '#020617',
              height: '420px',
            }}
          >
            <Img
              src={staticFile('screenshots/cide/sistema.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 13, 24, 0.88) 0%, transparent 60%)',
              }}
            />

            {/* Floating Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                padding: '16px 22px',
                borderRadius: '18px',
                backgroundColor: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>
                  Sistema de Validación 2025
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
                  Consulta Pública en Tiempo Real
                </div>
              </div>
              <span style={{ fontSize: '26px' }}>🏆</span>
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
          color: '#94a3b8',
        }}
      >
        <span>Ingeniería Backend: Plugin Personalizado en PHP &amp; MySQL • Arianna Clemente</span>
        <span style={{ color: '#34d399', fontWeight: 700 }}>Resolución Definitiva de Cuellos de Botella</span>
      </div>
    </div>
  );
};
