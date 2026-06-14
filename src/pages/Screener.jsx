import { useState } from 'react';
import DataTable, { PercentBadge } from '../components/DataTable';
import FilterDropdown, { TextInput } from '../components/FilterDropdown';
import CoinIdentifier from '../components/CoinIdentifier';
import {
  savedScreeners,
  screenerResults,
  topOpportunities,
  marketOverview,
  screenerTips,
  filterOptions,
} from '../data/screener';

// ── Tiny inline sparkline ─────────────────────────────────────────────────────
function Spark({ data, width = 64, height = 28 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <polyline points={pts.join(' ')} stroke="#A8E000" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── AI Score progress bar ─────────────────────────────────────────────────────
function AiScoreBar({ score }) {
  const color = score >= 80 ? '#A8E000' : score >= 60 ? '#F5A623' : '#E5484D';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, backgroundColor: '#1A211C', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
      </div>
      <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600, minWidth: 24 }}>{score}</span>
    </div>
  );
}

// ── Circular AI Score badge ───────────────────────────────────────────────────
function AiScoreBadge({ score }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? '#A8E000' : score >= 60 ? '#F5A623' : '#E5484D';
  return (
    <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
      <svg width={40} height={40} viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={20} cy={20} r={r} fill="none" stroke="#1F2722" strokeWidth={3} />
        <circle cx={20} cy={20} r={r} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color,
      }}>
        {score}
      </span>
    </div>
  );
}

function StarIcon({ filled }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill={filled ? '#A8E000' : 'none'}
      stroke={filled ? '#A8E000' : '#8B9890'} strokeWidth={2}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BullishBadge() {
  return (
    <span style={{
      backgroundColor: '#1A2E14', color: '#A8E000', fontSize: '0.72rem',
      fontWeight: 600, padding: '2px 8px', borderRadius: 4,
    }}>Bullish</span>
  );
}

function InfoIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#8B9890" strokeWidth={2}>
      <circle cx={12} cy={12} r={10} />
      <line x1={12} y1={16} x2={12} y2={12} />
      <line x1={12} y1={8} x2={12.01} y2={8} />
    </svg>
  );
}

const columns = [
  {
    key: 'rank', header: '#', width: '44px', align: 'center',
    render: (v) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: '#8B9890', fontSize: '0.75rem' }}>{v}</span>
        <StarIcon filled={false} />
      </div>
    ),
  },
  {
    key: 'name', header: 'Coin', width: '180px',
    render: (v, row) => <CoinIdentifier symbol={row.ticker} name={v} />,
  },
  {
    key: 'price', header: 'Price', align: 'right',
    render: (v) => <span style={{ color: '#FFFFFF', fontWeight: 500 }}>${v.toLocaleString()}</span>,
  },
  { key: 'change24h', header: '24h %', align: 'right', render: (v) => <PercentBadge value={v} /> },
  { key: 'change7d', header: '7d %', align: 'right', render: (v) => <PercentBadge value={v} /> },
  { key: 'marketCap', header: 'Market Cap', align: 'right' },
  { key: 'volume24h', header: 'Volume (24h)', align: 'right' },
  { key: 'rsi', header: 'RSI (14)', align: 'right', render: (v) => <span style={{ color: '#FFFFFF' }}>{v}</span> },
  { key: 'macd', header: 'MACD', render: () => <BullishBadge /> },
  { key: 'aiScore', header: 'AI Score', width: '140px', render: (v) => <AiScoreBar score={v} /> },
  {
    key: 'sparkline', header: 'Add', width: '90px', align: 'center',
    render: (v) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Spark data={v} />
        <button style={{
          background: 'none', border: '1px solid #1F2722', borderRadius: 6,
          color: '#8B9890', width: 22, height: 22, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', padding: 0,
        }}>+</button>
      </div>
    ),
  },
];

const card = { backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12 };

const pageBtn = {
  background: '#1A211C', border: '1px solid #1F2722', borderRadius: 6,
  color: '#8B9890', width: 28, height: 28, cursor: 'pointer',
  fontSize: '0.78rem', padding: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

export default function Screener() {
  const [activeTab, setActiveTab] = useState(1);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    marketCapOp: 'under', marketCapVal: '500M',
    change24hOp: 'gt', change24hVal: '5%',
    change7dOp: 'any',
    volumeOp: 'gt', volumeVal: '$10M',
    price: 'any',
    rsiMin: '50', rsiMax: '70',
    macd: 'bullish',
    volumeSpikeOp: 'gt', volumeSpikeVal: '1.5x',
    category: 'ai_defi',
    blockchain: 'all',
    showMe: '100',
  });

  function setFilter(key, val) {
    setFilters(f => ({ ...f, [key]: val }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Page header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ color: '#FFFFFF', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Crypto Screener</h1>
          <InfoIcon />
        </div>
        <p style={{ color: '#8B9890', fontSize: '0.8rem', margin: '4px 0 0' }}>
          Find high-potential coins using advanced filters and real-time data
        </p>
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Saved screener tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {savedScreeners.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 8,
                  border: `1px solid ${activeTab === s.id ? '#A8E000' : '#1F2722'}`,
                  backgroundColor: activeTab === s.id ? 'rgba(168,224,0,0.08)' : '#131815',
                  color: activeTab === s.id ? '#A8E000' : '#8B9890',
                  cursor: 'pointer', fontSize: '0.82rem',
                  fontWeight: activeTab === s.id ? 600 : 400,
                }}
              >
                <StarIcon filled={s.starred} />
                <span>{s.name}</span>
                <span style={{
                  backgroundColor: '#1A211C', color: '#8B9890',
                  fontSize: '0.7rem', padding: '1px 6px', borderRadius: 10,
                }}>
                  {s.results} results
                </span>
              </button>
            ))}
          </div>

          {/* Filter panel */}
          <div style={{ ...card, padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>Filters</span>
              <button style={{ background: 'none', border: 'none', color: '#A8E000', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>
                Clear all
              </button>
            </div>

            {/* Row 1 */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>Market Cap</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <FilterDropdown value={filters.marketCapOp} options={filterOptions.marketCapOp} onChange={v => setFilter('marketCapOp', v)} />
                  <TextInput value={filters.marketCapVal} onChange={v => setFilter('marketCapVal', v)} style={{ width: 72 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>24h Change %</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <FilterDropdown value={filters.change24hOp} options={filterOptions.changeOp} onChange={v => setFilter('change24hOp', v)} />
                  <TextInput value={filters.change24hVal} onChange={v => setFilter('change24hVal', v)} style={{ width: 60 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>7d Change %</span>
                <FilterDropdown value={filters.change7dOp} options={filterOptions.changeOp} onChange={v => setFilter('change7dOp', v)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>Volume (24h)</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <FilterDropdown value={filters.volumeOp} options={filterOptions.volumeOp} onChange={v => setFilter('volumeOp', v)} />
                  <TextInput value={filters.volumeVal} onChange={v => setFilter('volumeVal', v)} style={{ width: 72 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>Price</span>
                <FilterDropdown value={filters.price} options={filterOptions.price} onChange={v => setFilter('price', v)} />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>RSI (14)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <TextInput value={filters.rsiMin} onChange={v => setFilter('rsiMin', v)} style={{ width: 52 }} />
                  <span style={{ color: '#8B9890', fontSize: '0.75rem' }}>to</span>
                  <TextInput value={filters.rsiMax} onChange={v => setFilter('rsiMax', v)} style={{ width: 52 }} />
                </div>
              </div>
              <div style={{ minWidth: 130 }}>
                <FilterDropdown label="MACD" value={filters.macd} options={filterOptions.macd} onChange={v => setFilter('macd', v)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>Volume Spike</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <FilterDropdown value={filters.volumeSpikeOp} options={filterOptions.volumeSpikeOp} onChange={v => setFilter('volumeSpikeOp', v)} />
                  <TextInput value={filters.volumeSpikeVal} onChange={v => setFilter('volumeSpikeVal', v)} style={{ width: 60 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>Category</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FilterDropdown value={filters.category} options={filterOptions.category} onChange={v => setFilter('category', v)} />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ background: '#1A2E14', border: 'none', borderRadius: 4, color: '#A8E000', width: 22, height: 22, cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}>✕</button>
                    <button style={{ background: '#1A211C', border: 'none', borderRadius: 4, color: '#8B9890', width: 22, height: 22, cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}>⟳</button>
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 130 }}>
                <FilterDropdown label="Blockchain" value={filters.blockchain} options={filterOptions.blockchain} onChange={v => setFilter('blockchain', v)} />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid #1F2722' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                backgroundColor: 'transparent', border: '1px solid #1F2722',
                borderRadius: 8, color: '#8B9890', padding: '7px 14px',
                fontSize: '0.8rem', cursor: 'pointer',
              }}>
                + Add Filter
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>Show Me</span>
                  <FilterDropdown value={filters.showMe} options={filterOptions.showMe} onChange={v => setFilter('showMe', v)} />
                </div>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  backgroundColor: '#A8E000', border: 'none', borderRadius: 8,
                  color: '#0A0E0C', padding: '8px 18px',
                  fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                }}>
                  ▶ Run Screener
                </button>
              </div>
            </div>
          </div>

          {/* Results table */}
          <div style={{ ...card, padding: '16px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>
                  Screener Results ({screenerResults.length * 10})
                </span>
                <InfoIcon />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ background: '#1A211C', border: '1px solid #1F2722', borderRadius: 8, color: '#8B9890', padding: '6px 14px', fontSize: '0.78rem', cursor: 'pointer' }}>
                  ⊞ Columns
                </button>
                <button style={{ background: '#1A211C', border: '1px solid #1F2722', borderRadius: 8, color: '#8B9890', padding: '6px 14px', fontSize: '0.78rem', cursor: 'pointer' }}>
                  ↓ Export
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>Sort by</span>
                  <FilterDropdown
                    value="ai_score"
                    options={[{ label: 'AI Score', value: 'ai_score' }, { label: 'Price', value: 'price' }, { label: '24h %', value: 'change24h' }]}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>

            <DataTable columns={columns} data={screenerResults} />

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderTop: '1px solid #1F2722' }}>
              <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>
                Showing 1 to {screenerResults.length} of 100 results
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} style={pageBtn}>‹</button>
                {[1, 2, 3, 4, 5, '…', 10].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => typeof p === 'number' && setPage(p)}
                    style={{
                      ...pageBtn,
                      ...(page === p ? { backgroundColor: '#A8E000', color: '#0A0E0C', borderColor: '#A8E000' } : {}),
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(10, p + 1))} style={pageBtn}>›</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>Show</span>
                <FilterDropdown
                  value="100"
                  options={[{ label: '100', value: '100' }, { label: '50', value: '50' }, { label: '200', value: '200' }]}
                  onChange={() => {}}
                />
                <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>per page</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Top Opportunities */}
          <div style={{ ...card, padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>Top Opportunities</span>
                <InfoIcon />
              </div>
              <button style={{ background: 'none', border: 'none', color: '#A8E000', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}>View all</button>
            </div>
            {topOpportunities.map((coin, i) => (
              <div
                key={coin.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #1A211C',
                }}
              >
                <span style={{ color: '#8B9890', fontSize: '0.75rem', width: 14, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <CoinIdentifier symbol={coin.ticker} name={coin.name} />
                  <div style={{ paddingLeft: 42, marginTop: 2 }}>
                    <div style={{ color: '#8B9890', fontSize: '0.68rem' }}>{coin.category}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>${coin.price}</span>
                      <PercentBadge value={coin.change24h} />
                    </div>
                    <div style={{ color: '#8B9890', fontSize: '0.68rem' }}>Market Cap: {coin.marketCapShort}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <span style={{ color: '#8B9890', fontSize: '0.6rem' }}>AI Score</span>
                  <AiScoreBadge score={coin.aiScore} />
                </div>
              </div>
            ))}
          </div>

          {/* Market Overview */}
          <div style={{ ...card, padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>Market Overview</span>
                <InfoIcon />
              </div>
              <button style={{ background: 'none', border: 'none', color: '#A8E000', fontSize: '0.78rem', cursor: 'pointer', padding: 0 }}>View all</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px 8px' }}>
              {[
                { label: 'Total Coins', value: marketOverview.totalCoins, change: marketOverview.totalCoinsChange, pos: true },
                { label: '24h Volume', value: marketOverview.volume24h, change: marketOverview.volumeChange, pos: true },
                { label: 'Market Cap', value: marketOverview.marketCap, change: marketOverview.marketCapChange, pos: true },
                { label: 'BTC Dominance', value: marketOverview.btcDominance, change: marketOverview.btcDominanceChange, pos: false },
                { label: 'ETH Dominance', value: marketOverview.ethDominance, change: marketOverview.ethDominanceChange, pos: true },
                { label: 'Avg 24h Change', value: marketOverview.avgChange24h, change: null, pos: true },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ color: '#8B9890', fontSize: '0.68rem', marginBottom: 2 }}>{stat.label}</div>
                  <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem' }}>{stat.value}</div>
                  {stat.change && (
                    <div style={{ color: stat.pos ? '#A8E000' : '#E5484D', fontSize: '0.7rem', fontWeight: 600 }}>{stat.change}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Screener Tips */}
          <div style={{ ...card, padding: '16px 18px' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: 12 }}>
              Screener Tips
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {screenerTips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: '#A8E000', fontSize: '0.8rem', marginTop: 1 }}>💡</span>
                  <span style={{ color: '#8B9890', fontSize: '0.78rem', lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
