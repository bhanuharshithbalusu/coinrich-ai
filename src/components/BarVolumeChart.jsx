import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

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
      ${payload[0].value}B
    </div>
  );
}

export default function BarVolumeChart({
  data = [],
  color = '#7ED321',
  height = 120,
  yTickFormatter,
}) {
  // Show ~5 evenly spaced x-axis ticks
  const tickIndices = (() => {
    if (data.length <= 6) return data.map((_, i) => i);
    const step = Math.floor((data.length - 1) / 4);
    return [0, step, step * 2, step * 3, data.length - 1];
  })();
  const tickLabels = new Set(tickIndices.map(i => data[i]?.label));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 56, bottom: 0, left: 0 }} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="0" stroke="#1F2722" vertical={false} />
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
          tickFormatter={yTickFormatter ?? (v => `$${v}B`)}
          width={52}
          domain={[0, 'auto']}
          ticks={[0, 60, 120]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168,224,0,0.06)' }} />
        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
