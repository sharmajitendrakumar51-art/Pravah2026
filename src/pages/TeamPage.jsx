import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Users } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import FilterTabs from '../components/FilterTabs';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TeamCard, { TeamCardPlaceholder } from '../components/TeamCard';
import { FESTIVAL } from '../data/content';
import { getMembersByGroup, ROUTES, TEAM_GROUPS } from '../data/pages';

export default function TeamPage() {
  const [group, setGroup] = useState(TEAM_GROUPS[0].id);
  const activeGroup = TEAM_GROUPS.find((g) => g.id === group) ?? TEAM_GROUPS[0];
  const members = getMembersByGroup(group);
  const hasMembers = members.length > 0;

  const options = TEAM_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    count: getMembersByGroup(g.id).length || undefined,
  }));

  return (
    <>
      <PageHero
        index="07"
        label="ORGANIZING TEAM"
        title={['THE MINDS BEHIND', 'THE MACHINE.']}
        titleFont="Bleeding_Cowboys, sans-serif"
        accentIndex={1}
        intro="Faculty coordinators, student leads, technical crews, creative teams and volunteers keep the current running. Official names and roles are published by the organising committee."
        meta={['05 DIVISIONS', 'DETAILS COMING SOON']}
        variant="sphere"
        hue="cyan"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'TEAM' }]}
      />

      {/* ---------------------------------------------- DIVISIONS */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="TEAM DIVISIONS"
            title={<>FIVE <span className="grad-text">CREWS</span></>}
            aside="Select a division to see its roster. Cards populate automatically once member details are released."
          />

          <div style={{ marginBottom: 'clamp(1.8rem, 3.4vw, 2.6rem)' }}>
            <FilterTabs options={options} value={group} onChange={setGroup} layoutId="team-filter" />
          </div>

          {/* Active division header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  paddingBottom: '1.4rem',
                  borderBottom: '1px solid var(--line)',
                  marginBottom: 'clamp(1.6rem, 3vw, 2.4rem)',
                }}
              >
                <h3 className="display" style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}>
                  {activeGroup.label}
                </h3>
                <span className="chip">
                  <span className="dot" />
                  {hasMembers
                    ? `${String(members.length).padStart(2, '0')} MEMBERS`
                    : 'DETAILS COMING SOON'}
                </span>
              </div>

              {/* Roster */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                  gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
                }}
              >
                {hasMembers
                  ? members.map((m, i) => <TeamCard key={m.name} member={m} i={i} />)
                  : Array.from({ length: activeGroup.slots }).map((_, i) => (
                      <TeamCardPlaceholder key={i} i={i} />
                    ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------- ROSTER STATUS */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="CORE COMMITTEE"
            title="THE FULL ROSTER"
            aside="Names, designations, departments and contact routes for every division."
          />
          <ComingSoon
            icon={Users}
            label="ORGANIZING TEAM"
            title="DETAILS COMING SOON"
            note={`The organising committee for ${FESTIVAL.name} ${FESTIVAL.edition} will be published here with roles and contact routes for each division.`}
            size="lg"
          />

          <Reveal delay={0.1}>
            <p className="mono" style={{ marginTop: 'clamp(1.8rem, 3vw, 2.6rem)', fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase' }}>
              CORE COMMITTEE & COORDINATORS — COMING SOON
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="BUILD WITH US"
        title={['JOIN THE', 'CREW.']}
        body="Volunteer and coordinator openings are announced alongside registration."
        primary={{ label: 'REGISTER NOW', to: ROUTES.register }}
        secondary={{ label: 'CONTACT US', to: ROUTES.contact }}
      />
    </>
  );
}
