import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import GaugeCard from '../components/GaugeCard';
import DataTable, { PercentBadge } from '../components/DataTable';
import TableCard from '../components/TableCard';
import CoinIdentifier from '../components/CoinIdentifier';
import LineAreaChart from '../components/LineAreaChart';
import BarVolumeChart from '../components/BarVolumeChart';
import NewsListCard from '../components/NewsListCard';
import MarketPerformanceCard from '../components/MarketPerformanceCard';
import { marketStats, marketCapSeries1D, volumeSeries1D } from '../data/marketStats';
import { coins, watchlist } from '../data/coins';
import {
  portfolio,
  topGainers,
  topLosers,
  trendingCoins,
  latestNews,
  marketPerformance,
} from '../data/dashboard';

// ── column defs ──────────────────────────────────────────────────────────────

const watchlistColumns = [
  {
    key: 'rank', header: '#', align: 'left', width: '32px',
    render: v => <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>{v}</span>,
  },
  {
    key: 'symbol', header: 'Name', align: 'left', noWrap: false,
    render: (_, row) => <CoinIdentifier iconUrl={row.iconUrl} symbol={row.symbol} name={row.name} />,
  },
  {
    key: 'price', header: 'Price', align: 'right', width: '90px',
    render: v => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    key: 'change24h', header: '24h %', align: 'right', width: '70px',
    render: v => <PercentBadge value={v} />,
  },
];

const gainerLoserColumns = [
  {
    key: 'rank', header: '#', align: 'left', width: '32px',
    render: v => <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>{v}</span>,
  },
  {
    key: 'symbol', header: 'Name', align: 'left', noWrap: false,
    render: (_, row) => <CoinIdentifier iconUrl={row.iconUrl} symbol={row.symbol} name={row.name} />,
  },
  {
    key: 'price', header: 'Price', align: 'right', width: '90px',
    render: v => {
      if (v < 0.001) return `$${v.toFixed(8)}`;
      if (v < 1) return `$${v.toFixed(6)}`;
      return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
  },
  {
    key: 'change24h', header: '24h %', align: 'right', width: '70px',
    render: v => <PercentBadge value={v} />,
  },
];

function fmtVolume(n) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

function fmtPrice(n) {
  if (n < 0.001) return `$${n.toFixed(8)}`;
  if (n < 1) return `$${n.toFixed(6)}`;
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const trendingColumns = [
  {
    key: 'rank', header: '#', align: 'left', width: '32px',
    render: v => <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>{v}</span>,
  },
  {
    key: 'symbol', header: 'Name', align: 'left', noWrap: false,
    render: (_, row) => <CoinIdentifier iconUrl={row.iconUrl} symbol={row.symbol} name={row.name} />,
  },
  {
    key: 'price', header: 'Price', align: 'right', width: '88px',
    render: v => fmtPrice(v),
  },
  {
    key: 'change24h', header: '24h %', align: 'right', width: '66px',
    render: v => <PercentBadge value={v} />,
  },
  {
    key: 'volume', header: 'Volume', align: 'right', width: '80px',
    render: v => <span style={{ color: '#8B9890' }}>{fmtVolume(v)}</span>,
  },
];

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

const btc = coins.find(c => c.symbol === 'BTC');
const eth = coins.find(c => c.symbol === 'ETH');

// ── Portfolio sparkline ───────────────────────────────────────────────────────

function PortfolioSparkline({ data }) {
  return (
    <ResponsiveContainer width="100%" height={56}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#A8E000" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#A8E000" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke="#A8E000"
          strokeWidth={1.5}
          fill="url(#portGrad)"
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Portfolio Card ────────────────────────────────────────────────────────────

function PortfolioCard({ data }) {
  return (
    <div
      style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600 }}>Your Portfolio</span>
        <span style={{ color: '#8B9890', fontSize: '1rem', cursor: 'pointer' }} title="Hide balance">👁</span>
      </div>

      <div style={{ color: '#6B7670', fontSize: '0.72rem', fontWeight: 500, marginBottom: '4px' }}>Total Value</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '2px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '1.75rem', fontWeight: 700 }}>
          ${data.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>
        ▲ {data.change24hPct.toFixed(2)}% (24h)
      </div>

      <PortfolioSparkline data={data.sparkline} />

      {/* Stats row */}
      <div style={{ display: 'flex', gap: '0', marginTop: '12px', borderTop: '1px solid #1F2722', paddingTop: '12px' }}>
        {[
          {
            label: 'Total Profit',
            value: `$${data.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            sub: `▲ ${data.totalProfitPct.toFixed(2)}%`,
          },
          {
            label: 'ROI',
            value: `+${data.roi.toFixed(2)}%`,
          },
          {
            label: '24h Change',
            value: `$${data.change24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            sub: `▲ ${data.change24hPct.toFixed(2)}%`,
          },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1 }}>
            <div style={{ color: '#6B7670', fontSize: '0.68rem', fontWeight: 500, marginBottom: '2px' }}>{stat.label}</div>
            <div style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600 }}>{stat.value}</div>
            {stat.sub && <div style={{ color: '#A8E000', fontSize: '0.7rem', fontWeight: 600 }}>{stat.sub}</div>}
          </div>
        ))}
      </div>

      <Link
        to="/portfolio"
        style={{
          display: 'block',
          textAlign: 'center',
          marginTop: '14px',
          padding: '8px',
          border: '1px solid #A8E000',
          borderRadius: '8px',
          color: '#A8E000',
          fontSize: '0.82rem',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#A8E000'; e.currentTarget.style.color = '#0A0E0C'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#A8E000'; }}
      >
        View Portfolio →
      </Link>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [marketRange, setMarketRange] = useState('1D');
  const navigate = useNavigate();
  const goToTerminal = row => navigate(`/terminal?pair=${row.symbol}-USDT`);

  return (
    <div className="flex flex-col gap-4">
      {/* Top stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <StatCard
          label="Total Market Cap"
          value={fmt(marketStats.totalMarketCap.value)}
          change={marketStats.totalMarketCap.change24h}
          sparklineData={marketStats.totalMarketCap.sparkline}
          subStats={[
            { label: '24h Volume', value: fmt(marketStats.totalMarketCap.volume24h) },
            { label: 'Vol Change', value: `▲ ${marketStats.totalMarketCap.volumeChange}%` },
          ]}
        />
        <StatCard
          label="BTC Dominance"
          value={`${marketStats.btcDominance.value}%`}
          change={marketStats.btcDominance.change24h}
          subStats={[
            { label: 'ETH Dominance', value: `${marketStats.btcDominance.ethDominance}%` },
            { label: 'ETH Chg', value: `▲ ${marketStats.btcDominance.ethChange}%` },
          ]}
        />
        <GaugeCard
          title="Fear & Greed Index"
          value={marketStats.fearGreedIndex.value}
          min={0}
          max={100}
          label={marketStats.fearGreedIndex.label}
        />
        <StatCard
          label="BTC Price"
          value={`$${btc.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={btc.change24h}
          sparklineData={btc.sparkline7d}
          subStats={[
            { label: '24h Low', value: `$${btc.low24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: '24h High', value: `$${btc.high24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          ]}
        />
        <StatCard
          label="ETH Price"
          value={`$${eth.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={eth.change24h}
          sparklineData={eth.sparkline7d}
          subStats={[
            { label: '24h Low', value: `$${eth.low24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { label: '24h High', value: `$${eth.high24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          ]}
        />
      </div>

      {/*
        Middle section: Market Overview spans both rows on the left.
        Right side is a 2×2 grid: Portfolio | Watchlist (top), Gainers | Losers (bottom).

        Outer grid: [Market Overview] [2×2 right panel]
        Market Overview gets gridRow: span 1 but the right panel uses its own inner grid.
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'stretch' }}>
        {/* Market Overview — left column, stretches to match right-side 2×2 height */}
        <div
          style={{
            backgroundColor: '#131815',
            border: '1px solid #1F2722',
            borderRadius: '12px',
            padding: '16px 20px',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div>
              <div style={{ color: '#8B9890', fontSize: '0.75rem', fontWeight: 500, marginBottom: '2px' }}>
                Market Overview
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ color: '#A8E000', fontSize: '1.5rem', fontWeight: 700 }}>$2.45T</span>
                <span style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 600 }}>▲ 2.35%</span>
              </div>
            </div>
          </div>

          {/* flex: 1 + minHeight: 0 lets this grow to fill remaining card height */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <LineAreaChart
              data={marketCapSeries1D}
              color="#A8E000"
              height="100%"
              showTimeRangeTabs
              activeRange={marketRange}
              onRangeChange={setMarketRange}
            />
          </div>

          <div style={{ marginTop: '16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
              <span style={{ color: '#8B9890', fontSize: '0.75rem', fontWeight: 500 }}>24h Volume</span>
              <span style={{ color: '#A8E000', fontSize: '0.875rem', fontWeight: 700 }}>$98.42B</span>
              <span style={{ color: '#A8E000', fontSize: '0.75rem', fontWeight: 600 }}>▲ 8.41%</span>
            </div>
            <BarVolumeChart data={volumeSeries1D} color="#7ED321" height={120} />
          </div>
        </div>

        {/* Right side: 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '16px' }}>
          {/* Row 1: Portfolio | Watchlist */}
          <PortfolioCard data={portfolio} />

          <TableCard title="Watchlist" viewAllHref="/market">
            <DataTable columns={watchlistColumns} data={watchlist} onRowClick={goToTerminal} />
            <div style={{ padding: '10px 16px', borderTop: '1px solid #1F2722', textAlign: 'center' }}>
              <Link
                to="/market"
                style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}
              >
                + Add more to watchlist
              </Link>
            </div>
          </TableCard>

          {/* Row 2: Top Gainers | Top Losers */}
          <TableCard title="Top Gainers" viewAllHref="/market">
            <DataTable columns={gainerLoserColumns} data={topGainers} onRowClick={goToTerminal} />
          </TableCard>

          <TableCard title="Top Losers" viewAllHref="/market">
            <DataTable columns={gainerLoserColumns} data={topLosers} onRowClick={goToTerminal} />
          </TableCard>
        </div>
      </div>

      {/* Trending Coins + Latest News + Market Performance — equal-height row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TableCard title="Trending Coins" viewAllHref="/market">
            <DataTable columns={trendingColumns} data={trendingCoins} onRowClick={goToTerminal} />
          </TableCard>
        </div>

        <NewsListCard
          title="Latest News"
          items={latestNews}
          viewAllLink="/market"
        />

        <MarketPerformanceCard
          title="Market Performance"
          items={marketPerformance}
          viewAllLink="/market"
        />
      </div>
    </div>
  );
}
