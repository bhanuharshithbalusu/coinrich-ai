// zones: [{from, to, color}] — fractions 0–1. Defaults to standard Fear & Greed gradient.
const DEFAULT_ZONES = [
  { from: 0,    to: 0.25, color: '#E5484D' },
  { from: 0.25, to: 0.45, color: '#F5A623' },
  { from: 0.45, to: 0.55, color: '#FACC15' },
  { from: 0.55, to: 1,    color: '#A8E000' },
];

export default function GaugeCard({ title, value, min = 0, max = 100, label, zones = DEFAULT_ZONES }) {
  // Semi-circle: arc from 180° to 0° (left to right)
  const radius = 52;
  const cx = 70;
  const cy = 60;
  const startAngle = Math.PI; // 180°
  const endAngle = 0;        // 0°

  function polarToCartesian(angle) {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy - radius * Math.sin(angle),
    };
  }

  // Background track arc (full semi-circle)
  const trackStart = polarToCartesian(startAngle);
  const trackEnd = polarToCartesian(endAngle);
  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 0 1 ${trackEnd.x} ${trackEnd.y}`;

  // Value arc
  const pct = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const valueAngle = startAngle - pct * Math.PI; // going from left (π) to right (0)
  const valueEnd = polarToCartesian(valueAngle);
  // largeArc is always 0: our arc spans at most 180° so the short arc is always correct
  const valuePath = `M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 0 1 ${valueEnd.x} ${valueEnd.y}`;

  const zone = zones.find(z => pct >= z.from && pct <= z.to) || zones[zones.length - 1];
  const arcColor = zone.color;

  return (
    <div
      className="flex flex-col items-center justify-between rounded-xl"
      style={{ backgroundColor: '#131815', border: '1px solid #1F2722', minWidth: 0, padding: '16px' }}
    >
      <span style={{ color: '#8B9890', fontSize: '0.75rem', fontWeight: 500, alignSelf: 'flex-start' }}>{title}</span>

      <svg width={140} height={90} viewBox="0 0 140 90" fill="none" style={{ overflow: 'visible' }}>
        {/* Track */}
        <path d={trackPath} stroke="#1F2722" strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Value arc */}
        {pct > 0 && (
          <path d={valuePath} stroke={arcColor} strokeWidth="8" strokeLinecap="round" fill="none" />
        )}
        {/* Center value */}
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">
          {value}
        </text>
        {/* Label */}
        <text x={cx} y={cy + 20} textAnchor="middle" fill={arcColor} fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">
          {label}
        </text>
        {/* Scale labels */}
        <text x={trackStart.x - 4} y={cy + 18} textAnchor="end" fill="#6B7670" fontSize="9" fontFamily="Inter, sans-serif">{min}</text>
        <text x={trackEnd.x + 4} y={cy + 18} textAnchor="start" fill="#6B7670" fontSize="9" fontFamily="Inter, sans-serif">{max}</text>
      </svg>
    </div>
  );
}
