import React from 'react';
import {Composition} from 'remotion';
import {ProfileLoop} from './ProfileLoop.jsx';
import {FieldManualLoop} from './sections/FieldManualLoop.jsx';
import {IdentityLoop} from './sections/IdentityLoop.jsx';
import {ProjectsLoop} from './sections/ProjectsLoop.jsx';

export const PROFILE_COMPOSITIONS = [
  {
    id: 'ProfileLoop',
    component: ProfileLoop,
    width: 960,
    height: 400,
    fps: 30,
    durationInFrames: 240,
  },
  {
    id: 'IdentityLoop',
    component: IdentityLoop,
    width: 960,
    height: 560,
    fps: 30,
    durationInFrames: 300,
  },
  {
    id: 'ProjectsLoop',
    component: ProjectsLoop,
    width: 960,
    height: 620,
    fps: 30,
    durationInFrames: 360,
  },
  {
    id: 'FieldManualLoop',
    component: FieldManualLoop,
    width: 960,
    height: 560,
    fps: 30,
    durationInFrames: 300,
  },
];

export const AnimationRoot = () => (
  <>
    {PROFILE_COMPOSITIONS.map((composition) => (
      <Composition key={composition.id} {...composition} />
    ))}
  </>
);
