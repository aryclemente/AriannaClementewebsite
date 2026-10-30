import React from 'react';
import {
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { BrowserFrame } from '../../components/BrowserFrame';
import { FeatureCallout } from '../../components/FeatureCallout';
import { theme } from '../../theme';

interface SegmentProps {
  pageTitle: string;
  url: string;
  startSec: number;
  endSec: number;
  speed: number;
  audioFile: string;
  durationInFrames: number;
  callout1: { icon: string; title: string; subtitle: string; delay: number; color?: string };
  callout2?: { icon: string; title: string; subtitle: string; delay: number; color?: string };
  callout3?: { icon: string; title: string; subtitle: string; delay: number; color?: string };
}

const CEPSegment: React.FC<SegmentProps> = ({
  pageTitle,
  url,
  startSec,
  endSec,
  speed,
  audioFile,
  durationInFrames,
  callout1,
  callout2,
  callout3,
}) => {
  const frame = useCurrentFrame();
  const startFrame = Math.round(startSec * 30);
  const endFrame = Math.round(endSec * 30);

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
        backgroundColor: '#140810',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 60px',
        opacity,
      }}
    >
      {/* Voiceover */}
      <Audio src={staticFile(`audio/${audioFile}`)} volume={1} />

      {/* SFX: Nav click */}
      <Sequence from={2} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx_nav.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: Callout 1 */}
      <Sequence from={callout1.delay} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.45} />
      </Sequence>

      {/* SFX: Callout 2 */}
      {callout2 && (
        <Sequence from={callout2.delay} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_alert1.wav')} volume={0.4} />
        </Sequence>
      )}

      {/* SFX: Callout 3 */}
      {callout3 && (
        <Sequence from={callout3.delay} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_metric.wav')} volume={0.4} />
        </Sequence>
      )}

      {/* Top Banner Tag */}
      <div
        style={{
          width: '100%',
          maxWidth: 1680,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 20, // +45% (was 15px)
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: theme.colors.cepGold,
              backgroundColor: 'rgba(245, 192, 0, 0.15)',
              padding: '8px 22px',
              borderRadius: 24,
              border: '1.5px solid rgba(245, 192, 0, 0.35)',
            }}
          >
            Acto 2 de 3: Recorrido Técnico • Plataforma en Producción
          </span>
          <span style={{ fontFamily: theme.fonts.title, fontSize: 30, color: '#FFFFFF', fontWeight: 900 }}>
            {pageTitle}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 18, // +45% (was 14px)
              color: 'rgba(255, 255, 255, 0.85)',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              padding: '8px 20px',
              borderRadius: 16,
              fontWeight: 700,
            }}
          >
            Velocidad: {speed}x
          </span>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 18, // +45% (was 14px)
              color: '#38ef7d',
              backgroundColor: 'rgba(56, 239, 125, 0.18)',
              padding: '8px 20px',
              borderRadius: 16,
              fontWeight: 800,
            }}
          >
            ● En Producción
          </span>
        </div>
      </div>

      {/* Main Browser Frame Containing the Video */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1680, height: 860 }}>
        <BrowserFrame url={url} pageTitle={pageTitle} badge="Manual Oasis">
          <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#000000' }}>
            <OffthreadVideo
              src={staticFile('video/SitiowebCEP.mp4')}
              startFrom={startFrame}
              endAt={endFrame}
              playbackRate={speed}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </BrowserFrame>

        {/* Feature Callouts */}
        <FeatureCallout
          icon={callout1.icon}
          title={callout1.title}
          subtitle={callout1.subtitle}
          delayFrames={callout1.delay}
          position="top-right"
          highlightColor={callout1.color || theme.colors.cepGold}
        />

        {callout2 && (
          <FeatureCallout
            icon={callout2.icon}
            title={callout2.title}
            subtitle={callout2.subtitle}
            delayFrames={callout2.delay}
            position="bottom-left"
            highlightColor={callout2.color || '#00D2B4'}
          />
        )}

        {callout3 && (
          <FeatureCallout
            icon={callout3.icon}
            title={callout3.title}
            subtitle={callout3.subtitle}
            delayFrames={callout3.delay}
            position="bottom-right"
            highlightColor={callout3.color || '#FF2E93'}
          />
        )}
      </div>
    </div>
  );
};

export const Scene3Walkthrough: React.FC = () => {
  return (
    <Series>
      {/* 1. Portada, Banner Principal y Mapa Vectorial SVG Interactivo de Venezuela - 23s (690 frames) */}
      <Series.Sequence
        durationInFrames={690}
        style={{
          scale: 0.777
        }}
      >
        <CEPSegment
          pageTitle="Portada Principal & Mapa Vectorial SVG"
          url="cepsj.org.ve/#mapa-nacional"
          startSec={0}
          endSec={34}
          speed={1.5}
          audioFile="cep_scene3_p1_slider_map.mp3"
          durationInFrames={690}
          callout1={{
            icon: '📌',
            title: 'Banner Principal & Próximos Retiros',
            subtitle: 'Novedades más recientes y acceso directo a retiros espirituales',
            delay: 15,
            color: theme.colors.cepGold,
          }}
          callout2={{
            icon: '🗺️',
            title: '⭐ Componente Estrella: Mapa SVG',
            subtitle: '6 Redes apostólicas georreferenciadas a nivel nacional',
            delay: 240, // Aparece a mitad del acto cuando el audio lo menciona
            color: '#00D2B4',
          }}
        />
      </Series.Sequence>

      {/* 2. Directorio de Casas de Retiro & Galerías Inmersivas - 15s (450 frames) */}
      <Series.Sequence durationInFrames={450}>
        <CEPSegment
          pageTitle="Casas de Retiro & Galerías Fotográficas"
          url="cepsj.org.ve/casas-de-retiro"
          startSec={104}
          endSec={134}
          speed={2.0}
          audioFile="cep_scene3_p2_casas_galeria.mp3"
          durationInFrames={450}
          callout1={{
            icon: '🏛️',
            title: 'Directorio de Casas de Retiro',
            subtitle: 'Quebrada de La Virgen en Miranda y San Javier del Valle en Mérida',
            delay: 20,
            color: theme.colors.cepGold,
          }}
          callout2={{
            icon: '📸',
            title: 'Galerías en Alta Resolución',
            subtitle: 'Instalaciones, espacios naturales y áreas de oración',
            delay: 190,
            color: '#00D2B4',
          }}
        />
      </Series.Sequence>

      {/* 3. Recursos Pastorales, Actividades & Canales Seguros - 20.6s (620 frames) */}
      <Series.Sequence durationInFrames={620}>
        <CEPSegment
          pageTitle="Recursos Pastorales & Canales Institucionales"
          url="cepsj.org.ve/recursos-pastorales"
          startSec={165}
          endSec={201}
          speed={1.75}
          audioFile="cep_scene3_p3_recursos_meta.mp3"
          durationInFrames={620}
          callout1={{
            icon: '📖',
            title: 'Buscador de Subsidios & Oraciones',
            subtitle: 'Filtrado instantáneo por oraciones, lecturas y reflexiones',
            delay: 20,
            color: theme.colors.cepGold,
          }}
          callout2={{
            icon: '📸',
            title: 'Integración Oficial de Instagram',
            subtitle: 'Feed sincronizado en tiempo real con la cuenta institucional',
            delay: 220,
            color: '#FF2E93',
          }}
          callout3={{
            icon: '🔒',
            title: 'Formularios Institucionales Seguros',
            subtitle: 'Canal oficial para donaciones y buzones institucionales',
            delay: 400,
            color: '#00D2B4',
          }}
        />
      </Series.Sequence>
    </Series>
  );
};
