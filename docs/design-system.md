# Coin Rich AI — Design System

## Theme
Dark mode only (light/system toggle exists in Settings but default is Dark).

## Colors

### Backgrounds
- App background: `#0A0E0C` (near-black, slight green tint)
- Card background: `#131815` / `#141A17` (slightly lighter than app bg)
- Card border: `#1F2722` (subtle 1px border)
- Hover/active surface: `#1A211C`
- Input background: `#0E1310`

### Brand / Accent
- Primary accent (lime green): `#A8E000` — used for logo, active nav link, primary buttons, positive highlights, progress bars, "Greed" zone
- Accent hover: `#94C700`

### Text
- Primary text: `#FFFFFF`
- Secondary/muted text: `#8B9890` or `#6B7670` (labels, sub-text, timestamps)
- Heading text: `#FFFFFF`

### Status Colors
- Positive / gains / buy: `#7ED321` to `#A8E000` (green)
- Negative / losses / sell: `#E5484D` (red)
- Warning / neutral-orange (e.g. BTC dominance line): `#F5A623`
- Info / blue (e.g. ETH dominance line): `#4A9EFF`
- Bullish badge bg: green tint `#1A2E14` with green text
- "Verified" badge: lime green text `#A8E000`

### Chart Colors
- Line chart (positive trend): `#A8E000` with gradient fill fading to transparent
- Bids (order book / depth): green `#7ED321`
- Asks (order book / depth): red `#E5484D`
- Donut chart segments: lime green, blue `#4A9EFF`, purple `#8B5CF6`, orange `#F5A623`, gray `#6B7670` (for "Others")

## Typography
- Font family: Inter / system sans-serif (clean, modern grotesque)
- Headings (page titles): 24–28px, semibold/bold, white
- Card titles: 14–16px, medium weight, white/light gray
- Large stat numbers: 24–32px, bold, white
- Body/table text: 13–14px, regular
- Labels/meta text: 11–12px, muted gray
- Percentage badges: 12–13px, medium, colored (green/red) with ▲/▼ icon

## Spacing & Layout
- Page padding: 24px
- Card padding: 16–20px
- Card border-radius: 12px
- Gap between cards/grid items: 16px
- Top navbar height: ~64px
- Standard grid: 5-column stat row at top of most pages (Dashboard, Market)

## Components — Visual Style
- **Cards**: dark bg, 1px subtle border, 12px radius, 16-20px padding, title in top-left, sometimes icon/info-icon top-right
- **Buttons**:
  - Primary: lime green bg (`#A8E000`), dark text, rounded (8px), bold
  - Secondary/outline: transparent bg, 1px border `#2A332D`, white text
  - Destructive (Sell): red bg `#E5484D`
- **Badges/Pills**: rounded-full, small padding, colored bg tint + colored text (e.g. "Bullish" green, "Partially Filled" yellow, "Verified" green)
- **Tables**: borderless rows, subtle row hover highlight, header row in muted gray text, right-aligned numeric columns
- **Gauges** (Fear & Greed, Risk Score, AI Score): circular/semi-circular arc gauges with gradient from green→yellow→red (or reverse), large number in center
- **Toggle switches**: lime green when on, gray when off
- **Tabs**: underline style, active tab in lime green with green underline, inactive in gray
- **Progress bars**: thin horizontal bars, lime green fill on dark track
- **Icons**: outline-style icons (lucide-react), 16-20px, muted gray default / colored on active
- **Avatars**: circular, small badge/verified checkmark below name

## Navbar (shared across all pages)
- Left: Logo "Coin Rich AI" (icon + wordmark, lime green "AI")
- Center-left: Nav links (Dashboard, Market, Screener, Terminal, Portfolio, Wallets, KYC, Settings) — active link is lime green with underline
- Right: Search bar (placeholder "Search coins, pairs, or contracts...", `/` shortcut hint), theme toggle icon, notification bell with badge count, user avatar + name + "Verified" badge, chevron dropdown

## Floating AI Assistant
- Bottom-right floating circular button (robot icon, lime green bg)
- Expands into chat panel (seen in Portfolio page): tabs for Chat/Insights/Analysis/Alerts, portfolio context summary, quick-action chips, text input
