import { motion } from 'framer-motion';

// ============================================================
// FILTER TABS — shared pill filter row (events, gallery, team).
// Animated active indicator using a shared layoutId.
// ============================================================
export default function FilterTabs({ options, value, onChange, layoutId = 'tab-indicator', align = 'left' }) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {options.map((opt, i) => {
        const active = opt.id === value;
        return (
          <motion.button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mono"
            style={{
              position: 'relative',
              padding: '0.66rem 1.25rem',
              borderRadius: 999,
              border: `1px solid ${active ? 'transparent' : 'var(--line)'}`,
              fontSize: '0.64rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: active ? '#05060a' : 'var(--muted)',
              transition: 'color 0.35s, border-color 0.35s',
              overflow: 'hidden',
            }}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  background: 'var(--grad)',
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 2 }}>
              {opt.label}
              {typeof opt.count === 'number' && (
                <span style={{ opacity: 0.65, marginLeft: '0.55rem' }}>{String(opt.count).padStart(2, '0')}</span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
