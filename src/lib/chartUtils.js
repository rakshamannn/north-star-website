// Pure chart math — ported from north-star LineChart.tsx

function clamp01(n) { return Math.max(0, Math.min(1, n)) }

export function getChartXY(points, w, h) {
  const safe = points.length > 1 ? points : [0.5, 0.5]
  const min = Math.min(...safe)
  const max = Math.max(...safe)
  const range = Math.max(1e-6, max - min)
  return safe.map((p, i) => ({
    x: (i / (safe.length - 1)) * w,
    y: h - clamp01((p - min) / range) * h,
  }))
}

export function getNearestChartIndex(pointsLength, w, xSvg) {
  if (pointsLength <= 1) return 0
  const clamped = Math.max(0, Math.min(w, xSvg))
  return Math.max(0, Math.min(pointsLength - 1, Math.round((clamped / w) * (pointsLength - 1))))
}

export function chartIndexToUsd(points, index, minUsd, maxUsd) {
  const safe = points.length > 0 ? points : [0.5]
  const minP = Math.min(...safe)
  const maxP = Math.max(...safe)
  const range = Math.max(1e-9, maxP - minP)
  const p = safe[Math.max(0, Math.min(safe.length - 1, index))]
  return minUsd + ((p - minP) / range) * (maxUsd - minUsd)
}

export function chartPeriodOpenY(points, plotH, minUsd, maxUsd, padY) {
  const openUsd = chartIndexToUsd(points, 0, minUsd, maxUsd)
  const usdRange = Math.max(1e-9, maxUsd - minUsd)
  const t = clamp01((openUsd - minUsd) / usdRange)
  return padY + (plotH - t * plotH)
}

export function buildSmoothChartPathFromXY(xy) {
  if (xy.length === 0) return ''
  if (xy.length === 1) return `M ${xy[0].x.toFixed(2)} ${xy[0].y.toFixed(2)}`
  const d = [`M ${xy[0].x.toFixed(2)} ${xy[0].y.toFixed(2)}`]
  for (let i = 0; i < xy.length - 1; i++) {
    const p0 = xy[Math.max(0, i - 1)]
    const p1 = xy[i]
    const p2 = xy[i + 1]
    const p3 = xy[Math.min(xy.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`)
  }
  return d.join(' ')
}

export function buildSmoothChartAreaPathFromXY(xy, h) {
  if (xy.length === 0) return ''
  const line = buildSmoothChartPathFromXY(xy)
  const first = xy[0]; const last = xy[xy.length - 1]
  if (xy.length === 1) return `M ${first.x.toFixed(2)} ${first.y.toFixed(2)} L ${first.x.toFixed(2)} ${h} L ${first.x.toFixed(2)} ${h} Z`
  return `${line} L ${last.x.toFixed(2)} ${h} L ${first.x.toFixed(2)} ${h} Z`
}

// Generate realistic AAPL-style chart data for each range
function noise(i, len, seed, scale = 1) {
  const t = i / Math.max(1, len - 1)
  return scale * 0.008 * Math.sin(seed * 17.3 + t * 83.7) * Math.sin(seed * 5.1 + i * 2.9)
}

function clampN(n) { return Math.max(0.01, Math.min(0.99, n)) }

export function generateAaplChartData(range) {
  const configs = {
    // 1D: flat start, strong upward finish — positive
    '1D': { len: 32, start: 0.22, end: 0.78, seed: 1.8, waves: 2.1, noiseAmt: 0.9 },
    // 7D: early dip then recovery above open — positive
    '7D': { len: 42, start: 0.45, end: 0.70, seed: 2.1, waves: 3.8, noiseAmt: 0.7 },
    // 1M: starts high, dips below open, slightly recovers but stays negative
    '1M': { len: 60, start: 0.78, end: 0.32, seed: 3.4, waves: 4.2, noiseAmt: 1.1 },
    // 6M: steady climb with pullback mid-way — positive
    '6M': { len: 80, start: 0.18, end: 0.75, seed: 4.2, waves: 5.0, noiseAmt: 0.8 },
    // 1Y: strong upward trend — positive
    '1Y': { len: 90, start: 0.12, end: 0.86, seed: 5.1, waves: 6.3, noiseAmt: 1.0 },
    // 5Y: massive growth with volatility — positive
    '5Y': { len: 100, start: 0.06, end: 0.90, seed: 6.3, waves: 8.1, noiseAmt: 1.3 },
    // All: starts near zero, huge growth — positive
    'All': { len: 120, start: 0.04, end: 0.94, seed: 7.7, waves: 9.5, noiseAmt: 1.5 },
  }
  const { len, start, end, seed, waves, noiseAmt } = configs[range] ?? configs['1M']
  return Array.from({ length: len }, (_, i) => {
    const t = len <= 1 ? 0 : i / (len - 1)
    const macro = start + (end - start) * Math.pow(t, 0.85)
    const slow = 0.035 * Math.sin(t * Math.PI * waves + seed * 0.4)
    const n = noise(i, len, seed, noiseAmt)
    return clampN(macro + slow + n)
  })
}

export function splitUsd(n) {
  const [intPart, dec] = n.toFixed(2).split('.')
  return { main: `$${Number(intPart).toLocaleString('en-US')}`, cents: `.${dec}` }
}
