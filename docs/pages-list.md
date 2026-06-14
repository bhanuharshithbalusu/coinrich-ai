# Coin Rich AI — Pages List

Build order recommended: easiest → hardest (top to bottom), so shared components mature progressively.

## 1. Settings
Account profile, security, notifications, API keys, connected accounts, trading preferences, appearance, support links.
**Uses**: SettingsCard, ToggleSwitch, Badge

## 2. KYC Verification
5-step verification flow (Personal Info → Identity Document → Address Verification → Selfie → Review). Step tracker, document upload tiles, verification timeline, benefits list.
**Uses**: Stepper/ProgressTracker, FileUploadCard, Badge, Timeline (page-specific)

## 3. Wallets
Connected wallet selector, per-wallet overview cards (value, 24h change, sparkline), holdings table by wallet (tabbed), recent activity feed.
**Uses**: WalletCard, StatCard, DataTable, TabGroup, LineAreaChart (small)

## 4. Market
Top stat row (Market Cap, Volume, BTC/ETH Dominance, Fear & Greed, Active Cryptos, Total Markets), category tabs, main coin table with pagination, market heatmap, top gainers/losers, latest news.
**Uses**: StatCard, GaugeCard, TabGroup, DataTable, PaginationControl, HeatmapGrid, CoinIdentifier

## 5. Screener
Saved screener tabs, filter panel (market cap, % change, RSI, MACD, volume spike, category, blockchain dropdowns), results table with AI Score, top opportunities sidebar, market overview sidebar, tips.
**Uses**: FilterDropdown, DataTable, GaugeCard (AI score variant), PaginationControl

## 6. Dashboard
Top stat row (Market Cap, BTC Dominance, Fear & Greed, BTC/ETH Price), main market overview chart + volume bar chart, portfolio summary card, watchlist, top gainers/losers, trending coins, latest news, market performance.
**Uses**: StatCard, GaugeCard, LineAreaChart, BarVolumeChart, DataTable, MiniStatRow

## 7. Portfolio
Overview row (Total Value, PnL, ROI, 24h Change, Risk Score gauge), performance chart, asset allocation donut, holdings table, open positions, recent orders, floating AI assistant panel (expanded state).
**Uses**: StatCard, GaugeCard, LineAreaChart, DonutChart, DataTable, AIAssistantPanel, FloatingAIButton

## 8. Terminal
Most complex: pair header with live stats, candlestick chart w/ MA overlays + volume + drawing toolbar + timeframe tabs, order book, recent trades, market depth chart, spot/margin trade form (buy/sell with slider), open orders/positions/history tabs.
**Uses**: CandlestickChart, OrderBookTable, DepthChart, TradeForm, RangeSlider, TabGroup, DataTable

---

## Shared across ALL pages
- Navbar (logo, nav links, search, theme toggle, notifications, user menu)
- AppLayout wrapper
- FloatingAIButton (bottom-right robot icon)

## Notes
- Navbar nav links differ slightly per page (some pages show "KYC" and "Settings" in nav, others don't — likely all 8 links always present, just truncated in some screenshots). Build navbar with all 8 links: Dashboard, Market, Screener, Terminal, Portfolio, Wallets, KYC, Settings.
- Theme toggle exists but Dark is the only fully-designed theme — implement Dark only for v1.
