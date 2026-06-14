/**
 * 6-column grid layout:
 *   xl  → 2 cols × 2 rows  BTC  (cols 1-2, rows 1-2)
 *   lg  → 2 cols × 2 rows  ETH  (cols 3-4, rows 1-2)
 *   md  → 1 col  × 2 rows  BNB  (col 5,   rows 1-2)
 *   sm  → 1 col  × 1 row   DOGE/TON/XRP/ADA …
 *   mw  → 2 cols × 1 row   SOL  (cols 1-2, row 3)
 *   xs  → 1 col  × 1 row   AVAX/MATIC …
 */
const SIZE_MAP = {
  xl: { colSpan: 2, rowSpan: 2 },
  lg: { colSpan: 2, rowSpan: 2 },
  md: { colSpan: 1, rowSpan: 2 },
  mw: { colSpan: 2, rowSpan: 1 },
  sm: { colSpan: 1, rowSpan: 1 },
  xs: { colSpan: 1, rowSpan: 1 },
};

function tileColor(change) {
  const abs = Math.abs(change);
  if (change >= 0) {
    if (abs >= 20) return '#1e8000';
    if (abs >= 10) return '#196e00';
    if (abs >= 5)  return '#145a00';
    if (abs >= 2)  return '#0f5200';
    return '#0a4000';
  } else {
    if (abs >= 20) return '#800000';
    if (abs >= 10) return '#6a0000';
    if (abs >= 5)  return '#580000';
    if (abs >= 2)  return '#4a0000';
    return '#3d0000';
  }
}

function textColor(change) {
  return change >= 0 ? '#A8E000' : '#E5484D';
}

function formatPrice(price) {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (price >= 1)    return `$${price.toFixed(2)}`;
  return `$${price.toFixed(4)}`;
}

export default function HeatmapGrid({ tiles = [] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: '42px',
        gap: '2px',
      }}
    >
      {tiles.map(tile => {
        const { colSpan, rowSpan } = SIZE_MAP[tile.size] || SIZE_MAP.sm;
        const bg = tileColor(tile.change);
        const tc = textColor(tile.change);
        const sign = tile.change >= 0 ? '+' : '';
        const isLarge = colSpan >= 2 && rowSpan >= 2;
        const isMedium = rowSpan >= 2 || (tile.size === 'mw');

        return (
          <div
            key={tile.symbol}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
              backgroundColor: bg,
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '6px 4px',
              cursor: 'pointer',
              transition: 'filter 0.15s',
              minHeight: 0,
              overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.18)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
          >
            <span style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: isLarge ? '1rem' : isMedium ? '0.78rem' : '0.68rem',
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}>
              {tile.symbol}
            </span>
            <span style={{
              color: tc,
              fontSize: isLarge ? '0.82rem' : '0.65rem',
              fontWeight: 600,
              lineHeight: 1,
            }}>
              {sign}{tile.change.toFixed(2)}%
            </span>
            {isMedium && (
              <span style={{ color: '#a0b09a', fontSize: isLarge ? '0.72rem' : '0.62rem', lineHeight: 1 }}>
                {formatPrice(tile.value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
