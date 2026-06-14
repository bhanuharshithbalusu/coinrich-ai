import { Link } from 'react-router-dom';

export default function MarketPerformanceCard({ title = 'Market Performance', items = [], viewAllLink }) {
  return (
    <div
      style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexShrink: 0 }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600 }}>{title}</span>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}
          >
            View full analytics &rsaquo;
          </Link>
        )}
      </div>

      {/* Rows — flex:1 so they fill the card, dividers give visual structure */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderTop: i === 0 ? '1px solid #1F2722' : '1px solid #1A211C',
              padding: '0 4px',
            }}
          >
            {/* Icon circle */}
            <div style={{
              width: 32, height: 32, borderRadius: '8px',
              backgroundColor: '#1A211C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '0.9rem',
            }}>
              {item.icon}
            </div>

            {/* Label */}
            <span style={{
              color: '#8B9890', fontSize: '0.8rem', flex: 1, minWidth: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {item.label}
            </span>

            {/* Value area */}
            {item.progress != null ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <span style={{ color: item.valueColor ?? '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {item.value}
                </span>
                <div style={{ width: 72, height: 6, borderRadius: 3, backgroundColor: '#1F2722', overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, Math.max(0, item.progress))}%`,
                    backgroundColor: '#A8E000',
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            ) : item.change != null ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', flexShrink: 0 }}>
                <span style={{ color: item.valueColor ?? '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {item.value}
                </span>
                <span style={{ color: '#A8E000', fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  ▲ {item.change.toFixed(2)}%
                </span>
              </div>
            ) : (
              <span style={{ color: item.valueColor ?? '#FFFFFF', fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
