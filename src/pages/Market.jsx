import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoinIcons } from '../context/CoinIconsContext';
import StatCard from '../components/StatCard';
import GaugeCard from '../components/GaugeCard';
import DataTable, { PercentBadge } from '../components/DataTable';
import CoinIdentifier from '../components/CoinIdentifier';
import HeatmapGrid from '../components/HeatmapGrid';
import PaginationControl from '../components/PaginationControl';
import NewsListCard from '../components/NewsListCard';
import TableCard from '../components/TableCard';
import {
  marketGlobalStats,
  marketCoins,
  heatmapTiles,
  marketTopGainers,
  marketTopLosers,
  marketNews,
} from '../data/market';

// ── Inline StatCard with custom sparkline color ───────────────────────────────
function ColoredSparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 60; const h = 28; const pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const id = `spark-${color.replace('#', '')}`;
  const lastPt = pts[pts.length - 1].split(',');
  const area = `${pts.join(' ')} ${lastPt[0]},${h} ${pad},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={pts.join(' ')} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Sparkline for table ───────────────────────────────────────────────────────
function TableSparkline({ data, positive }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80; const h = 32; const pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const stroke = positive ? '#A8E000' : '#E5484D';
  const fillId = `tf-${positive ? 'g' : 'r'}-${Math.random().toString(36).slice(2, 6)}`;
  const lastPt = pts[pts.length - 1].split(',');
  const area = `${pts.join(' ')} ${lastPt[0]},${h} ${pad},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${fillId})`} />
      <polyline points={pts.join(' ')} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Star (favourite) toggle ───────────────────────────────────────────────────
function StarToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={e => { e.stopPropagation(); setOn(v => !v); }}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}
    >
      <span style={{ fontSize: '0.85rem', color: on ? '#F5A623' : '#3A4A40' }}>
        {on ? '★' : '☆'}
      </span>
    </button>
  );
}

// ── Row action menu ───────────────────────────────────────────────────────────
function RowMenu() {
  return (
    <button
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B9890', fontSize: '1rem', padding: '0 4px', lineHeight: 1 }}
      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
      onMouseLeave={e => { e.currentTarget.style.color = '#8B9890'; }}
    >
      ⋮
    </button>
  );
}

// ── Category tabs ─────────────────────────────────────────────────────────────
const CATEGORIES = ['All Cryptocurrencies', 'Categories', 'DeFi', 'NFT', 'Layer 1', 'Layer 2', 'Metaverse', 'AI'];

// ── Column definitions ────────────────────────────────────────────────────────
function fmt(v) {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9)  return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6)  return `$${(v / 1e6).toFixed(2)}M`;
  return `$${v.toFixed(2)}`;
}
function fmtPrice(v) {
  if (v >= 1000) return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (v >= 1)    return `$${v.toFixed(2)}`;
  return `$${v.toFixed(4)}`;
}
function fmtPriceShort(v) {
  if (v >= 10000) return `$${(v / 1000).toFixed(1)}K`;
  if (v >= 1000)  return `$${v.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (v >= 1)     return `$${v.toFixed(2)}`;
  return `$${v.toFixed(4)}`;
}

const COLUMNS = [
  {
    key: 'rank', header: '#', align: 'left', width: '30px',
    render: v => <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>{v}</span>,
  },
  {
    key: 'id', header: '', align: 'center', width: '24px',
    render: () => <StarToggle />,
  },
  {
    key: 'symbol', header: 'Name', align: 'left', width: '150px', noWrap: false,
    render: (_, row) => <CoinIdentifier iconUrl={row.iconUrl} symbol={row.symbol} name={row.name} />,
  },
  {
    key: 'price', header: 'Price', align: 'right', width: '100px',
    render: v => <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.82rem' }}>{fmtPrice(v)}</span>,
  },
  {
    key: 'change24h', header: '24h %', align: 'right', width: '72px',
    render: v => <PercentBadge value={v} />,
  },
  {
    key: 'change7d', header: '7d %', align: 'right', width: '72px',
    render: v => <PercentBadge value={v} />,
  },
  {
    key: 'marketCap', header: 'Market Cap', align: 'right', width: '105px',
    render: v => <span style={{ color: '#FFFFFF', fontSize: '0.82rem' }}>{fmt(v)}</span>,
  },
  {
    key: 'volume24h', header: 'Volume (24h)', align: 'right', width: '105px',
    render: v => <span style={{ color: '#FFFFFF', fontSize: '0.82rem' }}>{fmt(v)}</span>,
  },
  {
    key: 'circulatingSupply', header: 'Circulating Supply', align: 'right', width: '130px',
    render: v => <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>{v}</span>,
  },
  {
    key: 'sparkline7d', header: 'Last 7 Days', align: 'right', width: '88px',
    render: (v, row) => <TableSparkline data={v} positive={row.change7d >= 0} />,
  },
  {
    key: 'action', header: '', align: 'center', width: '28px',
    render: () => <RowMenu />,
  },
];

// Compact coin cell for sidebar — icon + symbol + truncated name
function CompactCoin({ symbol, name }) {
  const [fail, setFail] = useState(false);
  const iconMap = useCoinIcons();
  const iconUrl = iconMap[symbol];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#1F2722', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconUrl && !fail
          ? <img src={iconUrl} alt={symbol} style={{ width: 22, height: 22, objectFit: 'cover' }} onError={() => setFail(true)} />
          : <span style={{ color: '#A8E000', fontSize: '0.5rem', fontWeight: 700 }}>{symbol?.slice(0, 3)}</span>}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 600 }}>{symbol}</div>
        <div style={{ color: '#8B9890', fontSize: '0.65rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 52 }}>{name}</div>
      </div>
    </div>
  );
}

const GAINER_LOSER_COLS = [
  {
    key: 'symbol', header: 'Name', align: 'left', width: '100px', noWrap: false,
    render: (_, row) => <CompactCoin symbol={row.symbol} name={row.name} />,
  },
  {
    key: 'change24h', header: '24h %', align: 'right', width: '75px',
    render: v => <PercentBadge value={v} />,
  },
];

const PAGE_SIZE = 15;

export default function Market() {
  const [activeCategory, setActiveCategory] = useState('All Cryptocurrencies');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil(12458 / PAGE_SIZE);

  const { totalMarketCap, volume24h, btcDominance, ethDominance, fearGreedIndex, activeCryptocurrencies, totalMarkets } = marketGlobalStats;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* ── Top stat row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
        <StatCard compact
          label="Market Cap"
          value={`$${(totalMarketCap.value / 1e12).toFixed(2)}T`}
          change={totalMarketCap.change24h}
          sparklineData={[2.20, 2.25, 2.28, 2.32, 2.38, 2.42, 2.45].map(v => v * 1e12)}
        />
        <StatCard compact
          label="24h Volume"
          value={`$${(volume24h.value / 1e9).toFixed(2)}B`}
          change={volume24h.change24h}
        />

        {/* BTC Dominance — orange brand sparkline */}
        <div
          className="flex flex-col gap-2 rounded-xl"
          style={{ backgroundColor: '#131815', border: '1px solid #1F2722', padding: '12px 10px', minWidth: 0 }}
        >
          <span style={{ color: '#8B9890', fontSize: '0.68rem', fontWeight: 500 }}>BTC Dominance</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {btcDominance.value}%
              </span>
              <span style={{ color: '#E5484D', fontSize: '0.68rem', fontWeight: 600 }}>▼ {Math.abs(btcDominance.change24h).toFixed(2)}%</span>
            </div>
            <ColoredSparkline data={[52.8, 52.7, 52.6, 52.5, 52.4, 52.35, 52.31]} color="#F5A623" />
          </div>
        </div>

        {/* ETH Dominance — blue brand sparkline */}
        <div
          className="flex flex-col gap-2 rounded-xl"
          style={{ backgroundColor: '#131815', border: '1px solid #1F2722', padding: '12px 10px', minWidth: 0 }}
        >
          <span style={{ color: '#8B9890', fontSize: '0.68rem', fontWeight: 500 }}>ETH Dominance</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                {ethDominance.value}%
              </span>
              <span style={{ color: '#A8E000', fontSize: '0.68rem', fontWeight: 600 }}>▲ {Math.abs(ethDominance.change24h).toFixed(2)}%</span>
            </div>
            <ColoredSparkline data={[16.0, 16.1, 16.2, 16.25, 16.30, 16.35, 16.37]} color="#4A9EFF" />
          </div>
        </div>

        <GaugeCard
          title="Fear & Greed Index"
          value={fearGreedIndex.value}
          label={fearGreedIndex.label}
        />
        <StatCard compact
          label="Active Cryptocurrencies"
          value={activeCryptocurrencies.toLocaleString()}
          change={3.12}
        />
        <StatCard compact
          label="Total Markets"
          value={totalMarkets.toLocaleString()}
          change={2.83}
        />
      </div>

      {/* ── Main content + right sidebar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 430px', gap: '10px', alignItems: 'stretch' }}>

        {/* ── Left: table panel ── */}
        <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: '12px', overflow: 'hidden' }}>

          {/* Header row */}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1F2722' }}>
            <div>
              <h1 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, margin: 0 }}>Cryptocurrency Market</h1>
              <p style={{ color: '#8B9890', fontSize: '0.7rem', margin: '2px 0 0' }}>Real-time cryptocurrency prices, market cap, and trading volume</p>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { icon: '★', label: 'Watchlist' },
                { icon: '⊟', label: 'Filters' },
                { icon: '✦', label: 'Customize' },
              ].map(btn => (
                <button
                  key={btn.label}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '5px 10px', borderRadius: '7px',
                    border: '1px solid #2A332D', background: 'transparent',
                    color: '#8B9890', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A211C'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8B9890'; }}
                >
                  <span>{btn.icon}</span> {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ padding: '0 16px', display: 'flex', gap: '0', borderBottom: '1px solid #1F2722', overflowX: 'auto' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 10px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeCategory === cat ? '2px solid #A8E000' : '2px solid transparent',
                  color: activeCategory === cat ? '#A8E000' : '#8B9890',
                  fontSize: '0.8rem',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.12s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <DataTable columns={COLUMNS} data={marketCoins} compact onRowClick={row => navigate(`/terminal?pair=${row.symbol}-USDT`)} />
          </div>

          {/* View all button */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid #1F2722' }}>
            <button
              style={{
                width: '100%', padding: '8px', borderRadius: '7px',
                border: '1px solid #1F2722', background: 'transparent',
                color: '#8B9890', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A211C'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#8B9890'; }}
            >
              View all {marketGlobalStats.activeCryptocurrencies.toLocaleString()} cryptocurrencies
            </button>
          </div>

          {/* Pagination row */}
          <div style={{ padding: '6px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#8B9890', fontSize: '0.75rem' }}>
              Showing 1 to {PAGE_SIZE} of {marketGlobalStats.activeCryptocurrencies.toLocaleString()} results
            </span>
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>

          {/* Heatmap */}
          <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: '10px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>Market Heatmap</span>
              <a href="#" style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}>
                View full heatmap ›
              </a>
            </div>
            <HeatmapGrid tiles={heatmapTiles} />
          </div>

          {/* Top Gainers + Top Losers side by side */}
          <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #1F2722' }}>
              {/* Gainers header */}
              <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRight: '1px solid #1F2722' }}>
                <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>Top Gainers</span>
                <a href="#" style={{ color: '#A8E000', fontSize: '0.7rem', fontWeight: 500, textDecoration: 'none' }}>View more ›</a>
              </div>
              {/* Losers header */}
              <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>Top Losers</span>
                <a href="#" style={{ color: '#A8E000', fontSize: '0.7rem', fontWeight: 500, textDecoration: 'none' }}>View more ›</a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ borderRight: '1px solid #1F2722' }}>
                <DataTable columns={GAINER_LOSER_COLS} data={marketTopGainers} />
              </div>
              <div>
                <DataTable columns={GAINER_LOSER_COLS} data={marketTopLosers} />
              </div>
            </div>
          </div>

          {/* Latest News */}
          <div style={{ flex: 1 }}>
            <NewsListCard title="Latest News" items={marketNews} viewAllLink="#" />
          </div>
        </div>
      </div>
    </div>
  );
}
