import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { Scene1BecaProblem } from './scenes/beca/Scene1BecaProblem';
import { Scene2BecaDesign } from './scenes/beca/Scene2BecaDesign';
import { Scene3BecaWalkthrough } from './scenes/beca/Scene3BecaWalkthrough';
import { Scene4BecaResultsOutro } from './scenes/beca/Scene4BecaResultsOutro';

export const BecaCaseStudyComposition: React.FC = () => {
  return (
    <>
      {/* Ambient Background Music */}
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.10} />

      <Series>
        {/* Acto 1: Necesidad Inicial, Desafío & Diagnóstico - 810 frames (27s) */}
        <Series.Sequence durationInFrames={810}>
          <Scene1BecaProblem />
        </Series.Sequence>

        {/* Acto 2: Identidad Gráfica, Manual de Marca & UX/UI - 870 frames (29s) */}
        <Series.Sequence durationInFrames={870}>
          <Scene2BecaDesign />
        </Series.Sequence>

        {/* Acto 3: Recorrido Técnico por la Landing Page & Jerarquía Visual - 720 frames (24s) */}
        <Series.Sequence durationInFrames={720}>
          <Scene3BecaWalkthrough />
        </Series.Sequence>

        {/* Acto 4: Trazabilidad GA4, Analítica de Conversión & Outro AryCode - 720 frames (24s) */}
        <Series.Sequence durationInFrames={720}>
          <Scene4BecaResultsOutro />
        </Series.Sequence>
      </Series>
    </>
  );
};
