const ACTIVITY_ICONS = {
  Deposit: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#1A2E14"/>
      <path d="M10 5v7M7 9l3 3 3-3" stroke="#A8E000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14h8" stroke="#A8E000" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Transfer: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#1A211C"/>
      <path d="M6 8h8M11 5l3 3-3 3M14 12H6M9 9l-3 3 3 3" stroke="#8B9890" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Swap: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#2A1A3E"/>
      <path d="M6 7h8M11 4l3 3-3 3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 13H6M9 10l-3 3 3 3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Withdrawal: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#2E1414"/>
      <path d="M10 15V8M7 11l3-3 3 3" stroke="#E5484D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6h8" stroke="#E5484D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export default function ActivityFeed({ items = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => {
        const lines = item.amount.split('\n');
        const isSwap = item.amountType === 'swap';
        return (
          <div
            key={item.id ?? i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: i < items.length - 1 ? '1px solid #1A211C' : 'none',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flexShrink: 0 }}>
                {ACTIVITY_ICONS[item.type] ?? ACTIVITY_ICONS.Transfer}
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>{item.type}</div>
                <div style={{ color: '#6B7670', fontSize: '0.72rem', marginTop: 1 }}>{item.subtext}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              {isSwap ? (
                <div>
                  <div style={{ color: '#E5484D', fontSize: '0.78rem', fontWeight: 600 }}>{lines[0]}</div>
                  <div style={{ color: '#A8E000', fontSize: '0.78rem', fontWeight: 600 }}>{lines[1]}</div>
                </div>
              ) : (
                <div style={{
                  color: item.amountType === 'positive' ? '#A8E000' : '#E5484D',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  {item.amount}
                </div>
              )}
              <div style={{ color: '#6B7670', fontSize: '0.7rem', marginTop: 1 }}>{item.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
