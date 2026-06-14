import MiniStatRow from './MiniStatRow';

function Sparkline({ data, positive }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 36;
  const pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const stroke = positive ? '#A8E000' : '#E5484D';
  const fillId = `spark-fill-${Math.random().toString(36).slice(2)}`;
  const lastPoint = points[points.length - 1].split(',');
  const areaPoints = `${points.join(' ')} ${lastPoint[0]},${h} ${pad},${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${fillId})`} />
      <polyline points={points.join(' ')} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ChangeBadge({ change, changeType }) {
  const isPositive = changeType === 'up' || (changeType === undefined && change >= 0);
  const color = isPositive ? '#A8E000' : '#E5484D';
  const arrow = isPositive ? '▲' : '▼';
  const abs = Math.abs(change);
  return (
    <span style={{ color, fontSize: '0.75rem', fontWeight: 600 }}>
      {arrow} {abs.toFixed(2)}%
    </span>
  );
}

export default function StatCard({
  label,
  value,
  change,
  changeType,
  sparklineData,
  subStats,
  compact,
}) {
  const isPositive = changeType === 'up' || (changeType === undefined && change >= 0);

  return (
    <div
      className="flex flex-col gap-2 rounded-xl"
      style={{ backgroundColor: '#131815', border: '1px solid #1F2722', minWidth: 0, padding: compact ? '12px 14px' : '16px' }}
    >
      <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>{label}</span>

      <div className="flex items-end justify-between gap-2" style={{ minWidth: 0 }}>
        <div className="flex flex-col gap-1" style={{ minWidth: 0, overflow: 'hidden' }}>
          <span style={{
            color: '#FFFFFF', fontSize: compact ? '1.15rem' : '1.4rem', fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {value}
          </span>
          <ChangeBadge change={change} changeType={changeType} />
        </div>
        {sparklineData && (
          <div style={{ flexShrink: 0 }}>
            <Sparkline data={sparklineData} positive={isPositive} />
          </div>
        )}
      </div>

      {subStats && <MiniStatRow items={subStats} />}
    </div>
  );
}
