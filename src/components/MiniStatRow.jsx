export default function MiniStatRow({ items = [] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', minWidth: 0 }}>
      {items.map(({ label, value }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <span style={{ color: '#6B7670', fontSize: '0.65rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}</span>
          <span style={{ color: '#8B9890', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
