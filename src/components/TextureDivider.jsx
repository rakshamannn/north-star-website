import textureTile from '../assets/texture-section.png'
import './TextureDivider.css'

export default function TextureDivider() {
  return (
    <div className="texture-divider">
      {/* Repeating texture background */}
      <div className="texture-divider-bg">
        <img src={textureTile} alt="" className="texture-tile" />
        <img src={textureTile} alt="" className="texture-tile" />
        <img src={textureTile} alt="" className="texture-tile" />
      </div>

      {/* 1200px content area with dashed borders + corner marks */}
      <div className="texture-divider-inner">
        <div className="texture-corner tl-h" aria-hidden="true" />
        <div className="texture-corner tl-v" aria-hidden="true" />
        <div className="texture-corner tr-h" aria-hidden="true" />
        <div className="texture-corner tr-v" aria-hidden="true" />
      </div>
    </div>
  )
}
