import { useLocation } from 'react-router-dom';
import CandlestickChart from '../components/CandlestickChart';
import OrderBookTable from '../components/OrderBookTable';
import RecentTradesTable from '../components/RecentTradesTable';
import TradeForm from '../components/TradeForm';
import MarketDepthChart from '../components/MarketDepthChart';
import OpenOrdersPanel from '../components/OpenOrdersPanel';
import PositionsPanel from '../components/PositionsPanel';
import { terminal, candles } from '../data/terminal';

function PairHeader({ data }) {
  const isPositive = data.change24h >= 0;
  const changeColor = isPositive ? '#A8E000' : '#E5484D';

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      backgroundColor: '#131815', borderBottom: '1px solid #1F2722',
      padding: '10px 16px', flexShrink: 0, flexWrap: 'wrap', gap: '0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '24px' }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', backgroundColor: '#F5A623',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 700, color: '#000', flexShrink: 0,
        }}>₿</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700 }}>{data.pair}</span>
            <span style={{ color: '#6B7670', fontSize: '0.65rem', cursor: 'pointer' }}>★</span>
          </div>
          <div style={{ color: '#8B9890', fontSize: '0.65rem' }}>Bitcoin / Tether</div>
        </div>
      </div>

      <div style={{ marginRight: '24px' }}>
        <div style={{ color: changeColor, fontSize: '1.25rem', fontWeight: 700 }}>
          {data.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div style={{ color: changeColor, fontSize: '0.72rem' }}>
          ${data.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      {[
        { label: '24h Change',        value: `+${data.change24h.toFixed(2)}% (+${data.change24hAbs.toLocaleString('en-US', { minimumFractionDigits: 2 })})`, color: changeColor },
        { label: '24h High',          value: data.high24h.toLocaleString('en-US', { minimumFractionDigits: 2 }),  color: '#FFFFFF' },
        { label: '24h Low',           value: data.low24h.toLocaleString('en-US', { minimumFractionDigits: 2 }),   color: '#FFFFFF' },
        { label: '24h Volume (BTC)',   value: data.volume24hBTC.toLocaleString('en-US', { minimumFractionDigits: 2 }), color: '#FFFFFF' },
        { label: '24h Volume (USDT)', value: `${data.volume24hUSDT.toFixed(2)}B`, color: '#FFFFFF' },
        { label: 'Funding / Countdown', value: `${data.funding.rate.toFixed(4)}% / ${data.funding.countdown}`, color: '#F5A623' },
      ].map(stat => (
        <div key={stat.label} style={{ marginRight: '24px' }}>
          <div style={{ color: '#8B9890', fontSize: '0.65rem', marginBottom: '2px' }}>{stat.label}</div>
          <div style={{ color: stat.color, fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

export default function Terminal() {
  useLocation();
  const card = { backgroundColor: '#131815', border: 'none' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <PairHeader data={terminal} />

      {/* Chart | OrderBook | RecentTrades */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 190px', gap: '1px', backgroundColor: '#1F2722' }}>
        <div style={{ ...card, minHeight: 490 }}>
          <CandlestickChart candles={candles} movingAverages={terminal.movingAverages} />
        </div>
        <div style={{ ...card, overflow: 'hidden', minHeight: 490 }}>
          <OrderBookTable orderBook={terminal.orderBook} currentPrice={terminal.price} />
        </div>
        <div style={{ ...card, overflow: 'hidden', minHeight: 490 }}>
          <RecentTradesTable trades={terminal.recentTrades} />
        </div>
      </div>

      {/* TradeForm | MarketDepth */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1px', backgroundColor: '#1F2722' }}>
        <div style={{ ...card, minHeight: 265 }}>
          <TradeForm price={terminal.price} available={terminal.availableBalance} />
        </div>
        <div style={{ ...card, minHeight: 265, padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600 }}>Market Depth</span>
            <select style={{ background: '#0A0E0C', border: '1px solid #2A332D', borderRadius: 4, color: '#8B9890', fontSize: '0.72rem', padding: '2px 6px', cursor: 'pointer' }}>
              <option>100</option><option>50</option><option>20</option>
            </select>
          </div>
          <MarketDepthChart orderBook={terminal.orderBook} />
        </div>
      </div>

      {/* OpenOrders | Positions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: '1px', backgroundColor: '#1F2722', minHeight: 165 }}>
        <div style={card}>
          <OpenOrdersPanel openOrders={terminal.openOrders} />
        </div>
        <div style={card}>
          <PositionsPanel positions={terminal.positions} />
        </div>
      </div>

    </div>
  );
}
