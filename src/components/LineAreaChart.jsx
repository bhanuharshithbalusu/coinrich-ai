import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';

const TIME_RANGES = ['1D', '7D', '1M', '1Y', 'ALL'];

function TimeRangeTabs({ active, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {TIME_RANGES.map(r => {
        const isActive = r === active;
        return (
          <button
            key={r}
            onClick={() => onChange(r)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: isActive ? 'none' : '1px solid #1F2722',
              background: isActive ? '#2A3D2A' : 'transparent',
              color: isActive ? '#A8E000' : '#8B9890',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              lineHeight: 1.4,
            }}
          >
            {r}
          </button>
        );
      })}
      <button
        style={{
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid #1F2722',
          background: 'transparent',
          color: '#8B9890',
          fontSize: '0.85rem',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        ⋮
      </button>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#1A211C',
        border: '1px solid #2A332D',
        borderRadius: '6px',
        padding: '6px 10px',
        fontSize: '0.75rem',
        color: '#FFFFFF',
      }}
    >
      {payload[0].value}
    </div>
  );
}

function EndLabel({ viewBox, value, color }) {
  if (!viewBox) return null;
  const { x, y } = viewBox;
  return (
    <g>
      <rect x={x + 4} y={y - 10} width={48} height={20} rx={4} fill={color} />
      <text
        x={x + 28}
        y={y + 4}
        textAnchor="middle"
        fill="#0A0E0C"
        fontSize={11}
        fontWeight={700}
      >
        {value}
      </text>
    </g>
  );
}

export default function LineAreaChart({
  data = [],
  color = '#A8E000',
  height = 260,
  showTimeRangeTabs = true,
  activeRange: externalRange,
  onRangeChange,
  yTickFormatter,
  lastLabel,
}) {
  const [internalRange, setInternalRange] = useState('1D');
  const activeRange = externalRange ?? internalRange;
  const handleRangeChange = onRangeChange ?? setInternalRange;

  const gradientId = `linearea-fill-${color.replace('#', '')}`;

  // Determine which x-axis ticks to show (show ~5 evenly spaced)
  const tickIndices = (() => {
    if (data.length <= 6) return data.map((_, i) => i);
    const step = Math.floor((data.length - 1) / 4);
    return [0, step, step * 2, step * 3, data.length - 1];
  })();
  const tickLabels = new Set(tickIndices.map(i => data[i]?.label));

  const lastValue = data.at(-1)?.value;
  const displayLabel = lastLabel ?? (lastValue != null ? `$${lastValue}T` : '');

  const fluid = height === '100%';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '8px',
      ...(fluid ? { flex: 1, minHeight: 0, height: '100%' } : {}),
    }}>
      {showTimeRangeTabs && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
          <TimeRangeTabs active={activeRange} onChange={handleRangeChange} />
        </div>
      )}
      <ResponsiveContainer width="100%" height={fluid ? '100%' : height}>
        <AreaChart data={data} margin={{ top: 16, right: 56, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="#1F2722"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6B7670', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => (tickLabels.has(v) ? v : '')}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#6B7670', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter ?? (v => `$${v}T`)}
            width={52}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A332D', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: '#0A0E0C', strokeWidth: 2 }}
          />
          {lastValue != null && (
            <ReferenceLine
              x={data.at(-1)?.label}
              stroke="transparent"
              label={<EndLabel value={displayLabel} color={color} />}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
