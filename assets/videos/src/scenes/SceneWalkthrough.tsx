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
import { BrowserFrame } from '../components/BrowserFrame';
import { FeatureCallout } from '../components/FeatureCallout';
import { theme } from '../theme';

interface PageSegmentProps {
  pageTitle: string;
  url: string;
  videoFile?: string;
  startSec: number;
  endSec: number;
  speed: number;
  audioFile: string;
  durationInFrames: number;
  callout1: { icon: string; title: string; subtitle: string; delay: number };
  callout2?: { icon: string; title: string; subtitle: string; delay: number };
}

const PageSegment: React.FC<PageSegmentProps> = ({
  pageTitle,
  url,
  videoFile,
  startSec,
  endSec,
  speed,
  audioFile,
  durationInFrames,
  callout1,
  callout2,
}) => {
  const frame = useCurrentFrame();
  const startFrame = Math.round(startSec * 30);
  const endFrame = Math.round(endSec * 30);

  // Smooth entrance & exit transition
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
        backgroundColor: '#0c0114',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 60px',
        opacity,
      }}
    >
      {/* Voiceover for this page */}
      <Audio src={staticFile(`audio/${audioFile}`)} volume={1} />

      {/* SFX: Digital Page Navigation Click */}
      <Sequence from={2} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx_nav.wav')} volume={0.4} />
      </Sequence>

      {/* SFX: UI Pop for Callout 1 */}
      <Sequence from={callout1.delay} durationInFrames={20}>
        <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.5} />
      </Sequence>

      {/* SFX: UI Pop for Callout 2 */}
      {callout2 && (
        <Sequence from={callout2.delay} durationInFrames={20}>
          <Audio src={staticFile('audio/sfx_pop.wav')} volume={0.5} />
        </Sequence>
      )}

      {/* Cyber Ambient Backdrop Glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1200,
          height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77, 23, 214, 0.3) 0%, rgba(255, 46, 147, 0.15) 50%, transparent 80%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      {/* Browser Frame Window */}
      <BrowserFrame
        url={url}
        pageTitle={pageTitle}
        badge="Producción Activa"
        style={{ width: 1720, height: 920, zIndex: 10 }}
      >
        <OffthreadVideo
          src={staticFile(videoFile || 'video/SitioWebGonzaga.mp4')}
          startFrom={startFrame}
          endAt={endFrame}
          playbackRate={speed}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </BrowserFrame>

      {/* Dynamic Animated Callouts */}
      <FeatureCallout
        icon={callout1.icon}
        title={callout1.title}
        subtitle={callout1.subtitle}
        delayFrames={callout1.delay}
        position="top-right"
        highlightColor={theme.colors.secondary}
      />

      {callout2 && (
        <FeatureCallout
          icon={callout2.icon}
          title={callout2.title}
          subtitle={callout2.subtitle}
          delayFrames={callout2.delay}
          position="bottom-left"
          highlightColor={theme.colors.hotPink}
        />
      )}
    </div>
  );
};

export const SceneWalkthrough: React.FC = () => {
  return (
    <Series>
      {/* 1. Página de Inicio (Home) - Audio: 515 frames -> 530 frames (~17.6s) */}
      <Series.Sequence durationInFrames={530}>
        <PageSegment
          pageTitle="Página 1/5: Inicio (Home)"
          url="colegiogonzaga.org.ve"
          startSec={0}
          endSec={22}
          speed={1.25}
          audioFile="scene3_p1_home.mp3"
          durationInFrames={530}
          callout1={{
            icon: '⚡',
            title: 'Home de Cero Fricción',
            subtitle: 'Hero slider con misión clara y botón de donación omnipresente',
            delay: 15,
          }}
          callout2={{
            icon: '💙',
            title: 'Botón "Dona Aquí" en Header',
            subtitle: 'Acceso directo a la pasarela de pagos y aportes desde la cabecera',
            delay: 130,
          }}
        />
      </Series.Sequence>

      {/* 2. Propuesta Educativa - Audio: 484 frames -> 500 frames (~16.6s) */}
      <Series.Sequence durationInFrames={500}>
        <PageSegment
          pageTitle="Página 2/5: Propuesta Educativa"
          url="colegiogonzaga.org.ve/propuesta-educativa"
          startSec={84}
          endSec={110}
          speed={1.56}
          audioFile="scene3_p2_educativa.mp3"
          durationInFrames={500}
          callout1={{
            icon: '🎓',
            title: '4 Ejes Pedagógicos Claros',
            subtitle: 'Pedagógico, Clima Escolar, Gestión y Familia estructurados',
            delay: 15,
          }}
          callout2={{
            icon: '📥',
            title: 'Proyecto Curricular (PCI)',
            subtitle: 'Descarga accesible del plan de formación ignaciana',
            delay: 140,
          }}
        />
      </Series.Sequence>

      {/* 3. Sobre Nosotros & Historia - Audio: 445 frames -> 465 frames (~15.5s) */}
      <Series.Sequence durationInFrames={465}>
        <PageSegment
          pageTitle="Página 3/5: Sobre Nosotros & Historia"
          url="colegiogonzaga.org.ve/sobre-nosotros"
          startSec={40}
          endSec={80}
          speed={2.58}
          audioFile="scene3_p3_nosotros.mp3"
          durationInFrames={465}
          callout1={{
            icon: '🏛️',
            title: 'Línea de Tiempo & Galería',
            subtitle: 'Rescate del patrimonio histórico y archivo fotográfico',
            delay: 15,
          }}
          callout2={{
            icon: '💻',
            title: 'Identidad Gonzaga Modular',
            subtitle: 'Pestañas interactivas: Tecnología, Música, Deportes y Artes',
            delay: 140,
          }}
        />
      </Series.Sequence>

      {/* 4. Actualidad & Radio Hub - Video sustituido por SitioWebActualidad.mp4 */}
      <Series.Sequence durationInFrames={365}>
        <PageSegment
          pageTitle="Página 4/5: Actualidad & Radio Hub"
          url="colegiogonzaga.org.ve/actualidad"
          videoFile="video/SitioWebActualidad.mp4"
          startSec={0}
          endSec={27}
          speed={2.22}
          audioFile="scene3_p4_actualidad.mp3"
          durationInFrames={365}
          callout1={{
            icon: '🎙️',
            title: 'Gonzaga Radio Live Hub',
            subtitle: 'Streaming en vivo, reproductor interactivo y cabina estudiantil',
            delay: 15,
          }}
          callout2={{
            icon: '📰',
            title: 'Prensa & Noticias en Silos',
            subtitle: 'Cartelera colegial ágil con reproductor flotante activo',
            delay: 130,
          }}
        />
      </Series.Sequence>

      {/* 5. Financiamiento & Campañas - Audio: 487 frames -> 510 frames (~17.0s) */}
      <Series.Sequence durationInFrames={510}>
        <PageSegment
          pageTitle="Página 5/5: Financiamiento & Campañas"
          url="colegiogonzaga.org.ve/financiamiento"
          startSec={150}
          endSec={180}
          speed={1.76}
          audioFile="scene3_p5_financiamiento.mp3"
          durationInFrames={510}
          callout1={{
            icon: '💙',
            title: 'Embudo de Donaciones Directo',
            subtitle: 'Campaña Agua & Electricidad y Solidaridad Familiar',
            delay: 15,
          }}
          callout2={{
            icon: '🤝',
            title: 'Red de +3,500 Exalumnos',
            subtitle: 'Módulo de voluntariado y vinculación comunitaria',
            delay: 140,
          }}
        />
      </Series.Sequence>
    </Series>
  );
};

