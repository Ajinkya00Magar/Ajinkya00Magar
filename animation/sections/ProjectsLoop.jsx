import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {projects} from '../profileData.js';
import {
  CornerMarks,
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

const ProjectIndex = ({frame, durationInFrames}) => {
  const segment = durationInFrames / projects.length;

  return (
    <div style={{position: 'absolute', left: 54, top: 130, width: 232, zIndex: 20}}>
      <MicroLabel color={PALETTE.muted}>EVIDENCE INDEX / 05</MicroLabel>
      <div style={{marginTop: 19}}>
        {projects.map((project, index) => {
          const distance = cyclicDistance(frame, index * segment, durationInFrames);
          const strength = Math.max(0, 1 - distance / (segment * 0.72));
          return (
            <div
              key={project.code}
              style={{
                position: 'relative',
                height: 67,
                padding: '12px 12px 10px 20px',
                marginBottom: 7,
                borderLeft: `2px solid ${project.color}`,
                background: `linear-gradient(90deg, ${project.color}${strength > 0.42 ? '22' : '08'}, transparent)`,
                opacity: 0.42 + strength * 0.58,
              }}
            >
              <div className="mono" style={{fontSize: 8, letterSpacing: 2.2, color: project.color}}>{project.code}</div>
              <div style={{fontSize: 15, fontWeight: 800, letterSpacing: 1.5, marginTop: 5}}>{project.name}</div>
              <div
                style={{
                  position: 'absolute',
                  right: 4,
                  top: '50%',
                  width: 28 * strength,
                  height: 1,
                  background: project.color,
                  boxShadow: `0 0 10px ${project.color}`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SignalRoute = ({project, frame, opacity}) => {
  const pulse = (frame % 72) / 72;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 23, opacity}}>
      {project.signal.map((node, index) => (
        <React.Fragment key={node}>
          <div style={{position: 'relative', minWidth: 88, padding: '9px 12px', border: `1px solid ${project.color}66`, textAlign: 'center'}}>
            <div className="mono" style={{fontSize: 8, letterSpacing: 1.7, color: project.color}}>{node}</div>
            <span
              style={{
                position: 'absolute',
                right: -3,
                top: -3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: project.color,
                opacity: Math.max(0.25, 1 - Math.abs(pulse - index / 3) * 5),
                boxShadow: `0 0 10px ${project.color}`,
              }}
            />
          </div>
          {index < project.signal.length - 1 && <div style={{width: 42, height: 1, background: `linear-gradient(90deg, ${project.color}, transparent)`}} />}
        </React.Fragment>
      ))}
    </div>
  );
};

const ProjectDetail = ({project, index, frame, durationInFrames}) => {
  const segment = durationInFrames / projects.length;
  const center = index * segment;
  const distance = cyclicDistance(frame, center, durationInFrames);
  const opacity = Math.max(0, Math.min(1, 1 - (distance - segment * 0.22) / (segment * 0.28)));
  const x = (1 - opacity) * 18 * (frame < center ? 1 : -1);

  return (
    <div style={{position: 'absolute', inset: 0, padding: '37px 41px', opacity, transform: `translateX(${x}px)`}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <MicroLabel color={project.color}>{project.code} / ACTIVE QUESTION</MicroLabel>
        <MicroLabel color="rgba(247,244,236,.38)">BUILD {String(index + 1).padStart(2, '0')} OF 05</MicroLabel>
      </div>
      <div style={{fontSize: 33, lineHeight: 1.08, fontWeight: 860, letterSpacing: -1.4, marginTop: 21, maxWidth: 525}}>{project.question}</div>
      <div style={{fontSize: 13, lineHeight: 1.62, color: 'rgba(247,244,236,.7)', marginTop: 18, maxWidth: 505}}>{project.answer}</div>
      <SignalRoute project={project} frame={frame} opacity={opacity} />
      <div style={{position: 'absolute', left: 41, right: 41, bottom: 31, display: 'flex', gap: 7, flexWrap: 'wrap'}}>
        {project.tags.map((tag) => (
          <span
            className="mono"
            key={tag}
            style={{fontSize: 8, letterSpacing: 1.5, color: project.color, border: `1px solid ${project.color}55`, padding: '6px 9px'}}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const NetworkBackdrop = ({frame}) => {
  const pulseX = 320 + ((frame * 2.2) % 590);
  return (
    <AbsoluteFill style={{zIndex: 3, opacity: 0.2}}>
      <svg width="960" height="620" viewBox="0 0 960 620">
        <g fill="none" stroke="rgba(157,232,244,.32)" strokeWidth="1">
          <path d="M286 168 C390 88 470 220 575 138 S760 112 906 180" />
          <path d="M286 510 C420 438 492 550 618 462 S786 438 910 514" />
          <path d="M342 100 L342 550 M515 82 L515 560 M700 90 L700 552 M874 112 L874 530" strokeDasharray="3 10" />
        </g>
        <circle cx={pulseX} cy="96" r="3" fill={PALETTE.blue} />
        <circle cx={910 - (pulseX - 320)} cy="548" r="3" fill={PALETTE.redSoft} />
      </svg>
    </AbsoluteFill>
  );
};

export const ProjectsLoop = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const titleTracking = smooth(frame % 72, [0, 18, 71], [8, 3, 8]);

  return (
    <FilmShell
      frame={frame}
      durationInFrames={durationInFrames}
      reel="REEL 02"
      title="QUESTIONS WITH REPOSITORIES ATTACHED"
      accent={projects[Math.floor((frame / (durationInFrames / projects.length)) + 0.5) % projects.length].color}
      background="#05080d"
    >
      <NetworkBackdrop frame={frame} />

      <div style={{position: 'absolute', zIndex: 12, left: 54, right: 54, top: 75}}>
        <MicroLabel color={PALETTE.gold}>NOT A TROPHY SHELF / ATTEMPTS MADE EXECUTABLE</MicroLabel>
        <div style={{fontSize: 28, fontWeight: 900, letterSpacing: titleTracking, marginTop: 7}}>PROJECT EVIDENCE REEL</div>
      </div>

      <ProjectIndex frame={frame} durationInFrames={durationInFrames} />

      <GlassPanel style={{position: 'absolute', zIndex: 18, left: 316, right: 54, top: 130, height: 404}}>
        <CornerMarks inset={13} opacity={0.32} />
        {projects.map((project, index) => (
          <ProjectDetail
            key={project.code}
            project={project}
            index={index}
            frame={frame}
            durationInFrames={durationInFrames}
          />
        ))}
      </GlassPanel>
    </FilmShell>
  );
};
