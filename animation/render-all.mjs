import {spawnSync} from 'node:child_process';

const renders = [
  {composition: 'ProfileLoop', output: 'assets/profile-loop.gif', everyNthFrame: 3, scale: 1},
  {composition: 'IdentityLoop', output: 'assets/profile-identity.gif', everyNthFrame: 5, scale: 0.833333},
  {composition: 'ProjectsLoop', output: 'assets/profile-projects.gif', everyNthFrame: 5, scale: 0.833333},
  {composition: 'FieldManualLoop', output: 'assets/profile-field-manual.gif', everyNthFrame: 5, scale: 0.833333},
];

for (const {composition, output, everyNthFrame, scale} of renders) {
  console.log(`\nRendering ${composition} → ${output}`);

  const args = [
    'remotion',
    'render',
    'animation/index.jsx',
    composition,
    output,
    '--codec=gif',
    `--every-nth-frame=${everyNthFrame}`,
    '--image-format=jpeg',
    '--jpeg-quality=82',
    '--public-dir=assets',
    '--concurrency=2',
  ];

  if (scale !== 1) {
    args.push(`--scale=${scale}`);
  }

  const result = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec, ['/d', '/s', '/c', ['npx', ...args].join(' ')], {stdio: 'inherit'})
    : spawnSync('npx', args, {stdio: 'inherit'});

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
