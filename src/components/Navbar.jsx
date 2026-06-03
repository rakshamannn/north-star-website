import { useState, useEffect, useRef } from 'react'
import { CaretDown, DeviceMobile } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'
import ProductsDropdown from './ProductsDropdown'
import MobileDropdown from './MobileDropdown'
import './Navbar.css'

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!productsOpen && !companyOpen && !mobileOpen) return
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setProductsOpen(false)
        setCompanyOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [productsOpen, companyOpen, mobileOpen])

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="galaxyone home">
          <img src={logo} alt="galaxyone" height="32" />
        </a>

        <div className="navbar-links">
          <button
            className={`nav-btn${productsOpen ? ' active' : ''}`}
            aria-expanded={productsOpen}
            onClick={() => { setProductsOpen(o => !o); setCompanyOpen(false) }}
          >
            Products
            <CaretDown
              className="nav-chevron"
              size={14}
              weight="bold"
              style={{ transform: productsOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s ease' }}
            />
          </button>

          <a href="#" className="nav-btn">Business</a>

          <button
            className="nav-btn"
            aria-expanded={companyOpen}
            onClick={() => { setCompanyOpen(o => !o); setProductsOpen(false) }}
          >
            Company
            <CaretDown
              className="nav-chevron"
              size={14}
              weight="bold"
              style={{ transform: companyOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s ease' }}
            />
          </button>
        </div>

        <div className="nav-divider" aria-hidden="true" />

        <div className="navbar-actions">
          <button
            className={`icon-btn${mobileOpen ? ' active' : ''}`}
            aria-label="Download app"
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen(o => !o); setProductsOpen(false); setCompanyOpen(false) }}
          >
            <DeviceMobile size={16} weight="regular" />
          </button>
          <a href="https://north-star-gold.vercel.app/" className="login-btn" target="_blank" rel="noopener noreferrer">Log In</a>
        </div>
      </div>

      {productsOpen && (
        <ProductsDropdown onClose={() => setProductsOpen(false)} />
      )}
      {mobileOpen && <MobileDropdown />}
    </nav>
  )
}
