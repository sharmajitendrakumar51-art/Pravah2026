import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarClock, MapPin } from 'lucide-react';
import Reveal from '../components/Reveal';
import { SCHEDULE } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function DayCard({ day, isLast }) {
  return (
    <div
      className="day-card"
      style={{
        position: 'relative',
        width: 'clamp(300px, 34vw, 460px)',
        flexShrink: 0,
        padding: 'clamp(1.6rem, 2.6vw, 2.6rem)',
        border: '1px solid var(--line)',
        borderRadius: 24,
        background: 'linear-gradient(165deg, rgba(17,21,38,0.7), rgba(8,10,18,0.85))',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.5s, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s',
        overflow: 'hidden',
      }}
      data-cursor
    >
      {/* top gradient hairline */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--grad)',
          opacity: 0.85,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'clamp(1.6rem, 3vw, 2.6rem)',
        }}
      >
        <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.3em', color: 'var(--muted)' }}>
          {day.day}
        </span>
        <span className="chip" style={{ fontSize: '0.56rem' }}>
          <span className="dot" />
          {day.status}
        </span>
      </div>

      <p className="display" style={{ fontSize: 'clamp(2.6rem, 4.6vw, 4.4rem)' }}>
        <span className="grad-text">{day.date}</span>
      </p>
      <p className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.34em', color: 'var(--cyan)', marginTop: '0.4rem' }}>
        {day.weekday}
      </p>

      <p className="display" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)', marginTop: 'clamp(1.4rem, 2.4vw, 2.2rem)', lineHeight: 1.2 }}>
        {day.title}
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 'clamp(0.88rem, 1.05vw, 0.98rem)', marginTop: '0.8rem', lineHeight: 1.7 }}>
        {day.note}
      </p>

      <div style={{ display: 'flex', gap: '1.2rem', marginTop: 'clamp(1.4rem, 2.2vw, 2rem)', flexWrap: 'wrap' }}>
        <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--faint)' }}>
          <CalendarClock size={12} /> TIMINGS TBA
        </span>
        <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--faint)' }}>
          <MapPin size={12} /> VENUE TBA
        </span>
      </div>
    </div>
  );
}

export default function Schedule() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: pinned horizontal journey through the six days.
    mm.add('(min-width: 861px)', () => {
      const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Refresh triggers once fonts/layout settle.
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      mm.revert();
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="hairline-t"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}
    >
      <div className="aurora" />
      <div
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBlock: 'clamp(5rem, 9vh, 7rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div className="container">
          <Reveal>
            <span className="label">03 / SCHEDULE</span>
          </Reveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.6rem',
              marginTop: '1.6rem',
              marginBottom: 'clamp(2.4rem, 5vh, 4rem)',
            }}
          >
            <Reveal delay={0.08}>
              <h2 className="display" style={{ fontSize: 'clamp(2.4rem, 6.4vw, 5.6rem)' }}>
                SIX DAYS <span className="outline-text">OF FLOW</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mono" style={{ fontSize: '0.7rem', letterSpacing: '0.26em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                28 SEP — 03 OCT 2026 // KEEP SCROLLING
              </p>
            </Reveal>
          </div>
        </div>

        {/* Horizontal track (desktop) / vertical stack (mobile) */}
        <div className="container" style={{ overflow: 'visible' }}>
          <div
            ref={trackRef}
            className="schedule-track"
            style={{
              display: 'flex',
              gap: 'clamp(1.2rem, 2vw, 2rem)',
              willChange: 'transform',
            }}
          >
            {SCHEDULE.map((day, i) => (
              <div key={day.day} style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}>
                <DayCard day={day} isLast={i === SCHEDULE.length - 1} />
                {/* connector */}
                {i < SCHEDULE.length - 1 && (
                  <span
                    className="schedule-connector"
                    style={{
                      alignSelf: 'center',
                      width: 'clamp(1.6rem, 4vw, 4rem)',
                      height: 1,
                      background: 'linear-gradient(90deg, var(--cyan), transparent)',
                      flexShrink: 0,
                      marginInline: 'clamp(0.2rem, 0.8vw, 0.8rem)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* progress rail (desktop) */}
          <div
            className="schedule-rail"
            style={{
              marginTop: 'clamp(2.4rem, 5vh, 3.6rem)',
              height: 2,
              background: 'var(--line)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressRef}
              style={{ height: '100%', background: 'var(--grad)', transform: 'scaleX(0)', transformOrigin: '0 50%' }}
            />
          </div>
        </div>
      </div>

      {/* responsive behaviour */}
      <style>{`
        @media (max-width: 860px) {
          .schedule-track { flex-direction: column !important; }
          .day-card { width: 100% !important; }
          .schedule-connector {
            width: 1px !important;
            height: 3rem !important;
            margin: 0 auto !important;
            background: linear-gradient(180deg, var(--cyan), transparent) !important;
          }
          .schedule-rail { display: none; }
        }
      `}</style>
    </section>
  );
}
