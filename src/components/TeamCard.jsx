import { motion } from 'framer-motion';
import { Hexagon, Linkedin, Mail } from 'lucide-react';

// ============================================================
// TEAM CARD — reusable organising-team card.
// Supports photo, name, designation, department, role and contact
// links, rendering only the fields that exist on the record.
// The placeholder variant holds the grid without inventing a person.
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

export default function TeamCard({ member, i = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ delay: Math.min((i % 6) * 0.06, 0.35), duration: 0.85, ease: EASE }}
      whileHover={{ y: -6 }}
      data-cursor
      className="team-card"
      style={{
        position: 'relative',
        borderRadius: 20,
        border: '1px solid var(--line)',
        background: 'linear-gradient(170deg, rgba(17,21,38,0.72), rgba(8,10,18,0.9))',
        overflow: 'hidden',
        transition: 'border-color 0.45s',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '3 / 4', background: 'rgba(8,10,18,0.65)', overflow: 'hidden' }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="team-photo"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
        ) : (
          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <Hexagon size={64} strokeWidth={0.8} style={{ color: i % 2 ? '#8b5cf6' : '#22d3ee', opacity: 0.5 }} />
          </span>
        )}

        {member.role && (
          <span
            className="chip"
            style={{ position: 'absolute', bottom: 12, left: 12, fontSize: '0.5rem', padding: '0.24rem 0.6rem' }}
          >
            {member.role}
          </span>
        )}
      </div>

      {/* Identity */}
      <div style={{ padding: '1.1rem 1.2rem 1.4rem' }}>
        <p className="display" style={{ fontSize: '1rem', lineHeight: 1.3 }}>{member.name}</p>

        {member.designation && (
          <p className="mono" style={{ fontSize: '0.56rem', letterSpacing: '0.2em', color: 'var(--cyan)', marginTop: '0.5rem', textTransform: 'uppercase' }}>
            {member.designation}
          </p>
        )}

        {member.department && (
          <p style={{ color: 'var(--muted)', fontSize: '0.84rem', marginTop: '0.45rem' }}>{member.department}</p>
        )}

        {(member.email || member.linkedin) && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: '1px solid var(--line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--muted)',
                }}
              >
                <Mail size={13} />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: '1px solid var(--line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--muted)',
                }}
              >
                <Linkedin size={13} />
              </a>
            )}
          </div>
        )}
      </div>

      <style>{`
        .team-card:hover { border-color: rgba(34,211,238,0.4); }
        .team-card:hover .team-photo { transform: scale(1.05); }
      `}</style>
    </motion.article>
  );
}

// ---------------------------------------------- PLACEHOLDER
export function TeamCardPlaceholder({ i = 0, label = 'DETAILS COMING SOON' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: Math.min((i % 6) * 0.055, 0.34), duration: 0.8, ease: EASE }}
      whileHover={{ y: -5 }}
      data-cursor
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 20,
        border: '1px dashed var(--line-strong)',
        background: 'linear-gradient(170deg, rgba(17,21,38,0.55), rgba(8,10,18,0.88))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.1rem',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 26 + i * 2, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'grid', placeItems: 'center', opacity: 0.45 }}
        >
          <Hexagon size={78} strokeWidth={0.8} style={{ color: i % 2 ? '#8b5cf6' : '#22d3ee' }} />
        </motion.span>
        <span className="display" style={{ position: 'absolute', fontSize: '1.6rem', color: 'rgba(226,232,255,0.22)' }}>
          ?
        </span>
      </div>

      <span className="mono" style={{ position: 'absolute', top: 12, right: 14, fontSize: '0.54rem', letterSpacing: '0.22em', color: 'var(--faint)' }}>
        {String(i + 1).padStart(2, '0')}
      </span>

      <span className="chip" style={{ position: 'relative', zIndex: 2, fontSize: '0.5rem', padding: '0.24rem 0.6rem' }}>
        <span className="dot" />
        {label}
      </span>
    </motion.div>
  );
}
