import React from 'react';
import { theme } from '../theme';

interface BrowserFrameProps {
  url?: string;
  pageTitle?: string;
  badge?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url = 'colegiogonzaga.org.ve',
  pageTitle = 'Sitio Web Oficial',
  badge = 'WordPress Pro',
  children,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: theme.shadows.card,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backgroundColor: '#0c0114',
        ...style,
      }}
    >
      {/* Top Browser Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 26px',
          backgroundColor: '#19022c',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Window Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FF5F56' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#27C93F' }} />
          <span
            style={{
              marginLeft: 14,
              fontFamily: theme.fonts.code,
              fontSize: 20, // +45% (was 16px)
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            {pageTitle}
          </span>
        </div>

        {/* URL Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            padding: '8px 24px',
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            minWidth: 420,
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 18 }}>🔒</span>
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 19, // +45% (was 16px)
              color: theme.colors.secondary,
              fontWeight: 600,
            }}
          >
            https://{url}
          </span>
        </div>

        {/* Live Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 18px',
            borderRadius: 20,
            backgroundColor: 'rgba(0, 210, 180, 0.15)',
            border: '1px solid rgba(0, 210, 180, 0.35)',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: theme.colors.mint,
            }}
          />
          <span
            style={{
              fontFamily: theme.fonts.code,
              fontSize: 17, // +45% (was 13px)
              fontWeight: 800,
              color: theme.colors.mint,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#000' }}>
        {children}
      </div>
    </div>
  );
};
