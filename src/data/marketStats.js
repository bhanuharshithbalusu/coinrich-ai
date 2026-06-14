// 24-hour market cap series (hourly, 25 points: 00:00 → 24:00)
export const marketCapSeries1D = [
  { label: '00:00', value: 2.32 }, { label: '01:00', value: 2.37 },
  { label: '02:00', value: 2.35 }, { label: '03:00', value: 2.31 },
  { label: '04:00', value: 2.30 }, { label: '05:00', value: 2.32 },
  { label: '06:00', value: 2.34 }, { label: '07:00', value: 2.36 },
  { label: '08:00', value: 2.39 }, { label: '09:00', value: 2.38 },
  { label: '10:00', value: 2.40 }, { label: '11:00', value: 2.43 },
  { label: '12:00', value: 2.47 }, { label: '13:00', value: 2.46 },
  { label: '14:00', value: 2.45 }, { label: '15:00', value: 2.44 },
  { label: '16:00', value: 2.43 }, { label: '17:00', value: 2.42 },
  { label: '18:00', value: 2.44 }, { label: '19:00', value: 2.43 },
  { label: '20:00', value: 2.44 }, { label: '21:00', value: 2.46 },
  { label: '22:00', value: 2.45 }, { label: '23:00', value: 2.44 },
  { label: '24:00', value: 2.45 },
];

// 24-hour volume bars (hourly)
export const volumeSeries1D = [
  { label: '00:00', value: 42 }, { label: '01:00', value: 55 },
  { label: '02:00', value: 48 }, { label: '03:00', value: 38 },
  { label: '04:00', value: 35 }, { label: '05:00', value: 40 },
  { label: '06:00', value: 52 }, { label: '07:00', value: 60 },
  { label: '08:00', value: 68 }, { label: '09:00', value: 72 },
  { label: '10:00', value: 78 }, { label: '11:00', value: 85 },
  { label: '12:00', value: 110 }, { label: '13:00', value: 95 },
  { label: '14:00', value: 80 }, { label: '15:00', value: 75 },
  { label: '16:00', value: 70 }, { label: '17:00', value: 65 },
  { label: '18:00', value: 72 }, { label: '19:00', value: 60 },
  { label: '20:00', value: 58 }, { label: '21:00', value: 62 },
  { label: '22:00', value: 50 }, { label: '23:00', value: 45 },
  { label: '24:00', value: 40 },
];

export const marketStats = {
  totalMarketCap: {
    value: 2450000000000, change24h: 2.35,
    sparkline: [2.1, 2.15, 2.22, 2.28, 2.3, 2.38, 2.45],
    volume24h: 98420000000, volumeChange: 8.41,
  },
  btcDominance: { value: 52.31, change24h: -0.45, ethDominance: 16.37, ethChange: 0.32 },
  ethDominance: { value: 16.37, change24h: 0.32 },
  fearGreedIndex: { value: 65, label: 'Greed' },
  volume24h: { value: 98420000000, change24h: 8.41 },
  activeCryptocurrencies: 12458,
  totalMarkets: 47896,
};
