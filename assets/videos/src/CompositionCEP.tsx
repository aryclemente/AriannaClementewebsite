import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { Scene1Concept } from './scenes/cep/Scene1Concept';
import { Scene3Walkthrough } from './scenes/cep/Scene3Walkthrough';
import { Scene4ResultsOutro } from './scenes/cep/Scene4ResultsOutro';

export const CEPCaseStudyComposition: React.FC = () => {
  return (
    <>
      {/* Ambient Background Music (Subtle Volume) */}
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.10} />

      <Series>
        {/* Acto 1: Conceptualización & Arquitectura Web Unificada (11 Páginas) - 870 frames (29s) */}
        <Series.Sequence durationInFrames={870}>
          <Scene1Concept />
        </Series.Sequence>

        {/* Acto 2: Recorrido Técnico por la Plataforma & Componente Estrella - 1760 frames (58.6s) */}
        <Series.Sequence
          durationInFrames={1760}
          style={{
            scale: 0.703
          }}
        >
          <Scene3Walkthrough />
        </Series.Sequence>

        {/* Acto 3: Transferencia Tecnológica, Autonomía & Contacto AryCode - 640 frames (21.3s) */}
        <Series.Sequence durationInFrames={640}>
          <Scene4ResultsOutro />
        </Series.Sequence>
      </Series>
    </>
  );
};

export const CEPOasisConceptComposition: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.10} />
      <Scene1Concept />
    </>
  );
};
