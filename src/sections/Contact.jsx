import { motion } from 'framer-motion';
import { Handshake, Mail, Ticket } from 'lucide-react';
import Reveal, { WordsReveal } from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { CONTACT_CHANNELS, FESTIVAL } from '../data/content';

const ICONS = {
  mail: Mail,
  ticket: Ticket,
  handshake: Handshake,
};

function ChannelCard({ channel, i }) {
  const Icon = ICONS[channel.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: i * 0.11, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.4)' }}
      className="glass"
      data-cursor
      style={{
        padding: 'clamp(1.7rem, 2.8vw, 2.5rem)',
        transition: 'border-color 0.4s',
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 16,
          border: '1px solid var(--line-strong)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--cyan)',
          background: 'rgba(34,211,238,0.06)',
          marginBottom: '1.6rem',
        }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <p className="display" style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.45rem)' }}>{channel.title}</p>
      <p style={{ color: 'var(--muted)', marginTop: '0.6rem', fontSize: 'clamp(0.88rem, 1.05vw, 0.98rem)', lineHeight: 1.7 }}>
        {channel.desc}
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <span className="chip amber"><span className="dot" /> CONTACT DETAILS COMING SOON</span>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section hairline-t" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-2)' }}>
      <div className="aurora" style={{ transform: 'rotate(180deg)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeader
          index="09"
          label="CONTACT"
          aside="Direct lines to the Pravah control room open soon. Until then, keep your signals tuned."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
        >
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(2.6rem, 7vw, 6.4rem)' }}>
              <WordsReveal text="GET IN" />
              <br />
              <span className="grad-text"><WordsReveal text="TOUCH." delay={0.1} /></span>
            </h2>
            <Reveal delay={0.2}>
              <p style={{ color: 'var(--muted)', marginTop: '1.8rem', maxWidth: '44ch', lineHeight: 1.8, fontSize: 'clamp(0.95rem, 1.25vw, 1.08rem)' }}>
                {FESTIVAL.hostFull}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mono" style={{ marginTop: '1.6rem', fontSize: '0.68rem', letterSpacing: '0.3em', color: 'var(--faint)', textTransform: 'uppercase', lineHeight: 2.2 }}>
                {FESTIVAL.dates}
                <br />
                {FESTIVAL.tagline.join(' ')}
              </p>
            </Reveal>
          </div>

          <div
            style={{
              display: 'grid',
              gap: 'clamp(1rem, 1.8vw, 1.5rem)',
            }}
          >
            {CONTACT_CHANNELS.map((channel, i) => (
              <ChannelCard key={channel.title} channel={channel} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
