import { useState } from 'react';

const TABS = ['Chat', 'Insights', 'Analysis', 'Alerts'];

const QUICK_ACTIONS = [
  { icon: '📊', label: 'Analyze my portfolio' },
  { icon: '⚠️', label: 'Risk analysis' },
  { icon: '🔄', label: 'Rebalancing ideas' },
  { icon: '📈', label: 'Top gainers in my portfolio' },
];

function QuickChip({ icon, label }) {
  return (
    <button
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '7px 10px', borderRadius: '8px', width: '100%',
        border: '1px solid #1F2722', background: '#0E1310',
        color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 500,
        cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.12s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#A8E000'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1F2722'; }}
    >
      <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ lineHeight: 1.3 }}>{label}</span>
    </button>
  );
}

// Tiny donut thumbnail using SVG
function MiniDonut() {
  // BTC 51.7%, ETH 22.7%, SOL 9.9%, rest ~15.7%
  const r = 14; const cx = 20; const cy = 20;
  const circ = 2 * Math.PI * r;
  const segments = [
    { pct: 0.517, color: '#A8E000', offset: 0 },
    { pct: 0.227, color: '#4A9EFF', offset: 0.517 },
    { pct: 0.099, color: '#8B5CF6', offset: 0.744 },
    { pct: 0.157, color: '#6B7670', offset: 0.843 },
  ];
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1F2722" strokeWidth="5" />
      {segments.map((s, i) => (
        <circle
          key={i} cx={cx} cy={cy} r={r}
          fill="none" stroke={s.color} strokeWidth="5"
          strokeDasharray={`${s.pct * circ} ${circ}`}
          strokeDashoffset={-(s.offset * circ - circ / 4)}
        />
      ))}
    </svg>
  );
}

export default function AIAssistantPanel({ context = {}, onClose }) {
  const [activeTab, setActiveTab] = useState('Chat');
  const [input, setInput] = useState('');

  return (
    <div style={{
      width: 340, backgroundColor: '#131815', border: '1px solid #1F2722',
      borderRadius: '12px', display: 'flex', flexDirection: 'column',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)', overflow: 'hidden', flexShrink: 0,
    }}>

      {/* Header */}
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid #1F2722',
        display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
      }}>
        <span style={{ fontSize: '1rem' }}>📊</span>
        <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', flex: 1 }}>
          Coin Rich AI Assistant
        </span>
        <span style={{
          background: '#1A2E14', color: '#A8E000', fontSize: '0.58rem',
          fontWeight: 700, padding: '2px 5px', borderRadius: '4px', letterSpacing: '0.06em',
        }}>BETA</span>
        <button
          style={{ background: 'none', border: 'none', color: '#8B9890', cursor: 'pointer', fontSize: '1.1rem', padding: '0 2px', lineHeight: 1 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8B9890'; }}
        >−</button>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#8B9890', cursor: 'pointer', fontSize: '1.1rem', padding: '0 2px', lineHeight: 1 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8B9890'; }}
        >×</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1F2722', flexShrink: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, padding: '9px 4px', background: 'transparent', border: 'none',
              borderBottom: activeTab === tab ? '2px solid #A8E000' : '2px solid transparent',
              color: activeTab === tab ? '#A8E000' : '#8B9890',
              fontSize: '0.75rem', fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer', transition: 'color 0.12s', position: 'relative',
            }}
          >
            {tab}
            {tab === 'Alerts' && (
              <span style={{
                marginLeft: '3px', background: '#A8E000', color: '#0A0E0C',
                fontSize: '0.58rem', fontWeight: 700, borderRadius: '50%',
                width: 14, height: 14, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle',
              }}>2</span>
            )}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Portfolio Context card */}
        <div style={{ background: '#0E1310', borderRadius: '8px', padding: '12px', border: '1px solid #1F2722' }}>
          <div style={{ color: '#8B9890', fontSize: '0.68rem', fontWeight: 500, marginBottom: '8px' }}>
            Portfolio Context
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              <div>
                <div style={{ color: '#8B9890', fontSize: '0.6rem', marginBottom: '2px' }}>Total Value</div>
                <div style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700 }}>
                  ${(context.totalValue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div style={{ color: '#8B9890', fontSize: '0.6rem', marginBottom: '2px' }}>24h PnL</div>
                <div style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 700 }}>
                  +${(context.pnl24h ?? 0).toFixed(2)}
                </div>
                <div style={{ color: '#A8E000', fontSize: '0.6rem' }}>
                  (+{(context.pnl24hPercent ?? 0).toFixed(2)}%)
                </div>
              </div>
              <div>
                <div style={{ color: '#8B9890', fontSize: '0.6rem', marginBottom: '2px' }}>Holdings</div>
                <div style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700 }}>
                  {context.holdingsCount ?? 0} Assets
                </div>
              </div>
            </div>
            <MiniDonut />
          </div>
        </div>

        {/* Chat bubble */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{
            background: '#0E1310', borderRadius: '8px', padding: '12px',
            border: '1px solid #1A211C',
          }}>
            <p style={{ color: '#FFFFFF', fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>
              👋 Hi John! I've analyzed your portfolio.
              <br /><br />
              Your portfolio is up{' '}
              <span style={{ color: '#A8E000', fontWeight: 600 }}>+17.02%</span> overall.
              Bitcoin dominates your allocation (51.7%).
              <br /><br />
              Would you like me to run a risk analysis or suggest rebalancing ideas?
            </p>
          </div>
          <span style={{ color: '#6B7670', fontSize: '0.63rem', textAlign: 'right' }}>11:38 AM</span>
        </div>

        {/* Quick actions 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {QUICK_ACTIONS.map(a => (
            <QuickChip key={a.label} icon={a.icon} label={a.label} />
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div style={{ borderTop: '1px solid #1F2722', padding: '12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about your portfolio..."
            style={{
              flex: 1, background: '#0E1310', border: '1px solid #1F2722',
              borderRadius: '8px', padding: '8px 12px', color: '#FFFFFF',
              fontSize: '0.75rem', outline: 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#2A332D'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1F2722'; }}
          />
          <button style={{
            width: 32, height: 32, borderRadius: '8px', background: '#A8E000',
            border: 'none', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: '#0A0E0C', fontSize: '0.85rem', fontWeight: 700 }}>▶</span>
          </button>
        </div>
        <p style={{ color: '#6B7670', fontSize: '0.62rem', margin: '6px 0 0', textAlign: 'center' }}>
          AI-generated insights. Not financial advice.
        </p>
      </div>
    </div>
  );
}
