export const savedScreeners = [
  { id: 1, name: 'High Volume Gainers', results: 142, starred: true, active: true },
  { id: 2, name: 'AI & Big Data Gems', results: 86, starred: false },
  { id: 3, name: 'Momentum Breakouts', results: 63, starred: false },
  { id: 4, name: 'Low Cap 100x Potential', results: 215, starred: false },
  { id: 5, name: 'DeFi Blue Chips', results: 38, starred: false },
];

export const screenerResults = [
  { id: 1, rank: 1, name: 'Render', ticker: 'RNDR', price: 7.34, change24h: 16.21, change7d: 28.45, marketCap: '$2.85B', volume24h: '$285.12M', rsi: 62.4, macd: 'Bullish', aiScore: 92, sparkline: [5.2, 5.8, 6.1, 5.9, 6.5, 7.0, 7.34] },
  { id: 2, rank: 2, name: 'Ocean Protocol', ticker: 'OCEAN', price: 1.24, change24h: 12.45, change7d: 15.32, marketCap: '$746.32M', volume24h: '$68.45M', rsi: 58.7, macd: 'Bullish', aiScore: 88, sparkline: [0.95, 1.0, 1.05, 1.1, 1.18, 1.22, 1.24] },
  { id: 3, rank: 3, name: 'Fetch.ai', ticker: 'FET', price: 2.18, change24h: 11.32, change7d: 22.18, marketCap: '$1.82B', volume24h: '$156.38M', rsi: 63.1, macd: 'Bullish', aiScore: 87, sparkline: [1.7, 1.8, 1.85, 1.9, 2.0, 2.1, 2.18] },
  { id: 4, rank: 4, name: 'SingularityNET', ticker: 'AGIX', price: 0.721, change24h: 9.87, change7d: 18.67, marketCap: '$915.42M', volume24h: '$74.21M', rsi: 55.9, macd: 'Bullish', aiScore: 85, sparkline: [0.6, 0.63, 0.65, 0.67, 0.69, 0.71, 0.721] },
  { id: 5, rank: 5, name: 'Akash Network', ticker: 'AKT', price: 2.45, change24h: 8.56, change7d: 12.43, marketCap: '$588.13M', volume24h: '$43.75M', rsi: 57.2, macd: 'Bullish', aiScore: 83, sparkline: [2.1, 2.15, 2.2, 2.28, 2.35, 2.41, 2.45] },
  { id: 6, rank: 6, name: 'The Graph', ticker: 'GRT', price: 0.286, change24h: 7.92, change7d: 14.95, marketCap: '$2.61B', volume24h: '$134.12M', rsi: 54.8, macd: 'Bullish', aiScore: 81, sparkline: [0.24, 0.25, 0.26, 0.265, 0.27, 0.28, 0.286] },
  { id: 7, rank: 7, name: 'Cortex', ticker: 'CTXC', price: 0.228, change24h: 7.14, change7d: 11.24, marketCap: '$203.45M', volume24h: '$19.34M', rsi: 59.3, macd: 'Bullish', aiScore: 78, sparkline: [0.19, 0.2, 0.21, 0.215, 0.22, 0.225, 0.228] },
  { id: 8, rank: 8, name: 'Velas', ticker: 'VLX', price: 0.123, change24h: 6.85, change7d: 10.32, marketCap: '$161.22M', volume24h: '$14.68M', rsi: 52.6, macd: 'Bullish', aiScore: 76, sparkline: [0.105, 0.11, 0.112, 0.115, 0.118, 0.12, 0.123] },
  { id: 9, rank: 9, name: 'Phala Network', ticker: 'PHA', price: 0.317, change24h: 6.23, change7d: 9.87, marketCap: '$178.56M', volume24h: '$16.23M', rsi: 51.7, macd: 'Bullish', aiScore: 74, sparkline: [0.27, 0.28, 0.29, 0.3, 0.305, 0.31, 0.317] },
  { id: 10, rank: 10, name: 'iExec RLC', ticker: 'RLC', price: 1.12, change24h: 5.98, change7d: 8.45, marketCap: '$896.32M', volume24h: '$35.62M', rsi: 53.2, macd: 'Bullish', aiScore: 72, sparkline: [0.95, 0.98, 1.0, 1.04, 1.07, 1.1, 1.12] },
];

export const topOpportunities = screenerResults.slice(0, 5).map(r => ({
  ...r,
  category: ['AI / Big Data', 'AI / Data', 'AI / Machine Learning', 'AI / Marketplace', 'AI / Cloud'][r.rank - 1],
  marketCapShort: ['$2.65B', '$746M', '$1.82B', '$915M', '$588M'][r.rank - 1],
}));

export const marketOverview = {
  totalCoins: '10,234',
  totalCoinsChange: '+3.2%',
  volume24h: '$142.68B',
  volumeChange: '+12.4%',
  marketCap: '$2.45T',
  marketCapChange: '+2.6%',
  btcDominance: '52.31%',
  btcDominanceChange: '-0.45%',
  ethDominance: '16.37%',
  ethDominanceChange: '+0.32%',
  avgChange24h: '+2.85%',
};

export const screenerTips = [
  'Use Volume Spike to find coins with unexpected interest',
  'RSI between 50-70 often indicates strong momentum',
  'Combine multiple filters for better results',
  'Save your favorite screeners for quick access',
];

export const filterOptions = {
  marketCap: [
    { label: 'Any', value: 'any' },
    { label: 'Under $500M', value: '<500M' },
    { label: 'Under $1B', value: '<1B' },
    { label: 'Under $10B', value: '<10B' },
    { label: 'Over $1B', value: '>1B' },
    { label: 'Over $10B', value: '>10B' },
  ],
  marketCapOp: [
    { label: 'Under', value: 'under' },
    { label: 'Over', value: 'over' },
    { label: 'Between', value: 'between' },
  ],
  changeOp: [
    { label: 'Greater than', value: 'gt' },
    { label: 'Less than', value: 'lt' },
    { label: 'Any', value: 'any' },
  ],
  volumeOp: [
    { label: 'Greater than', value: 'gt' },
    { label: 'Less than', value: 'lt' },
    { label: 'Any', value: 'any' },
  ],
  volumeSpikeOp: [
    { label: 'Greater than', value: 'gt' },
    { label: 'Less than', value: 'lt' },
    { label: 'Any', value: 'any' },
  ],
  price: [
    { label: 'Any', value: 'any' },
    { label: 'Under $1', value: '<1' },
    { label: 'Under $10', value: '<10' },
    { label: 'Under $100', value: '<100' },
    { label: 'Over $1', value: '>1' },
    { label: 'Over $100', value: '>100' },
  ],
  macd: [
    { label: 'Any', value: 'any' },
    { label: 'Bullish', value: 'bullish' },
    { label: 'Bearish', value: 'bearish' },
    { label: 'Neutral', value: 'neutral' },
  ],
  category: [
    { label: 'Any', value: 'any' },
    { label: 'AI, DeFi', value: 'ai_defi' },
    { label: 'AI', value: 'ai' },
    { label: 'DeFi', value: 'defi' },
    { label: 'Layer 1', value: 'l1' },
    { label: 'Layer 2', value: 'l2' },
    { label: 'NFT', value: 'nft' },
    { label: 'Gaming', value: 'gaming' },
  ],
  blockchain: [
    { label: 'All', value: 'all' },
    { label: 'Ethereum', value: 'eth' },
    { label: 'Solana', value: 'sol' },
    { label: 'BNB Chain', value: 'bnb' },
    { label: 'Polygon', value: 'matic' },
  ],
  showMe: [
    { label: 'Top 100', value: '100' },
    { label: 'Top 50', value: '50' },
    { label: 'Top 200', value: '200' },
    { label: 'All', value: 'all' },
  ],
};
