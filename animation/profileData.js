import {PALETTE} from './shared/FilmShell.jsx';

export const projects = [
  {
    code: 'SYN–01',
    name: 'SYNAPSE',
    color: PALETTE.blue,
    question: 'Can a computer listen without asking the human to shrink their language?',
    answer: 'Hands-free Windows control that understands commands in English, Hindi, and Marathi, then turns intent into dependable actions.',
    tags: ['PYTHON', 'VOICE', 'AUTOMATION', 'MULTILINGUAL'],
    signal: ['VOICE', 'INTENT', 'ACTION'],
  },
  {
    code: 'VIK–02',
    name: 'VIKRAM',
    color: PALETTE.redSoft,
    question: "Can a network reveal tomorrow's failure while there is still time to respond?",
    answer: 'An air-gapped predictive copilot for secure MPLS and SD-WAN operations—local telemetry, anomaly detection, forecasting, simulation, and explanation.',
    tags: ['NETWORKS', 'PREDICTION', 'AIR-GAPPED', 'NOC'],
    signal: ['TELEMETRY', 'RISK', 'DECISION'],
  },
  {
    code: 'FLW–03',
    name: 'FLOWMAP',
    color: '#b8a7ff',
    question: 'Can learning feel like a place you can navigate?',
    answer: 'An interactive learning universe that connects study paths, milestones, habits, schedules, and progress instead of leaving them as isolated tasks.',
    tags: ['TYPESCRIPT', 'NEXT.JS', 'SUPABASE', 'LEARNING'],
    signal: ['GOAL', 'ROUTE', 'PROGRESS'],
  },
  {
    code: 'CMB–04',
    name: 'CAMPUS BUDDY',
    color: PALETTE.gold,
    question: 'What changes when campus communication understands its own context?',
    answer: 'A real-time college space for conversations, channels, notices, and role-aware access—organized around the community it actually serves.',
    tags: ['TYPESCRIPT', 'REAL-TIME', 'ACCESS', 'COMMUNITY'],
    signal: ['PEOPLE', 'CONTEXT', 'CONNECTION'],
  },
  {
    code: 'MND–05',
    name: 'MINDGUARD',
    color: '#7ee2b8',
    question: 'Can software respond more carefully when words carry weight?',
    answer: 'An emotional-support prototype exploring emotion detection, risk-aware responses, and mood trends—not a replacement for professional care.',
    tags: ['PYTHON', 'NLP', 'EMOTION', 'RISK-AWARE'],
    signal: ['WORDS', 'SIGNAL', 'SUPPORT'],
  },
];

export const tools = [
  {name: 'PYTHON', role: 'intelligence · language · experiments', color: PALETTE.blue},
  {name: 'TYPESCRIPT', role: 'dependable systems · interface to backend', color: '#b8a7ff'},
  {name: 'C / C++', role: 'machine-level understanding', color: PALETTE.redSoft},
  {name: 'AI / NLP', role: 'intent · prediction · explanation', color: '#7ee2b8'},
  {name: 'NETWORKS', role: 'movement · failure · recovery', color: PALETTE.gold},
  {name: 'LINUX / GIT', role: 'where software lives and changes', color: '#d7dde2'},
];

export const principles = [
  ['LISTEN', 'long enough for the real problem to replace the obvious one'],
  ['MAKE VISIBLE', 'hidden systems, hidden assumptions, and hidden failure modes'],
  ['BREAK EARLY', 'prototypes early; promises rarely'],
  ['PREFER', 'useful over loud · reliable over impressive · clear over clever'],
  ['REVISE', 'better code and better people both require it'],
];
