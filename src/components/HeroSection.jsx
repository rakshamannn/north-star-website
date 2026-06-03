import { DeviceMobile } from '@phosphor-icons/react'
import StakingCard from './StakingCard'
import AaplCard from './AaplCard'
import arrowIcon from '../assets/arrow.svg'
import heroBg from '../assets/hero-bg.png'
import heroTexture from '../assets/hero-app.png'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-frame">
        {/* Corner marks inside hero-frame (no overflow:hidden) so they're always visible */}
        <div className="hero-corner-tl" aria-hidden="true">
          <div className="hero-corner-h" /><div className="hero-corner-v" />
        </div>
        <div className="hero-corner-tr" aria-hidden="true">
          <div className="hero-corner-h" /><div className="hero-corner-v" />
        </div>
        <div className="hero-inner">

        {/* ── Left panel ── */}
        <div className="hero-left">
          <div className="hero-text">
            <h1 className="hero-heading">Idle money<br />is expensive</h1>
            <div className="hero-body">
              <p>Earn up to 8% on cash. Reinvest into stocks and crypto. Stake eligible assets for more.</p>
              <p>&nbsp;</p>
              <p>Stacked, that's a blended yield up to 12% — all from one connected system. Stop holding. Start stacking.</p>
            </div>
          </div>
          <div className="hero-ctas">
            <button className="cta-primary">
              Open an Account
              <img src={arrowIcon} alt="" width="14" height="14" />
            </button>
            <button className="cta-secondary">
              <DeviceMobile size={17} weight="regular" />
              Download App
            </button>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="hero-right">
          {/* Background: sunset landscape */}
          <div className="hero-right-bg">
            <img src={heroBg} alt="" />
            <div className="hero-right-bg-fade" />
          </div>

          {/* Matrix texture overlay — top-aligned, blends over background */}
          <img className="hero-texture-overlay" src={heroTexture} alt="" />

          {/* AAPL stock card — ported from north-star with full scrub + range interactions */}
          <div className="hero-card-aapl-wrapper">
            <AaplCard />
          </div>

          {/* Staking card — ported from north-star with full interactions */}
          <div className="hero-card-staking-wrapper">
            <StakingCard />
          </div>
        </div>

        </div>
      </div>
    </section>
  )
}
