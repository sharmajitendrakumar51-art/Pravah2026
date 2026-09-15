// ============================================================
// PRAVAH 2026 — CONTENT LAYER
// Single source of truth for all official festival content.
// Sections without released details render as COMING SOON.
// ============================================================

export const FESTIVAL = {
  name: 'TECHNO PRAVAH',
  edition: '2026',
  type: 'TECHNICAL FESTIVAL',
  host: 'SKIT JAIPUR',
  hostFull:
    'Swami Keshavanand Institute of Technology, Management & Gramothan (SKIT), Jaipur',
  dates: '28 SEPTEMBER — 03 OCTOBER 2026',
  datesShort: '28 SEP — 03 OCT 2026',
  tagline: ['IGNITE INNOVATION.', 'ENGINEER THE FUTURE.'],
  meaning:
    'Pravah — the flow. An unstoppable current of ideas, energy and engineering set in motion.',
};

export const NAV = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'events', label: 'EVENTS' },
  { id: 'schedule', label: 'SCHEDULE' },
  { id: 'workshops', label: 'WORKSHOPS' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'team', label: 'TEAM' },
  { id: 'contact', label: 'CONTACT' },
];

export const MARQUEE_ITEMS = [
  'TECHNO PRAVAH 2026',
  'IGNITE INNOVATION',
  'ENGINEER THE FUTURE',
  'SKIT JAIPUR',
  '28 SEP — 03 OCT',
];

// ------------------------------------------------------------
// ABOUT — editorial stats
// ------------------------------------------------------------
export const STATS = [
  { value: 1000, suffix: '+', label: 'TARGET PARTICIPANTS' },
  { value: 6, suffix: '', label: 'DAYS OF INNOVATION' },
  { value: null, glyph: '∞', label: 'IDEAS & POSSIBILITIES' },
  { value: null, glyph: 'SKIT', label: 'JAIPUR' },
];

// ------------------------------------------------------------
// EVENT CATEGORIES — eight arenas
// Details per event unlock closer to the festival.
// ------------------------------------------------------------
export const EVENT_CATEGORIES = [
  {
    id: 'coding',
    index: '01',
    title: 'CODING & PROGRAMMING',
    icon: 'terminal',
    tags: ['CONTESTS', 'DEBUGGING', 'ALGORITHM SPRINTS'],
    blurb:
      'Speed, logic and raw problem-solving — arenas where code is the only language that matters.',
    hue: 'cyan',
  },
  {
    id: 'ai-ml',
    index: '02',
    title: 'AI & MACHINE LEARNING',
    icon: 'brain',
    tags: ['MODELS', 'DATA', 'NEURAL NETWORKS'],
    blurb:
      'Train, tune and deploy intelligent systems that push machines closer to intuition.',
    hue: 'violet',
  },
  {
    id: 'cyber',
    index: '03',
    title: 'CYBER SECURITY',
    icon: 'shield',
    tags: ['CTF', 'FORENSICS', 'DEFENSE'],
    blurb:
      'Think like an attacker, defend like a fortress — the digital battlefield awaits.',
    hue: 'magenta',
  },
  {
    id: 'startup',
    index: '04',
    title: 'INNOVATION & STARTUP',
    icon: 'rocket',
    tags: ['PITCHING', 'IDEATION', 'VENTURES'],
    blurb:
      'Where raw ideas meet ruthless refinement — pitch the future and make it fundable.',
    hue: 'amber',
  },
  {
    id: 'webapp',
    index: '05',
    title: 'WEB / APP DEVELOPMENT',
    icon: 'app',
    tags: ['FULL-STACK', 'UI ENGINEERING', 'DEPLOYMENT'],
    blurb:
      'Design and ship living products — interfaces that feel inevitable in hindsight.',
    hue: 'cyan',
  },
  {
    id: 'robotics',
    index: '06',
    title: 'ROBOTICS & IoT',
    icon: 'bot',
    tags: ['AUTOMATION', 'EMBEDDED', 'SMART SYSTEMS'],
    blurb:
      'Give machines a body and a purpose — circuits, sensors and motion in perfect sync.',
    hue: 'violet',
  },
  {
    id: 'gaming',
    index: '07',
    title: 'GAMING / E-SPORTS',
    icon: 'gamepad',
    tags: ['ARENA', 'TOURNAMENTS', 'RANKED PLAY'],
    blurb:
      'High-stakes reflexes on the big stage — glory belongs to the fastest minds.',
    hue: 'magenta',
  },
  {
    id: 'exhibition',
    index: '08',
    title: 'PROJECT EXHIBITION',
    icon: 'lightbulb',
    tags: ['SHOWCASE', 'DEMOS', 'PROTOTYPES'],
    blurb:
      'Hardware, software and everything in between — ideas made tangible under one roof.',
    hue: 'amber',
  },
];

// ------------------------------------------------------------
// SCHEDULE — six-day cinematic timeline
// ------------------------------------------------------------
export const SCHEDULE = [
  {
    day: 'DAY 01',
    date: '28 SEP',
    weekday: 'MONDAY',
    title: 'INAUGURATION CEREMONY',
    note: 'The current is switched on. Gates open to the future.',
    status: 'FULL SCHEDULE COMING SOON',
  },
  {
    day: 'DAY 02',
    date: '29 SEP',
    weekday: 'TUESDAY',
    title: 'TECHNICAL EVENTS',
    note: 'Code, circuits and competition take centre stage.',
    status: 'FULL SCHEDULE COMING SOON',
  },
  {
    day: 'DAY 03',
    date: '30 SEP',
    weekday: 'WEDNESDAY',
    title: 'WORKSHOPS & SEMINARS',
    note: 'Deep-dives led by builders, researchers and industry minds.',
    status: 'FULL SCHEDULE COMING SOON',
  },
  {
    day: 'DAY 04',
    date: '01 OCT',
    weekday: 'THURSDAY',
    title: 'COMPETITIONS & CHALLENGES',
    note: 'The arenas ignite — only the sharpest advance.',
    status: 'FULL SCHEDULE COMING SOON',
  },
  {
    day: 'DAY 05',
    date: '02 OCT',
    weekday: 'FRIDAY',
    title: 'INNOVATION SHOWCASE',
    note: 'Prototypes, demonstrations and ideas in motion.',
    status: 'FULL SCHEDULE COMING SOON',
  },
  {
    day: 'DAY 06',
    date: '03 OCT',
    weekday: 'SATURDAY',
    title: 'GRAND FINALE & PRIZE DISTRIBUTION',
    note: 'The flow crests — champions crowned, the future signed off.',
    status: 'FULL SCHEDULE COMING SOON',
  },
];

// ------------------------------------------------------------
// COMING SOON modules
// ------------------------------------------------------------
export const WORKSHOP_TRACKS = [
  {
    icon: 'workshop',
    title: 'WORKSHOP LINEUP',
    desc: 'Hands-on, builder-grade sessions across emerging tech.',
  },
  {
    icon: 'seminar',
    title: 'SPEAKER SESSIONS',
    desc: 'Talks by engineers, researchers and industry leaders.',
  },
  {
    icon: 'lab',
    title: 'TECH SEMINARS',
    desc: 'Deep technical seminars on the stacks of tomorrow.',
  },
];

export const GALLERY_TILES = 8;

export const TEAM_COUNT = 8;

export const CONTACT_CHANNELS = [
  {
    icon: 'mail',
    title: 'GENERAL QUERIES',
    desc: 'Everything about Techno Pravah 2026.',
  },
  {
    icon: 'ticket',
    title: 'EVENTS & REGISTRATION',
    desc: 'Event rules, teams and entry passes.',
  },
  {
    icon: 'handshake',
    title: 'SPONSORSHIPS',
    desc: 'Partner with the biggest tech fest on campus.',
  },
];
