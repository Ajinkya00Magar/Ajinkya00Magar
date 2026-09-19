import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  CornerMarks,
  fadeWindow,
  FilmShell,
  GlassPanel,
  MicroLabel,
  PALETTE,
  smooth,
} from '../shared/FilmShell.jsx';

const StoryCard = ({opacity, x, eyebrow, title, body, footer, accent}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      padding: '38px 44px',
      opacity,
      transform: `translateX(${x}px)`,
    }}
  >
    <MicroLabel color={accent}>{eyebrow}</MicroLabel>
    <div style={{fontSize: 45, lineHeight: 0.98, fontWeight: 900, letterSpacing: -2.2, marginTop: 14, maxWidth: 650}}>{title}</div>
    <div style={{fontSize: 15, lineHeight: 1.65, color: 'rgba(247,244,236,.78)', maxWidth: 665, marginTop: 22}}>{body}</div>
    <div style={{position: 'absolute', left: 44, right: 44, bottom: 34, display: 'flex', alignItems: 'center', gap: 12}}>
      <span style={{width: 46, height: 1, background: accent}} />
      <MicroLabel color="rgba(247,244,236,.58)" style={{fontSize: 9, letterSpacing: 2.4}}>{footer}</MicroLabel>
    </div>
  </div>
);

const Petals = ({frame}) => {
  const petals = [[8, 24], [16, 61], [25, 38], [35, 78], [43, 18], [48, 52]];

  return petals.map(([x, y], index) => {
    const lift = ((frame * (0.22 + index * 0.018) + index * 37) % 120) - 60;
    return (
      <span
        key={`${x}-${y}`}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: `${x}%`,
          top: `${y}%`,
          width: 5,
          height: 12,
          borderRadius: '80% 20% 70% 25%',
          background: index % 2 ? 'rgba(226,251,255,.72)' : 'rgba(255,224,232,.64)',
          transform: `translateY(${lift}px) rotate(${index * 47 + frame * 0.4}deg)`,
          opacity: 0.72,
        }}
      />
    );
  });
};

const WebSignal = ({frame}) => {
  const progress = (frame % 150) / 150;
  const paths = [
    'M960 70 L540 520',
    'M960 70 L760 560',
    'M960 70 L930 560',
    'M960 70 L500 210',
    'M900 138 Q810 164 760 244',
    'M826 226 Q710 270 650 374',
  ];

  return (
    <svg viewBox="0 0 960 560" width="960" height="560" style={{position: 'absolute', inset: 0, zIndex: 9, opacity: 0.32}}>
      {paths.map((path, index) => (
        <path
          key={path}
          d={path}
          fill="none"
          stroke="rgba(255,235,231,.72)"
          strokeWidth="1"
          strokeDasharray="1100"
          strokeDashoffset={1100 * (1 - Math.min(1, progress * 1.45 - index * 0.06))}
        />
      ))}
    </svg>
  );
};

const IdentityFacts = ({opacity, x}) => (
  <div style={{position: 'absolute', inset: 0, padding: '34px 44px', opacity, transform: `translateX(${x}px)`}}>
    <MicroLabel color={PALETTE.gold}>FRAME 00 / THE PERSON</MicroLabel>
    <div style={{fontSize: 20, fontWeight: 650, letterSpacing: 8, marginTop: 15, color: 'rgba(247,244,236,.72)'}}>AJINKYA</div>
    <div style={{fontSize: 58, lineHeight: 0.92, fontWeight: 950, letterSpacing: -3.5}}>MAGAR</div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 27}}>
      {[
        ['STUDY', 'Computer Engineering'],
        ['BASE', 'Maharashtra, India'],
        ['DIRECTION', 'AI · Backend · Systems'],
      ].map(([label, value]) => (
        <div key={label} style={{borderTop: '1px solid rgba(247,244,236,.22)', paddingTop: 11}}>
          <MicroLabel color="rgba(247,244,236,.42)" style={{fontSize: 8}}>{label}</MicroLabel>
          <div style={{fontSize: 12, marginTop: 7, color: 'rgba(247,244,236,.84)'}}>{value}</div>
        </div>
      ))}
    </div>
  </div>
);

export const IdentityLoop = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const opening = Math.max(
    fadeWindow(frame, -12, 0, 47, 67),
    fadeWindow(frame, 257, 271, 288, 299),
  );
  const repair = fadeWindow(frame, 52, 70, 124, 144);
  const responsibility = fadeWindow(frame, 130, 148, 202, 222);
  const resolve = fadeWindow(frame, 208, 225, 254, 274);
  const panelGlow = 0.12 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 0.04;

  return (
    <FilmShell
      frame={frame}
      durationInFrames={durationInFrames}
      reel="REEL 01"
      title="THE PERSON BETWEEN THE FRAMES"
      accent={frame < 142 ? PALETTE.blue : PALETTE.redSoft}
      background="#04080d"
    >
      <AbsoluteFill style={{zIndex: 2}}>
        <div style={{position: 'absolute', inset: '0 50% 0 0', overflow: 'hidden'}}>
          <Img
            src={staticFile('shoya-ishida.jpg')}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '52% 72%', filter: 'saturate(.7) contrast(1.08) brightness(.64)'}}
          />
          <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(92,184,207,.34), rgba(2,12,18,.82))'}} />
        </div>
        <div style={{position: 'absolute', inset: '0 0 0 50%', overflow: 'hidden'}}>
          <Img
            src={staticFile('spider-man.jpg')}
            style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '52% 26%', filter: 'grayscale(.18) saturate(1.14) contrast(1.18) brightness(.58)'}}
          />
          <AbsoluteFill style={{background: 'linear-gradient(270deg, rgba(241,35,54,.28), rgba(15,0,4,.78))'}} />
        </div>
        <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(3,5,9,.92), transparent 48%, rgba(3,5,9,.3))'}} />
      </AbsoluteFill>

      <Petals frame={frame} />
      <WebSignal frame={frame} />

      <GlassPanel
        style={{
          position: 'absolute',
          zIndex: 20,
          left: 112,
          right: 112,
          top: 106,
          height: 346,
          background: `rgba(3,5,9,${0.76 + panelGlow})`,
        }}
      >
        <CornerMarks color={frame < 142 ? PALETTE.blue : PALETTE.redSoft} inset={14} opacity={0.5} />
        <IdentityFacts opacity={opening} x={smooth(frame, [0, 20], [24, 0])} />
        <StoryCard
          opacity={repair}
          x={smooth(frame, [52, 76], [-26, 0])}
          eyebrow="SHŌYA / REPAIR"
          title="Becoming better is active work."
          body="Listen. Return. Face what is difficult. Learn how to meet people instead of disappearing from them. In engineering, failure is information—not embarrassment—and the first version is never a reason to stop understanding."
          footer="UNDERSTAND BEFORE AUTOMATING · ASK BEFORE ASSUMING"
          accent={PALETTE.blue}
        />
        <StoryCard
          opacity={responsibility}
          x={smooth(frame, [130, 154], [26, 0])}
          eyebrow="PETER / RESPONSIBILITY"
          title="Ability is only a starting point."
          body="Peter Parker, specifically: the student carrying ordinary worries, a camera, too much responsibility, and still making the next useful choice. What matters is not what you can do—it is where you point it."
          footer="USEFUL OVER LOUD · RELIABLE OVER IMPRESSIVE"
          accent={PALETTE.redSoft}
        />
        <StoryCard
          opacity={resolve}
          x={0}
          eyebrow="ONE OPERATING DIRECTION"
          title="Look inward. Then show up."
          body="I want to build ambitious systems without losing sight of the person waiting on the other side: systems that listen before they act, explain their limits, and leave the problem more understandable than they found it."
          footer="REPAIR → UNDERSTAND → BUILD → ACT"
          accent={PALETTE.gold}
        />
      </GlassPanel>
    </FilmShell>
  );
};
