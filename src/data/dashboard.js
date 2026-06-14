const cg = (id, file) => `https://assets.coingecko.com/coins/images/${id}/small/${file}`;

export const portfolio = {
  totalValue: 125430.68,
  change24hPct: 4.35,
  totalProfit: 8247.59,
  totalProfitPct: 6.21,
  roi: 18.42,
  change24h: 5212.31,
  sparkline: [
    { v: 118000 }, { v: 119200 }, { v: 117800 }, { v: 120400 }, { v: 121000 },
    { v: 119800 }, { v: 122300 }, { v: 121500 }, { v: 123000 }, { v: 124100 },
    { v: 123800 }, { v: 124900 }, { v: 125430 },
  ],
};

export const topGainers = [
  { id: 'sol',  rank: 1, symbol: 'SOL',  name: 'Solana',   iconUrl: cg(4128,  'solana.png'),                  price: 175.34, change24h: 4.25 },
  { id: 'inj',  rank: 2, symbol: 'INJ',  name: 'Injective',iconUrl: cg(25093, 'injective-protocol-logo.jpg'), price: 28.41,  change24h: 3.91 },
  { id: 'rndr', rank: 3, symbol: 'RNDR', name: 'Render',   iconUrl: cg(11636, 'render-token.png'),            price: 9.12,   change24h: 3.48 },
  { id: 'arb',  rank: 4, symbol: 'ARB',  name: 'Arbitrum', iconUrl: cg(23265, 'arbitrum.png'),                price: 1.23,   change24h: 2.97 },
  { id: 'matic',rank: 5, symbol: 'MATIC',name: 'Polygon',  iconUrl: cg(3890,  'polygon.png'),                 price: 0.78,   change24h: 2.35 },
];

export const topLosers = [
  { id: 'ton',  rank: 1, symbol: 'TON',  name: 'Toncoin',   iconUrl: cg(17980, 'ton_symbol.png'),             price: 6.41,     change24h: -2.15 },
  { id: 'avax', rank: 2, symbol: 'AVAX', name: 'Avalanche', iconUrl: cg(12559, 'avalanche-avax-logo.png'),    price: 35.12,    change24h: -1.85 },
  { id: 'shib', rank: 3, symbol: 'SHIB', name: 'Shiba Inu', iconUrl: cg(11939, 'shiba-inu.png'),              price: 0.000017, change24h: -1.45 },
  { id: 'link', rank: 4, symbol: 'LINK', name: 'Chainlink', iconUrl: cg(877,   'chainlink-new-logo.png'),     price: 14.23,    change24h: -1.25 },
  { id: 'fil',  rank: 5, symbol: 'FIL',  name: 'Filecoin',  iconUrl: cg(12817, 'filecoin.png'),               price: 6.21,     change24h: -1.12 },
];

export const trendingCoins = [
  { id: 'pepe', rank: 1, symbol: 'PEPE',  name: 'Pepe',         iconUrl: cg(24478, 'pepe.png'),               price: 0.00001024, change24h: 18.45, volume: 2340000000 },
  { id: 'floki',rank: 2, symbol: 'FLOKI', name: 'Floki Inu',    iconUrl: cg(10804, 'floki-inu.png'),          price: 0.0001453,  change24h: 15.32, volume: 1860000000 },
  { id: 'bonk', rank: 3, symbol: 'BONK',  name: 'Bonk',         iconUrl: cg(28600, 'bonk.jpg'),               price: 0.0002451,  change24h: 12.91, volume: 1250000000 },
  { id: 'wif',  rank: 4, symbol: 'WIF',   name: 'Dogwifhat',    iconUrl: cg(33567, 'dogwifcoin.jpg'),         price: 2.34,       change24h: 11.23, volume: 973210000  },
  { id: 'bome', rank: 5, symbol: 'BOME',  name: 'Book of Meme', iconUrl: cg(39063, 'book-of-meme-bome.png'), price: 0.01842,    change24h: 9.78,  volume: 812300000  },
];

export const latestNews = [
  {
    id: 1,
    title: 'Bitcoin ETF Inflows Reach $1.2B as Institutional Demand Continues to Rise',
    source: 'CoinDesk',
    time: '2h ago',
    imageUrl: cg(1, 'bitcoin.png'),
  },
  {
    id: 2,
    title: 'Ethereum Dencun Upgrade Live on Mainnet Improving Scalability',
    source: 'The Block',
    time: '5h ago',
    imageUrl: cg(279, 'ethereum.png'),
  },
  {
    id: 3,
    title: 'SEC Delays Decision on Several Spot Ethereum ETF Applications',
    source: 'Cointelegraph',
    time: '8h ago',
    imageUrl: cg(279, 'ethereum.png'),
  },
];

export const marketPerformance = [
  { id: 'sentiment', icon: '🐂', label: 'Market Sentiment', value: 'Bullish', valueColor: '#A8E000' },
  { id: 'altcoin',  icon: '📈', label: 'Altcoin Season Index', value: '42 /100', progress: 42 },
  { id: 'bitcoin',  icon: '₿',  label: 'Bitcoin Season Index', value: '58 /100', progress: 58 },
  { id: 'deriv',    icon: '📊', label: 'Derivatives Volume', value: '$152.34B', change: 6.35 },
  { id: 'oi',       icon: '🔓', label: 'Open Interest',      value: '$78.91B',  change: 3.21 },
];
