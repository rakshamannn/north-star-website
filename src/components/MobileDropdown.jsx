import textureTile from '../assets/hero-app.png'
import qrCode from '../assets/QR.svg'
import './MobileDropdown.css'

export default function MobileDropdown() {
  return (
    <div className="mobile-dropdown">
      {/* Same texture as TextureDivider section */}
      <div className="mobile-dropdown-texture" aria-hidden="true">
        <img src={textureTile} alt="" />
        <img src={textureTile} alt="" />
        <img src={textureTile} alt="" />
      </div>

      <div className="mobile-dropdown-card">
        <div className="mobile-qr-wrap">
          <img src={qrCode} alt="QR code" width="80" height="80" />
        </div>
        <div className="mobile-dropdown-text">
          <p className="mobile-dropdown-title">Use GalaxyOne on your phone</p>
          <p className="mobile-dropdown-desc">Scan the QR code to download now</p>
        </div>
      </div>
    </div>
  )
}
