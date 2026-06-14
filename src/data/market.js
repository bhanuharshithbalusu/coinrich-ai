const cg = (id, file) => `https://assets.coingecko.com/coins/images/${id}/small/${file}`;

export const marketGlobalStats = {
  totalMarketCap:        { value: 2450000000000, change24h: 2.35 },
  volume24h:             { value: 98420000000,   change24h: 8.41 },
  btcDominance:          { value: 52.31,          change24h: -0.45 },
  ethDominance:          { value: 16.37,          change24h: 0.32 },
  fearGreedIndex:        { value: 65, label: 'Greed' },
  activeCryptocurrencies: 12458,
  totalMarkets:          47896,
};

export const marketCoins = [
  {
    id: 'bitcoin', rank: 1, symbol: 'BTC', name: 'Bitcoin',
    iconUrl: cg(1, 'bitcoin.png'), price: 64893.29,
    change24h: 1.82, change7d: 4.37,
    marketCap: 1280000000000, volume24h: 28420000000,
    circulatingSupply: '19.73M BTC',
    sparkline7d: [61200, 62000, 62500, 63000, 63800, 64200, 64893],
  },
  {
    id: 'ethereum', rank: 2, symbol: 'ETH', name: 'Ethereum',
    iconUrl: cg(279, 'ethereum.png'), price: 3421.59,
    change24h: 2.65, change7d: 6.21,
    marketCap: 411000000000, volume24h: 15680000000,
    circulatingSupply: '120.28M ETH',
    sparkline7d: [3050, 3100, 3200, 3280, 3350, 3400, 3421],
  },
  {
    id: 'tether', rank: 3, symbol: 'USDT', name: 'Tether',
    iconUrl: cg(325, 'Tether.png'), price: 1.00,
    change24h: 0.01, change7d: 0.02,
    marketCap: 112300000000, volume24h: 56210000000,
    circulatingSupply: '112.27B USDT',
    sparkline7d: [1.00, 1.00, 0.999, 1.001, 1.00, 1.00, 1.00],
  },
  {
    id: 'bnb', rank: 4, symbol: 'BNB', name: 'BNB',
    iconUrl: cg(825, 'bnb-icon2_2x.png'), price: 592.34,
    change24h: 1.35, change7d: 2.14,
    marketCap: 87450000000, volume24h: 1920000000,
    circulatingSupply: '147.58M BNB',
    sparkline7d: [560, 568, 575, 580, 585, 589, 592],
  },
  {
    id: 'solana', rank: 5, symbol: 'SOL', name: 'Solana',
    iconUrl: cg(4128, 'solana.png'), price: 175.34,
    change24h: 4.25, change7d: 8.47,
    marketCap: 81230000000, volume24h: 3940000000,
    circulatingSupply: '463.34M SOL',
    sparkline7d: [152, 156, 161, 165, 168, 172, 175],
  },
  {
    id: 'usd-coin', rank: 6, symbol: 'USDC', name: 'USD Coin',
    iconUrl: cg(6319, 'USD_Coin_icon.png'), price: 0.9999,
    change24h: -0.01, change7d: 0.01,
    marketCap: 33120000000, volume24h: 6320000000,
    circulatingSupply: '33.12B USDC',
    sparkline7d: [1.00, 1.00, 1.00, 0.999, 1.00, 1.00, 0.9999],
  },
  {
    id: 'ripple', rank: 7, symbol: 'XRP', name: 'XRP',
    iconUrl: cg(44, 'xrp-symbol-white-128.png'), price: 0.52,
    change24h: 1.12, change7d: 3.21,
    marketCap: 28740000000, volume24h: 1340000000,
    circulatingSupply: '54.90B XRP',
    sparkline7d: [0.48, 0.49, 0.50, 0.50, 0.51, 0.52, 0.52],
  },
  {
    id: 'dogecoin', rank: 8, symbol: 'DOGE', name: 'Dogecoin',
    iconUrl: cg(5, 'dogecoin.png'), price: 0.1423,
    change24h: -0.45, change7d: 1.23,
    marketCap: 20480000000, volume24h: 1020000000,
    circulatingSupply: '143.98B DOGE',
    sparkline7d: [0.138, 0.140, 0.141, 0.143, 0.142, 0.143, 0.1423],
  },
  {
    id: 'cardano', rank: 9, symbol: 'ADA', name: 'Cardano',
    iconUrl: cg(975, 'cardano.png'), price: 0.4612,
    change24h: -0.78, change7d: 1.87,
    marketCap: 16330000000, volume24h: 472310000,
    circulatingSupply: '35.41B ADA',
    sparkline7d: [0.445, 0.450, 0.455, 0.458, 0.460, 0.462, 0.4612],
  },
  {
    id: 'tron', rank: 10, symbol: 'TRX', name: 'TRON',
    iconUrl: cg(1094, 'tron-logo.png'), price: 0.1234,
    change24h: 0.66, change7d: 2.02,
    marketCap: 10720000000, volume24h: 342110000,
    circulatingSupply: '86.89B TRX',
    sparkline7d: [0.118, 0.119, 0.121, 0.122, 0.123, 0.123, 0.1234],
  },
  {
    id: 'avalanche', rank: 11, symbol: 'AVAX', name: 'Avalanche',
    iconUrl: cg(12559, 'avalanche-avax-logo.png'), price: 38.21,
    change24h: 2.14, change7d: 5.32,
    marketCap: 15640000000, volume24h: 612000000,
    circulatingSupply: '409.41M AVAX',
    sparkline7d: [35.2, 36.0, 36.8, 37.2, 37.8, 38.0, 38.21],
  },
  {
    id: 'polkadot', rank: 12, symbol: 'DOT', name: 'Polkadot',
    iconUrl: cg(12171, 'polkadot.png'), price: 8.43,
    change24h: -1.23, change7d: 0.87,
    marketCap: 11230000000, volume24h: 289000000,
    circulatingSupply: '1.33B DOT',
    sparkline7d: [8.1, 8.2, 8.35, 8.40, 8.38, 8.42, 8.43],
  },
  {
    id: 'chainlink', rank: 13, symbol: 'LINK', name: 'Chainlink',
    iconUrl: cg(877, 'chainlink-new-logo.png'), price: 14.72,
    change24h: 3.41, change7d: 7.18,
    marketCap: 9120000000, volume24h: 541000000,
    circulatingSupply: '619.89M LINK',
    sparkline7d: [13.2, 13.5, 13.9, 14.1, 14.4, 14.6, 14.72],
  },
  {
    id: 'polygon', rank: 14, symbol: 'MATIC', name: 'Polygon',
    iconUrl: cg(4713, 'matic-token-icon.png'), price: 0.89,
    change24h: 1.12, change7d: 3.45,
    marketCap: 8760000000, volume24h: 374000000,
    circulatingSupply: '9.84B MATIC',
    sparkline7d: [0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.89],
  },
  {
    id: 'litecoin', rank: 15, symbol: 'LTC', name: 'Litecoin',
    iconUrl: cg(2, 'litecoin.png'), price: 87.34,
    change24h: 0.92, change7d: 2.61,
    marketCap: 6540000000, volume24h: 421000000,
    circulatingSupply: '74.90M LTC',
    sparkline7d: [84.1, 84.8, 85.5, 86.0, 86.6, 87.0, 87.34],
  },
];

// 6-column grid:
// Row 1-2: BTC(2×2) ETH(2×2) BNB(1×2) DOGE(1×1,row1) TON(1×1,row2)
// Row 3:   SOL(2×1) XRP(1×1) ADA(1×1) AVAX(1×1)       MATIC(1×1)
export const heatmapTiles = [
  { symbol: 'BTC',  value: 64893.29, change: 1.82,  size: 'xl' },
  { symbol: 'ETH',  value: 3421.59,  change: 2.65,  size: 'lg' },
  { symbol: 'BNB',  value: 592.34,   change: 1.35,  size: 'md' },
  { symbol: 'DOGE', value: 0.1423,   change: -0.45, size: 'sm' },
  { symbol: 'TON',  value: 5.82,     change: -1.23, size: 'sm' },
  { symbol: 'SOL',  value: 175.34,   change: 4.25,  size: 'mw' },
  { symbol: 'XRP',  value: 0.52,     change: -0.45, size: 'sm' },
  { symbol: 'ADA',  value: 0.4612,   change: 1.87,  size: 'sm' },
  { symbol: 'AVAX', value: 38.21,    change: 2.14,  size: 'xs' },
  { symbol: 'MATIC',value: 0.89,     change: 1.12,  size: 'xs' },
];

export const marketTopGainers = [
  { rank: 1, symbol: 'RNDR', name: 'Render',      iconUrl: cg(11636, 'render-token-logo.png'), price: 9.12,    change24h: 34.21 },
  { rank: 2, symbol: 'INJ',  name: 'Injective',   iconUrl: cg(7226,  'injective-protocol-logo.png'), price: 28.41, change24h: 18.73 },
  { rank: 3, symbol: 'KAS',  name: 'Kaspa',       iconUrl: cg(20396, 'kaspa-removebg-preview.png'), price: 0.1423, change24h: 16.54 },
  { rank: 4, symbol: 'GRT',  name: 'The Graph',   iconUrl: cg(6719,  'graph-token-logo.png'), price: 0.3121,  change24h: 14.32 },
  { rank: 5, symbol: 'IMX',  name: 'Immutable',   iconUrl: cg(17233, 'immutableX-symbol-BLK.png'), price: 1.87,  change24h: 12.68 },
];

export const marketTopLosers = [
  { rank: 1, symbol: 'AKT',  name: 'Akash Network', iconUrl: cg(12891, 'akash-network-logo.png'), price: 2.14,     change24h: -12.45 },
  { rank: 2, symbol: 'CFX',  name: 'Conflux',       iconUrl: cg(18379, 'jiD3nqFP_400x400.png'), price: 0.132,   change24h: -9.87 },
  { rank: 3, symbol: 'AR',   name: 'Arweave',       iconUrl: cg(4866,  'arweave-coin.png'), price: 18.23,    change24h: -8.33 },
  { rank: 4, symbol: 'LDO',  name: 'Lido DAO',      iconUrl: cg(13573, 'lido-dao.png'), price: 1.23,     change24h: -7.21 },
  { rank: 5, symbol: 'MKR',  name: 'Maker',         iconUrl: cg(1364,  'mark-maker.png'), price: 1912.34,  change24h: -6.54 },
];

export const marketNews = [
  {
    id: 'n1',
    title: 'Bitcoin ETF Inflows Reach $1.2B as Institutional Demand Continues to Rise',
    source: 'CoinDesk', time: '2h ago',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=120&q=80',
  },
  {
    id: 'n2',
    title: 'Ethereum Dencun Upgrade Live on Mainnet, Improving Scalability',
    source: 'The Block', time: '5h ago',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&q=80',
  },
  {
    id: 'n3',
    title: 'SEC Delays Decision on Several Spot Ethereum ETF Applications',
    source: 'Cointelegraph', time: '8h ago',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&q=80',
  },
];
