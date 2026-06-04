import linesIcon from '../assets/Lines.svg'
import './SectionTitle.css'

export default function SectionTitle({ title }) {
  return (
    <section className="section-title-wrap">
      <div className="section-title-inner">
        {/* Corner marks */}
        <img src={linesIcon} alt="" className="st-corner st-tl" aria-hidden="true" />
        <img src={linesIcon} alt="" className="st-corner st-tr" aria-hidden="true" />

        <p className="section-title-text">{title}</p>
      </div>
    </section>
  )
}
