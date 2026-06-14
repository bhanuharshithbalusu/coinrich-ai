import { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import WalletCard from '../components/WalletCard';
import ActivityFeed from '../components/ActivityFeed';
import DataTable, { PercentBadge } from '../components/DataTable';
import TableCard from '../components/TableCard';
import ToggleSwitch from '../components/ToggleSwitch';
import CoinIdentifier from '../components/CoinIdentifier';
import { wallets } from '../data/wallets';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const WALLET_TABS = wallets.connectedWallets.map(w => w.id);

function TabGroup({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1F2722' }}>
      {tabs.map(tab => {
        const wallet = wallets.connectedWallets.find(w => w.id === tab);
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              borderBottom: isActive ? '2px solid #A8E000' : '2px solid transparent',
              color: isActive ? '#A8E000' : '#8B9890',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
              marginBottom: -1,
            }}
          >
            {wallet?.name ?? tab}
          </button>
        );
      })}
    </div>
  );
}

function TinySparkline({ data = [], color = '#A8E000' }) {
  return (
    <div style={{ width: 64, height: 28 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={`tsp-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="100%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5}
            fill={`url(#tsp-${color.replace('#','')})`} dot={false} isAnimationActive={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const holdingsColumns = [
  { key: 'rank', header: '#', width: '36px', align: 'center',
    render: v => <span style={{ color: '#6B7670', fontSize: '0.8rem' }}>{v}</span> },
  { key: 'name', header: 'Asset', width: '160px',
    render: (_, row) => (
      <CoinIdentifier
        symbol={row.symbol}
        name={row.name}
      />
    )
  },
  { key: 'price', header: 'Price', align: 'right', width: '110px',
    render: v => <span style={{ fontSize: '0.85rem' }}>${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> },
  { key: 'amount', header: 'Amount', align: 'right', width: '120px',
    render: (v, row) => <span style={{ color: '#8B9890', fontSize: '0.85rem' }}>{v} {row.symbol}</span> },
  { key: 'value', header: 'Value (USD)', align: 'right', width: '110px',
    render: v => <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> },
  { key: 'allocation', header: 'Allocation', align: 'right', width: '120px',
    render: v => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.8rem', color: '#8B9890' }}>{v.toFixed(2)}%</span>
        <div style={{ width: 48, height: 4, borderRadius: 2, background: '#1F2722', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(v, 100)}%`, height: '100%', background: '#A8E000', borderRadius: 2 }} />
        </div>
      </div>
    )
  },
  { key: 'change24h', header: '24H Change', align: 'right', width: '100px',
    render: v => <PercentBadge value={v} /> },
  { key: 'pnl', header: 'PnL', align: 'right', width: '100px',
    render: (v) => <span style={{ color: v >= 0 ? '#A8E000' : '#E5484D', fontSize: '0.85rem', fontWeight: 600 }}>{v >= 0 ? '+' : ''}${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> },
  { key: 'pnlPercent', header: 'PnL %', align: 'right', width: '80px',
    render: v => <PercentBadge value={v} /> },
  { key: 'sparkline', header: '', width: '80px', align: 'right',
    render: (data, row) => {
      const c = (row.change24h ?? 0) >= 0 ? '#A8E000' : '#E5484D';
      return <TinySparkline data={data} color={c} />;
    }
  },
];

export default function Wallets() {
  const [activeWalletId, setActiveWalletId] = useState('metamask');
  const [holdingsTab, setHoldingsTab] = useState('metamask');
  const [hideSmall, setHideSmall] = useState(false);

  const overview = wallets.walletOverview;
  const holdings = wallets.holdingsByWallet[holdingsTab] ?? [];
  const filteredHoldings = hideSmall ? holdings.filter(h => h.value >= 10) : holdings;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          backgroundColor: '#A8E000', color: '#0A0E0C',
          border: 'none', borderRadius: 8, padding: '10px 16px',
          fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#94C700'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#A8E000'; }}
        >
          <Plus size={16} />
          Connect Wallet
        </button>
      </div>

      {/* Connected Wallets row */}
      <div>
        <h2 style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 12px 0' }}>Connected Wallets</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {wallets.connectedWallets.map(w => (
            <WalletCard
              key={w.id}
              mode="selector"
              wallet={w}
              active={w.id === activeWalletId}
              onClick={() => setActiveWalletId(w.id)}
            />
          ))}
          {/* Connect More card */}
          <div style={{
            backgroundColor: '#131815',
            border: '1px dashed #2A332D',
            borderRadius: 12,
            padding: '14px 16px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            minHeight: 90,
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#A8E000'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A332D'; }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: '#1A211C', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Plus size={18} color="#A8E000" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>Connect More</div>
              <div style={{ color: '#6B7670', fontSize: '0.7rem', marginTop: 2 }}>150+ wallets supported</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Overview */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>Wallet Overview</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <select style={{
              background: '#131815', border: '1px solid #1F2722', borderRadius: 6,
              color: '#FFFFFF', fontSize: '0.8rem', padding: '4px 10px', cursor: 'pointer',
            }}>
              <option>USD</option><option>BTC</option>
            </select>
            <select style={{
              background: '#131815', border: '1px solid #1F2722', borderRadius: 6,
              color: '#FFFFFF', fontSize: '0.8rem', padding: '4px 10px', cursor: 'pointer',
            }}>
              <option>24H</option><option>7D</option><option>1M</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {wallets.connectedWallets.map(w => (
            <WalletCard
              key={w.id}
              mode="overview"
              wallet={w}
              overview={overview[w.id]}
            />
          ))}
        </div>
      </div>

      {/* Holdings + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>
        {/* Holdings table */}
        <TableCard
          title="Holdings by Wallet"
          style={{ padding: 0 }}
        >
          {/* Tabs + toggle bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 16px', borderBottom: '1px solid #1F2722',
          }}>
            <TabGroup
              tabs={WALLET_TABS}
              active={holdingsTab}
              onChange={setHoldingsTab}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingLeft: 12 }}>
              <span style={{ color: '#8B9890', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Hide Small Balances</span>
              <ToggleSwitch checked={hideSmall} onChange={setHideSmall} />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <DataTable columns={holdingsColumns} data={filteredHoldings} />
          </div>

          <div style={{ padding: '12px 0', textAlign: 'center', borderTop: '1px solid #1F2722' }}>
            <button style={{
              background: 'none', border: 'none', color: '#A8E000',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
            }}>
              View all holdings →
            </button>
          </div>
        </TableCard>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: '#131815',
          border: '1px solid #1F2722',
          borderRadius: 12,
          padding: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600 }}>Recent Activity</span>
            <button style={{ background: 'none', border: 'none', color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>
              View All
            </button>
          </div>
          <ActivityFeed items={wallets.recentActivity} />
        </div>
      </div>

      {/* Security note */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 8 }}>
        <Shield size={14} color="#6B7670" />
        <span style={{ color: '#6B7670', fontSize: '0.78rem' }}>
          Your wallets are secure. We never store your private keys.
        </span>
      </div>
    </div>
  );
}
