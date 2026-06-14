import { useState } from 'react';
import { useCoinIcons } from '../context/CoinIconsContext';
import GaugeCard from '../components/GaugeCard';
import LineAreaChart from '../components/LineAreaChart';
import DonutChart from '../components/DonutChart';
import {
  portfolioOverview as ov,
  performanceHistory,
  assetAllocation,
  holdings,
  openPositions,
  recentOrders,
} from '../data/portfolio';

// ── Inline sparkline ──────────────────────────────────────────────────────────
function Spark({ data, positive = true, width = 72, height = 28 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  const stroke = positive ? '#A8E000' : '#E5484D';
  const uid = `sp-${Math.random().toString(36).slice(2, 7)}`;
  const last = pts[pts.length - 1].split(',');
  const area = `${pts.join(' ')} ${last[0]},${height} ${pad},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${uid})`} />
      <polyline points={pts.join(' ')} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Stat card with bottom sparkline ──────────────────────────────────────────
function StatCard({ label, value, valueColor, sub, subColor, sparkData, sparkPositive = true }) {
  return (
    <div style={{
      backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: '12px',
      padding: '16px 20px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
        <span style={{ color: '#8B9890', fontSize: '0.78rem' }}>{label}</span>
        <span style={{ color: '#6B7670', fontSize: '0.7rem', cursor: 'help' }}>ⓘ</span>
      </div>
      <div style={{ color: valueColor ?? '#FFFFFF', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && <div style={{ color: subColor ?? '#8B9890', fontSize: '0.75rem', marginTop: 4 }}>{sub}</div>}
      <div style={{ marginTop: 8, marginLeft: -20, marginRight: -20, lineHeight: 0 }}>
        <Spark data={sparkData ?? []} positive={sparkPositive} width={400} height={52} />
      </div>
    </div>
  );
}

// ── Holdings coin cell ────────────────────────────────────────────────────────
function CoinCell({ symbol, name }) {
  const [fail, setFail] = useState(false);
  const iconMap = useCoinIcons();
  const iconUrl = iconMap[symbol];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: '#1F2722', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconUrl && !fail
          ? <img src={iconUrl} alt={symbol} style={{ width: 26, height: 26, objectFit: 'cover' }} onError={() => setFail(true)} />
          : <span style={{ color: '#A8E000', fontSize: '0.55rem', fontWeight: 700 }}>{symbol.slice(0, 3)}</span>}
      </div>
      <div>
        <div style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600 }}>{name}</div>
        <div style={{ color: '#8B9890', fontSize: '0.72rem' }}>{symbol}</div>
      </div>
    </div>
  );
}

const fmtUSD  = v => `$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtPrice = v => v >= 1 ? `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : `$${v.toFixed(4)}`;

const STATUS_COLOR = { Filled: '#A8E000', 'Partially Filled': '#F5A623', New: '#8B9890', Cancelled: '#E5484D' };

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [perfRange, setPerfRange] = useState('7D');
  const RANGES = ['1D', '7D', '30D', '90D', '1Y', 'ALL'];
  const totalValue = ov.totalValue;

  const sparkBase = [110000, 112400, 111800, 116200, 119800, 122500, 125430];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700 }}>Portfolio Overview</span>
          <span style={{ color: '#6B7670', fontSize: '0.85rem', cursor: 'pointer' }}>👁</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {RANGES.map(r => (
            <button key={r} onClick={() => setPerfRange(r)} style={{
              padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              backgroundColor: perfRange === r ? '#2A332D' : 'transparent',
              color: perfRange === r ? '#A8E000' : '#6B7670',
            }}>{r}</button>
          ))}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7670', fontSize: '1rem', marginLeft: 4 }}>↻</button>
        </div>
      </div>

      {/* Top stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: 16, alignItems: 'stretch' }}>
        <StatCard
          label="Total Portfolio Value"
          value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          sub={`₿ ${ov.totalValueBTC.toFixed(4)} BTC`}
          sparkData={sparkBase}
          sparkPositive
        />
        <StatCard
          label="Total PnL"
          value={`+$${ov.totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          valueColor="#A8E000"
          sub={`24h: +$${ov.change24h.toLocaleString('en-US', { minimumFractionDigits: 2 })} (+${ov.change24hPct.toFixed(2)}%)`}
          subColor="#A8E000"
          sparkData={sparkBase}
          sparkPositive
        />
        <StatCard
          label="ROI"
          value={`+${ov.roi.toFixed(2)}%`}
          valueColor="#A8E000"
          sub="All Time"
          sparkData={sparkBase}
          sparkPositive
        />
        <StatCard
          label="24h Change"
          value={`+${ov.change24hPct.toFixed(2)}%`}
          valueColor="#A8E000"
          sparkData={sparkBase}
          sparkPositive
        />
        <div style={{ minWidth: 220 }}>
          <GaugeCard
            title="Risk Score"
            value={ov.riskScore.value}
            min={0} max={100}
            label={ov.riskScore.label}
          />
        </div>
      </div>

      {/* Performance chart + Asset allocation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 16, alignItems: 'stretch' }}>

        {/* Performance chart */}
        <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.975rem', fontWeight: 600 }}>Portfolio Performance</span>
              <span style={{ color: '#6B7670', fontSize: '0.7rem', cursor: 'help' }}>ⓘ</span>
            </div>
            <select style={{ background: '#0A0E0C', border: '1px solid #2A332D', borderRadius: 6, color: '#8B9890', fontSize: '0.75rem', padding: '3px 8px', cursor: 'pointer' }}>
              <option>Total Value</option><option>PnL</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 700 }}>
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 600 }}>+{ov.change24hPct.toFixed(2)}%</span>
          </div>
          <div style={{ flex: 1, minHeight: 220 }}>
            <LineAreaChart
              data={performanceHistory.map(d => ({ label: d.date, value: d.value }))}
              color="#A8E000"
              height="100%"
              showTimeRangeTabs={false}
            />
          </div>
        </div>

        {/* Asset allocation */}
        <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ color: '#FFFFFF', fontSize: '0.975rem', fontWeight: 600 }}>Asset Allocation</span>
            <a href="#" style={{ color: '#A8E000', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none' }}>
              View full allocation ›
            </a>
          </div>
          <DonutChart
            segments={assetAllocation}
            centerLabel="Total"
            centerValue={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          />
        </div>
      </div>

      {/* Holdings + Open Positions + Recent Orders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 16, alignItems: 'start' }}>

        {/* Holdings */}
        <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #1F2722' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 600 }}>Holdings</span>
              <span style={{ color: '#6B7670', fontSize: '0.7rem', cursor: 'help' }}>ⓘ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#0A0E0C', border: '1px solid #1F2722', borderRadius: 6, padding: '4px 8px' }}>
                <span style={{ color: '#6B7670', fontSize: '0.75rem' }}>🔍</span>
                <input placeholder="Search holdings" style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '0.75rem', outline: 'none', width: 110 }} />
              </div>
              <a href="#" style={{ color: '#A8E000', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none' }}>View all ›</a>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1F2722' }}>
                {['#','Asset','Price','Amount','Value','PnL','PnL %','Allocation','7D'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', color: '#6B7670', fontWeight: 500, textAlign: h === '#' ? 'left' : 'right', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
                <th style={{ width: 24 }} />
              </tr>
            </thead>
            <tbody>
              {holdings.map(h => (
                <tr key={h.symbol} style={{ borderBottom: '1px solid #1A211C', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1A211C'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '10px 12px', color: '#6B7670' }}>{h.rank}</td>
                  <td style={{ padding: '10px 12px' }}><CoinCell symbol={h.symbol} name={h.name} /></td>
                  <td style={{ padding: '10px 12px', color: '#FFFFFF', textAlign: 'right' }}>{fmtPrice(h.price)}</td>
                  <td style={{ padding: '10px 12px', color: '#FFFFFF', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {h.amount.toLocaleString('en-US', { maximumFractionDigits: 3 })} {h.amountUnit}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#FFFFFF', textAlign: 'right', fontWeight: 600 }}>{fmtUSD(h.value)}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: h.pnl >= 0 ? '#A8E000' : '#E5484D', fontWeight: 500 }}>
                    {h.pnl >= 0 ? '+' : '-'}{fmtUSD(h.pnl)}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: h.pnlPercent >= 0 ? '#A8E000' : '#E5484D', fontWeight: 600 }}>
                    {h.pnlPercent >= 0 ? '+' : ''}{h.pnlPercent.toFixed(2)}%
                  </td>
                  <td style={{ padding: '10px 12px', color: '#8B9890', textAlign: 'right' }}>{h.allocation.toFixed(1)}%</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <Spark data={h.sparkline} positive={h.pnlPercent >= 0} width={56} height={24} />
                  </td>
                  <td style={{ padding: '10px 8px', color: '#6B7670', fontSize: '0.9rem', cursor: 'pointer' }}>⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid #1F2722' }}>
            <a href="#" style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
              View all holdings ›
            </a>
          </div>
        </div>

        {/* Right: Open Positions + Recent Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Open Positions */}
          <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #1F2722' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>Open Positions</span>
                <span style={{ color: '#6B7670', fontSize: '0.7rem', cursor: 'help' }}>ⓘ</span>
              </div>
              <a href="#" style={{ color: '#A8E000', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none' }}>View all ›</a>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1F2722' }}>
                  {['Pair','Side','Size','Entry Price','Mark Price','PnL (USDT)','PnL %'].map(h => (
                    <th key={h} style={{ padding: '7px 12px', color: '#6B7670', fontWeight: 500, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {openPositions.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1A211C' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1A211C'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF', fontWeight: 600 }}>{p.pair}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ backgroundColor: '#1A2E14', color: '#A8E000', fontSize: '0.7rem', fontWeight: 600, padding: '2px 6px', borderRadius: 4 }}>
                        {p.side} {p.leverage}x
                      </span>
                    </td>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF' }}>{p.size} {p.pair.split('/')[0]}</td>
                    <td style={{ padding: '8px 12px', color: '#8B9890' }}>${p.entryPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF' }}>${p.markPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '8px 12px', color: p.pnl >= 0 ? '#A8E000' : '#E5484D', fontWeight: 600 }}>
                      {p.pnl >= 0 ? '+' : ''}{fmtUSD(p.pnl)}
                    </td>
                    <td style={{ padding: '8px 12px', color: p.pnlPercent >= 0 ? '#A8E000' : '#E5484D', fontWeight: 600 }}>
                      {p.pnlPercent >= 0 ? '+' : ''}{p.pnlPercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Orders */}
          <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #1F2722' }}>
              <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 600 }}>Recent Orders</span>
              <a href="#" style={{ color: '#A8E000', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none' }}>View all ›</a>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1F2722' }}>
                  {['Pair','Type','Side','Amount','Price','Filled','Status','Time'].map(h => (
                    <th key={h} style={{ padding: '7px 12px', color: '#6B7670', fontWeight: 500, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1A211C' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1A211C'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF', fontWeight: 600 }}>{o.pair}</td>
                    <td style={{ padding: '8px 12px', color: '#8B9890' }}>{o.type}</td>
                    <td style={{ padding: '8px 12px', color: o.side === 'Buy' ? '#A8E000' : '#E5484D', fontWeight: 600 }}>{o.side}</td>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF' }}>{o.amount}</td>
                    <td style={{ padding: '8px 12px', color: '#FFFFFF' }}>${o.price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
                    <td style={{ padding: '8px 12px', color: '#8B9890' }}>{o.filled}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span style={{ color: STATUS_COLOR[o.status] ?? '#8B9890', backgroundColor: `${STATUS_COLOR[o.status] ?? '#8B9890'}18`, fontSize: '0.7rem', fontWeight: 600, padding: '2px 7px', borderRadius: 10 }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: '8px 12px', color: '#6B7670' }}>{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div style={{ backgroundColor: '#131815', border: '1px solid #1F2722', borderRadius: 12, padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[
          { icon: '💼', label: 'Available Balance',  value: `$${ov.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, color: '#FFFFFF' },
          { icon: '📈', label: 'Unrealized PnL',     value: `+$${ov.unrealizedPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })} (+${ov.unrealizedPnlPct.toFixed(2)}%)`, color: '#A8E000' },
          { icon: '💳', label: 'Buying Power',       value: `$${ov.buyingPower.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, color: '#FFFFFF' },
          { icon: '🏦', label: 'Total Invested',     value: `$${ov.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, color: '#FFFFFF' },
          { icon: '⚡', label: 'Fees (24h)',          value: `$${ov.fees24h.toFixed(2)}`, color: '#FFFFFF' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
            <div>
              <div style={{ color: '#8B9890', fontSize: '0.72rem', marginBottom: 2 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: '0.95rem', fontWeight: 700 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
