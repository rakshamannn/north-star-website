import { useState } from 'react'
import { CaretDown, DeviceMobile } from '@phosphor-icons/react'
import logo from '../assets/Logo.svg'
import './Navbar.css'

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="galaxyone home">
          <img src={logo} alt="galaxyone" height="32" />
        </a>

        <div className="navbar-links">
          <button
            className="nav-btn"
            aria-expanded={productsOpen}
            onClick={() => setProductsOpen(o => !o)}
          >
            Products
            <CaretDown className="nav-chevron" size={14} weight="bold" />
          </button>

          <a href="#" className="nav-btn">Business</a>

          <button
            className="nav-btn"
            aria-expanded={companyOpen}
            onClick={() => setCompanyOpen(o => !o)}
          >
            Company
            <CaretDown className="nav-chevron" size={14} weight="bold" />
          </button>
        </div>

        <div className="nav-divider" aria-hidden="true" />

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Mobile app">
            <DeviceMobile size={16} weight="regular" />
          </button>
          <button className="login-btn">Log In</button>
        </div>
      </div>
    </nav>
  )
}
