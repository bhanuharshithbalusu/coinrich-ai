import { useState } from 'react';

const TABS = ['Open Orders', 'Order History', 'Trade History', 'Funds'];

const STATUS_COLORS = {
  'Partially Filled': '#F5A623',
  'New': '#8B9890',
  'Filled': '#7ED321',
  'Cancelled': '#E5484D',
};

export default function OpenOrdersPanel({ openOrders = [] }) {
  const [tab, setTab] = useState('Open Orders');

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#131815' }}>
      {/* Tabs */}
      <div className="flex items-center border-b px-3" style={{ borderColor: '#1F2722' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-3 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap"
            style={{
              borderColor: tab === t ? '#A8E000' : 'transparent',
              color: tab === t ? '#A8E000' : '#8B9890',
            }}
          >
            {t}{t === 'Open Orders' ? ` (${openOrders.length})` : ''}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ color: '#6B7670' }}>
              {['Pair','Type','Side','Price','Amount','Filled','Total','Status','Time','Action'].map(h => (
                <th key={h} className="px-3 py-2 text-left font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tab === 'Open Orders' && openOrders.map((o, i) => (
              <tr key={i} className="border-t hover:bg-white hover:bg-opacity-5" style={{ borderColor: '#1F2722' }}>
                <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: '#FFFFFF' }}>{o.pair}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#8B9890' }}>{o.type}</td>
                <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: o.side === 'Buy' ? '#7ED321' : '#E5484D' }}>{o.side}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{o.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{o.amount.toFixed(5)} BTC</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#8B9890' }}>{o.filled.toFixed(5)} ({o.filledPercent}%)</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{o.total.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ color: STATUS_COLORS[o.status] || '#8B9890', backgroundColor: `${STATUS_COLORS[o.status]}18` }}>
                    {o.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#8B9890' }}>{o.time}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button className="text-xs font-medium hover:opacity-80" style={{ color: '#E5484D' }}>Cancel</button>
                </td>
              </tr>
            ))}
            {tab !== 'Open Orders' && (
              <tr><td colSpan={10} className="px-3 py-6 text-center" style={{ color: '#6B7670' }}>No records</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
