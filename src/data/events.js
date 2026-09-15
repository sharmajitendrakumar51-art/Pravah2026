// ============================================================
// PRAVAH 2026 — EVENT DATA LAYER
// Future-ready event records. Every detail field defaults to null
// so the UI renders a premium "COMING SOON" state instead of
// fabricated information. When official details are released,
// fill the fields here only — no component changes required.
// ============================================================

import { EVENT_CATEGORIES } from './content';

// Detail schema — the shape every event supports.
const EMPTY_DETAILS = {
  date: null,
  time: null,
  venue: null,
  prize: null,
  teamSize: null,
  eligibility: null,
  fee: null,
  registrationUrl: null,
  coordinator: null,
  rules: [], // string[]
  faqs: [], // { q, a }[]
  events: [], // sub-events: { name, format, note }[]
};

// Slug map — stable URLs for each category arena.
const SLUGS = {
  coding: 'coding-programming',
  'ai-ml': 'ai-machine-learning',
  cyber: 'cyber-security',
  startup: 'innovation-startup',
  webapp: 'web-app-development',
  robotics: 'robotics-iot',
  gaming: 'gaming-esports',
  exhibition: 'project-exhibition',
};

// Short arena summaries used on detail heroes (derived from
// existing category positioning — no new official claims).
const OVERVIEW = {
  coding:
    'The pure-logic arena of Techno Pravah. Competitive programming, debugging gauntlets and algorithm sprints where the shortest path wins.',
  'ai-ml':
    'Where machines learn to reason. Model building, data challenges and applied intelligence problems judged on rigour and creativity.',
  cyber:
    'The digital battlefield. Capture-the-flag, forensics and defensive engineering for those who think in exploits and patches.',
  startup:
    'From raw idea to defensible venture. Ideation sprints and pitch stages built for founders in the making.',
  webapp:
    'Product engineering under pressure. Full-stack builds, interface craft and deployment discipline.',
  robotics:
    'Machines with purpose. Embedded systems, automation and connected devices operating in the physical world.',
  gaming:
    'The competitive arena. Tournament brackets, ranked play and reflexes measured in milliseconds.',
  exhibition:
    'The showcase floor. Working prototypes, demonstrations and engineering that speaks for itself.',
};

// Public event records
export const EVENTS = EVENT_CATEGORIES.map((cat) => ({
  ...cat,
  slug: SLUGS[cat.id],
  overview: OVERVIEW[cat.id],
  status: 'ANNOUNCEMENT PENDING',
  details: { ...EMPTY_DETAILS },
}));

export const getEventBySlug = (slug) => EVENTS.find((e) => e.slug === slug);

export const getAdjacentEvents = (slug) => {
  const i = EVENTS.findIndex((e) => e.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? EVENTS[i - 1] : EVENTS[EVENTS.length - 1],
    next: i < EVENTS.length - 1 ? EVENTS[i + 1] : EVENTS[0],
  };
};

// Filter groups for the discovery page — derived from event data,
// so new arenas automatically appear.
export const EVENT_FILTERS = [
  { id: 'all', label: 'ALL ARENAS' },
  { id: 'software', label: 'SOFTWARE', match: ['coding', 'webapp', 'ai-ml'] },
  { id: 'hardware', label: 'HARDWARE & IoT', match: ['robotics', 'exhibition'] },
  { id: 'security', label: 'SECURITY', match: ['cyber'] },
  { id: 'business', label: 'INNOVATION', match: ['startup'] },
  { id: 'arena', label: 'E-SPORTS', match: ['gaming'] },
];

export const filterEvents = (filterId) => {
  if (filterId === 'all') return EVENTS;
  const filter = EVENT_FILTERS.find((f) => f.id === filterId);
  if (!filter?.match) return EVENTS;
  return EVENTS.filter((e) => filter.match.includes(e.id));
};

// Detail rows rendered on every event page. `key` maps into
// `event.details`; null values become COMING SOON.
export const DETAIL_FIELDS = [
  { key: 'date', label: 'DATE', icon: 'calendar' },
  { key: 'time', label: 'TIME', icon: 'clock' },
  { key: 'venue', label: 'VENUE', icon: 'pin' },
  { key: 'prize', label: 'PRIZE', icon: 'trophy' },
  { key: 'teamSize', label: 'TEAM SIZE', icon: 'users' },
  { key: 'eligibility', label: 'ELIGIBILITY', icon: 'badge' },
  { key: 'fee', label: 'ENTRY', icon: 'ticket' },
  { key: 'coordinator', label: 'COORDINATOR', icon: 'headset' },
];
