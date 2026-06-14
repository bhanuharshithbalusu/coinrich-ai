function genCandles(count = 120) {
  const candles = [];
  let t = Math.floor(Date.now() / 1000) - count * 3600;
  let close = 63200;
  for (let i = 0; i < count; i++) {
    const open = close;
    const move = (Math.random() - 0.47) * 400;
    close = Math.max(60000, Math.min(67000, open + move));
    const high = Math.max(open, close) + Math.random() * 250;
    const low  = Math.min(open, close) - Math.random() * 250;
    const volume = 800 + Math.random() * 2400;
    candles.push({ time: t, open, high, low, close, volume });
    t += 3600;
  }
  return candles;
}

export const candles = genCandles(120);

export const terminal = {
  pair: 'BTC/USDT',
  baseCurrency: 'BTC',
  quoteCurrency: 'USDT',
  price: 64893.29,
  change24h: 1.82,
  change24hAbs: 1163.35,
  high24h: 65567.21,
  low24h: 63201.34,
  volume24hBTC: 18736.42,
  volume24hUSDT: 1.21,
  funding: { rate: 0.01, countdown: '05:21:37' },
  movingAverages: { ma7: 64512.65, ma25: 64102.33, ma99: 62850.21 },
  orderBook: {
    asks: [
      { price: 64900.00, amount: 0.12560, total:  8150.44 },
      { price: 64899.00, amount: 0.03214, total:  2090.58 },
      { price: 64888.00, amount: 0.21548, total: 13980.74 },
      { price: 64896.00, amount: 0.01542, total:   999.34 },
      { price: 64895.00, amount: 0.26541, total: 17224.05 },
      { price: 64895.00, amount: 0.08123, total:  5278.29 },
      { price: 64894.00, amount: 0.15421, total: 10020.83 },
    ],
    bids: [
      { price: 64893.29, amount: 0.25341, total: 16437.14 },
      { price: 64892.00, amount: 0.12458, total:  8084.38 },
      { price: 64891.00, amount: 0.26542, total: 17230.88 },
      { price: 64890.00, amount: 0.03541, total:  2299.11 },
      { price: 64889.00, amount: 0.15214, total:  9879.62 },
      { price: 64888.00, amount: 0.21235, total: 13784.95 },
      { price: 64887.00, amount: 0.12514, total:  8115.27 },
    ],
  },
  recentTrades: [
    { price: 64893.29, amount: 0.01234, side: 'buy',  time: '11:38:23' },
    { price: 64892.11, amount: 0.00521, side: 'sell', time: '11:38:22' },
    { price: 64891.32, amount: 0.15421, side: 'sell', time: '11:38:21' },
    { price: 64893.29, amount: 0.01524, side: 'buy',  time: '11:38:21' },
    { price: 64890.12, amount: 0.02134, side: 'buy',  time: '11:38:19' },
    { price: 64889.65, amount: 0.04521, side: 'buy',  time: '11:38:18' },
    { price: 64892.12, amount: 0.01023, side: 'sell', time: '11:38:18' },
    { price: 64893.29, amount: 0.03541, side: 'buy',  time: '11:38:16' },
    { price: 64894.01, amount: 0.00854, side: 'sell', time: '11:38:15' },
    { price: 64890.55, amount: 0.04521, side: 'sell', time: '11:38:15' },
    { price: 64889.11, amount: 0.12541, side: 'sell', time: '11:38:13' },
    { price: 64891.75, amount: 0.01245, side: 'buy',  time: '11:38:12' },
    { price: 64893.29, amount: 0.05231, side: 'buy',  time: '11:38:12' },
    { price: 64892.10, amount: 0.01523, side: 'sell', time: '11:38:10' },
    { price: 64890.02, amount: 0.03214, side: 'sell', time: '11:38:09' },
  ],
  openOrders: [
    { pair: 'BTC/USDT', type: 'Limit', side: 'Buy',  price: 64500.00, amount: 0.10000, filled: 0.03000, filledPercent: 30, total: 6450.00,  status: 'Partially Filled', time: '11:35:21' },
    { pair: 'ETH/USDT', type: 'Limit', side: 'Sell', price:  3450.00, amount: 2.00000, filled: 0.00000, filledPercent:  0, total: 6900.00,  status: 'New',              time: '11:34:10' },
  ],
  positions: [
    { pair: 'BTC/USDT', size: 0.25000, side: 'Long', leverage: 5, entryPrice: 64250.10, markPrice: 64893.29, liqPrice: 56210.45, pnl: 160.80, pnlPercent: 1.25 },
  ],
  availableBalance: { USDT: 12450.25, BTC: 0.568742 },
};
