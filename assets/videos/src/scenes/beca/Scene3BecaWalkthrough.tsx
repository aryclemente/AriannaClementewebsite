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

export const Scene3BecaWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = 720; // 24 seconds @ 30fps

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
        backgroundColor: '#13041a',
        backgroundImage: 'radial-gradient(ellipse at 70% 30%, #3a0d48 0%, #13041a 75%)',
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
      <Audio src={staticFile('audio/beca/beca_act3_walkthrough.mp3')} volume={1} />

      {/* SFX: Navigation & Intro */}
      <Sequence from={2} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx_nav.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Staggered Callouts */}
      <Sequence from={20} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={240} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_alert1.wav')} volume={0.4} />
      </Sequence>
      <Sequence from={480} durationInFrames={20}>
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
              color: '#FF7A00',
              backgroundColor: 'rgba(255, 122, 0, 0.15)',
              padding: '8px 22px',
              borderRadius: 24,
              border: '1.5px solid rgba(255, 122, 0, 0.35)',
            }}
          >
            Acto 3 de 4: Recorrido Técnico • Landing Page Desplegada
          </span>
          <span style={{ fontFamily: theme.fonts.title, fontSize: 30, color: '#FFFFFF', fontWeight: 900 }}>
            Flujo de Donación & Jerarquía Visual
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
            Velocidad: 1.85x
          </span>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 18,
              color: '#00D2B4',
              backgroundColor: 'rgba(0, 210, 180, 0.18)',
              padding: '8px 20px',
              borderRadius: 16,
              fontWeight: 800,
            }}
          >
            ● donarfeyalegriavzla.org
          </span>
        </div>
      </div>

      {/* Main Browser Frame with the Walkthrough Video */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1680, height: 860, zIndex: 5 }}>
        <BrowserFrame
          url="donarfeyalegriavzla.org"
          pageTitle="Beca un Estudiante 2025 — Fe y Alegría Venezuela"
          badge="Landing Oficial"
        >
          <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000000' }}>
            <OffthreadVideo
              src={staticFile('screenshots/beca/LandingPageBeca2025.mp4')}
              startFrom={0}
              endAt={Math.round(45 * 30)}
              playbackRate={1.85}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </BrowserFrame>

        {/* Callout 1: Hero Empático */}
        <FeatureCallout
          icon="📌"
          title="Hero Empático & CTA Inmediato"
          subtitle="Impacto emocional prioritario con botón de donar en primer plano"
          delayFrames={20}
          position="top-right"
          highlightColor="#FF2E93"
        />

        {/* Callout 2: Catálogo de Programas */}
        <FeatureCallout
          icon="🎯"
          title="Selector de Modalidad Educativa"
          subtitle="Catálogo interactivo: Primaria, Secundaria y Educación Técnica"
          delayFrames={240}
          position="bottom-left"
          highlightColor="#FF7A00"
        />

        {/* Callout 3: Donación Ágil */}
        <FeatureCallout
          icon="⚡"
          title="Aporte Ágil en Menos de 3 Pasos"
          subtitle="Proceso móvil intuitivo con verificación y confirmación verde institucional"
          delayFrames={480}
          position="bottom-right"
          highlightColor="#00D2B4"
        />
      </div>
    </div>
  );
};
