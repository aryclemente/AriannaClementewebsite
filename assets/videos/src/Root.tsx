import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';
import { CEPCaseStudyComposition, CEPOasisConceptComposition } from './CompositionCEP';
import { BecaCaseStudyComposition } from './CompositionBeca';
import { CIDECaseStudyComposition } from './CompositionCIDE';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Composition
        id="CEPCaseStudy"
        component={CEPCaseStudyComposition}
        durationInFrames={3270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CEPOasisConcept"
        component={CEPOasisConceptComposition}
        durationInFrames={870}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BecaCaseStudy"
        component={BecaCaseStudyComposition}
        durationInFrames={3120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="CIDECaseStudy"
        component={CIDECaseStudyComposition}
        durationInFrames={3960}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
