import React from 'react';
import { Audio, Series, staticFile } from 'remotion';
import { Scene1CIDEProblem } from './scenes/cide/Scene1CIDEProblem';
import { Scene2CIDESolution } from './scenes/cide/Scene2CIDESolution';
import { Scene3CIDEWalkthrough } from './scenes/cide/Scene3CIDEWalkthrough';
import { Scene4CIDEResultsOutro } from './scenes/cide/Scene4CIDEResultsOutro';

export const CIDECaseStudyComposition: React.FC = () => {
  return (
    <>
      {/* Ambient Background Music */}
      <Audio src={staticFile('audio/bg_music.mp3')} volume={0.10} />

      <Series>
        {/* Acto 1: Diagnóstico Inicial, Gestión sobre Sistema Existente & Cuellos de Botella - 1170 frames (39s) */}
        <Series.Sequence durationInFrames={1170}>
          <Scene1CIDEProblem />
        </Series.Sequence>

        {/* Acto 2: Arquitectura del Plugin Propio, Consulta Dual & Descongestionamiento - 1050 frames (35s) */}
        <Series.Sequence durationInFrames={1050}>
          <Scene2CIDESolution />
        </Series.Sequence>

        {/* Acto 3: Recorrido Técnico en Vivo por el Sistema de Validación 2025 - 990 frames (33s) */}
        <Series.Sequence durationInFrames={990}>
          <Scene3CIDEWalkthrough />
        </Series.Sequence>

        {/* Acto 4: Resultados de Eficiencia Operativa, Servidor SMTP & Outro AryCode - 750 frames (25s) */}
        <Series.Sequence durationInFrames={750}>
          <Scene4CIDEResultsOutro />
        </Series.Sequence>
      </Series>
    </>
  );
};
