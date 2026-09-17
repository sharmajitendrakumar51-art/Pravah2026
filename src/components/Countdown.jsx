import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Reveal from './Reveal';
import { FESTIVAL } from '../data/content';
import './Countdown.css';

// ============================================================
// EVENT COUNTDOWN — live T-minus to the festival kickoff.
// Self-contained and namespaced (`techpravah-countdown__*`) so it
// cannot collide with the rest of the stylesheet.
//
// Timezone: the target instants come from data/content.js as ISO
// strings carrying the explicit +05:30 (Asia/Kolkata) offset, so the
// remaining time is identical for every visitor regardless of their
// local browser timezone.
// ============================================================

const UNITS = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'minutes', label: 'MINUTES' },
  { key: 'seconds', label: 'SECONDS' },
];

const pad = (n) => String(n).padStart(2, '0');

function readState(startMs, endMs) {
  const now = Date.now();

  if (now >= endMs) return { phase: 'ended' };
  if (now >= startMs) return { phase: 'live' };

  // Clamped by the phase checks above — never negative.
  const remaining = Math.floor((startMs - now) / 1000);

  return {
    phase: 'before',
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  };
}

export default function Countdown() {
  const startMs = new Date(FESTIVAL.startsAt).getTime();
  const endMs = new Date(FESTIVAL.endsAt).getTime();

  const [state, setState] = useState(() => readState(startMs, endMs));

  useEffect(() => {
    const id = setInterval(() => setState(readState(startMs, endMs)), 1000);
    return () => clearInterval(id);
  }, [startMs, endMs]);

  const heading =
    state.phase === 'before'
      ? `T-MINUS TO ${FESTIVAL.name}`
      : state.phase === 'live'
        ? 'FESTIVAL LIVE NOW'
        : 'FESTIVAL CONCLUDED';

  return (
    <section className="techpravah-countdown" aria-label="Event countdown">
      <div className="aurora" />
      <div className="container techpravah-countdown__inner">
        <div className="techpravah-countdown__header">
          <h2 className="techpravah-countdown__title">{heading}</h2>
          <span className="techpravah-countdown__date">
            <Clock size={13} />
            {FESTIVAL.kickoffLabel}
          </span>
        </div>

        {state.phase === 'before' ? (
          <Reveal delay={0.05}>
            <div className="techpravah-countdown__grid" role="timer" aria-live="off">
              {UNITS.map(({ key, label }) => (
                <div key={key} className="techpravah-countdown__card">
                  {/* Re-keying on the value restarts the tick animation. */}
                  <span key={state[key]} className="techpravah-countdown__value">
                    {pad(state[key])}
                  </span>
                  <span className="techpravah-countdown__label">{label}</span>
                </div>
              ))}
            </div>
            <span
              style={{
                position: 'absolute',
                width: 1,
                height: 1,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                whiteSpace: 'nowrap',
              }}
            >
              {`${state.days} days, ${state.hours} hours, ${state.minutes} minutes remaining until ${FESTIVAL.name} ${FESTIVAL.edition}.`}
            </span>
          </Reveal>
        ) : (
          <Reveal delay={0.05}>
            <div className="techpravah-countdown__state">
              <h3 className="techpravah-countdown__state-heading">
                {state.phase === 'live' ? (
                  <>
                    {FESTIVAL.name} IS <span className="grad-text">LIVE</span>
                  </>
                ) : (
                  <>
                    {FESTIVAL.name} {FESTIVAL.edition} HAS{' '}
                    <span className="grad-text">CONCLUDED</span>
                  </>
                )}
              </h3>
              <p className="techpravah-countdown__state-note">
                {state.phase === 'live' ? (
                  <>
                    <span className="techpravah-countdown__pulse" style={{ display: 'inline-block', marginRight: '0.6rem' }} />
                    {FESTIVAL.datesShort} — {FESTIVAL.host}
                  </>
                ) : (
                  `${FESTIVAL.datesShort} — ${FESTIVAL.host}`
                )}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
