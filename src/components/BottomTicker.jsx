const TICKER_PAIRS = [
  { pair: 'BTC/USDT', change: 1.82, price: 64893.29 },
  { pair: 'ETH/USDT', change: 2.65, price: 3421.59 },
  { pair: 'SOL/USDT', change: 4.25, price: 175.34 },
  { pair: 'BNB/USDT', change: 1.35, price: 592.34 },
  { pair: 'XRP/USDT', change: 1.12, price: 0.52 },
  { pair: 'ADA/USDT', change: 1.87, price: 0.4612 },
];

export default function BottomTicker() {
  return (
    <div
      className="flex items-center gap-6 px-4 border-t flex-shrink-0 overflow-x-auto"
      style={{ backgroundColor: '#0A0E0C', borderColor: '#1F2722', height: 36, minHeight: 36 }}
    >
      {/* Network status */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-xs" style={{ color: '#8B9890' }}>Network</span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#7ED321' }} />
        <span className="text-xs font-medium" style={{ color: '#7ED321' }}>Stable</span>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2" height="4" rx="1" fill="#7ED321" />
          <rect x="3" y="4" width="2" height="6" rx="1" fill="#7ED321" />
          <rect x="6" y="2" width="2" height="8" rx="1" fill="#7ED321" />
          <rect x="9" y="0" width="2" height="10" rx="1" fill="#7ED321" />
        </svg>
      </div>

      <div className="w-px h-4" style={{ backgroundColor: '#1F2722' }} />

      {/* Pairs */}
      {TICKER_PAIRS.map(({ pair, change, price }) => {
        const pos = change >= 0;
        const color = pos ? '#7ED321' : '#E5484D';
        return (
          <div key={pair} className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <span className="text-xs font-medium" style={{ color: '#8B9890' }}>{pair}</span>
            <span className="text-xs font-medium" style={{ color }}>{pos ? '+' : ''}{change}%</span>
            <span className="text-xs" style={{ color: '#FFFFFF' }}>
              {price < 1 ? price.toFixed(4) : price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        );
      })}

      <div className="flex-1" />

      {/* Announcements */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-xs" style={{ color: '#8B9890' }}>Announcements</span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#A8E000' }} />
      </div>
    </div>
  );
}
