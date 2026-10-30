import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

interface FeatureCalloutProps {
  icon: string;
  title: string;
  subtitle: string;
  delayFrames?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  highlightColor?: string;
}

export const FeatureCallout: React.FC<FeatureCalloutProps> = ({
  icon,
  title,
  subtitle,
  delayFrames = 0,
  position = 'top-right',
  highlightColor = theme.colors.hotPink,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayFrames);
  const enterProgress = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
    },
  });

  const opacity = interpolate(adjustedFrame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(enterProgress, [0, 1], [30, 0]);

  // Position styles
  const positionStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 40,
    ...(position === 'top-right' && { top: 35, right: 35 }),
    ...(position === 'top-left' && { top: 35, left: 35 }),
    ...(position === 'bottom-right' && { bottom: 35, right: 35 }),
    ...(position === 'bottom-left' && { bottom: 35, left: 35 }),
  };

  return (
    <div
      style={{
        ...positionStyles,
        opacity,
        transform: `translateY(${translateY}px) scale(${enterProgress})`,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '20px 28px',
        borderRadius: 22,
        backgroundColor: 'rgba(25, 2, 44, 0.94)',
        backdropFilter: 'blur(16px)',
        border: `2.5px solid ${highlightColor}`,
        boxShadow: `0 16px 36px -5px ${highlightColor}45`,
        maxWidth: 620,
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 28, // +30% (was 22px)
            fontWeight: 800,
            color: theme.colors.textWhite,
            lineHeight: 1.25,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: theme.fonts.body,
            fontSize: 23, // +45% (was 16px)
            color: '#FFFFFF',
            opacity: 0.9,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};
