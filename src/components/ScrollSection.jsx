import { useEffect, useRef, useState } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import AaplCard from './AaplCard'
import StakingCard from './StakingCard'
import './ScrollSection.css'

const ITEMS = [
  {
    id: 0,
    category: 'Galaxy Premium Yield',
    badge: { label: '8.00% Yield', variant: 'amber' },
    title: 'Earn 8.00% Yield on Your Cash',
    desc: "Tap into the power of Galaxy's institutional lending business and earn 8.00% yield on your cash. Purpose-built for US accredited investors with an easy verification process embedded into onboarding.",
    link: 'Learn More',
  },
  {
    id: 1,
    category: 'Crypto',
    badge: null,
    title: 'Buy, Sell, Hold and Transfer Crypto — Effortlessly',
    desc: 'Access the full crypto ecosystem in one place. Trade, stake, and manage your digital assets with institutional-grade security and zero hidden fees.',
    link: 'Learn More',
  },
  {
    id: 2,
    category: 'Brokerage',
    badge: { label: 'Commission Free', variant: 'white' },
    title: 'Commission-Free Stocks & ETF Trading',
    desc: 'Access public markets and digital assets in one place — designed for investors who move across both worlds.',
    link: 'Learn More',
  },
  {
    id: 3,
    category: 'Galaxy Cash',
    badge: { label: '2.50%–8.00%', variant: 'teal' },
    title: '3.50% APY, FDIC-Insured',
    desc: "A savings account that actually pays you something — and lets you spend it when you need to.",
    link: 'Learn More',
  },
]

const BAR_HEIGHTS = [11, 18, 26, 36, 46, 56, 65, 73, 80, 89]

function YieldCard() {
  return (
    <div className="yield-card">
      <div className="yield-header">
        <p className="yield-label">Total value in 10Y</p>
        <p className="yield-value">$286,250<span style={{ fontSize: 20, color: '#4a4a4a' }}>.21</span></p>
        <p className="yield-change">+$86,250.21 (+43.12%)</p>
      </div>
      <div className="yield-chart">
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} className="yield-bar-wrap">
            <div className="yield-bar" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

const TRANSACTIONS = [
  { date: 'Mar 11, 2026', rows: [{ name: 'Cash Debit', time: '9:56 PM', amount: '$4,325.56', status: 'pending', icon: '💵' }] },
  { date: 'Mar 10, 2026', rows: [{ name: 'Cash Debit', time: '9:56 PM', amount: '$4,325.56', status: 'pending', icon: '💵' }] },
  { date: 'Mar 9, 2026', rows: [
    { name: 'Cash Debit', time: '9:56 PM', amount: '$5,000.00', status: 'completed', icon: '💵' },
    { name: 'Withdrawal', time: '9:56 PM', amount: '-$2,453.00', status: 'completed', icon: '🏦' },
    { name: 'Withdrawal', time: '9:56 PM', amount: '-$2,453.00', status: 'completed', icon: '🏦' },
  ]},
]

function ActivityCard() {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <p className="activity-title">Cash Account</p>
      </div>
      <div className="activity-list">
        {TRANSACTIONS.map(group => (
          <div key={group.date}>
            <p className="activity-date">{group.date}</p>
            {group.rows.map((row, i) => (
              <div key={i} className="activity-row">
                <div className="activity-icon">{row.icon}</div>
                <div className="activity-info">
                  <p className="activity-name">{row.name}</p>
                  <p className="activity-time">{row.time}</p>
                </div>
                <div className="activity-amount">
                  <p className="activity-usd">{row.amount}</p>
                  <p className={`activity-status ${row.status}`}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const RIGHT_PANELS = [
  { id: 0, Component: YieldCard },
  { id: 1, Component: StakingCard },
  { id: 2, Component: AaplCard },
  { id: 3, Component: ActivityCard },
]

export default function ScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRefs = useRef([])

  useEffect(() => {
    const observers = panelRefs.current.map((el, idx) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(idx) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <section className="scroll-section">
      <div className="scroll-inner">
        {/* ── Sticky left ── */}
        <div className="scroll-left">
          {ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`sl-item${i === activeIndex ? ' active' : ' inactive'}`}
              onClick={() => {
                panelRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="sl-item-header">
                <span className="sl-slash">/</span>
                <span className="sl-category">{item.category}</span>
                {item.badge && (
                  <span className={`sl-badge ${item.badge.variant}`}>{item.badge.label}</span>
                )}
              </div>
              <p className="sl-title">{item.title}</p>
              <div className="sl-body">
                <p className="sl-desc">{item.desc}</p>
                {item.link && (
                  <a href="#" className="sl-link">
                    {item.link}
                    <CaretRight size={14} weight="bold" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Scrolling right panels ── */}
        <div className="scroll-right">
          {RIGHT_PANELS.map(({ id, Component }) => (
            <div
              key={id}
              className="scroll-panel"
              ref={el => panelRefs.current[id] = el}
            >
              <Component />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
