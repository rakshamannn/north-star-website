import textureTile from '../assets/texture-tile.svg'
import './ProductsDropdown.css'

const COLUMNS = [
  {
    header: 'Invest',
    items: [
      { title: 'Premium Yield', badge: { label: '8.00% Yield', variant: 'amber' }, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
      { title: 'Crypto',    badge: null, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
      { title: 'Brokerage', badge: null, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
    ],
  },
  {
    header: 'Earn',
    items: [
      { title: 'Cash',    badge: { label: '3.50% Yield', variant: 'amber' }, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
      { title: 'Staking', badge: { label: 'Up to 6.50% in Rewards', variant: 'teal' }, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
    ],
  },
  {
    header: 'More Products',
    items: [
      { title: 'Line of Credit', badge: null, desc: 'Lorem ipsum dolor sit amet, consectetur.' },
    ],
  },
]

export default function ProductsDropdown({ onClose }) {
  return (
    <div className="products-dropdown" role="menu">
      {/* Texture background — same as TextureDivider / MobileDropdown */}
      <div className="pd-texture" aria-hidden="true">
        <img src={textureTile} alt="" className="pd-texture-tile" />
        <img src={textureTile} alt="" className="pd-texture-tile" />
        <img src={textureTile} alt="" className="pd-texture-tile" />
      </div>

      {/* Dark card container wrapping all columns */}
      <div className="pd-card">
        {COLUMNS.map((col) => (
          <div key={col.header} className="pd-column">
            <p className="pd-col-header">
              <span className="slash">/</span>
              {col.header}
            </p>
            <div className="pd-items">
              {col.items.map((item) => (
                <a key={item.title} href="#" className="pd-item" onClick={onClose}>
                  <div className="pd-item-title-row">
                    <p className="pd-item-title">{item.title}</p>
                    {item.badge && (
                      <span className={`pd-badge ${item.badge.variant}`}>{item.badge.label}</span>
                    )}
                  </div>
                  <p className="pd-item-desc">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
