import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, List, Search } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import EventCard from '../components/EventCard';
import FilterTabs from '../components/FilterTabs';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { EVENTS, EVENT_FILTERS, filterEvents } from '../data/events';
import { ROUTES } from '../data/pages';

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid');

  // Filter + search architecture is live now so real events slot in
  // without any further wiring.
  const results = useMemo(() => {
    const base = filterEvents(filter);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.blurb.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [filter, query]);

  const filterOptions = useMemo(
    () =>
      EVENT_FILTERS.map((f) => ({
        ...f,
        count: f.id === 'all' ? EVENTS.length : filterEvents(f.id).length,
      })),
    []
  );

  return (
    <>
      <PageHero
        index="02"
        label="EVENT CATEGORIES"
        title={['EIGHT', 'ARENAS.']}
        accentIndex={1}
        intro="Eight battlegrounds of engineering across four days. Pick your current — individual event listings, rules and registrations unlock as they are released."
        meta={['08 ARENAS', '04 DAYS', 'LISTINGS COMING SOON']}
        variant="octa"
        hue="violet"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'EVENTS' }]}
      />

      {/* ---------------------------------------------- DISCOVERY */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.4rem',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <FilterTabs options={filterOptions} value={filter} onChange={setFilter} layoutId="event-filter" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              {/* Search */}
              <label
                className="search-field"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.62rem 1.1rem',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'rgba(10,13,24,0.5)',
                  transition: 'border-color 0.4s',
                }}
              >
                <Search size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH ARENAS"
                  className="mono"
                  style={{
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--ink)',
                    fontSize: '0.64rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    width: 'clamp(110px, 18vw, 170px)',
                  }}
                />
              </label>

              {/* View toggle */}
              <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 999, overflow: 'hidden' }}>
                {[
                  { id: 'grid', Icon: LayoutGrid },
                  { id: 'list', Icon: List },
                ].map(({ id, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setView(id)}
                    aria-label={`${id} view`}
                    style={{
                      width: 42,
                      height: 40,
                      display: 'grid',
                      placeItems: 'center',
                      color: view === id ? '#05060a' : 'var(--muted)',
                      background: view === id ? 'var(--ink)' : 'transparent',
                      transition: 'all 0.35s',
                    }}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result count */}
          <Reveal>
            <p className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.26em', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: '1.6rem' }}>
              SHOWING {String(results.length).padStart(2, '0')} / {String(EVENTS.length).padStart(2, '0')} ARENAS
            </p>
          </Reveal>

          {/* Grid */}
          {results.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns:
                  view === 'grid'
                    ? 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))'
                    : 'minmax(0, 1fr)',
                gap: 'clamp(1rem, 1.8vw, 1.5rem)',
              }}
            >
              <AnimatePresence mode="popLayout">
                {results.map((event, i) => (
                  <EventCard key={event.id} event={event} i={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <ComingSoon
              icon={Search}
              label="NO MATCHES"
              title="NOTHING IN THIS CURRENT"
              note="No arena matches that search yet. Clear the filters to see all eight categories."
              accent="violet"
            />
          )}
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- CATALOG STATUS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="03"
            label="EVENT CATALOG"
            title={<>INDIVIDUAL <span className="grad-text">EVENTS</span></>}
            aside="Each arena will expand into its own set of events with rules, formats, team sizes and prizes."
          />
          <ComingSoon
            label="FULL CATALOG"
            title="EVENT LISTINGS COMING SOON"
            note="Event names, formats, timings, venues and prize details are released by the organising committee closer to the festival. Every arena page is already live and will populate automatically."
            size="lg"
          />
        </div>
      </section>

      <CtaBand
        eyebrow="PICK YOUR ARENA"
        title={['READY TO', 'COMPETE?']}
        body="Registration opens soon. Explore the four-day schedule while the catalog is finalised."
        primary={{ label: 'REGISTER NOW', to: ROUTES.register }}
        secondary={{ label: 'VIEW SCHEDULE', to: ROUTES.schedule }}
      />

      <style>{`
        .search-field:focus-within { border-color: var(--cyan) !important; }
        .search-field input::placeholder { color: var(--faint); }
      `}</style>
    </>
  );
}
