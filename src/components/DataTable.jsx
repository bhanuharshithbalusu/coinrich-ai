export function PercentBadge({ value }) {
  const isPositive = value >= 0;
  const color = isPositive ? '#A8E000' : '#E5484D';
  const arrow = isPositive ? '▲' : '▼';
  return (
    <span style={{ color, fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
      {arrow} {Math.abs(value).toFixed(2)}%
    </span>
  );
}

export default function DataTable({ columns = [], data = [], onRowClick, compact }) {
  const cellPad = compact ? '8px 8px' : '8px 12px';
  const rowPad  = compact ? '10px 8px' : '12px 12px';
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 0 }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              style={{
                padding: cellPad,
                textAlign: col.align || 'left',
                color: '#8B9890',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderBottom: '1px solid #1F2722',
                overflow: 'hidden',
                ...(col.width ? { width: col.width } : {}),
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={row.id ?? i}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            style={{
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'background 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A211C'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {columns.map(col => (
              <td
                key={col.key}
                style={{
                  padding: rowPad,
                  textAlign: col.align || 'left',
                  color: '#FFFFFF',
                  fontSize: compact ? '0.8rem' : '0.875rem',
                  borderBottom: '1px solid #1A211C',
                  overflow: 'hidden',
                  whiteSpace: col.noWrap !== false ? 'nowrap' : undefined,
                }}
              >
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
