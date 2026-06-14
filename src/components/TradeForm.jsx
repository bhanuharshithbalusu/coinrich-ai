import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ACCOUNT_TABS = ['Spot', 'Cross 5x', 'Isolated 10x'];
const ORDER_TABS = ['Limit', 'Market', 'Stop Limit'];
const MARKS = [0, 25, 50, 75, 100];

function SideForm({ side, currency, available, availableCurrency, price, accentColor, buttonLabel }) {
  const [pct, setPct] = useState(0);

  return (
    <div className="flex flex-col gap-1.5" style={{ flex: 1, minWidth: 0 }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xs" style={{ color: '#FFFFFF' }}>{side} {currency}</span>
        <span className="text-xs" style={{ color: '#8B9890' }}>
          Available&nbsp;<span style={{ color: '#FFFFFF' }}>{available}</span>&nbsp;{availableCurrency}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center px-2 py-1.5 rounded border" style={{ backgroundColor: '#0E1310', borderColor: '#1F2722' }}>
        <span className="text-xs w-10 flex-shrink-0" style={{ color: '#6B7670' }}>Price</span>
        <input className="flex-1 bg-transparent text-right text-xs outline-none" style={{ color: '#FFFFFF' }} defaultValue={price} readOnly />
        <span className="text-xs ml-1.5 flex-shrink-0" style={{ color: '#6B7670' }}>USDT</span>
      </div>

      {/* Amount */}
      <div className="flex items-center px-2 py-1.5 rounded border" style={{ backgroundColor: '#0E1310', borderColor: '#1F2722' }}>
        <span className="text-xs w-10 flex-shrink-0" style={{ color: '#6B7670' }}>Amount</span>
        <input className="flex-1 bg-transparent text-right text-xs outline-none" style={{ color: '#FFFFFF' }} placeholder="" />
        <span className="text-xs ml-1.5 flex-shrink-0" style={{ color: '#6B7670' }}>{currency}</span>
      </div>

      {/* Slider */}
      <div className="px-0.5">
        <input
          type="range" min={0} max={100} step={25} value={pct}
          onChange={e => setPct(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{ accentColor }}
        />
        <div className="flex justify-between mt-0.5">
          {MARKS.map(m => (
            <span key={m} onClick={() => setPct(m)} className="text-xs cursor-pointer select-none"
              style={{ color: pct >= m ? accentColor : '#6B7670' }}>
              {m}%
            </span>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center px-2 py-1.5 rounded border" style={{ backgroundColor: '#0E1310', borderColor: '#1F2722' }}>
        <span className="text-xs w-10 flex-shrink-0" style={{ color: '#6B7670' }}>Total</span>
        <input className="flex-1 bg-transparent text-right text-xs outline-none" style={{ color: '#FFFFFF' }} placeholder="" readOnly />
        <span className="text-xs ml-1.5 flex-shrink-0" style={{ color: '#6B7670' }}>USDT</span>
      </div>

      {/* Button */}
      <button
        className="w-full py-2 rounded font-semibold text-xs mt-0.5"
        style={{ backgroundColor: accentColor, color: accentColor === '#E5484D' ? '#FFFFFF' : '#000000' }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default function TradeForm({ price = 64893.29, available = { USDT: 12450.25, BTC: 0.568742 } }) {
  const [accountTab, setAccountTab] = useState('Spot');
  const [orderTab, setOrderTab] = useState('Limit');

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: '#131815' }}>
      {/* Account type tabs */}
      <div className="flex items-center justify-between border-b flex-shrink-0" style={{ borderColor: '#1F2722' }}>
        <div className="flex">
          {ACCOUNT_TABS.map(t => (
            <button key={t} onClick={() => setAccountTab(t)}
              className="px-3 py-2 text-xs font-medium border-b-2 transition-colors"
              style={{ borderColor: accountTab === t ? '#A8E000' : 'transparent', color: accountTab === t ? '#A8E000' : '#8B9890' }}>
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-xs pr-3" style={{ color: '#8B9890' }}>
          Fee Level <ChevronDown size={10} />
        </button>
      </div>

      {/* Order type tabs */}
      <div className="flex items-center gap-1 px-3 py-1 border-b flex-shrink-0" style={{ borderColor: '#1F2722' }}>
        {ORDER_TABS.map(t => (
          <button key={t} onClick={() => setOrderTab(t)}
            className="px-2 py-1 text-xs border-b-2 flex items-center gap-0.5"
            style={{ borderColor: orderTab === t ? '#A8E000' : 'transparent', color: orderTab === t ? '#A8E000' : '#8B9890' }}>
            {t}{t === 'Stop Limit' && <ChevronDown size={9} />}
          </button>
        ))}
      </div>

      {/* Buy + Sell side by side */}
      <div className="flex gap-3 px-3 py-2 flex-1 min-h-0 overflow-hidden">
        <SideForm
          side="Buy" currency="BTC"
          available={available.USDT.toLocaleString()} availableCurrency="USDT"
          price={price.toFixed(2)} accentColor="#7ED321" buttonLabel="Buy BTC"
        />
        <div className="w-px flex-shrink-0" style={{ backgroundColor: '#1F2722' }} />
        <SideForm
          side="Sell" currency="BTC"
          available={available.BTC.toFixed(6)} availableCurrency="BTC"
          price={price.toFixed(2)} accentColor="#E5484D" buttonLabel="Sell BTC"
        />
      </div>
    </div>
  );
}
