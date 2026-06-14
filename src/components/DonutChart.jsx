import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const seg = payload[0].payload;
  return (
    <div style={{
      background: '#1A211C', border: '1px solid #2A332D', borderRadius: '6px',
      padding: '6px 10px', fontSize: '0.75rem', color: '#FFFFFF',
    }}>
      <div style={{ fontWeight: 600 }}>{seg.name} ({seg.symbol})</div>
      <div style={{ color: '#8B9890' }}>
        ${seg.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div style={{ color: seg.color }}>{seg.allocation}%</div>
    </div>
  );
}

export default function DonutChart({ segments = [], centerLabel = 'Total', centerValue = '' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>

      {/* Donut */}
      <div style={{ position: 'relative', width: 185, height: 185, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              cx="50%" cy="50%"
              innerRadius={60} outerRadius={88}
              dataKey="value"
              stroke="none"
              paddingAngle={1}
            >
              {segments.map((seg, i) => <Cell key={i} fill={seg.color} />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none', width: '108px',
        }}>
          <div style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            {centerValue}
          </div>
          <div style={{ color: '#8B9890', fontSize: '0.65rem', marginTop: '3px' }}>
            {centerLabel}
          </div>
        </div>
      </div>

      {/* Legend — 3 columns: Asset | Value | Allocation */}
      <div style={{ flex: 1, minWidth: 0, alignSelf: 'center' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto auto',
          gap: '0 16px', marginBottom: '6px', paddingBottom: '6px',
          borderBottom: '1px solid #1F2722',
        }}>
          <span style={{ color: '#8B9890', fontSize: '0.7rem', fontWeight: 500 }}>Asset</span>
          <span style={{ color: '#8B9890', fontSize: '0.7rem', fontWeight: 500, textAlign: 'right' }}>Value</span>
          <span style={{ color: '#8B9890', fontSize: '0.7rem', fontWeight: 500, textAlign: 'right', minWidth: '44px' }}>Allocation</span>
        </div>

        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: '0 16px',
              alignItems: 'center',
              padding: '6px 0',
              borderBottom: i < segments.length - 1 ? '1px solid #1A211C' : 'none',
            }}
          >
            {/* Asset cell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: seg.color, flexShrink: 0 }} />
              <span style={{ color: '#FFFFFF', fontSize: '0.8rem', lineHeight: 1 }}>
                {seg.name}
              </span>
              <span style={{ color: '#8B9890', fontSize: '0.72rem' }}>({seg.symbol})</span>
            </div>
            {/* Value */}
            <span style={{ color: '#FFFFFF', fontSize: '0.8rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
              ${seg.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {/* Allocation */}
            <span style={{ color: '#8B9890', fontSize: '0.78rem', textAlign: 'right', minWidth: '44px' }}>
              {seg.allocation}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
