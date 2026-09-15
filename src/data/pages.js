// ============================================================
// PRAVAH 2026 — PAGE DATA LAYER
// Structural scaffolding for the dedicated pages.
// Anything not yet officially released is marked `pending: true`
// and renders as a premium COMING SOON block. No official
// information is invented here.
// ============================================================

import { NAV } from './content';

// ------------------------------------------------------------
// ROUTES — single source of truth for navigation + footer
// ------------------------------------------------------------
export const ROUTES = {
  home: '/',
  about: '/about',
  events: '/events',
  schedule: '/schedule',
  workshops: '/workshops',
  gallery: '/gallery',
  team: '/team',
  sponsors: '/sponsors',
  register: '/register',
  rulebook: '/rulebook',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  refund: '/refund',
};

// Primary navigation (mirrors existing NAV labels, now routed)
export const PRIMARY_NAV = NAV.map((item) => ({
  ...item,
  path: ROUTES[item.id] ?? '/',
}));

// Secondary navigation surfaced in the overlay + footer
export const SECONDARY_NAV = [
  { id: 'sponsors', label: 'SPONSORS', path: ROUTES.sponsors },
  { id: 'rulebook', label: 'RULEBOOK', path: ROUTES.rulebook },
  { id: 'register', label: 'REGISTER', path: ROUTES.register },
];

export const LEGAL_NAV = [
  { id: 'privacy', label: 'PRIVACY POLICY', path: ROUTES.privacy },
  { id: 'terms', label: 'TERMS & CONDITIONS', path: ROUTES.terms },
  { id: 'refund', label: 'REFUND POLICY', path: ROUTES.refund },
];

// ------------------------------------------------------------
// ABOUT PAGE
// ------------------------------------------------------------
export const ABOUT_PILLARS = [
  {
    id: 'innovation',
    icon: 'sparkles',
    title: 'INNOVATION',
    body:
      'Pravah exists to move ideas out of notebooks and into working form. Every arena is designed to reward original thinking over rehearsed answers.',
  },
  {
    id: 'technology',
    icon: 'cpu',
    title: 'TECHNOLOGY',
    body:
      'From competitive code to embedded systems and applied intelligence, the festival spans the full engineering spectrum taught and built at SKIT.',
  },
  {
    id: 'community',
    icon: 'users',
    title: 'COMMUNITY',
    body:
      'Six days of teams, mentors, judges and volunteers moving as one current — the fest is as much about who you build with as what you build.',
  },
];

// Vision / Mission are official institutional statements — not
// invented here. They render as structured pending blocks.
export const ABOUT_STATEMENTS = [
  {
    id: 'vision',
    label: 'VISION',
    title: 'THE PRAVAH VISION',
    pending: true,
    note: 'The official vision statement for Techno Pravah 2026 will be published here.',
  },
  {
    id: 'mission',
    label: 'MISSION',
    title: 'THE PRAVAH MISSION',
    pending: true,
    note: 'The official mission statement for Techno Pravah 2026 will be published here.',
  },
];

export const WHY_PARTICIPATE = [
  {
    n: '01',
    title: 'COMPETE AT SCALE',
    body: 'Eight arenas spanning software, hardware, security, innovation and e-sports.',
  },
  {
    n: '02',
    title: 'BUILD IN PUBLIC',
    body: 'Demonstrate working prototypes to peers, faculty and visiting professionals.',
  },
  {
    n: '03',
    title: 'LEARN FROM BUILDERS',
    body: 'Workshops and seminars led by technology experts, researchers and industry leaders.',
  },
  {
    n: '04',
    title: 'EARN RECOGNITION',
    body: 'Arena titles and Grand Finale honours on 03 October. Prize details announced soon.',
  },
];

// ------------------------------------------------------------
// SPONSORS PAGE — tier hierarchy, no sponsors invented
// ------------------------------------------------------------
export const SPONSOR_TIERS = [
  { id: 'title', label: 'TITLE PARTNER', slots: 1, accent: 'amber', scale: 1 },
  { id: 'platinum', label: 'PLATINUM PARTNERS', slots: 2, accent: 'cyan', scale: 0.9 },
  { id: 'gold', label: 'GOLD PARTNERS', slots: 3, accent: 'amber', scale: 0.82 },
  { id: 'silver', label: 'SILVER PARTNERS', slots: 4, accent: 'violet', scale: 0.76 },
  { id: 'bronze', label: 'BRONZE PARTNERS', slots: 4, accent: 'magenta', scale: 0.72 },
  { id: 'community', label: 'COMMUNITY PARTNERS', slots: 6, accent: 'cyan', scale: 0.68 },
];

// Sponsor records: { name, tier, logo, website, description }
// Empty until partnerships are officially confirmed.
export const SPONSORS = [];

export const getSponsorsByTier = (tierId) => SPONSORS.filter((s) => s.tier === tierId);

// ------------------------------------------------------------
// RULEBOOK PAGE — structure ready, rules not fabricated
// ------------------------------------------------------------
export const RULEBOOK_SECTIONS = [
  { id: 'general', n: '01', title: 'GENERAL RULES', items: [] },
  { id: 'event', n: '02', title: 'EVENT-SPECIFIC RULES', items: [] },
  { id: 'eligibility', n: '03', title: 'ELIGIBILITY', items: [] },
  { id: 'registration', n: '04', title: 'REGISTRATION GUIDELINES', items: [] },
  { id: 'conduct', n: '05', title: 'CODE OF CONDUCT', items: [] },
  { id: 'judging', n: '06', title: 'JUDGING CRITERIA', items: [] },
  { id: 'disqualification', n: '07', title: 'DISQUALIFICATION', items: [] },
  { id: 'safety', n: '08', title: 'SAFETY & CAMPUS GUIDELINES', items: [] },
  { id: 'support', n: '09', title: 'CONTACT & SUPPORT', items: [] },
];

// Set to a real file path in /public once the official PDF exists.
export const RULEBOOK_FILE = null;

// ------------------------------------------------------------
// TEAM PAGE — groups defined, members not invented
// ------------------------------------------------------------
export const TEAM_GROUPS = [
  { id: 'faculty', label: 'FACULTY COORDINATORS', slots: 4 },
  { id: 'student', label: 'STUDENT COORDINATORS', slots: 6 },
  { id: 'technical', label: 'TECHNICAL TEAM', slots: 6 },
  { id: 'creative', label: 'CREATIVE TEAM', slots: 4 },
  { id: 'volunteers', label: 'VOLUNTEERS', slots: 8 },
];

// Member records: { name, designation, department, role, group, photo, email, linkedin }
export const TEAM_MEMBERS = [];

export const getMembersByGroup = (groupId) => TEAM_MEMBERS.filter((m) => m.group === groupId);

// ------------------------------------------------------------
// GALLERY PAGE
// ------------------------------------------------------------
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'ALL FRAMES' },
  { id: 'technology', label: 'TECHNOLOGY' },
  { id: 'innovation', label: 'INNOVATION' },
  { id: 'competition', label: 'COMPETITION' },
  { id: 'collaboration', label: 'COLLABORATION' },
];

// Media records: { src, alt, category, caption }
// Empty until official festival photography is available.
export const GALLERY_MEDIA = [];

// Placeholder frame distribution per category (visual scaffolding only)
export const GALLERY_PLACEHOLDERS = [
  { category: 'technology', count: 4 },
  { category: 'innovation', count: 3 },
  { category: 'competition', count: 4 },
  { category: 'collaboration', count: 3 },
];

// ------------------------------------------------------------
// WORKSHOPS PAGE — reusable session/speaker scaffolding
// ------------------------------------------------------------
export const WORKSHOP_MODULES = [
  {
    id: 'sessions',
    label: 'EXPERT SESSIONS',
    note: 'Hands-on technical sessions across the festival week.',
  },
  {
    id: 'speakers',
    label: 'SPEAKERS',
    note: 'Technology experts, researchers, entrepreneurs and industry leaders.',
  },
  {
    id: 'schedule',
    label: 'SESSION SCHEDULE',
    note: 'Slot-wise timings released with the detailed festival schedule.',
  },
];

// Session records: { title, speaker, org, track, day, time, venue, seats, level }
export const SESSIONS = [];

// Speaker records: { name, title, org, photo, topic, linkedin }
export const SPEAKERS = [];

// ------------------------------------------------------------
// REGISTRATION PAGE — form blueprint, inactive until official
// ------------------------------------------------------------
export const REGISTRATION_OPEN = false;
export const REGISTRATION_URL = null;

export const REGISTRATION_STEPS = [
  { n: '01', title: 'CHOOSE YOUR ARENA', body: 'Pick from eight event categories across six days.' },
  { n: '02', title: 'ASSEMBLE YOUR TEAM', body: 'Solo or squad — team size rules per event announced soon.' },
  { n: '03', title: 'SUBMIT DETAILS', body: 'Participant and institution details through the official form.' },
  { n: '04', title: 'CONFIRM YOUR SLOT', body: 'Receive confirmation and reporting instructions.' },
];

// Blueprint of the future form. Rendered as a disabled preview so
// the layout is production-ready the moment the form goes live.
export const REGISTRATION_FIELDS = [
  { name: 'fullName', label: 'FULL NAME', type: 'text', span: 1 },
  { name: 'email', label: 'EMAIL ADDRESS', type: 'email', span: 1 },
  { name: 'phone', label: 'PHONE NUMBER', type: 'tel', span: 1 },
  { name: 'college', label: 'COLLEGE / INSTITUTION', type: 'text', span: 1 },
  { name: 'course', label: 'COURSE / BRANCH', type: 'text', span: 1 },
  { name: 'year', label: 'YEAR OF STUDY', type: 'select', span: 1 },
  { name: 'event', label: 'EVENT / ARENA', type: 'select', span: 1 },
  { name: 'team', label: 'TEAM NAME (IF APPLICABLE)', type: 'text', span: 1 },
  { name: 'members', label: 'TEAM MEMBERS', type: 'textarea', span: 2 },
];

// ------------------------------------------------------------
// CONTACT PAGE
// ------------------------------------------------------------
export const COORDINATOR_DESKS = [
  { id: 'general', label: 'FESTIVAL DESK', scope: 'General queries about Techno Pravah 2026.' },
  { id: 'events', label: 'EVENT DESK', scope: 'Arena rules, teams and participation.' },
  { id: 'registration', label: 'REGISTRATION DESK', scope: 'Entry, confirmations and slots.' },
  { id: 'sponsorship', label: 'PARTNERSHIP DESK', scope: 'Sponsorships and collaborations.' },
  { id: 'media', label: 'MEDIA DESK', scope: 'Press, coverage and content requests.' },
  { id: 'campus', label: 'CAMPUS DESK', scope: 'Reporting, access and on-ground support.' },
];

// ------------------------------------------------------------
// LEGAL PAGES — section scaffolding only; no policy text invented
// ------------------------------------------------------------
export const LEGAL_PAGES = {
  privacy: {
    index: '12',
    label: 'PRIVACY POLICY',
    title: ['DATA &', 'PRIVACY.'],
    intro:
      'How participant information is collected, used and protected across the Techno Pravah 2026 platform.',
    sections: [
      'INFORMATION WE COLLECT',
      'HOW INFORMATION IS USED',
      'DATA STORAGE & SECURITY',
      'COOKIES & ANALYTICS',
      'THIRD-PARTY SERVICES',
      'DATA RETENTION',
      'YOUR RIGHTS',
      'POLICY UPDATES',
      'CONTACT',
    ],
  },
  terms: {
    index: '13',
    label: 'TERMS & CONDITIONS',
    title: ['TERMS OF', 'PARTICIPATION.'],
    intro:
      'The conditions governing use of this platform and participation in Techno Pravah 2026.',
    sections: [
      'ACCEPTANCE OF TERMS',
      'ELIGIBILITY',
      'REGISTRATION & ENTRY',
      'PARTICIPANT RESPONSIBILITIES',
      'INTELLECTUAL PROPERTY',
      'MEDIA CONSENT',
      'LIABILITY',
      'CHANGES TO THE FESTIVAL',
      'GOVERNING TERMS',
    ],
  },
  refund: {
    index: '14',
    label: 'REFUND POLICY',
    title: ['REFUNDS &', 'CANCELLATIONS.'],
    intro:
      'Conditions applicable to registration payments, cancellations and refunds for Techno Pravah 2026.',
    sections: [
      'SCOPE OF POLICY',
      'CANCELLATION BY PARTICIPANT',
      'CANCELLATION BY ORGANISERS',
      'REFUND ELIGIBILITY',
      'PROCESSING TIMELINES',
      'NON-REFUNDABLE ITEMS',
      'DISPUTES',
      'CONTACT',
    ],
  },
};
