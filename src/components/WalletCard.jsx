import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const WALLET_ICONS = {
  metamask: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#F6851B" />
      <path d="M22 6L15.5 11l1.2-2.9L22 6z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6l6.45 5.05L11.3 8.1 6 6z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.75 18.5l-1.73 2.65 3.7 1.02.96-3.61-2.93-.06zM6.27 18.56l.95 3.61 3.7-1.02-1.73-2.65-2.92.06z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.75 13.4l-.93 1.4 3.3.15-.11-3.55-2.26 2zm6.5 0l-2.28-2.05-.08 3.6 3.29-.15-.93-1.4z" fill="#F6851B" stroke="#F6851B" strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.92 21.15l1.98-1-1.71-1.34-.27 2.34zm4.18-1 1.98 1-.27-2.34-1.71 1.34z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  phantom: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#AB9FF2" />
      <path d="M8 14.5C8 10.91 10.91 8 14.5 8H17c2.76 0 5 2.24 5 5s-2.24 5-5 5h-1.2c-.28 0-.5.22-.5.5v2.5c0 .28-.22.5-.5.5H13c-.28 0-.5-.22-.5-.5V19c0-.83-.67-1.5-1.5-1.5H8.5c-.28 0-.5-.22-.5-.5v-2.5z" fill="white"/>
      <circle cx="17" cy="12" r="1.5" fill="#AB9FF2"/>
    </svg>
  ),
  trust: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#3375BB" />
      <path d="M14 6l7 3v5c0 3.87-2.97 7.49-7 8.5C9.97 21.49 7 17.87 7 14V9l7-3z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 14l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  coinbase: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#0052FF" />
      <circle cx="14" cy="14" r="7" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      <rect x="11" y="12" width="6" height="4" rx="1" fill="white"/>
    </svg>
  ),
};

function MiniSparkline({ data = [], color = '#A8E000' }) {
  return (
    <ResponsiveContainer width="100%" height={50}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#spark-${color.replace('#','')})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default function WalletCard({ mode = 'selector', wallet, active, onClick, overview }) {
  const icon = WALLET_ICONS[wallet.id] ?? (
    <div style={{ width: 28, height: 28, borderRadius: 8, background: wallet.color ?? '#2A332D' }} />
  );

  if (mode === 'selector') {
    return (
      <div
        onClick={onClick}
        style={{
          backgroundColor: '#131815',
          border: `1px solid ${active ? '#A8E000' : '#1F2722'}`,
          borderRadius: 12,
          padding: '14px 16px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 0,
          transition: 'border-color 0.15s',
          position: 'relative',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = '#2A3D2A'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = '#1F2722'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {icon}
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>{wallet.name}</div>
              <div style={{ color: '#6B7670', fontSize: '0.72rem', marginTop: 1 }}>{wallet.address}</div>
            </div>
          </div>
          <button
            style={{ background: 'none', border: 'none', color: '#6B7670', cursor: 'pointer', fontSize: '1rem', padding: '0 2px' }}
            onClick={e => e.stopPropagation()}
          >
            ⋮
          </button>
        </div>
        {active && (
          <div style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
            <span style={{
              backgroundColor: '#1A2E14',
              color: '#A8E000',
              fontSize: '0.68rem',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 99,
            }}>Active</span>
          </div>
        )}
      </div>
    );
  }

  // overview mode
  const isPositive = (overview?.change24h ?? 0) >= 0;
  const sparkColor = isPositive ? '#A8E000' : '#E5484D';
  const changeColor = isPositive ? '#A8E000' : '#E5484D';
  const pnlColor = (overview?.totalPnl ?? 0) >= 0 ? '#A8E000' : '#E5484D';

  return (
    <div style={{
      backgroundColor: '#131815',
      border: '1px solid #1F2722',
      borderRadius: 12,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {icon}
        <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600 }}>{wallet.name}</span>
        {wallet.active && (
          <span style={{
            backgroundColor: '#1A2E14', color: '#A8E000',
            fontSize: '0.68rem', fontWeight: 600,
            padding: '2px 8px', borderRadius: 99,
          }}>Active</span>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ color: '#8B9890', fontSize: '0.72rem', marginBottom: 2 }}>Total Value</div>
          <div style={{ color: '#FFFFFF', fontSize: '1.35rem', fontWeight: 700 }}>
            ${overview?.totalValue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div style={{ width: 120, marginBottom: 4 }}>
          <div style={{ color: '#8B9890', fontSize: '0.72rem', marginBottom: 2 }}>24H Performance</div>
          <MiniSparkline data={overview?.history ?? []} color={sparkColor} />
          <div style={{
            display: 'inline-block',
            background: isPositive ? '#1A2E14' : '#2E1414',
            color: sparkColor,
            fontSize: '0.7rem', fontWeight: 700,
            padding: '1px 6px', borderRadius: 4, marginTop: 2,
          }}>
            {isPositive ? '+' : ''}{overview?.change24h?.toFixed(2)}%
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, borderTop: '1px solid #1F2722', paddingTop: 10 }}>
        <div>
          <div style={{ color: '#8B9890', fontSize: '0.7rem' }}>24H Change</div>
          <div style={{ color: changeColor, fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>
            {isPositive ? '+' : ''}{overview?.change24h?.toFixed(2)}%
          </div>
        </div>
        <div>
          <div style={{ color: '#8B9890', fontSize: '0.7rem' }}>Total PnL</div>
          <div style={{ color: pnlColor, fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>
            {(overview?.totalPnl ?? 0) >= 0 ? '+' : ''}${Math.abs(overview?.totalPnl ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}
