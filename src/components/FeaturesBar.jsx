import { TrendUp, ShieldCheck, Coins } from '@phosphor-icons/react'
import galaxyLogo from '../assets/Galaxy.svg'
import linesIcon from '../assets/Lines.svg'
import './FeaturesBar.css'

const FEATURES = [
  { icon: <TrendUp size={24} weight="regular" />, label: 'Up to 8.00% APY', divider: true },
  { icon: <ShieldCheck size={24} weight="regular" />, label: 'FDIC/SIPC Insured', divider: true },
  { icon: <img src={galaxyLogo} alt="Galaxy" width="20" height="21" />, label: 'Built by Galaxy', divider: true },
  { icon: <Coins size={24} weight="regular" />, label: 'Multi-asset platform', divider: false },
]

export default function FeaturesBar() {
  return (
    <div className="features-bar">
      <div className="features-inner">
        {/* Corner marks — all 4 corners at border crossings */}
        <img src={linesIcon} alt="" className="features-corner features-corner-tl" aria-hidden="true" />
        <img src={linesIcon} alt="" className="features-corner features-corner-tr" aria-hidden="true" />
        <img src={linesIcon} alt="" className="features-corner features-corner-bl" aria-hidden="true" />
        <img src={linesIcon} alt="" className="features-corner features-corner-br" aria-hidden="true" />

        {FEATURES.map(({ icon, label, divider }, i) => (
          <div key={i} className={`features-cell${divider ? ' has-divider' : ''}`}>
            <span className="features-icon">{icon}</span>
            <p className="features-label">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
