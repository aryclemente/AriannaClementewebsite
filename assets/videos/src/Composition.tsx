import React from 'react';
import { Audio, Composition, Series, staticFile } from 'remotion';
import { SceneProblem } from './scenes/SceneProblem';
import { SceneArchitecture } from './scenes/SceneArchitecture';
import { SceneWalkthrough } from './scenes/SceneWalkthrough';
import { SceneResultsOutro } from './scenes/SceneResultsOutro';

export const GonzagaCaseStudyComposition: React.FC = () => {
  return (
    <>
      {/* Continuous Royalty-Free Ambient Tech Background Music */}
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.12} />

      <Series>
        {/* Acto 1: Diagnóstico y Estado Inicial (Problema) - 25s (750 frames) */}
        <Series.Sequence durationInFrames={750}>
          <SceneProblem />
        </Series.Sequence>

        {/* Acto 2: Arquitectura y Reorganización a 5 Páginas Maestras - 25.3s (760 frames) */}
        <Series.Sequence durationInFrames={760}>
          <SceneArchitecture />
        </Series.Sequence>

        {/* Acto 3: Tour Técnico Guiado por las 5 Páginas Sincronizadas - 79s (2370 frames) */}
        <Series.Sequence durationInFrames={2370}>
          <SceneWalkthrough />
        </Series.Sequence>

        {/* Acto 4: Métricas de Impacto, Telemetría GA4 y Outro - 19.3s (580 frames) */}
        <Series.Sequence durationInFrames={580}>
          <SceneResultsOutro />
        </Series.Sequence>
      </Series>
    </>
  );
};

export const GonzagaProblemComposition: React.FC = () => {
  return (
    <>
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.12} />
      <SceneProblem />
    </>
  );
};

export const MyComposition: React.FC = () => {
  // Total duration: 750 + 760 + 2370 + 580 = 4460 frames (2 min 28.67 seg)
  return (
    <>
      <Composition
        id="GonzagaCaseStudy"
        component={GonzagaCaseStudyComposition}
        durationInFrames={4460}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GonzagaProblematica"
        component={GonzagaProblemComposition}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

