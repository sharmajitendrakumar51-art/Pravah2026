import { Handshake } from 'lucide-react';
import ComingSoon from '../components/ComingSoon';
import CtaBand from '../components/CtaBand';
import Marquee from '../components/Marquee';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SponsorCard, { SponsorSlot } from '../components/SponsorCard';
import { FESTIVAL } from '../data/content';
import { getSponsorsByTier, ROUTES, SPONSORS, SPONSOR_TIERS } from '../data/pages';

// Column counts scale with tier prominence — title partner gets the
// widest presentation, community partners the tightest grid.
const COLUMNS = {
  title: 'minmax(0, 1fr)',
  platinum: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
  gold: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
  silver: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
  bronze: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
  community: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
};

export default function SponsorsPage() {
  const hasAnySponsor = SPONSORS.length > 0;

  return (
    <>
      <PageHero
        index="08"
        label="SPONSORS & PARTNERS"
        title={['POWERING', 'THE CURRENT.']}
        accentIndex={1}
        intro={`Partnerships for ${FESTIVAL.name} ${FESTIVAL.edition} are being finalised. Confirmed partners will be presented here by tier.`}
        meta={['06 PARTNERSHIP TIERS', 'PARTNERS COMING SOON']}
        variant="box"
        hue="amber"
        breadcrumb={[{ label: 'HOME', path: ROUTES.home }, { label: 'SPONSORS' }]}
      />

      {/* ---------------------------------------------- STATUS */}
      {!hasAnySponsor && (
        <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="aurora" />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <ComingSoon
              icon={Handshake}
              label="PARTNERSHIPS"
              title="PARTNERS COMING SOON"
              note="No partnership is listed until it is officially confirmed. The tier structure below shows how confirmed partners will be presented."
              size="lg"
              accent="amber"
            />
          </div>
        </section>
      )}

      <Marquee />

      {/* ---------------------------------------------- TIER HIERARCHY */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
        <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="01"
            label="PARTNERSHIP TIERS"
            title={<>THE <span className="grad-text">HIERARCHY</span></>}
            aside="Six tiers, from Title Partner to Community Partners — each with its own presentation scale across the platform."
          />

          <div style={{ display: 'grid', gap: 'clamp(2.6rem, 5vw, 4.5rem)' }}>
            {SPONSOR_TIERS.map((tier, tierIndex) => {
              const sponsors = getSponsorsByTier(tier.id);
              const filled = sponsors.length > 0;

              return (
                <div key={tier.id}>
                  {/* Tier header */}
                  <Reveal>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        paddingBottom: '1.1rem',
                        borderBottom: '1px solid var(--line)',
                        marginBottom: 'clamp(1.2rem, 2.4vw, 2rem)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                        <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.24em', color: 'var(--faint)' }}>
                          T{String(tierIndex + 1).padStart(2, '0')}
                        </span>
                        <h3
                          className="display"
                          style={{
                            fontSize: `clamp(1.05rem, ${1.6 + tier.scale * 1.6}vw, ${1.5 + tier.scale * 1.5}rem)`,
                          }}
                        >
                          {tier.label}
                        </h3>
                      </div>
                      <span className={`chip ${tier.accent === 'amber' ? 'amber' : tier.accent === 'magenta' ? 'magenta' : ''}`}>
                        <span className="dot" />
                        {filled ? `${String(sponsors.length).padStart(2, '0')} CONFIRMED` : 'OPEN'}
                      </span>
                    </div>
                  </Reveal>

                  {/* Tier grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: COLUMNS[tier.id] ?? COLUMNS.gold,
                      gap: 'clamp(0.9rem, 1.6vw, 1.4rem)',
                      maxWidth: tier.id === 'title' ? 720 : 'none',
                      margin: tier.id === 'title' ? '0 auto' : undefined,
                    }}
                  >
                    {filled
                      ? sponsors.map((sponsor) => (
                          <SponsorCard key={sponsor.name} sponsor={sponsor} scale={tier.scale} accent={tier.accent} />
                        ))
                      : Array.from({ length: tier.slots }).map((_, i) => (
                          <SponsorSlot key={i} i={i} scale={tier.scale} accent={tier.accent} />
                        ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- BECOME A PARTNER */}
      <section className="section hairline-t" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="aurora" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            index="02"
            label="BECOME A PARTNER"
            title={<>PARTNER WITH <span className="outline-text">PRAVAH</span></>}
            aside="Reach a campus-wide audience of engineers across four days and eight arenas."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.1rem, 2vw, 1.7rem)',
            }}
          >
            <ComingSoon
              icon={Handshake}
              label="PARTNERSHIP DECK"
              title="DECK COMING SOON"
              note="The official sponsorship deck with tier benefits and deliverables will be published here."
              accent="cyan"
            />
            <ComingSoon
              label="PARTNERSHIP DESK"
              title="CONTACT COMING SOON"
              note="Direct contact details for the partnership desk are released with the official contact registry."
              accent="violet"
            />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="ALIGN WITH INNOVATION"
        title={['BACK THE', 'BUILDERS.']}
        body="Partnership enquiries route through the official Tech Pravah 2026 contact channels."
        primary={{ label: 'CONTACT US', to: ROUTES.contact }}
        secondary={{ label: 'ABOUT PRAVAH', to: ROUTES.about }}
      />
    </>
  );
}
