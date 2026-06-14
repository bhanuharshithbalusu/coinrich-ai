export default function RecentTradesTable({ trades = [] }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#131815' }}>
      <div className="px-2 py-2 border-b" style={{ borderColor: '#1F2722' }}>
        <span className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>Recent Trades</span>
      </div>

      {/* Column labels */}
      <div className="flex px-2 py-1 text-xs" style={{ color: '#6B7670' }}>
        <span style={{ flex: '0 0 45%' }}>Price (USDT)</span>
        <span className="text-right" style={{ flex: '0 0 30%' }}>Amount (BTC)</span>
        <span className="text-right" style={{ flex: '0 0 25%' }}>Time</span>
      </div>

      <div className="flex flex-col overflow-y-auto flex-1">
        {trades.map((t, i) => {
          const color = t.side === 'buy' ? '#7ED321' : '#E5484D';
          return (
            <div key={i} className="flex items-center px-2 text-xs hover:bg-white hover:bg-opacity-5" style={{ minHeight: 20 }}>
              <span className="font-medium" style={{ color, flex: '0 0 45%' }}>
                {t.side === 'buy' ? '+' : ''}{t.price.toFixed(2)}
              </span>
              <span className="text-right" style={{ color: '#FFFFFF', flex: '0 0 30%' }}>{t.amount.toFixed(5)}</span>
              <span className="text-right" style={{ color: '#6B7670', flex: '0 0 25%' }}>{t.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
