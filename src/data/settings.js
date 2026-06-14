export const settings = {
  profile: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    timezone: '(UTC-5) Eastern Time',
  },
  security: {
    twoFactorEnabled: true,
    passkeysActive: 1,
    activeSessions: 3,
  },
  notifications: {
    priceAlerts: true,
    tradeExecutions: true,
    portfolioAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
  },
  apiKeys: {
    activeKeys: 2,
    requests30d: 12453,
  },
  connectedAccounts: [
    { provider: 'Google',  connected: true,  iconColor: '#EA4335' },
    { provider: 'Apple',   connected: true,  iconColor: '#FFFFFF' },
    { provider: 'GitHub',  connected: false, iconColor: '#FFFFFF' },
    { provider: 'Discord', connected: false, iconColor: '#5865F2' },
    { provider: 'Wallet Connections', connected: true, walletCount: 4 },
  ],
  tradingPreferences: {
    defaultCurrency: 'USD',
    defaultTradingPair: 'USDT',
    riskWarnings: true,
    orderConfirmations: true,
  },
  appearance: {
    theme: 'dark',
    compactLayout: true,
    language: 'English',
    colorScheme: 'Green',
  },
  lastLogin: {
    time: 'May 20, 2024 at 10:42 AM',
    ip: '192.168.1.100',
    location: 'New York, USA',
  },
};
