import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';

export const PALETTE = {
  ink: '#030509',
  inkSoft: '#0a1016',
  paper: '#f7f4ec',
  muted: '#a7b0b7',
  blue: '#9de8f4',
  blueDeep: '#0b536b',
  red: '#f12336',
  redSoft: '#ff7a86',
  redDeep: '#65000d',
  gold: '#e7c985',
};

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export const smooth = (frame, input, output) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

export const fadeWindow = (frame, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd) => {
  const fadeIn = interpolate(frame, [fadeInStart, fadeInEnd], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [fadeOutStart, fadeOutEnd], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });

  return Math.min(fadeIn, fadeOut);
};

export const FilmShell = ({
  frame,
  durationInFrames,
  reel,
  title,
  accent = PALETTE.blue,
  background = PALETTE.ink,
  children,
}) => {
  const holes = Array.from({length: 18}, (_, index) => index);
  const ticks = Array.from({length: 30}, (_, index) => index);
  const activeTick = Math.floor((frame / durationInFrames) * ticks.length);
  const scanY = 58 + ((frame * 2.1) % 440);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        color: PALETTE.paper,
        background,
        fontFamily: '"Segoe UI", Arial, sans-serif',
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)',
            'radial-gradient(circle at 18% 22%, rgba(157,232,244,.08), transparent 38%)',
            'radial-gradient(circle at 82% 76%, rgba(241,35,54,.07), transparent 36%)',
          ].join(','),
          backgroundSize: '42px 42px, 42px 42px, 100% 100%, 100% 100%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 18,
          right: 18,
          top: scanY,
          height: 1,
          zIndex: 40,
          opacity: 0.16,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 14px ${accent}`,
        }}
      />

      {children}

      <AbsoluteFill style={{zIndex: 70, pointerEvents: 'none'}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 12, display: 'flex', gap: 29}}>
          {holes.map((hole) => (
            <div key={`top-${hole}`} style={{width: 34, height: 10, borderRadius: 3, background: 'rgba(247,244,236,.72)'}} />
          ))}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 12, display: 'flex', gap: 29}}>
          {holes.map((hole) => (
            <div key={`bottom-${hole}`} style={{width: 34, height: 10, borderRadius: 3, background: 'rgba(247,244,236,.72)'}} />
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 30,
            right: 30,
            top: 42,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Consolas, "Courier New", monospace',
            fontSize: 9,
            letterSpacing: 3.2,
            color: 'rgba(247,244,236,.7)',
          }}
        >
          <span>{reel} / {title}</span>
          <span>AJINKYA MAGAR / 18°40′N 73°53′E</span>
        </div>

        <div style={{position: 'absolute', left: 30, right: 30, bottom: 38, display: 'flex', alignItems: 'center', gap: 6}}>
          {ticks.map((tick) => (
            <div
              key={tick}
              style={{
                flex: 1,
                height: tick % 5 === 0 ? 7 : 2,
                background: tick === activeTick ? accent : PALETTE.paper,
                opacity: tick === activeTick ? 1 : 0.2,
              }}
            />
          ))}
        </div>

        <div style={{position: 'absolute', inset: 0, border: '1px solid rgba(247,244,236,.18)'}} />
        <div
          style={{
            position: 'absolute',
            inset: -8,
            opacity: 0.05,
            backgroundImage: [
              'repeating-radial-gradient(circle at 16% 28%, white 0 .7px, transparent .8px 4px)',
              'repeating-radial-gradient(circle at 74% 64%, black 0 .8px, transparent .9px 5px)',
            ].join(','),
            mixBlendMode: 'soft-light',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const GlassPanel = ({children, style = {}}) => (
  <div
    style={{
      background: 'rgba(3,5,9,.82)',
      border: '1px solid rgba(247,244,236,.18)',
      boxShadow: '0 20px 70px rgba(0,0,0,.34)',
      backdropFilter: 'blur(10px)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const MicroLabel = ({children, color = PALETTE.muted, style = {}}) => (
  <div
    style={{
      fontFamily: 'Consolas, "Courier New", monospace',
      color,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 3.4,
      textTransform: 'uppercase',
      ...style,
    }}
  >
    {children}
  </div>
);

export const CornerMarks = ({color = PALETTE.paper, opacity = 0.45, inset = 0}) => {
  const mark = {position: 'absolute', width: 18, height: 18};

  return (
    <div style={{position: 'absolute', inset, pointerEvents: 'none', opacity}}>
      <span style={{...mark, left: 0, top: 0, borderLeft: `1px solid ${color}`, borderTop: `1px solid ${color}`}} />
      <span style={{...mark, right: 0, top: 0, borderRight: `1px solid ${color}`, borderTop: `1px solid ${color}`}} />
      <span style={{...mark, left: 0, bottom: 0, borderLeft: `1px solid ${color}`, borderBottom: `1px solid ${color}`}} />
      <span style={{...mark, right: 0, bottom: 0, borderRight: `1px solid ${color}`, borderBottom: `1px solid ${color}`}} />
    </div>
  );
};
