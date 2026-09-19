import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {principles, tools} from '../profileData.js';
import {
  CornerMarks,
  fadeWindow,
  FilmShell,
  GlassPanel,
  MicroLabel,
  PALETTE,
  smooth,
} from '../shared/FilmShell.jsx';

const cyclicDistance = (frame, center, duration) => {
  const direct = Math.abs(frame - center);
  return Math.min(direct, duration - direct);
};

const ToolMap = ({frame, durationInFrames}) => {
  const segment = durationInFrames / tools.length;
  const positions = [
    [26, 22], [57, 10], [74, 36], [59, 68], [24, 72], [7, 43],
  ];

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <svg width="430" height="328" viewBox="0 0 430 328" style={{position: 'absolute', inset: 0, opacity: 0.34}}>
        <g stroke="rgba(247,244,236,.28)" strokeWidth="1" fill="none">
          {positions.map(([x, y], index) => (
            <line key={tools[index].name} x1="215" y1="164" x2={x * 4.3 + 35} y2={y * 3.28 + 22} strokeDasharray={index % 2 ? '3 8' : undefined} />
          ))}
          <circle cx="215" cy="164" r="64" />
          <circle cx="215" cy="164" r="94" strokeDasharray="2 9" />
        </g>
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 171,
          top: 120,
          width: 88,
          height: 88,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          border: `1px solid ${PALETTE.paper}66`,
          background: 'rgba(3,5,9,.88)',
          boxShadow: `0 0 38px ${PALETTE.blue}22`,
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{fontSize: 25, fontWeight: 900, letterSpacing: 2}}>AJ</div>
          <div className="mono" style={{fontSize: 7, letterSpacing: 2, color: PALETTE.muted, marginTop: 3}}>ROUTER</div>
        </div>
      </div>

      {tools.map((tool, index) => {
        const distance = cyclicDistance(frame, index * segment, durationInFrames);
        const strength = Math.max(0, 1 - distance / (segment * 0.72));
        const [x, y] = positions[index];
        return (
          <div
            key={tool.name}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 138,
              minHeight: 54,
              padding: '9px 11px',
              border: `1px solid ${tool.color}${strength > 0.45 ? 'aa' : '3d'}`,
              background: strength > 0.45 ? `${tool.color}18` : 'rgba(3,5,9,.72)',
              boxShadow: strength > 0.55 ? `0 0 22px ${tool.color}22` : 'none',
              transform: `translate(-50%, -50%) scale(${0.96 + strength * 0.04})`,
              opacity: 0.58 + strength * 0.42,
            }}
          >
            <div className="mono" style={{fontSize: 9, fontWeight: 800, letterSpacing: 1.6, color: tool.color}}>{tool.name}</div>
            <div style={{fontSize: 8, lineHeight: 1.35, color: 'rgba(247,244,236,.56)', marginTop: 5}}>{tool.role}</div>
          </div>
        );
      })}
    </div>
  );
};

const PrincipleCard = ({index, frame}) => {
  const windows = [
    [-12, 0, 38, 50],
    [42, 54, 86, 98],
    [90, 102, 134, 146],
    [138, 150, 182, 194],
    [186, 198, 226, 238],
  ];
  const [start, enter, leave, end] = windows[index];
  const returnToFirst = index === 0 ? smooth(frame, [278, 292], [0, 1]) : 0;
  const opacity = Math.max(fadeWindow(frame, start, enter, leave, end), returnToFirst);
  const [verb, detail] = principles[index];

  return (
    <div style={{position: 'absolute', inset: 0, padding: '37px 38px', opacity, transform: `translateY(${(1 - opacity) * 12}px)`}}>
      <MicroLabel color={index % 2 ? PALETTE.redSoft : PALETTE.blue}>RULE {String(index + 1).padStart(2, '0')} / WRITTEN IN PENCIL</MicroLabel>
      <div style={{fontSize: 42, fontWeight: 920, letterSpacing: -1.5, marginTop: 28}}>{verb}</div>
      <div style={{fontSize: 16, lineHeight: 1.55, color: 'rgba(247,244,236,.7)', marginTop: 15, maxWidth: 320}}>{detail}</div>
      <div style={{position: 'absolute', left: 38, bottom: 38, display: 'flex', gap: 5}}>
        {principles.map((_, dot) => (
          <span key={dot} style={{width: dot === index ? 34 : 8, height: 3, background: dot === index ? PALETTE.paper : 'rgba(247,244,236,.2)'}} />
        ))}
      </div>
    </div>
  );
};

const ContactCard = ({frame}) => {
  const opacity = fadeWindow(frame, 224, 240, 268, 281);
  return (
    <div style={{position: 'absolute', inset: 0, padding: '36px 38px', opacity, transform: `scale(${0.98 + opacity * 0.02})`}}>
      <MicroLabel color={PALETTE.gold}>OPEN CHANNEL / IF OUR QUESTIONS OVERLAP</MicroLabel>
      <div style={{fontSize: 31, lineHeight: 1.1, fontWeight: 900, marginTop: 22}}>Bring an unfinished idea.</div>
      <div style={{fontSize: 12, lineHeight: 1.6, color: 'rgba(247,244,236,.64)', marginTop: 13, maxWidth: 338}}>
        A difficult system. A problem living awkwardly between software and people.
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginTop: 20}}>
        {[
          ['LETTER', 'ajinkyamagarphys@gmail.com'],
          ['GITHUB', '@Ajinkya00Magar'],
          ['LINKEDIN', '/in/ajinkya-magar-6788b0251'],
        ].map(([label, value]) => (
          <div key={label} style={{display: 'flex', gap: 12, borderTop: '1px solid rgba(247,244,236,.14)', paddingTop: 7}}>
            <MicroLabel color="rgba(247,244,236,.34)" style={{fontSize: 7, width: 58}}>{label}</MicroLabel>
            <div className="mono" style={{fontSize: 9, color: PALETTE.paper}}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DevelopmentRoute = ({frame, durationInFrames}) => {
  const steps = ['NOTICE', 'MODEL', 'BUILD', 'BREAK', 'UNDERSTAND', 'REBUILD', 'SHARE'];
  const progress = (frame / durationInFrames) * (steps.length - 1);

  return (
    <div style={{position: 'absolute', zIndex: 24, left: 64, right: 64, bottom: 62}}>
      <MicroLabel color="rgba(247,244,236,.4)" style={{marginBottom: 12}}>DEVELOPMENT ROUTE / REPEATABLE, NOT LINEAR</MicroLabel>
      <div style={{display: 'flex', alignItems: 'center'}}>
        {steps.map((step, index) => {
          const strength = Math.max(0, 1 - Math.abs(progress - index) * 1.8);
          return (
            <React.Fragment key={step}>
              <div style={{position: 'relative', minWidth: index === 4 ? 88 : 62, textAlign: 'center'}}>
                <span
                  style={{
                    display: 'block',
                    width: 7 + strength * 4,
                    height: 7 + strength * 4,
                    margin: '0 auto 7px',
                    borderRadius: '50%',
                    background: strength > 0.2 ? PALETTE.gold : 'rgba(247,244,236,.24)',
                    boxShadow: strength > 0.45 ? `0 0 15px ${PALETTE.gold}` : 'none',
                  }}
                />
                <div className="mono" style={{fontSize: 7, letterSpacing: 1.2, color: strength > 0.35 ? PALETTE.paper : 'rgba(247,244,236,.38)'}}>{step}</div>
              </div>
              {index < steps.length - 1 && <div style={{height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(247,244,236,.38), rgba(247,244,236,.1))'}} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const FieldManualLoop = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const contactActive = fadeWindow(frame, 220, 240, 270, 284);

  return (
    <FilmShell
      frame={frame}
      durationInFrames={durationInFrames}
      reel="REEL 03"
      title="ENGINEERING FIELD MANUAL"
      accent={contactActive > 0.45 ? PALETTE.gold : PALETTE.blue}
      background="#04070b"
    >
      <div style={{position: 'absolute', zIndex: 12, left: 54, right: 54, top: 76}}>
        <MicroLabel color={PALETTE.redSoft}>TOOLS CHANGE / THE OPERATING LOOP DOES NOT</MicroLabel>
        <div style={{fontSize: 29, fontWeight: 920, letterSpacing: 4, marginTop: 7}}>WORKING MATERIALS, NOT IDENTITY LABELS</div>
      </div>

      <GlassPanel style={{position: 'absolute', zIndex: 18, left: 54, top: 125, width: 446, height: 328}}>
        <CornerMarks inset={12} opacity={0.3} />
        <ToolMap frame={frame} durationInFrames={durationInFrames} />
      </GlassPanel>

      <GlassPanel style={{position: 'absolute', zIndex: 18, right: 54, top: 125, width: 382, height: 328}}>
        <CornerMarks color={contactActive > 0.45 ? PALETTE.gold : PALETTE.paper} inset={12} opacity={0.34} />
        {principles.map((_, index) => <PrincipleCard key={index} index={index} frame={frame} />)}
        <ContactCard frame={frame} />
      </GlassPanel>

      <DevelopmentRoute frame={frame} durationInFrames={durationInFrames} />
    </FilmShell>
  );
};
