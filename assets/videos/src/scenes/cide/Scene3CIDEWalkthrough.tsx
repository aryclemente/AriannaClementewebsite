import React from 'react';
import {
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { BrowserFrame } from '../../components/BrowserFrame';
import { FeatureCallout } from '../../components/FeatureCallout';
import { theme } from '../../theme';

export const Scene3CIDEWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = 990; // 33 seconds @ 30fps

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#070d18',
        backgroundImage: 'radial-gradient(ellipse at 70% 30%, #1e3a8a 0%, #070d18 75%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 60px',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        opacity,
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile('audio/cide/cide_act3_walkthrough.mp3')} volume={1} />

      {/* SFX: Navigation & Intro */}
      <Sequence from={2} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx_nav.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Staggered Callouts */}
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={320} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_alert1.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={640} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_metric.wav')} volume={0.4} />
      </Sequence>

      {/* Top Banner Tag */}
      <div
        style={{
          width: '100%',
          maxWidth: 1680,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
            Acto 3 de 4: Recorrido Técnico • Sistema en Producción
          </span>
          <span style={{ fontFamily: theme.fonts.title, fontSize: 30, color: '#FFFFFF', fontWeight: 900 }}>
            Consulta de Certificados &amp; Validación en Vivo
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.85)',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              padding: '8px 20px',
              borderRadius: 16,
              fontWeight: 700,
            }}
          >
            Velocidad: 1.8x
          </span>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 18,
              color: '#34d399',
              backgroundColor: 'rgba(16, 185, 129, 0.18)',
              padding: '8px 20px',
              borderRadius: 16,
              fontWeight: 800,
            }}
          >
            ● cidelatam.org/sistema-de-validacion
          </span>
        </div>
      </div>

      {/* Main Browser Frame with the Walkthrough Video */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1680, height: 860, zIndex: 5 }}>
        <BrowserFrame
          url="cidelatam.org/sistema-de-validacion-de-resultados-2025/"
          pageTitle="Validación de Certificados 2025 — Centro de Investigación y Desarrollo CIDE"
          badge="Plugin CIDE WordPress"
        >
          <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000000' }}>
            <OffthreadVideo
              src={staticFile('screenshots/cide/Consulta_Certificados_2025.mp4')}
              startFrom={0}
              endAt={Math.round(60 * 30)}
              playbackRate={1.8}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </BrowserFrame>

        {/* Callout 1: Búsqueda Dual */}
        <FeatureCallout
          icon="🔍"
          title="Búsqueda Dual de Credenciales"
          subtitle="Consulta instantánea por cédula de identidad / DNI o por código único de certificado"
          delayFrames={20}
          position="top-right"
          highlightColor="#38bdf8"
        />

        {/* Callout 2: Motor PHP Optimizado */}
        <FeatureCallout
          icon="⚡"
          title="Consulta Directa en Base de Datos"
          subtitle="Procesamiento en tiempo real con cero latencia y sin almacenar PDFs pesados"
          delayFrames={320}
          position="bottom-left"
          highlightColor="#34d399"
        />

        {/* Callout 3: Descarga Directa sin SMTP */}
        <FeatureCallout
          icon="📥"
          title="Descarga en Alta Resolución"
          subtitle="100% autoservicio en el navegador sin depender de correos que rebotan"
          delayFrames={640}
          position="bottom-right"
          highlightColor="#fbbf24"
        />
      </div>
    </div>
  );
};
