import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function buildDepthData(bids = [], asks = []) {
  const sortedBids = [...bids].sort((a, b) => b.price - a.price);
  const sortedAsks = [...asks].sort((a, b) => a.price - b.price);

  let cumBid = 0;
  const bidPoints = sortedBids.map(r => { cumBid += r.amount; return { price: r.price, bid: parseFloat(cumBid.toFixed(4)) }; });

  let cumAsk = 0;
  const askPoints = sortedAsks.map(r => { cumAsk += r.amount; return { price: r.price, ask: parseFloat(cumAsk.toFixed(4)) }; });

  const map = {};
  bidPoints.forEach(p => { map[p.price] = { price: p.price, bid: p.bid }; });
  askPoints.forEach(p => {
    if (map[p.price]) map[p.price].ask = p.ask;
    else map[p.price] = { price: p.price, ask: p.ask };
  });

  return Object.values(map).sort((a, b) => a.price - b.price);
}

export default function MarketDepthChart({ orderBook = {} }) {
  // prefer wider depthBids/depthAsks if available, fall back to orderBook rows
  const bids = orderBook.depthBids || orderBook.bids || [];
  const asks = orderBook.depthAsks || orderBook.asks || [];
  const data = buildDepthData(bids, asks);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#131815' }}>
      <div className="flex items-center justify-between px-3 py-2 border-b flex-shrink-0" style={{ borderColor: '#1F2722' }}>
        <span className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>Market Depth</span>
        <button className="flex items-center gap-1 text-xs px-2 py-1 rounded border" style={{ color: '#8B9890', borderColor: '#1F2722' }}>
          100 <span>▾</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 px-1 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="price"
              tickFormatter={v => v.toLocaleString()}
              tick={{ fill: '#6B7670', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#6B7670', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#141A17', border: '1px solid #1F2722', borderRadius: 6, fontSize: 11 }}
              labelFormatter={v => `Price: ${v.toLocaleString()}`}
              formatter={(val, name) => [val.toFixed(4), name === 'bid' ? 'Bids' : 'Asks']}
            />
            <Area type="stepAfter" dataKey="bid" stroke="#7ED321" fill="#7ED32122" strokeWidth={1.5} dot={false} />
            <Area type="stepBefore" dataKey="ask" stroke="#E5484D" fill="#E5484D22" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-2 text-xs" style={{ color: '#8B9890' }}>
        <span className="flex items-center gap-1"><span style={{ color: '#7ED321' }}>●</span> Bids</span>
        <span className="flex items-center gap-1"><span style={{ color: '#E5484D' }}>●</span> Asks</span>
      </div>
    </div>
  );
}
