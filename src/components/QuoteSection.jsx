import quoteMark from '../assets/quotes.svg'
import avatar from '../assets/novogratz.png'
import './QuoteSection.css'

const CARDS = [
  {
    number: '01',
    title: 'Hold & Earn on Cash',
    desc: 'Put idle cash to work with institutional-grade yield, seamless liquidity, and secure account protection.',
  },
  {
    number: '02',
    title: 'Trade Stocks & Crypto',
    desc: 'Access public markets and digital assets in one place — designed for investors who move across both worlds.',
  },
  {
    number: '03',
    title: 'Invest in Premium Products',
    desc: 'Unlock curated opportunities, structured strategies, and investment products typically reserved for institutions.',
  },
]

export default function QuoteSection() {
  return (
    <>
      {/* ── Quote ── */}
      <section className="quote-section">
        <div className="quote-inner">
          {/* Corner marks */}
          <div className="quote-corner quote-corner-tl-h" aria-hidden="true" />
          <div className="quote-corner quote-corner-tl-v" aria-hidden="true" />
          <div className="quote-corner quote-corner-tr-h" aria-hidden="true" />
          <div className="quote-corner quote-corner-tr-v" aria-hidden="true" />

          <div className="quote-content">
            <img src={quoteMark} alt="" className="quote-mark" />
            <p className="quote-text">
              For a century, the best returns were locked behind private banks, hedge funds, and family offices. We built GalaxyOne to break that down — to give every serious investor the same rates, the same instruments, the same edge.
            </p>
            <div className="quote-attribution">
              <img src={avatar} alt="Michael Novogratz" className="quote-avatar" />
              <p className="quote-author">Michael Novogratz, CEO of Galaxy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="features-cards-section">
        <div className="features-cards-inner">
          {/* Corner marks */}
          <div className="fc-corner fc-corner-tl-h" aria-hidden="true" />
          <div className="fc-corner fc-corner-tl-v" aria-hidden="true" />
          <div className="fc-corner fc-corner-tr-h" aria-hidden="true" />
          <div className="fc-corner fc-corner-tr-v" aria-hidden="true" />

          {CARDS.map(({ number, title, desc }) => (
            <div key={number} className="fc-card">
              <span className="fc-slash">/</span>
              <div className="fc-card-content">
                <p className="fc-number">{number}</p>
                <div className="fc-bottom">
                  <p className="fc-title">{title}</p>
                  <p className="fc-desc">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
