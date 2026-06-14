export const portfolioOverview = {
  totalValue:    125430.68,
  totalValueBTC: 1.8624,
  totalPnl:       18247.32,
  totalPnlPct:    17.02,
  change24h:        842.73,
  change24hPct:       0.68,
  roi:              17.02,
  riskScore: { value: 42, label: 'Moderate' },
  availableBalance: 2341.23,
  unrealizedPnl:    1924.31,
  unrealizedPnlPct:    1.56,
  buyingPower:      5682.10,
  totalInvested: 107183.36,
  fees24h:            12.48,
};

export const performanceHistory = [
  { date: 'May 15', value: 110000 },
  { date: 'May 16', value: 112400 },
  { date: 'May 17', value: 111800 },
  { date: 'May 18', value: 116200 },
  { date: 'May 19', value: 119800 },
  { date: 'May 20', value: 122500 },
  { date: 'May 21', value: 125430.68 },
];

export const assetAllocation = [
  { symbol: 'BTC',    name: 'Bitcoin',   value:  64893.29, allocation: 51.7, color: '#A8E000' },
  { symbol: 'ETH',    name: 'Ethereum',  value:  28451.32, allocation: 22.7, color: '#4A9EFF' },
  { symbol: 'SOL',    name: 'Solana',    value:  12475.18, allocation:  9.9, color: '#8B5CF6' },
  { symbol: 'BNB',    name: 'BNB',       value:   7892.16, allocation:  6.3, color: '#F5A623' },
  { symbol: 'XRP',    name: 'XRP',       value:   4321.45, allocation:  3.4, color: '#FFFFFF' },
  { symbol: 'OTHERS', name: 'Others',    value:   7397.28, allocation:  5.9, color: '#6B7670' },
];

export const holdings = [
  { rank: 1, symbol: 'BTC',  name: 'Bitcoin',   iconUrl: null, price: 64893.29, amount: 0.748,     amountUnit: 'BTC',  value:  48578.10, pnl:  7812.21, pnlPercent: 19.15, allocation: 38.7, sparkline: [41000,43000,45000,46500,47200,48100,48578] },
  { rank: 2, symbol: 'ETH',  name: 'Ethereum',  iconUrl: null, price:  3421.59, amount: 5.250,     amountUnit: 'ETH',  value:  17952.36, pnl:  2895.42, pnlPercent: 19.22, allocation: 14.3, sparkline: [15200,15800,16100,16800,17200,17700,17952] },
  { rank: 3, symbol: 'SOL',  name: 'Solana',    iconUrl: null, price:   175.34, amount: 35.618,    amountUnit: 'SOL',  value:   6243.19, pnl:  1178.62, pnlPercent: 23.24, allocation:  5.0, sparkline: [5100,5300,5600,5800,6000,6150,6243] },
  { rank: 4, symbol: 'BNB',  name: 'BNB',       iconUrl: null, price:   592.34, amount: 6.785,     amountUnit: 'BNB',  value:   4016.38, pnl:   482.71, pnlPercent: 13.64, allocation:  3.2, sparkline: [3600,3700,3750,3820,3900,3980,4016] },
  { rank: 5, symbol: 'XRP',  name: 'XRP',       iconUrl: null, price:     0.52, amount: 7856.320,  amountUnit: 'XRP',  value:   4088.29, pnl:   321.18, pnlPercent:  8.53, allocation:  3.3, sparkline: [3800,3850,3900,3950,4000,4050,4088] },
  { rank: 6, symbol: 'AVAX', name: 'Avalanche', iconUrl: null, price:    35.12, amount: 25.451,    amountUnit: 'AVAX', value:    892.54, pnl:   -67.82, pnlPercent: -7.06, allocation:  0.7, sparkline: [980,960,940,920,910,900,892] },
  { rank: 7, symbol: 'LINK', name: 'Chainlink', iconUrl: null, price:    14.23, amount: 18.265,    amountUnit: 'LINK', value:    259.82, pnl:    18.94, pnlPercent:  7.86, allocation:  0.2, sparkline: [242,245,248,250,253,257,259] },
];

export const openPositions = [
  { pair: 'BTC/USDT', side: 'Long', leverage: 5,  size: 0.25,  entryPrice: 62750.10, markPrice: 64893.29, pnl:  535.80, pnlPercent:  3.42 },
  { pair: 'ETH/USDT', side: 'Long', leverage: 5,  size: 2.000, entryPrice:  3120.50, markPrice:  3421.59, pnl:  602.18, pnlPercent:  9.65 },
  { pair: 'SOL/USDT', side: 'Long', leverage: 3,  size: 30.00, entryPrice:   165.80, markPrice:   175.34, pnl:  286.20, pnlPercent:  5.74 },
];

export const recentOrders = [
  { pair: 'BTC/USDT', type: 'Limit', side: 'Buy',  amount: '0.1000 BTC', price:  64500.00, filled: '0.1000', status: 'Filled', time: '11:38:21' },
  { pair: 'ETH/USDT', type: 'Limit', side: 'Sell', amount: '1.000 ETH',  price:   3450.00, filled: '1.000',  status: 'Filled', time: '11:22:45' },
  { pair: 'SOL/USDT', type: 'Limit', side: 'Buy',  amount: '10.00 SOL',  price:    173.00, filled: '10.00',  status: 'Filled', time: '10:58:10' },
  { pair: 'XRP/USDT', type: 'Limit', side: 'Buy',  amount: '2,000 XRP',  price:      0.515, filled: '2,000',  status: 'Filled', time: '09:45:33' },
];
