const sparkline = (base, n = 20, positive = true) => {
  const pts = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    v += (Math.random() - (positive ? 0.35 : 0.65)) * base * 0.02;
    pts.push({ value: Math.round(v * 100) / 100 });
  }
  return pts;
};

export const wallets = {
  connectedWallets: [
    { id: 'metamask',  name: 'MetaMask',       address: '0x7d4a...9af2', color: '#F6851B', active: true  },
    { id: 'phantom',   name: 'Phantom',         address: '6xF3J...Bh9e', color: '#AB9FF2', active: false },
    { id: 'trust',     name: 'Trust Wallet',    address: '0x8b3c...7c41', color: '#3375BB', active: false },
    { id: 'coinbase',  name: 'Coinbase Wallet', address: '0x9a8b...12f8', color: '#0052FF', active: false },
  ],

  walletOverview: {
    metamask: {
      totalValue: 68431.32, change24h: 2.65, totalPnl: 5812.21,
      history: sparkline(65000, 24, true),
    },
    phantom: {
      totalValue: 32124.75, change24h: 1.23, totalPnl: 1234.56,
      history: sparkline(31500, 24, true),
    },
    trust: {
      totalValue: 18234.21, change24h: -0.48, totalPnl: -234.12,
      history: sparkline(18500, 24, false),
    },
    coinbase: {
      totalValue: 6640.40, change24h: 3.28, totalPnl: 421.34,
      history: sparkline(6400, 24, true),
    },
  },

  holdingsByWallet: {
    metamask: [
      { rank: 1, symbol: 'BTC',  name: 'Bitcoin',  price: 64893.29, amount: 0.748,     value: 48578.10, allocation: 70.94, change24h:  1.85, pnl:  4812.21, pnlPercent:  10.98, sparkline: sparkline(64000, 10, true)  },
      { rank: 2, symbol: 'ETH',  name: 'Ethereum', price:  3421.59, amount: 2.350,      value:  8035.73, allocation: 11.73, change24h:  2.21, pnl:   682.36, pnlPercent:   9.27, sparkline: sparkline( 3300, 10, true)  },
      { rank: 3, symbol: 'SOL',  name: 'Solana',   price:   175.34, amount: 25.618,     value:  4491.89, allocation:  6.56, change24h:  3.12, pnl:   312.44, pnlPercent:   7.48, sparkline: sparkline(  170, 10, true)  },
      { rank: 4, symbol: 'BNB',  name: 'BNB',      price:   592.34, amount:  6.785,     value:  4016.38, allocation:  5.86, change24h:  0.98, pnl:   124.81, pnlPercent:   3.21, sparkline: sparkline(  580, 10, true)  },
      { rank: 5, symbol: 'USDC', name: 'USD Coin', price:     1.00, amount: 2118.45,    value:  2118.45, allocation:  3.09, change24h:  0.00, pnl:     0.00, pnlPercent:   0.00, sparkline: sparkline(    1, 10, true)  },
      { rank: 6, symbol: 'XRP',  name: 'XRP',      price:     0.52, amount: 7856.32,    value:  4088.29, allocation:  1.82, change24h: -0.45, pnl:   -18.74, pnlPercent:  -1.12, sparkline: sparkline(  0.53, 10, false) },
    ],
    phantom: [
      { rank: 1, symbol: 'SOL',  name: 'Solana',   price:   175.34, amount: 120.5,      value: 21133.47, allocation: 65.78, change24h:  3.12, pnl:  1450.22, pnlPercent:   7.37, sparkline: sparkline(170, 10, true) },
      { rank: 2, symbol: 'USDC', name: 'USD Coin', price:     1.00, amount: 10991.28,   value: 10991.28, allocation: 34.22, change24h:  0.00, pnl:     0.00, pnlPercent:   0.00, sparkline: sparkline(1,   10, true) },
    ],
    trust: [
      { rank: 1, symbol: 'BTC',  name: 'Bitcoin',  price: 64893.29, amount: 0.18,       value: 11680.79, allocation: 64.06, change24h:  1.85, pnl:   812.10, pnlPercent:   7.47, sparkline: sparkline(64000, 10, true) },
      { rank: 2, symbol: 'ETH',  name: 'Ethereum', price:  3421.59, amount: 1.90,       value:  6501.02, allocation: 35.66, change24h: -0.48, pnl:  -234.12, pnlPercent:  -3.47, sparkline: sparkline(3500, 10, false) },
      { rank: 3, symbol: 'BNB',  name: 'BNB',      price:   592.34, amount:  0.088,     value:    52.13, allocation:  0.28, change24h:  0.98, pnl:     1.44, pnlPercent:   2.84, sparkline: sparkline(580,  10, true) },
    ],
    coinbase: [
      { rank: 1, symbol: 'ETH',  name: 'Ethereum', price:  3421.59, amount: 1.20,       value:  4105.91, allocation: 61.83, change24h:  2.21, pnl:   421.34, pnlPercent:  11.44, sparkline: sparkline(3300, 10, true) },
      { rank: 2, symbol: 'USDC', name: 'USD Coin', price:     1.00, amount: 2534.49,    value:  2534.49, allocation: 38.17, change24h:  0.00, pnl:     0.00, pnlPercent:   0.00, sparkline: sparkline(1,    10, true) },
    ],
  },

  recentActivity: [
    { id: 1, type: 'Deposit',    subtext: 'From 0x2a6d...8f91', amount: '+1.2500 USDT', amountType: 'positive', time: '2h ago'  },
    { id: 2, type: 'Transfer',   subtext: 'To 0x8b3c...7c41',   amount: '-0.5000 ETH',  amountType: 'negative', time: '5h ago'  },
    { id: 3, type: 'Swap',       subtext: 'SOL → USDC',         amount: '-10.00 SOL\n+14.23 USDC', amountType: 'swap', time: '8h ago'  },
    { id: 4, type: 'Withdrawal', subtext: 'To 0x9a8b...12f8',   amount: '-0.0100 BTC',  amountType: 'negative', time: '1d ago'  },
    { id: 5, type: 'Deposit',    subtext: 'From 0x7e2f...c192', amount: '+580.00 USDC', amountType: 'positive', time: '2d ago'  },
  ],
};
