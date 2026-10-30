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

export const Scene4CIDEResultsOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // Spring cards
  const card1 = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12 } });
  const card2 = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 12 } });
  const card3 = spring({ frame: Math.max(0, frame - 105), fps, config: { damping: 12 } });

  // Signature reveal
  const signatureSpring = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 14 } });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0f1d',
        backgroundImage: 'radial-gradient(ellipse at 80% 20%, #1e3a8a 0%, #0a0f1d 75%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 80px',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        color: '#FFFFFF',
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/cide/cide_act4_resultados.mp3')} volume={1} />

      {/* SFX: Intro sparkle */}
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx_sparkle.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Staggered metric sounds */}
      {[25, 65, 105].map((f, i) => (
        <Sequence key={i} from={f} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_metric.wav')} volume={0.35} />
        </Sequence>
      ))}

      {/* SFX: Final signature chord */}
      <Sequence from={150} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx_signature.wav')} volume={0.5} />
      </Sequence>

      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(16, 185, 129, 0.12) 50%, transparent 80%)',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 20,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                padding: '8px 22px',
                borderRadius: 24,
                border: '1.5px solid rgba(56, 189, 248, 0.35)',
              }}
            >
              Acto 4 de 4: Resultados, Eficiencia &amp; Cierre
            </span>
            <span
              style={{
                fontFamily: theme.fonts.code,
                fontSize: 20,
                color: '#34d399',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                padding: '8px 18px',
                borderRadius: 18,
                fontWeight: 800,
              }}
            >
              Estatus: 100% Implementado &amp; Solvente
            </span>
          </div>
          <h1
            style={{
              fontFamily: theme.fonts.title,
              fontSize: 74,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: -1,
              margin: 0,
            }}
          >
            Impacto Operativo &amp; <span style={{ color: '#38bdf8' }}>Autonomía Institucional</span>
          </h1>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 30,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              maxWidth: 1000,
              lineHeight: 1.35,
            }}
          >
            Actualización ágil sobre sistema existente: cero horas de soporte manual y descarga garantizada 24/7.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.14)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 22,
            padding: '16px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontSize: 34 }}>🏆</span>
          <div>
            <span style={{ display: 'block', fontFamily: theme.fonts.title, fontSize: 22, fontWeight: 900, color: '#FFFFFF' }}>
              Gestión Exitosa
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 17, color: '#38bdf8', fontWeight: 800 }}>
              CIDE 2025
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
          alignItems: 'stretch',
          marginTop: 10,
          zIndex: 10,
        }}
      >
        {/* Card 1: Autoservicio 100% */}
        <div
          style={{
            opacity: card1,
            transform: `translateY(${interpolate(card1, [0, 1], [30, 0])}px)`,
            backgroundColor: 'rgba(30, 41, 59, 0.92)',
            border: '1.5px solid rgba(56, 189, 248, 0.45)',
            borderRadius: 24,
            padding: '28px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                marginBottom: 18,
                border: '1.5px solid rgba(56, 189, 248, 0.4)',
              }}
            >
              🎓
            </div>
            <h3 style={{ fontFamily: theme.fonts.title, fontSize: 30, fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px 0' }}>
              100% Autoservicio para Estudiantes
            </h3>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 24, color: 'rgba(255, 255, 255, 0.9)', margin: 0, lineHeight: 1.4 }}>
              Los participantes ingresan su cédula o código en el navegador y obtienen su certificado de forma inmediata y autónoma.
            </p>
          </div>
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#38bdf8', fontWeight: 800 }}>
              Disponibilidad 24/7
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#34d399', fontWeight: 800 }}>
              ✓ Cero Espera
            </span>
          </div>
        </div>

        {/* Card 2: Cero Quejas por Correos Rebotados */}
        <div
          style={{
            opacity: card2,
            transform: `translateY(${interpolate(card2, [0, 1], [30, 0])}px)`,
            backgroundColor: 'rgba(30, 41, 59, 0.92)',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            borderRadius: 24,
            padding: '28px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                marginBottom: 18,
                border: '1.5px solid rgba(16, 185, 129, 0.4)',
              }}
            >
              📉
            </div>
            <h3 style={{ fontFamily: theme.fonts.title, fontSize: 30, fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px 0' }}>
              0 Quejas por Rebotes de Correo
            </h3>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 24, color: 'rgba(255, 255, 255, 0.9)', margin: 0, lineHeight: 1.4 }}>
              Se erradicó el cuello de botella de correos bloqueados por spam o direcciones mal escritas que consumían horas del personal.
            </p>
          </div>
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#34d399', fontWeight: 800 }}>
              Horas de Soporte Manual
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#34d399', fontWeight: 800 }}>
              ✓ Reducidas a Cero
            </span>
          </div>
        </div>

        {/* Card 3: Servidor SMTP Descongestionado */}
        <div
          style={{
            opacity: card3,
            transform: `translateY(${interpolate(card3, [0, 1], [30, 0])}px)`,
            backgroundColor: 'rgba(30, 41, 59, 0.92)',
            border: '1.5px solid rgba(251, 191, 36, 0.45)',
            borderRadius: 24,
            padding: '28px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: 'rgba(251, 191, 36, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                marginBottom: 18,
                border: '1.5px solid rgba(251, 191, 36, 0.45)',
              }}
            >
              ☁️
            </div>
            <h3 style={{ fontFamily: theme.fonts.title, fontSize: 30, fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px 0' }}>
              Servidor SMTP Descongestionado
            </h3>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 24, color: 'rgba(255, 255, 255, 0.9)', margin: 0, lineHeight: 1.4 }}>
              Al descargar directamente desde el navegador, el servidor de correo institucional quedó libre de sobrecargas de adjuntos pesados.
            </p>
          </div>
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#fbbf24', fontWeight: 800 }}>
              Carga del Servidor
            </span>
            <span style={{ fontFamily: theme.fonts.code, fontSize: 18, color: '#34d399', fontWeight: 800 }}>
              ✓ Operación Estable
            </span>
          </div>
        </div>
      </div>

      {/* Outro Signature Bar: Logo AryCode & Contacto Directo */}
      <div
        style={{
          opacity: signatureSpring,
          transform: `scale(${signatureSpring})`,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1.5px solid rgba(56, 189, 248, 0.45)',
          borderRadius: 24,
          padding: '20px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
          zIndex: 10,
        }}
      >
        {/* Left: AryCode Logo + Name + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Logo AryCode */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              padding: '10px 22px',
              borderRadius: 18,
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
            }}
          >
            <span style={{ fontSize: 28 }}>⚡</span>
            <span style={{ fontFamily: theme.fonts.title, fontSize: 32, fontWeight: 900, color: '#FFFFFF', letterSpacing: -0.5 }}>
              Ary<span style={{ color: '#38bdf8' }}>Code</span>
            </span>
          </div>

          <div>
            <h2 style={{ fontFamily: theme.fonts.title, fontSize: 30, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              Arianna Clemente
            </h2>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 19, color: 'rgba(255, 255, 255, 0.85)', margin: '4px 0 0 0' }}>
              Desarrolladora Web &amp; Especialista en Plugins WordPress • Arquitectura Backend &amp; Soporte
            </p>
          </div>
        </div>

        {/* Right: Direct Contact (Email & WhatsApp) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: theme.fonts.code,
              fontSize: 18,
              color: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              padding: '12px 22px',
              borderRadius: 16,
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              fontWeight: 800,
            }}
          >
            <span style={{ fontSize: 20 }}>✉️</span>
            <span>hello.ary.code@gmail.com</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: theme.fonts.code,
              fontSize: 18,
              color: '#34d399',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              padding: '12px 22px',
              borderRadius: 16,
              fontWeight: 800,
            }}
          >
            <span style={{ fontSize: 20 }}>💬</span>
            <span>+58 424 168 5298</span>
          </div>
        </div>
      </div>
    </div>
  );
};
