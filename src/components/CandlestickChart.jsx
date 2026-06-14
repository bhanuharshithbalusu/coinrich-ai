import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from 'lightweight-charts';

const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

const TOOLBAR_ICONS = [
  { title: 'Crosshair', path: 'M12 2v20M2 12h20' },
  { title: 'Trend Line', path: 'M5 19L19 5' },
  { title: 'Horizontal Line', path: 'M2 12h20' },
  { title: 'Rectangle', path: 'M3 5h18v14H3z' },
  { title: 'Text', path: 'M4 6h16M4 10h16M4 14h10' },
  { title: 'Measure', path: 'M3 12h18M3 8l4 4-4 4M21 8l-4 4 4 4' },
  { title: 'Zoom', path: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
];

export default function CandlestickChart({ candles = [], movingAverages = {} }) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTimeframe, setActiveTimeframe] = useState('1h');
  const [ohlc, setOhlc] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !candles.length) return;

    const chart = createChart(containerRef.current, {
      layout: { background: { color: '#131815' }, textColor: '#8B9890' },
      grid: { vertLines: { color: '#1F2722' }, horzLines: { color: '#1F2722' } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: '#1F2722' },
      timeScale: { borderColor: '#1F2722', timeVisible: true, secondsVisible: false },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    // Candlestick series (v5 API)
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#7ED321',
      downColor: '#E5484D',
      borderUpColor: '#7ED321',
      borderDownColor: '#E5484D',
      wickUpColor: '#7ED321',
      wickDownColor: '#E5484D',
    });

    const candleData = candles.map(c => ({
      time: c.time,
      open: parseFloat(c.open.toFixed(2)),
      high: parseFloat(c.high.toFixed(2)),
      low: parseFloat(c.low.toFixed(2)),
      close: parseFloat(c.close.toFixed(2)),
    }));
    candleSeries.setData(candleData);

    // Volume histogram
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#1F2722',
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });
    chart.priceScale('volume').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
    volumeSeries.setData(candles.map(c => ({
      time: c.time,
      value: c.volume,
      color: c.close >= c.open ? '#1A3A10' : '#3A1010',
    })));

    // MA helper
    const computeMA = (period) =>
      candleData.slice(period - 1).map((_, i) => ({
        time: candleData[i + period - 1].time,
        value: parseFloat(
          (candleData.slice(i, i + period).reduce((s, c) => s + c.close, 0) / period).toFixed(2)
        ),
      }));

    const ma7Series = chart.addSeries(LineSeries, { color: '#A8E000', lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    ma7Series.setData(computeMA(7));

    const ma25Series = chart.addSeries(LineSeries, { color: '#4A9EFF', lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    ma25Series.setData(computeMA(25));

    const ma99Series = chart.addSeries(LineSeries, { color: '#8B5CF6', lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    ma99Series.setData(computeMA(Math.min(99, candleData.length)));

    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const d = param.seriesData?.get(candleSeries);
        if (d) setOhlc(d);
      }
    });

    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    });
    ro.observe(containerRef.current);

    chartRef.current = chart;
    return () => { ro.disconnect(); chart.remove(); };
  }, [candles]);

  const lastCandle = candles[candles.length - 1] || {};
  const display = ohlc || lastCandle;

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#131815' }}>
      {/* Timeframe tabs */}
      <div className="flex items-center gap-1 px-3 pt-2 pb-1 border-b" style={{ borderColor: '#1F2722' }}>
        {TIMEFRAMES.map(tf => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className="px-3 py-1 text-xs rounded font-medium transition-colors"
            style={{
              color: activeTimeframe === tf ? '#A8E000' : '#8B9890',
              backgroundColor: activeTimeframe === tf ? '#1A2E14' : 'transparent',
            }}
          >
            {tf}
          </button>
        ))}
        <div className="flex-1" />
        <button className="text-xs px-2 py-1 rounded" style={{ color: '#8B9890' }}>Indicators</button>
      </div>

      {/* OHLC info + MA legend */}
      <div className="flex items-start gap-3 px-3 py-1 text-xs flex-wrap" style={{ color: '#8B9890' }}>
        <span className="font-medium" style={{ color: '#FFFFFF' }}>BTC/USDT · {activeTimeframe} · Coin Rich AI</span>
        {display.open && (
          <>
            <span>O<span style={{ color: '#FFFFFF' }}>{Number(display.open).toFixed(2)}</span></span>
            <span>H<span style={{ color: '#7ED321' }}>{Number(display.high).toFixed(2)}</span></span>
            <span>L<span style={{ color: '#E5484D' }}>{Number(display.low).toFixed(2)}</span></span>
            <span>C<span style={{ color: '#FFFFFF' }}>{Number(display.close).toFixed(2)}</span></span>
          </>
        )}
        <span style={{ color: '#A8E000' }}>MA 7 close {movingAverages.ma7?.toLocaleString()}</span>
        <span style={{ color: '#4A9EFF' }}>MA 25 close {movingAverages.ma25?.toLocaleString()}</span>
        <span style={{ color: '#8B5CF6' }}>MA 99 close {movingAverages.ma99?.toLocaleString()}</span>
      </div>

      {/* Chart body: toolbar + canvas */}
      <div className="flex flex-1 min-h-0">
        {/* Left drawing toolbar */}
        <div className="flex flex-col items-center gap-2 py-2 px-1 border-r flex-shrink-0" style={{ borderColor: '#1F2722', width: 36 }}>
          {TOOLBAR_ICONS.map(({ title, path }) => (
            <button key={title} title={title} className="p-1 rounded" style={{ color: '#6B7670' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={path} />
              </svg>
            </button>
          ))}
        </div>

        {/* Chart container — lightweight-charts mounts here */}
        <div ref={containerRef} style={{ flex: 1, minWidth: 0, minHeight: 0 }} />
      </div>
    </div>
  );
}
