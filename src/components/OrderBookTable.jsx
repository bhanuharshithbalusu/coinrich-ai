export default function OrderBookTable({ orderBook = {}, currentPrice = 0 }) {
  const asks = [...(orderBook.asks || [])].reverse();
  const bids = orderBook.bids || [];

  const maxAsk = Math.max(...asks.map(r => r.total), 1);
  const maxBid = Math.max(...bids.map(r => r.total), 1);

  const spread = asks.length && bids.length
    ? (asks[asks.length - 1].price - bids[0].price).toFixed(2)
    : '0.00';

  const Row = ({ row, side, max }) => {
    const pct = (row.total / max) * 100;
    const color = side === 'ask' ? '#E5484D' : '#7ED321';
    const bgColor = side === 'ask' ? 'rgba(229,72,77,0.12)' : 'rgba(126,211,33,0.12)';
    return (
      <div className="relative flex items-center text-xs py-px px-2 hover:bg-white hover:bg-opacity-5 cursor-default" style={{ minHeight: 20 }}>
        <div className="absolute right-0 top-0 bottom-0" style={{ width: `${pct}%`, backgroundColor: bgColor }} />
        <span className="relative font-medium" style={{ color, flex: '0 0 38%' }}>{row.price.toFixed(2)}</span>
        <span className="relative text-right" style={{ color: '#FFFFFF', flex: '0 0 30%' }}>{row.amount.toFixed(4)}</span>
        <span className="relative text-right" style={{ color: '#8B9890', flex: '0 0 32%' }}>{row.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full text-xs" style={{ backgroundColor: '#131815' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b" style={{ borderColor: '#1F2722' }}>
        <span className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>Order Book</span>
        <span className="text-xs px-1.5 py-0.5 rounded border" style={{ color: '#8B9890', borderColor: '#1F2722' }}>0.01</span>
      </div>

      {/* Column labels */}
      <div className="flex px-2 py-1" style={{ color: '#6B7670' }}>
        <span style={{ flex: '0 0 38%' }}>Price (USDT)</span>
        <span className="text-right" style={{ flex: '0 0 30%' }}>Amount (BTC)</span>
        <span className="text-right" style={{ flex: '0 0 32%' }}>Total (USDT)</span>
      </div>

      {/* Asks — reversed so lowest ask nearest mid */}
      <div className="flex flex-col-reverse overflow-hidden" style={{ flex: 1 }}>
        {asks.map((row, i) => <Row key={i} row={row} side="ask" max={maxAsk} />)}
      </div>

      {/* Mid price */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-y" style={{ borderColor: '#1F2722', backgroundColor: '#0E1310' }}>
        <span className="font-bold" style={{ color: '#7ED321', fontSize: 13 }}>
          {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} ↑
        </span>
        <span style={{ color: '#8B9890' }}>${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>

      {/* Spread row */}
      <div className="flex items-center px-2 py-0.5" style={{ backgroundColor: '#0E1310' }}>
        <span style={{ color: '#6B7670', fontSize: 11 }}>Spread</span>
        <span className="ml-auto" style={{ color: '#6B7670', fontSize: 11 }}>0.0000%</span>
      </div>

      {/* Bids */}
      <div className="flex flex-col overflow-hidden" style={{ flex: 1 }}>
        {bids.map((row, i) => <Row key={i} row={row} side="bid" max={maxBid} />)}
      </div>
    </div>
  );
}
