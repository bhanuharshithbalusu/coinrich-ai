import { useState } from 'react';

export default function PositionsPanel({ positions = [] }) {
  const [hideOthers, setHideOthers] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#131815' }}>
      <div className="flex items-center justify-between px-3 py-2.5 border-b" style={{ borderColor: '#1F2722' }}>
        <span className="text-xs font-medium" style={{ color: '#FFFFFF' }}>Positions ({positions.length})</span>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={hideOthers}
            onChange={e => setHideOthers(e.target.checked)}
            className="w-3 h-3 rounded"
            style={{ accentColor: '#A8E000' }}
          />
          <span className="text-xs" style={{ color: '#8B9890' }}>Hide Other Pairs</span>
        </label>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ color: '#6B7670' }}>
              {['Pair','Size','Entry Price','Mark Price','Liq. Price','PnL (USDT)','PnL %','Action'].map(h => (
                <th key={h} className="px-3 py-2 text-left font-normal whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="border-t hover:bg-white hover:bg-opacity-5" style={{ borderColor: '#1F2722' }}>
                <td className="px-3 py-2 whitespace-nowrap">
                  <div style={{ color: '#FFFFFF' }} className="font-medium">{p.pair}</div>
                  <div className="text-xs mt-0.5">
                    <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#1A2E14', color: '#7ED321' }}>
                      {p.side} {p.leverage}x
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{p.size.toFixed(5)} BTC</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{p.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#FFFFFF' }}>{p.markPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: '#E5484D' }}>{p.liqPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 whitespace-nowrap font-medium" style={{ color: p.pnl >= 0 ? '#7ED321' : '#E5484D' }}>
                  {p.pnl >= 0 ? '+' : ''}{p.pnl.toFixed(2)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap font-medium" style={{ color: p.pnlPercent >= 0 ? '#7ED321' : '#E5484D' }}>
                  {p.pnlPercent >= 0 ? '+' : ''}{p.pnlPercent.toFixed(2)}%
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button className="text-xs px-3 py-1 rounded border" style={{ color: '#FFFFFF', borderColor: '#2A332D' }}>Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
