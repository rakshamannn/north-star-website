import { useRef } from 'react'
import { CaretDown, DeviceMobile } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'
import ProductsDropdown from './ProductsDropdown'
import MobileDropdown from './MobileDropdown'
import './Navbar.css'

function useHoverWithDelay(delay = 120) {
  const timerRef = useRef(null)
  const openRef = useRef(false)
  const [, forceRender] = [null, () => {}]

  // We'll use DOM class toggling instead of state to avoid re-renders
  const enter = (el) => {
    clearTimeout(timerRef.current)
    el.setAttribute('data-open', 'true')
  }
  const leave = (el) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => el.removeAttribute('data-open'), delay)
  }
  return { enter, leave }
}

export default function Navbar() {
  const productsTimer = useRef(null)
  const mobileTimer = useRef(null)

  const handleEnter = (ref, el) => {
    clearTimeout(ref.current)
    if (el) el.setAttribute('data-open', 'true')
  }

  const handleLeave = (ref, el) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => {
      if (el) el.removeAttribute('data-open')
    }, 120)
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="galaxyone home">
          <img src={logo} alt="galaxyone" height="32" />
        </a>

        <div className="navbar-links">
          {/* Products — hover with delay */}
          <div
            className="nav-hover-zone"
            onMouseEnter={e => handleEnter(productsTimer, e.currentTarget)}
            onMouseLeave={e => handleLeave(productsTimer, e.currentTarget)}
          >
            <button className="nav-btn" aria-haspopup="true">
              Products
              <CaretDown className="nav-chevron" size={14} weight="bold" />
            </button>
            <div className="nav-flyout">
              <ProductsDropdown />
            </div>
          </div>

          <a href="#" className="nav-btn">Business</a>

          <button className="nav-btn">
            Company
            <CaretDown className="nav-chevron" size={14} weight="bold" />
          </button>
        </div>

        <div className="nav-divider" aria-hidden="true" />

        <div className="navbar-actions">
          {/* Mobile icon — hover with delay */}
          <div
            className="nav-hover-zone nav-hover-zone-right"
            onMouseEnter={e => handleEnter(mobileTimer, e.currentTarget)}
            onMouseLeave={e => handleLeave(mobileTimer, e.currentTarget)}
          >
            <button className="icon-btn" aria-label="Download app" aria-haspopup="true">
              <DeviceMobile size={16} weight="regular" />
            </button>
            <div className="nav-flyout nav-flyout-right">
              <MobileDropdown />
            </div>
          </div>
          <a href="https://north-star-gold.vercel.app/" className="login-btn" target="_blank" rel="noopener noreferrer">Log In</a>
        </div>
      </div>
    </nav>
  )
}
