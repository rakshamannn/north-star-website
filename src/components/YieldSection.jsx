import { useEffect, useRef, useState } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import StakingCard from './StakingCard'
import heroBg from '../assets/hero-bg.png'
import heroTexture from '../assets/hero-app.png'
import './YieldSection.css'

const ITEMS = [
  {
    id: 0,
    category: 'Galaxy Premium Yield',
    badge: { label: '8.00% Yield', variant: 'amber' },
    title: 'Earn 8.00% Yield on Your Cash',
    desc: "Tap into the power of Galaxy's institutional lending business and earn 8.00% yield on your cash. Purpose-built for U.S. accredited investors with an easy verification process embedded into onboarding.",
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
]

const BAR_HEIGHTS = [19, 32, 47, 65, 82, 100, 117, 131, 143, 159]

function YieldCard() {
  return (
    <div className="yc-card">
      <div>
        <p className="yc-label">Total value in 10Y</p>
        <p className="yc-value">
          <span className="main">$286,250</span>
          <span className="cents">.81</span>
        </p>
        <p className="yc-change">+$46,250.81 (+45.13%)</p>
      </div>
      <div className="yc-chart">
        <div className="yc-yaxis">
          {['$300K', '$250K', '$200K', '$150K', '$100K'].map(l => (
            <span key={l} className="yc-ylabel">{l}</span>
          ))}
        </div>
        <div className="yc-bars">
          {BAR_HEIGHTS.map((h, i) => (
            <div key={i} className="yc-bar-col">
              <div className="yc-bar" style={{ height: h }} />
            </div>
          ))}
        </div>
      </div>
      <div className="yc-xaxis">
        <span className="yc-xlabel">1Y</span>
        <span className="yc-xlabel">10Y</span>
      </div>
    </div>
  )
}

function RightPanel({ children, caption, showArrow }) {
  return (
    <div className="ys-panel-wrap">
      <div className="ys-panel-visual">
        {/* Background */}
        <div className="ys-bg"><img src={heroBg} alt="" /></div>
        <div className="ys-bg-fade" />
        {/* Texture */}
        <img src={heroTexture} alt="" className="ys-texture" />
        {/* Widget */}
        <div className="ys-widget">{children}</div>
        {/* Caption */}
        {caption && (
          <div className="ys-caption"><p>{caption}</p></div>
        )}
        {/* Arrow */}
        {showArrow && (
          <button className="ys-arrow-btn" aria-label="Open">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default function YieldSection() {
  const panelRefs = useRef([])
  // Left always shows Galaxy Premium Yield
  const active = ITEMS[0]

  return (
    <section className="yield-section">
      <div className="yield-inner">
        {/* ── Sticky left ── */}
        <div className="yield-left">
          <div className="yield-left-content">
            <span className="yield-slash">/</span>
            <div className="yield-text">
              <div className="yield-category-row">
                <span className="yield-category">{active.category}</span>
                {active.badge && (
                  <span className={`yield-badge yield-badge-${active.badge.variant}`}>
                    {active.badge.label}
                  </span>
                )}
              </div>
              <h2 className="yield-heading">{active.title}</h2>
              <p className="yield-desc">{active.desc}</p>
              <a href="#" className="yield-link">
                {active.link}
                <CaretRight size={14} weight="bold" style={{ opacity: 0.7 }} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Scrolling right ── */}
        <div className="yield-right">
          {/* Panel 1: Yield chart */}
          <div ref={el => panelRefs.current[0] = el}>
            <RightPanel
              caption="Let your idle cash earn serious yield without locking it up for years."
              showArrow
            >
              <YieldCard />
            </RightPanel>
          </div>

          {/* Panel 2: Staking */}
          <div ref={el => panelRefs.current[1] = el}>
            <RightPanel
              caption="Stake, earn rewards, and manage your crypto in one place."
              showArrow
            >
              <StakingCard />
            </RightPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
