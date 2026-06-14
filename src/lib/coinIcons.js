// Maps our coin symbols to CoinGecko slug IDs for the markets API
export const SYMBOL_TO_CG_ID = {
  BTC:   'bitcoin',
  ETH:   'ethereum',
  SOL:   'solana',
  BNB:   'binancecoin',
  XRP:   'ripple',
  MATIC: 'matic-network',
  INJ:   'injective-protocol',
  RNDR:  'render-token',
  ARB:   'arbitrum',
  TON:   'the-open-network',
  AVAX:  'avalanche-2',
  SHIB:  'shiba-inu',
  LINK:  'chainlink',
  FIL:   'filecoin',
  PEPE:  'pepe',
  FLOKI: 'floki',
  BONK:  'bonk',
  WIF:   'dogwifcoin',
  BOME:  'book-of-meme',
  OCEAN: 'ocean-protocol',
  FET:   'fetch-ai',
  AGIX:  'singularitynet',
  AKT:   'akash-network',
  GRT:   'the-graph',
  CTXC:  'cortex',
  VLX:   'velas',
  PHA:   'phala-network',
  RLC:   'iexec-rlc',
  // Market gainers / losers
  KAS:   'kaspa',
  IMX:   'immutable-x',
  CFX:   'conflux-token',
  AR:    'arweave',
  LDO:   'lido-dao',
  MKR:   'maker',
};

const ALL_IDS = Object.values(SYMBOL_TO_CG_ID).join(',');

// Fetches image URLs from CoinGecko free API (no key required)
// Returns a map of { SYMBOL -> imageUrl }
export async function fetchCoinIconMap() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ALL_IDS}&per_page=50&sparkline=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko fetch failed');
  const data = await res.json();

  const idToSymbol = Object.fromEntries(
    Object.entries(SYMBOL_TO_CG_ID).map(([sym, id]) => [id, sym])
  );

  const map = {};
  for (const coin of data) {
    const symbol = idToSymbol[coin.id];
    if (symbol) map[symbol] = coin.image; // 'image' is the small PNG URL
  }
  return map;
}
