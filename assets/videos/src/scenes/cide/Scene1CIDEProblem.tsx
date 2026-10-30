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

export const Scene1CIDEProblem: React.FC = () => {
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
        backgroundColor: '#0a0f1d',
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, #1e293b 0%, #0a0f1d 75%)',
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
      <Audio src={staticFile('audio/cide/cide_act1_problematica.mp3')} volume={1} />

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
              padding: '10px 18px',
              borderRadius: '16px',
              backgroundColor: 'rgba(37, 99, 235, 0.18)',
              border: '1.5px solid rgba(37, 99, 235, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '24px' }}>🎓</span>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '15px',
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Caso de Estudio • CIDE Latam
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
              Plugin WordPress para <span style={{ color: '#38bdf8' }}>Consulta de Certificados</span>
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#94a3b8',
                margin: '4px 0 0 0',
              }}
            >
              Gestión, Soporte y Actualización de Infraestructura Existente • cidelatam.org
            </p>
          </div>
        </div>

        <div
          style={{
            padding: '10px 22px',
            borderRadius: '14px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#f87171',
            fontSize: '15px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Acto 1: Diagnóstico &amp; Problemáticas</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.35fr',
          gap: '40px',
          alignItems: 'center',
          flex: 1,
          padding: '25px 0',
        }}
      >
        {/* Left Column: Context Card + Laptop Mockup */}
        <div
          style={{
            opacity: card1,
            transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '24px',
              backgroundColor: 'rgba(30, 41, 59, 0.75)',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#fbbf24',
                  backgroundColor: 'rgba(251, 191, 36, 0.15)',
                  padding: '4px 12px',
                  borderRadius: '10px',
                }}
              >
                Naturaleza del Desafío
              </span>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Actualización de Sistema en Marcha</span>
            </div>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.5,
                color: '#e2e8f0',
                margin: 0,
              }}
            >
              A diferencia de crear un portal desde cero, aquí la urgencia era de <strong>gestión y soporte</strong>: resolver la saturación técnica sin interrumpir las inscripciones ni la entrega de credenciales.
            </p>
          </div>

          {/* Screenshot container with CIDELaptop.jpg */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid rgba(56, 189, 248, 0.35)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
              backgroundColor: '#020617',
              height: '350px',
            }}
          >
            <Img
              src={staticFile('screenshots/cide/CIDELaptop.jpg')}
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
                background: 'linear-gradient(to top, rgba(10, 15, 29, 0.85) 0%, transparent 60%)',
              }}
            />

            {/* Bottom floating badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                right: '20px',
                padding: '12px 18px',
                borderRadius: '16px',
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>Entorno de Producción</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>CIDE • Validación de Certificados</div>
              </div>
              <span style={{ fontSize: '22px' }}>🔒</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Critical Bottlenecks */}
        <div
          style={{
            opacity: card2,
            transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Problem 1: Servidor Secundario Saturado */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              📁
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f87171' }}>
                1. Servidor Secundario Colapsado por Archivos PDF
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                El sistema histórico guardaba cada certificado como un PDF estático en un hosting separado. El almacenamiento se saturó y ya no permitía agregar nuevos diplomados, cursos ni eventos.
              </p>
            </div>
          </div>

          {/* Problem 2: Duplicidad Operativa */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              🔄
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fbbf24' }}>
                2. Doble Carga de Datos y Duplicidad Operativa
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                El equipo administrativo debía duplicar la información de cada evento: una vez en el portal principal para el marketing, y otra en el secundario para emitir certificados.
              </p>
            </div>
          </div>

          {/* Problem 3: Dependencia Crítica de SMTP y Quejas */}
          <div
            style={{
              padding: '22px 26px',
              borderRadius: '20px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              📧
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#f87171' }}>
                3. Fallas en Correos SMTP &amp; Horas de Soporte Manual
              </div>
              <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '6px 0 0 0', lineHeight: 1.45 }}>
                Los plugins comerciales enviaban certificados únicamente por email. Si rebotaba o caía en spam, el estudiante quedaba sin su título, generando horas de revisión manual y quejas continuas.
              </p>
            </div>
          </div>

          {/* Mission Objective Callout */}
          <div
            style={{
              padding: '20px 26px',
              borderRadius: '20px',
              backgroundColor: '#1d4ed8',
              boxShadow: '0 12px 28px rgba(29, 78, 216, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                La Misión de Arianna
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                Desarrollar un plugin con interfaz de consulta en tiempo real y autoservicio
              </div>
            </div>
            <span style={{ fontSize: '30px' }}>🚀</span>
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
        <span>Desarrollo de Plugins WordPress &amp; Arquitectura Backend: Arianna Clemente (AryCode)</span>
        <span style={{ color: '#38bdf8', fontWeight: 700 }}>Centro de Investigación y Desarrollo • cidelatam.org</span>
      </div>
    </div>
  );
};
