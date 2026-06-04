import textureTile from '../assets/texture-tile.svg'
import './TextureDivider.css'

export default function TextureDivider() {
  return (
    <div className="texture-divider">
      {/* 3 texture tiles at natural 655px width, 13% opacity, flipped vertically */}
      <div className="texture-divider-bg">
        <img src={textureTile} alt="" className="texture-tile" />
        <img src={textureTile} alt="" className="texture-tile" />
        <img src={textureTile} alt="" className="texture-tile" />
      </div>
      {/* 1200px inner — only left/right dashed borders */}
      <div className="texture-divider-inner" />
    </div>
  )
}
