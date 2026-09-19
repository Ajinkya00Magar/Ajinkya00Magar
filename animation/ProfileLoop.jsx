import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import './styles.css';

const COLORS = {
  ink: '#030509',
  paper: '#f7f4ec',
  blue: '#9de8f4',
  blueDeep: '#0b536b',
  red: '#f12336',
  redDeep: '#65000d',
};

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

const fadeWindow = (frame, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd) => {
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

const smooth = (frame, input, output) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

const FilmPerforations = ({frame}) => {
  const offset = 0;
  const holes = Array.from({length: 18}, (_, index) => index);

  return (
    <AbsoluteFill style={{pointerEvents: 'none', zIndex: 50}}>
      {[18, 368].map((top) => (
        <div key={top} style={{position: 'absolute', top, left: -68 + offset, display: 'flex', gap: 30}}>
          {holes.map((hole) => (
            <div
              key={hole}
              style={{
                width: 38,
                height: 11,
                borderRadius: 3,
                background: 'rgba(247, 244, 236, 0.72)',
                boxShadow: '0 0 8px rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
      ))}
    </AbsoluteFill>
  );
};

const FilmGrain = () => {
  const x = 0;
  const y = 0;
  const opacity = 0.065;

  return (
    <AbsoluteFill
      style={{
        zIndex: 45,
        pointerEvents: 'none',
        opacity,
        transform: `translate(${x}px, ${y}px) scale(1.04)`,
        backgroundImage: [
          'repeating-radial-gradient(circle at 18% 31%, rgba(255,255,255,.9) 0 0.7px, transparent 0.8px 4px)',
          'repeating-radial-gradient(circle at 73% 68%, rgba(0,0,0,.95) 0 0.8px, transparent 0.9px 5px)',
        ].join(','),
        mixBlendMode: 'soft-light',
      }}
    />
  );
};

const EdgeTelemetry = ({frame}) => {
  const ticks = Array.from({length: 24}, (_, index) => index);
  const pulse = 0.38 + Math.sin((frame / 240) * Math.PI * 4) * 0.18;

  return (
    <AbsoluteFill style={{zIndex: 40, pointerEvents: 'none'}}>
      <div
        className="mono"
        style={{position: 'absolute', left: 30, top: 51, fontSize: 10, letterSpacing: 3, color: COLORS.paper, opacity: 0.62}}
      >
        AM–00 / TWO EXPOSURES
      </div>
      <div
        className="mono"
        style={{position: 'absolute', right: 30, top: 51, fontSize: 10, letterSpacing: 3, color: COLORS.paper, opacity: 0.62}}
      >
        18°40′N / 73°53′E
      </div>
      <div style={{position: 'absolute', left: 30, right: 30, bottom: 45, display: 'flex', alignItems: 'center', gap: 8}}>
        {ticks.map((tick) => (
          <div
            key={tick}
            style={{
              height: tick % 6 === 0 ? 8 : 3,
              flex: 1,
              background: COLORS.paper,
              opacity: tick === Math.floor((frame / 10) % ticks.length) ? 0.92 : pulse * 0.34,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PetalField = ({frame, opacity}) => {
  const petals = [
    [8, 34, 0.42, 13], [17, 76, 0.56, 9], [28, 18, 0.48, 12], [39, 58, 0.66, 8],
    [51, 29, 0.52, 11], [64, 81, 0.46, 14], [74, 44, 0.62, 9], [87, 21, 0.5, 12],
    [93, 69, 0.58, 10], [34, 91, 0.44, 8], [58, 8, 0.61, 10], [80, 93, 0.47, 13],
  ];

  return (
    <AbsoluteFill style={{zIndex: 12, opacity, pointerEvents: 'none'}}>
      {petals.map(([x, y, speed, size], index) => {
        const phase = ((frame * speed + index * 29) % 180) / 180;
        const driftX = Math.sin((phase + index * 0.13) * Math.PI * 2) * 34;
        const driftY = phase * 190 - 95;
        const turn = phase * 420 + index * 41;

        return (
          <div
            key={`${x}-${y}`}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size * 0.42,
              height: size,
              borderRadius: '80% 15% 75% 20%',
              background: index % 3 === 0 ? 'rgba(255,245,250,.9)' : 'rgba(224,251,255,.82)',
              boxShadow: '0 0 12px rgba(202,246,255,.35)',
              transform: `translate(${driftX}px, ${driftY}px) rotate(${turn}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const WebField = ({progress, opacity}) => {
  const paths = [
    'M 960 8 L 620 400',
    'M 960 8 L 790 400',
    'M 960 8 L 945 400',
    'M 960 8 L 480 165',
    'M 922 70 Q 842 90 805 170',
    'M 862 124 Q 755 160 700 252',
    'M 792 205 Q 672 250 604 355',
    'M 951 118 Q 866 156 830 242',
  ];

  return (
    <svg
      viewBox="0 0 960 400"
      width="960"
      height="400"
      style={{position: 'absolute', inset: 0, zIndex: 15, opacity, pointerEvents: 'none'}}
    >
      {paths.map((path, index) => {
        const pathProgress = Math.max(0, Math.min(1, progress * 1.35 - index * 0.045));
        return (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={index < 4 ? 'rgba(255,235,231,.72)' : 'rgba(255,235,231,.52)'}
            strokeWidth={index < 4 ? 1.4 : 1}
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - pathProgress)}
          />
        );
      })}
    </svg>
  );
};

const FocusMarks = ({frame, color = COLORS.paper, opacity = 1}) => {
  const breathe = 1 + Math.sin((frame / 240) * Math.PI * 6) * 0.035;
  const common = {position: 'absolute', width: 22, height: 22, opacity};

  return (
    <div style={{position: 'absolute', left: '50%', top: '50%', width: 224, height: 118, transform: `translate(-50%, -50%) scale(${breathe})`, zIndex: 30}}>
      <span style={{...common, left: 0, top: 0, borderLeft: `2px solid ${color}`, borderTop: `2px solid ${color}`}} />
      <span style={{...common, right: 0, top: 0, borderRight: `2px solid ${color}`, borderTop: `2px solid ${color}`}} />
      <span style={{...common, left: 0, bottom: 0, borderLeft: `2px solid ${color}`, borderBottom: `2px solid ${color}`}} />
      <span style={{...common, right: 0, bottom: 0, borderRight: `2px solid ${color}`, borderBottom: `2px solid ${color}`}} />
    </div>
  );
};

const SceneTitle = ({eyebrow, title, note, align = 'left', opacity, x = 0, accent}) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 25,
      left: align === 'left' ? 72 : undefined,
      right: align === 'right' ? 72 : undefined,
      top: 132,
      width: 430,
      textAlign: align,
      opacity,
      transform: `translateX(${x}px)`,
      textShadow: '0 4px 24px rgba(0,0,0,.62)',
    }}
  >
    <div className="mono" style={{fontSize: 11, letterSpacing: 5, color: accent, marginBottom: 12}}>{eyebrow}</div>
    <div style={{fontSize: 58, lineHeight: 0.9, fontWeight: 900, letterSpacing: -3}}>{title}</div>
    <div className="mono" style={{fontSize: 11, lineHeight: 1.6, letterSpacing: 2.4, marginTop: 18, color: 'rgba(247,244,236,.78)'}}>{note}</div>
  </div>
);

const Aperture = ({frame, radius, ringOpacity}) => {
  const rotation = smooth(frame, [0, 22, 218, 239], [-16, 0, 0, 18]);
  const bladeRadius = Math.min(86, Math.max(13, radius * 0.16));
  const blades = Array.from({length: 6}, (_, index) => index);

  return (
    <AbsoluteFill style={{zIndex: 60, pointerEvents: 'none'}}>
      <svg viewBox="0 0 960 400" width="960" height="400" style={{position: 'absolute', inset: 0}}>
        <defs>
          <mask id="shutter-mask">
            <rect width="960" height="400" fill="white" />
            <circle cx="480" cy="200" r={radius} fill="black" />
          </mask>
        </defs>
        <rect width="960" height="400" fill={COLORS.ink} mask="url(#shutter-mask)" />
        <g transform={`translate(480 200) rotate(${rotation})`} opacity={ringOpacity}>
          <circle r={bladeRadius + 30} fill="rgba(3,5,9,.44)" stroke="rgba(247,244,236,.78)" strokeWidth="1" />
          <circle r={bladeRadius + 17} fill="none" stroke="rgba(247,244,236,.22)" strokeWidth="1" />
          {blades.map((blade) => (
            <path
              key={blade}
              d={`M 0 -${bladeRadius + 28} L ${bladeRadius * 0.82} -${bladeRadius * 0.18} L ${bladeRadius * 0.34} ${bladeRadius * 0.76} Z`}
              transform={`rotate(${blade * 60})`}
              fill="rgba(14,18,23,.74)"
              stroke="rgba(247,244,236,.28)"
              strokeWidth="1"
            />
          ))}
          <circle r={Math.max(8, bladeRadius * 0.3)} fill={COLORS.ink} stroke="rgba(247,244,236,.75)" strokeWidth="1" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

const IdentityResolve = ({frame, opacity}) => {
  const tracking = smooth(frame, [174, 199], [18, 5]);
  const lift = smooth(frame, [174, 196], [22, 0]);
  const dividerHeight = smooth(frame, [178, 206], [0, 112]);
  const route = smooth(frame, [185, 215], [0, 1]);

  return (
    <AbsoluteFill style={{zIndex: 28, opacity, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: '50%', top: 120, width: 1, height: dividerHeight, background: 'rgba(247,244,236,.55)'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 134, textAlign: 'center', transform: `translateY(${lift}px)`, textShadow: '0 6px 34px #000'}}>
        <div className="mono" style={{fontSize: 11, letterSpacing: 6, color: COLORS.paper, marginBottom: 13}}>EXPOSURE 00 / RESOLVED</div>
        <div style={{fontSize: 53, lineHeight: 1, fontWeight: 900, letterSpacing: tracking}}>AJINKYA MAGAR</div>
        <div className="mono" style={{fontSize: 11, letterSpacing: 4.2, marginTop: 16, color: 'rgba(247,244,236,.84)'}}>
          SYSTEMS THAT LISTEN BEFORE THEY ACT
        </div>
      </div>
      <div className="mono" style={{position: 'absolute', left: 104, right: 104, top: 283, display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, letterSpacing: 3, color: COLORS.paper}}>
        <span style={{opacity: route}}>LISTEN</span>
        <span style={{height: 1, flex: route, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.paper})`}} />
        <span style={{opacity: route}}>BUILD</span>
        <span style={{height: 1, flex: route, background: `linear-gradient(90deg, ${COLORS.paper}, ${COLORS.red})`}} />
        <span style={{opacity: route}}>ACT</span>
      </div>
    </AbsoluteFill>
  );
};

export const ProfileLoop = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const openingRadius = smooth(frame, [0, 22], [0, 680]);
  const closingRadius = smooth(frame, [216, durationInFrames - 1], [680, 0]);
  const shutterRadius = frame < 120 ? openingRadius : closingRadius;
  const openingRing = fadeWindow(frame, 0, 5, 20, 29);
  const transitionRing = fadeWindow(frame, 78, 88, 101, 112);
  const closingRing = fadeWindow(frame, 211, 219, 232, 239);
  const ringOpacity = Math.max(openingRing, transitionRing, closingRing);

  const shoyaOpacity = fadeWindow(frame, 11, 25, 76, 96);
  const spiderTitleOpacity = fadeWindow(frame, 105, 119, 153, 171);
  const identityOpacity = fadeWindow(frame, 168, 185, 218, 233);
  const spiderInset = smooth(frame, [80, 109, 158, 184], [100, 0, 0, 50]);
  const webProgress = smooth(frame, [91, 135], [0, 1]);
  const webOpacity = fadeWindow(frame, 86, 103, 164, 183);

  const shoyaScale = smooth(frame, [108, 156], [1.15, 1.03]);
  const shoyaX = smooth(frame, [108, 156], [55, -130]);
  const spiderScale = 1.12;
  const spiderX = 0;

  return (
    <AbsoluteFill className="motion-root">
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <Img
          src={staticFile('shoya-ishida.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 72%',
            transform: `translateX(${shoyaX}px) scale(${shoyaScale})`,
            filter: 'saturate(.78) contrast(1.08) brightness(.78)',
          }}
        />
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(151,229,241,.28), rgba(4,20,28,.38) 54%, rgba(2,7,11,.96))'}} />
        <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(2,8,12,.86), transparent 44%, rgba(3,8,12,.26))'}} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          overflow: 'hidden',
          clipPath: `inset(0 0 0 ${spiderInset}%)`,
          background: COLORS.redDeep,
        }}
      >
        <Img
          src={staticFile('spider-man.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 25%',
            transform: `translateX(${spiderX}px) scale(${spiderScale})`,
            filter: 'grayscale(.2) saturate(1.18) contrast(1.18) brightness(.72)',
          }}
        />
        <AbsoluteFill style={{background: 'linear-gradient(270deg, rgba(239,35,54,.26), rgba(35,0,5,.25) 48%, rgba(3,5,9,.96))'}} />
        <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(8,0,2,.9), transparent 48%, rgba(9,0,2,.24))'}} />
      </AbsoluteFill>

      <PetalField frame={frame} opacity={shoyaOpacity * 0.9 + identityOpacity * 0.38} />
      <WebField progress={webProgress} opacity={webOpacity + identityOpacity * 0.42} />

      <SceneTitle
        eyebrow="EXPOSURE 01 / REPAIR"
        title="LISTEN."
        note="UNDERSTAND BEFORE AUTOMATING / RETURN BEFORE DISAPPEARING"
        opacity={shoyaOpacity}
        x={smooth(frame, [12, 33], [-36, 0])}
        accent={COLORS.blue}
      />

      <SceneTitle
        eyebrow="EXPOSURE 02 / RESPONSIBILITY"
        title="ACT."
        note="ABILITY IS ONLY A START / POINT IT WHERE IT CAN HELP"
        align="right"
        opacity={spiderTitleOpacity}
        x={smooth(frame, [105, 127], [36, 0])}
        accent="#ff6a76"
      />

      <FocusMarks frame={frame} opacity={Math.max(shoyaOpacity, spiderTitleOpacity) * 0.56} />
      <IdentityResolve frame={frame} opacity={identityOpacity} />
      <EdgeTelemetry frame={frame} />
      <FilmPerforations frame={frame} />
      <FilmGrain frame={frame} />
      <Aperture frame={frame} radius={shutterRadius} ringOpacity={ringOpacity} />
    </AbsoluteFill>
  );
};
