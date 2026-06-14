const cg = (id, file) => `https://assets.coingecko.com/coins/images/${id}/small/${file}`;

export const coins = [
  {
    id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin',
    iconUrl: cg(1, 'bitcoin.png'), price: 64893.29,
    change24h: 1.82, change7d: 4.37,
    marketCap: 1280000000000, volume24h: 28420000000,
    circulatingSupply: '19.73M BTC',
    sparkline7d: [62000, 62500, 63000, 64000, 64893],
    low24h: 63201.34, high24h: 65567.21,
    rsi14: 62.4, macd: 'Bullish', aiScore: 92,
  },
  {
    id: 'ethereum', symbol: 'ETH', name: 'Ethereum',
    iconUrl: cg(279, 'ethereum.png'), price: 3421.59,
    change24h: 2.65, change7d: 6.12,
    marketCap: 411000000000, volume24h: 14200000000,
    circulatingSupply: '120.2M ETH',
    sparkline7d: [3100, 3200, 3300, 3400, 3421],
    low24h: 3301.12, high24h: 3512.88,
    rsi14: 58.2, macd: 'Bullish', aiScore: 85,
  },
];

export const watchlist = [
  { id: 'btc', rank: 1, symbol: 'BTC', name: 'Bitcoin',  iconUrl: cg(1,     'bitcoin.png'),  price: 64893.29, change24h: 1.82 },
  { id: 'eth', rank: 2, symbol: 'ETH', name: 'Ethereum', iconUrl: cg(279,   'ethereum.png'), price:  3421.59, change24h: 2.65 },
  { id: 'sol', rank: 3, symbol: 'SOL', name: 'Solana',   iconUrl: cg(4128,  'solana.png'),   price:   175.34, change24h: 4.25 },
  { id: 'bnb', rank: 4, symbol: 'BNB', name: 'BNB',      iconUrl: cg(825,   'bnb-icon2_2x.png'), price: 592.34, change24h: 1.35 },
  { id: 'xrp', rank: 5, symbol: 'XRP', name: 'XRP',      iconUrl: cg(44,    'xrp-symbol-white-128.png'), price: 0.52, change24h: 1.12 },
];
