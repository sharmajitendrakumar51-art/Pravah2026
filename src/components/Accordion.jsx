import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

// ============================================================
// ACCORDION — used for rulebook sections and event FAQs.
// Items with no content render an inline COMING SOON state
// rather than an empty panel.
// ============================================================
export default function Accordion({ items, pendingLabel = 'CONTENT COMING SOON' }) {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ borderTop: '1px solid var(--line)' }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const hasContent = Boolean(item.body) || (item.items?.length ?? 0) > 0;

        return (
          <div key={item.id ?? i} style={{ borderBottom: '1px solid var(--line)' }}>
            <motion.button
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.9rem, 2vw, 1.8rem)',
                padding: 'clamp(1.2rem, 2.4vw, 1.9rem) 0',
                textAlign: 'left',
              }}
            >
              {item.n && (
                <span className="mono" style={{ fontSize: '0.66rem', letterSpacing: '0.2em', color: isOpen ? 'var(--cyan)' : 'var(--faint)', transition: 'color 0.35s', flexShrink: 0 }}>
                  {item.n}
                </span>
              )}

              <span
                className="display"
                style={{
                  flex: 1,
                  fontSize: 'clamp(0.98rem, 2vw, 1.5rem)',
                  color: isOpen ? 'var(--cyan)' : 'var(--ink)',
                  transition: 'color 0.35s, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  transform: isOpen ? 'translateX(8px)' : 'none',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </span>

              {!hasContent && (
                <span
                  className="mono pending-tag"
                  style={{ fontSize: '0.56rem', letterSpacing: '0.24em', color: 'var(--faint)', flexShrink: 0 }}
                >
                  PENDING
                </span>
              )}

              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  border: '1px solid var(--line-strong)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  color: isOpen ? '#05060a' : 'var(--muted)',
                  background: isOpen ? 'var(--ink)' : 'transparent',
                  transform: isOpen ? 'rotate(135deg)' : 'none',
                  transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <Plus size={15} />
              </span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      paddingBottom: 'clamp(1.4rem, 3vw, 2.2rem)',
                      paddingLeft: item.n ? 'clamp(1.8rem, 4vw, 3.4rem)' : 0,
                      maxWidth: '72ch',
                    }}
                  >
                    {hasContent ? (
                      <>
                        {item.body && (
                          <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: 'clamp(0.9rem, 1.15vw, 1.02rem)' }}>
                            {item.body}
                          </p>
                        )}
                        {item.items?.length > 0 && (
                          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem', marginTop: item.body ? '1.1rem' : 0 }}>
                            {item.items.map((point, k) => (
                              <li
                                key={k}
                                style={{
                                  display: 'flex',
                                  gap: '0.9rem',
                                  color: 'var(--muted)',
                                  lineHeight: 1.75,
                                  fontSize: 'clamp(0.88rem, 1.1vw, 1rem)',
                                }}
                              >
                                <span className="mono" style={{ color: 'var(--cyan)', fontSize: '0.66rem', paddingTop: '0.25rem' }}>
                                  {String(k + 1).padStart(2, '0')}
                                </span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          padding: '1.2rem 1.4rem',
                          border: '1px dashed var(--line-strong)',
                          borderRadius: 14,
                          background: 'rgba(10,13,24,0.4)',
                        }}
                      >
                        <span className="chip amber">
                          <span className="dot" />
                          {pendingLabel}
                        </span>
                        <span style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                          {item.note ?? 'Official details will be published here once released by the organising committee.'}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 560px) {
          .pending-tag { display: none; }
        }
      `}</style>
    </div>
  );
}
