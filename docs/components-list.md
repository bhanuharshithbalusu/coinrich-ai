# Coin Rich AI — Component Inventory

Group these into build "sessions" as suggested in the workflow. Each component should be generic/prop-driven so it's reused across pages.

## Session A: Stat & Metric Cards
1. **StatCard** — label + large value + % change badge (▲/▼ green/red) + optional mini sparkline
   - Used in: Dashboard top row (Total Market Cap, BTC Dominance, BTC Price, ETH Price), Market top row, Wallets (Total Value cards)
   - Props: `label, value, change, changeType, sparklineData?, subStats?` (e.g. 24h Volume, ETH Dominance shown as secondary line)

2. **GaugeCard** — semi-circular gauge with center number + label + min/max scale labels
   - Used in: Fear & Greed Index (Dashboard, Market), Risk Score (Portfolio), AI Score (Screener, smaller circular variant)
   - Props: `value, min, max, label, zones` (color zones)

3. **MiniStatRow** — small inline stat pairs (e.g. "24h Low / 24h High", "Total Profit / ROI / 24h Change")
   - Used in: Dashboard cards, Portfolio overview, Wallet cards

## Session B: Tables
4. **DataTable** — generic table with configurable columns, sortable headers, row icons (coin logo + name), colored % cells, optional sparkline column, optional star/favorite icon, optional action buttons/menu
   - Used in: Watchlist, Top Gainers/Losers, Trending Coins, Market table, Screener Results, Holdings, Open Positions, Recent Orders, Open Orders, Order/Trade History, Wallet Holdings, Top Opportunities
   - Props: `columns[], data[], onRowClick?, pagination?, sortBy?`

5. **PaginationControl** — numbered pages + prev/next arrows
   - Used in: Market table, Screener results

6. **CoinIdentifier** — small circular coin logo + symbol + name, used as a cell type within DataTable
   - Props: `iconUrl, symbol, name`

## Session C: Charts
7. **LineAreaChart** — line chart with gradient fill below, hover tooltip showing value
   - Used in: Market Overview (Dashboard), Portfolio Performance, individual stat card sparklines
   - Props: `data[], timeRange (1D/7D/1M/1Y/ALL), color`

8. **DonutChart** — donut/pie chart with center label (total value) + side legend list
   - Used in: Asset Allocation (Portfolio)
   - Props: `segments[{label, value, color}], centerLabel, centerValue`

9. **BarVolumeChart** — vertical bar chart for volume
   - Used in: Dashboard 24h Volume chart

10. **HeatmapGrid** — grid of colored tiles sized/colored by performance
    - Used in: Market Heatmap (Market page)
    - Props: `tiles[{symbol, value, change, size}]`

11. **CandlestickChart** — full trading chart with OHLC candles, MA overlay lines, volume bars below, timeframe tabs, drawing toolbar on left
    - Used in: Terminal page (most complex component — consider a charting library like lightweight-charts or TradingView widget)

12. **OrderBookTable** — two-column bid/ask table with colored price rows and depth bars
    - Used in: Terminal

13. **DepthChart** — area chart showing bid/ask market depth
    - Used in: Terminal

## Session D: Forms, Inputs & Controls
14. **SearchBar** — top navbar search with icon + placeholder + keyboard shortcut hint
15. **FilterDropdown** — labeled dropdown/select (used heavily in Screener filters)
16. **RangeSlider** — 0-100% slider with percentage markers (Buy/Sell amount sliders in Terminal)
17. **TabGroup** — underline-style tabs (Spot/Cross/Isolated, Chat/Insights/Analysis/Alerts, Limit/Market/Stop Limit)
18. **TradeForm** — Buy/Sell panel with Price/Amount inputs, slider, total, submit button
19. **ToggleSwitch** — on/off switch (Settings notifications, Hide Small Balances)
20. **Stepper/ProgressTracker** — horizontal numbered steps with connecting lines and status (KYC verification flow)
21. **FileUploadCard** — icon + title + description + upload button, with "selected/completed" state
    - Used in: KYC document upload tiles

## Shared / Layout Components
22. **AppLayout** — navbar + page container wrapper
23. **Navbar** — logo, nav links, search, theme toggle, notifications, user menu
24. **NotificationBell** — bell icon with count badge
25. **UserMenu** — avatar + name + verified badge + dropdown chevron
26. **Badge/Pill** — colored status label (Verified, Bullish, Partially Filled, Active, Connected, In Progress, Completed, Pending)
27. **FloatingAIButton** — circular floating action button (bottom-right)
28. **AIAssistantPanel** — expandable chat panel with tabs, context summary card, quick-action chips, input field
29. **SettingsCard** — icon + title + description + list of settings rows + CTA button
    - Used in: Settings page (Profile, Security, Notifications, API Keys, etc. — all same pattern)
30. **WalletCard** — wallet icon/logo + name + address + connection status, used both as selector and overview card

## Page-Specific (build within page, not shared)
- Latest News list (Dashboard, Market)
- Connected Wallets selector row (Wallets)
- Recent Activity feed (Wallets)
- KYC Verification Timeline (vertical timeline with timestamps)
- Verification Status checklist
