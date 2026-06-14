# Coin Rich AI — Data Contracts (Mock Data Shapes)

These are placeholder JSON shapes for frontend dev. Share this file with your backend dev so the real API matches these shapes (or you adjust later in one place).

## 1. Global Market Stats
```json
{
  "totalMarketCap": { "value": 2450000000000, "change24h": 2.35 },
  "btcDominance": { "value": 52.31, "change24h": -0.45 },
  "ethDominance": { "value": 16.37, "change24h": 0.32 },
  "fearGreedIndex": { "value": 65, "label": "Greed" },
  "volume24h": { "value": 98420000000, "change24h": 8.41 },
  "activeCryptocurrencies": 12458,
  "totalMarkets": 47896
}
```

## 2. Coin / Asset
```json
{
  "id": "bitcoin",
  "symbol": "BTC",
  "name": "Bitcoin",
  "iconUrl": "/icons/btc.png",
  "price": 64893.29,
  "change24h": 1.82,
  "change7d": 4.37,
  "marketCap": 1280000000000,
  "volume24h": 28420000000,
  "circulatingSupply": "19.73M BTC",
  "sparkline7d": [62000, 62500, 63000, 64000, 64893],
  "low24h": 63201.34,
  "high24h": 65567.21,
  "rsi14": 62.4,
  "macd": "Bullish",
  "aiScore": 92
}
```

## 3. Watchlist / Trending List
```json
{
  "watchlist": [
    { "rank": 1, "symbol": "BTC", "name": "Bitcoin", "price": 64893.29, "change24h": 1.82 },
    { "rank": 2, "symbol": "ETH", "name": "Ethereum", "price": 3421.59, "change24h": 2.65 }
  ]
}
```

## 4. Portfolio Overview
```json
{
  "totalValue": 125430.68,
  "totalValueBTC": 1.8624,
  "totalPnl": 18247.32,
  "roi": 17.02,
  "change24h": 0.68,
  "riskScore": { "value": 42, "label": "Moderate" },
  "performanceHistory": [
    { "date": "2026-05-15", "value": 110000 },
    { "date": "2026-05-21", "value": 125430.68 }
  ],
  "assetAllocation": [
    { "symbol": "BTC", "name": "Bitcoin", "value": 64893.29, "allocation": 51.7, "color": "#A8E000" },
    { "symbol": "ETH", "name": "Ethereum", "value": 28451.32, "allocation": 22.7, "color": "#4A9EFF" },
    { "symbol": "SOL", "name": "Solana", "value": 12475.18, "allocation": 9.9, "color": "#8B5CF6" },
    { "symbol": "BNB", "name": "BNB", "value": 7892.16, "allocation": 6.3, "color": "#F5A623" },
    { "symbol": "XRP", "name": "XRP", "value": 4321.45, "allocation": 3.4, "color": "#FFFFFF" },
    { "symbol": "OTHERS", "name": "Others", "value": 7397.28, "allocation": 5.9, "color": "#6B7670" }
  ]
}
```

## 5. Holdings
```json
{
  "holdings": [
    {
      "symbol": "BTC", "name": "Bitcoin", "price": 64893.29,
      "amount": 0.748, "value": 48578.10,
      "pnl": 7812.21, "pnlPercent": 19.15, "allocation": 38.7,
      "sparkline": [60000, 61000, 63000, 64893]
    }
  ]
}
```

## 6. Open Positions / Orders
```json
{
  "openPositions": [
    {
      "pair": "BTC/USDT", "side": "Long", "leverage": 5,
      "size": 0.25, "entryPrice": 62750.10, "markPrice": 64893.29,
      "liqPrice": 56210.45, "pnl": 535.80, "pnlPercent": 3.42
    }
  ],
  "recentOrders": [
    {
      "pair": "BTC/USDT", "type": "Limit", "side": "Buy",
      "amount": 0.1, "price": 64500.00, "filled": 0.03,
      "filledPercent": 30, "total": 6450.00,
      "status": "Partially Filled", "time": "11:35:21"
    }
  ]
}
```

## 7. Wallets
```json
{
  "connectedWallets": [
    { "id": "metamask", "name": "MetaMask", "address": "0x7d4a...9af2", "iconUrl": "/icons/metamask.png", "active": true },
    { "id": "phantom", "name": "Phantom", "address": "6xF3J...Bh9e", "iconUrl": "/icons/phantom.png", "active": false }
  ],
  "walletOverview": {
    "metamask": { "totalValue": 68431.32, "change24h": 2.65, "totalPnl": 5812.21, "history": [] }
  },
  "holdingsByWallet": {
    "metamask": [
      { "symbol": "BTC", "name": "Bitcoin", "price": 64893.29, "amount": 0.748, "value": 48578.10, "allocation": 70.94, "change24h": 1.85, "pnl": 4812.21, "pnlPercent": 10.98 }
    ]
  },
  "recentActivity": [
    { "type": "Deposit", "asset": "USDT", "amount": 1.25, "direction": "in", "from": "0x2a6d...8f91", "time": "2h ago" },
    { "type": "Swap", "fromAsset": "SOL", "toAsset": "USDC", "fromAmount": 10, "toAmount": 14.23, "time": "8h ago" }
  ]
}
```

## 8. Screener
```json
{
  "filters": {
    "marketCap": { "operator": "under", "value": 500000000 },
    "change24h": { "operator": "greater_than", "value": 5 },
    "volume24h": { "operator": "greater_than", "value": 10000000 },
    "rsi14": { "min": 50, "max": 70 },
    "macd": "Bullish",
    "category": ["AI", "DeFi"],
    "blockchain": "All"
  },
  "results": [
    { "rank": 1, "symbol": "RNDR", "name": "Render", "price": 7.34, "change24h": 16.21, "change7d": 28.45, "marketCap": 2850000000, "volume24h": 285120000, "rsi14": 62.4, "macd": "Bullish", "aiScore": 92 }
  ],
  "topOpportunities": [
    { "rank": 1, "symbol": "RNDR", "name": "Render", "category": "AI / Big Data", "price": 7.34, "change24h": 16.21, "marketCap": 2850000000, "aiScore": 92 }
  ]
}
```

## 9. Terminal (Trading)
```json
{
  "pair": "BTC/USDT",
  "price": 64893.29,
  "change24h": 1.82,
  "change24hAbs": 1163.35,
  "high24h": 65567.21,
  "low24h": 63201.34,
  "volume24hBTC": 18736.42,
  "volume24hUSDT": 1210000000,
  "funding": { "rate": 0.0100, "countdown": "05:21:37" },
  "candles": [
    { "time": "2026-06-18T12:00:00Z", "open": 64662.11, "high": 65021.18, "low": 64421.33, "close": 64893.29, "volume": 1230 }
  ],
  "movingAverages": { "ma7": 64512.65, "ma25": 64102.33, "ma99": 62850.21 },
  "orderBook": {
    "bids": [{ "price": 64893.29, "amount": 0.25341, "total": 16437.14 }],
    "asks": [{ "price": 64900.00, "amount": 0.12560, "total": 8150.44 }]
  },
  "recentTrades": [
    { "price": 64893.29, "amount": 0.01234, "side": "buy", "time": "11:38:23" }
  ],
  "openOrders": [
    { "pair": "BTC/USDT", "type": "Limit", "side": "Buy", "price": 64500.00, "amount": 0.1, "filled": 0.03, "filledPercent": 30, "total": 6450.00, "status": "Partially Filled", "time": "11:35:21" }
  ],
  "positions": [
    { "pair": "BTC/USDT", "size": 0.25, "side": "Long", "leverage": 5, "entryPrice": 64250.10, "markPrice": 64893.29, "liqPrice": 56210.45, "pnl": 160.80, "pnlPercent": 1.25 }
  ],
  "availableBalance": { "USDT": 12450.25, "BTC": 0.568742 }
}
```

## 10. User / Auth
```json
{
  "user": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "avatarUrl": "/avatars/john.png",
    "verified": true,
    "phone": "+1 (555) 123-4567",
    "country": "United States",
    "timezone": "(UTC-5) Eastern Time"
  },
  "notifications": { "count": 3 }
}
```

## 11. Settings
```json
{
  "security": { "twoFactorEnabled": true, "passkeysActive": 1, "activeSessions": 3 },
  "notifications": { "priceAlerts": true, "tradeExecutions": true, "portfolioAlerts": true, "emailNotifications": true, "pushNotifications": false },
  "apiKeys": { "activeKeys": 2, "requests30d": 12453 },
  "connectedAccounts": [
    { "provider": "Google", "connected": true },
    { "provider": "Apple", "connected": true },
    { "provider": "GitHub", "connected": false },
    { "provider": "Discord", "connected": false }
  ],
  "tradingPreferences": { "defaultCurrency": "USD", "defaultTradingPair": "USDT", "riskWarnings": true, "orderConfirmations": true },
  "appearance": { "theme": "dark", "compactLayout": true, "language": "English", "colorScheme": "green" }
}
```

## 12. KYC
```json
{
  "status": "in_progress",
  "steps": [
    { "id": 1, "name": "Personal Info", "status": "completed" },
    { "id": 2, "name": "Identity Document", "status": "completed" },
    { "id": 3, "name": "Address Verification", "status": "in_progress" },
    { "id": 4, "name": "Selfie Verification", "status": "pending" },
    { "id": 5, "name": "Review & Approval", "status": "pending" }
  ],
  "identityDocument": { "type": "Passport", "number": "P12345678", "expiryDate": "2032-05-12" },
  "addressVerification": {
    "options": ["bank_statement", "utility_bill", "tax_document"],
    "selected": "bank_statement"
  },
  "timeline": [
    { "timestamp": "2026-05-20T10:21:00Z", "label": "Personal information submitted", "done": true },
    { "timestamp": "2026-05-20T10:24:00Z", "label": "Identity document approved", "done": true },
    { "timestamp": "2026-05-20T10:28:00Z", "label": "Address verification submitted", "done": false }
  ]
}
```

## 13. AI Assistant (Portfolio widget)
```json
{
  "context": { "totalValue": 125430.68, "pnl24h": 842.73, "pnl24hPercent": 0.68, "holdingsCount": 7 },
  "messages": [
    { "role": "assistant", "text": "Hi John! I've analyzed your portfolio...", "time": "11:38 AM" }
  ],
  "quickActions": ["Analyze my portfolio", "Risk analysis", "Rebalancing ideas", "Top gainers in my portfolio"]
}
```

## 14. Latest News
```json
{
  "news": [
    {
      "title": "Bitcoin ETF Inflows Reach $1.2B as Institutional Demand Continues to Rise",
      "source": "CoinDesk",
      "time": "2h ago",
      "imageUrl": "/news/btc-etf.jpg"
    }
  ]
}
```
