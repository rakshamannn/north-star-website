import textureTile from '../assets/hero-app.png'
import './TextureDivider.css'

export default function TextureDivider() {
  return (
    <div className="texture-divider">
      {/* Full-width stretched texture */}
      <div className="texture-divider-bg">
        <img src={textureTile} alt="" className="texture-tile" />
      </div>
      {/* 1200px inner container with dashed borders */}
      <div className="texture-divider-inner" />
    </div>
  )
}
