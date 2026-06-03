import { useId, useMemo, useRef, useState, useEffect } from 'react'
import { useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import { Star, CaretUp, CaretDown, ArrowLeft } from '@phosphor-icons/react'
import AppleLogo from '../assets/Apple.svg'
import {
  getChartXY, getNearestChartIndex, chartIndexToUsd, chartPeriodOpenY,
  buildSmoothChartPathFromXY, buildSmoothChartAreaPathFromXY,
  generateAaplChartData, splitUsd,
} from '../lib/chartUtils'
import './AaplCard.css'

const RANGES = ['1D', '7D', '1M', '6M', '1Y', '5Y', 'All']

const RANGE_QUOTE = {
  '1D':  { priceUsd: 254.81, changeUsd:  +5.27, changePct: +2.11 },
  '7D':  { priceUsd: 252.74, changeUsd:  +4.13, changePct: +1.65 },
  '1M':  { priceUsd: 241.36, changeUsd: -13.45, changePct: -5.27 },
  '6M':  { priceUsd: 254.81, changeUsd: +18.62, changePct: +7.89 },
  '1Y':  { priceUsd: 255.79, changeUsd:  +7.59, changePct: +3.06 },
  '5Y':  { priceUsd: 254.81, changeUsd: +82.30, changePct: +47.72 },
  'All': { priceUsd: 254.81, changeUsd: +214.50, changePct: +536.25 },
}
const W = 362; const H = 134; const PAD_Y = 8; const H_PLOT = H - 2 * PAD_Y

function formatChange(usd, pct) {
  const sign = usd >= 0 ? '+' : '−'
  const u = Math.abs(usd).toFixed(2)
  const p = Math.abs(pct).toFixed(2)
  return `${sign}$${u} (${sign}${p}%)`
}

function formatAxisUsd(n) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Animated price display
function AnimatedPrice({ valueUsd }) {
  const targetMv = useMotionValue(valueUsd)
  const springMv = useSpring(targetMv, { stiffness: 540, damping: 36, mass: 0.42 })
  const [parts, setParts] = useState(() => splitUsd(valueUsd))

  useEffect(() => { targetMv.set(valueUsd) }, [valueUsd, targetMv])
  useMotionValueEvent(springMv, 'change', (v) => setParts(splitUsd(v)))

  return (
    <div className="aapl-price-row">
      <span className="aapl-price-main">{parts.main}</span>
      <span className="aapl-price-cents">{parts.cents}</span>
    </div>
  )
}

// The chart
function HeroChart({ points, minUsd, maxUsd, scrubIndex, onScrubChange, tone }) {
  const gradId = useId().replace(/:/g, '')
  const hitRef = useRef(null)

  const xy = useMemo(() => {
    const raw = getChartXY(points, W, H_PLOT)
    return raw.map(p => ({ x: p.x, y: p.y + PAD_Y }))
  }, [points])

  const linePath = useMemo(() => buildSmoothChartPathFromXY(xy), [xy])
  const areaPath = useMemo(() => buildSmoothChartAreaPathFromXY(xy, H), [xy])

  const yBaseline = useMemo(() =>
    points.length > 0
      ? chartPeriodOpenY(points, H_PLOT, minUsd, maxUsd, PAD_Y)
      : PAD_Y + H_PLOT * 0.5,
    [points, minUsd, maxUsd]
  )

  const GAIN = 'var(--aapl-lime)'; const LOSS = 'var(--aapl-loss)'
  const clipAbove = `${gradId}-above`; const clipBelow = `${gradId}-below`
  const clipActive = `${gradId}-active`; const clipMuted = `${gradId}-muted`
  const fillId = `${gradId}-fill`
  const OVERLAP = 2
  const MUTED = 'rgba(255,255,255,0.22)'

  const dot = scrubIndex !== null && scrubIndex >= 0 && scrubIndex < xy.length ? xy[scrubIndex] : null
  const dotColor = dot ? (dot.y < yBaseline - 0.5 ? GAIN : dot.y > yBaseline + 0.5 ? LOSS : GAIN) : GAIN

  const emit = (clientX) => {
    if (!onScrubChange || !hitRef.current) return
    const r = hitRef.current.getBoundingClientRect()
    const xSvg = ((clientX - r.left) / r.width) * W
    const idx = getNearestChartIndex(points.length, W, xSvg)
    const val = chartIndexToUsd(points, idx, minUsd, maxUsd)
    const v0 = chartIndexToUsd(points, 0, minUsd, maxUsd)
    onScrubChange({ index: idx, valueUsd: val, changeUsd: val - v0, changePct: v0 ? (val / v0 - 1) * 100 : 0 })
  }
  const clear = () => onScrubChange?.(null)

  return (
    <div className="aapl-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} overflow="visible" className="aapl-chart-svg" preserveAspectRatio="none">
        <defs>
          {dot && scrubIndex !== null && <>
            <clipPath id={clipActive}><rect x="0" y="0" width={Math.min(W, dot.x + OVERLAP)} height={H} /></clipPath>
            <clipPath id={clipMuted}><rect x={Math.max(0, dot.x - OVERLAP / 2)} y="0" width={W - Math.max(0, dot.x - OVERLAP / 2)} height={H} /></clipPath>
          </>}
          <clipPath id={clipAbove}><rect x="0" y="0" width={W} height={Math.max(0, yBaseline)} /></clipPath>
          <clipPath id={clipBelow}><rect x="0" y={yBaseline} width={W} height={Math.max(0, H - yBaseline)} /></clipPath>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={tone === 'gain' ? '#BEF264' : '#fb7185'} stopOpacity="0.38" />
            <stop offset="100%" stopColor={tone === 'gain' ? '#BEF264' : '#fb7185'} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* dashed baseline */}
        <line x1="0" x2={W} y1={yBaseline} y2={yBaseline} stroke={MUTED} strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />

        {dot && scrubIndex !== null ? <>
          <g clipPath={`url(#${clipActive})`}><path d={areaPath} fill={`url(#${fillId})`} /></g>
          <path d={linePath} fill="none" stroke={MUTED} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath={`url(#${clipMuted})`} />
          <g clipPath={`url(#${clipActive})`}>
            <path d={linePath} fill="none" stroke={GAIN} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath={`url(#${clipAbove})`} />
            <path d={linePath} fill="none" stroke={LOSS} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath={`url(#${clipBelow})`} />
          </g>
          {/* vertical crosshair */}
          <line x1={dot.x} x2={dot.x} y1={0} y2={H} stroke={MUTED} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </> : <>
          <path d={linePath} fill="none" stroke={GAIN} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath={`url(#${clipAbove})`} />
          <path d={linePath} fill="none" stroke={LOSS} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" clipPath={`url(#${clipBelow})`} />
        </>}
      </svg>

      {dot && <div className="aapl-scrub-dot" style={{ left: `${(dot.x / W) * 100}%`, top: `${14 + dot.y}px`, backgroundColor: dotColor }} />}

      {onScrubChange && (
        <div ref={hitRef} className="aapl-chart-hit"
          onPointerEnter={e => emit(e.clientX)}
          onPointerMove={e => emit(e.clientX)}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); emit(e.clientX) }}
          onPointerCancel={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); clear() }}
          onPointerLeave={e => { if (!e.currentTarget.hasPointerCapture(e.pointerId)) clear() }}
          onLostPointerCapture={clear}
        />
      )}

      <p className="aapl-axis-label top-right">{formatAxisUsd(maxUsd)}</p>
      <p className="aapl-axis-label mid-right" style={{ top: `${14 + yBaseline}px` }}>{formatAxisUsd((minUsd + maxUsd) / 2)}</p>
      <p className="aapl-axis-label bottom-right">{formatAxisUsd(minUsd)}</p>
    </div>
  )
}

export default function AaplCard() {
  const [range, setRange] = useState('1M')
  const [scrub, setScrub] = useState(null)
  const [starred, setStarred] = useState(false)

  const q = RANGE_QUOTE[range]
  const chartData = useMemo(() => generateAaplChartData(range), [range])
  const spread = Math.max(q.priceUsd * 0.028, 0.5)
  const minUsd = Math.max(0.0001, q.priceUsd - spread)
  const maxUsd = q.priceUsd + spread * 0.42

  useEffect(() => setScrub(null), [range])

  const displayUsd = scrub ? scrub.valueUsd : q.priceUsd
  const displayChangeUsd = scrub ? scrub.changeUsd : q.changeUsd
  const displayChangePct = scrub ? scrub.changePct : q.changePct
  const tone = displayChangeUsd >= 0 ? 'gain' : 'loss'

  return (
    <div className="aapl-card">
      {/* Header */}
      <div className="aapl-header">
        <button className="aapl-icon-btn" aria-label="Back"><ArrowLeft size={18} weight="bold" /></button>
        <div className="aapl-header-center">
          <p className="aapl-ticker">AAPL</p>
          <p className="aapl-company">Apple Inc</p>
        </div>
        <button
          className="aapl-icon-btn"
          aria-label={starred ? 'Remove bookmark' : 'Bookmark'}
          onClick={() => setStarred(s => !s)}
          style={starred ? { color: '#f97316' } : undefined}
        >
          {starred
            ? <Star size={18} weight="fill" color="#f97316" />
            : <Star size={18} weight="regular" />}
        </button>
      </div>

      {/* Price + logo row */}
      <div className="aapl-price-section">
        <div className="aapl-price-left">
          <p className="aapl-name">Apple Inc</p>
          <AnimatedPrice valueUsd={displayUsd} />
          <div className={`aapl-change ${tone}`}>
            {displayChangeUsd >= 0 ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
            {formatChange(displayChangeUsd, displayChangePct)}
          </div>
        </div>
        <div className="aapl-logo-box">
          <img src={AppleLogo} alt="Apple" width="48" height="48" />
        </div>
      </div>

      {/* Chart */}
      <HeroChart
        points={chartData}
        minUsd={minUsd}
        maxUsd={maxUsd}
        scrubIndex={scrub?.index ?? null}
        onScrubChange={setScrub}
        tone={tone}
      />

      {/* Time filters */}
      <div className="aapl-filters">
        {RANGES.map(r => (
          <button key={r} className={`aapl-filter-btn${r === range ? ' active' : ''}`} onClick={() => setRange(r)}>{r}</button>
        ))}
      </div>
    </div>
  )
}
