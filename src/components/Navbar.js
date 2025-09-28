import "./Navbar.css"
import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const getSectionTitle = () => {
    if (location.pathname === "/") return "Dnes"
    if (location.pathname === "/tomorrow") return "Zítra"
    if (location.pathname === "/shorttermforecast") return "Týdenní předpověď"
    if (location.pathname === "/longtermforecast") return "Dlouhodobá předpověď"
    if (location.pathname === "/customlocationforecast") return "Vyhledej město"
    if (location.pathname === "/infopage") return "Informace"
    if (location.pathname === "/cursepage") return "Kurz"
    return ""
  }

  return (
    <div className="navbar">
      <header>
        <div className="mobile-header" onClick={toggleMenu}>
          <span>{getSectionTitle()}</span>
          <div className={`menu-icon ${menuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className={menuOpen ? "open" : ""}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Dnes</NavLink>
          <NavLink to="/tomorrow" onClick={() => setMenuOpen(false)}>Zítra</NavLink>
          <NavLink to="/shorttermforecast" onClick={() => setMenuOpen(false)}>Týdenní předpověď</NavLink>
          <NavLink to="/longtermforecast" onClick={() => setMenuOpen(false)}>Dlouhodobá předpověď</NavLink>
          <NavLink to="/customlocationforecast" onClick={() => setMenuOpen(false)}>Vyhledej město</NavLink>
          <NavLink to="/infopage" onClick={() => setMenuOpen(false)}>Informace</NavLink>
          <NavLink to="/cursepage" onClick={() => setMenuOpen(false)}>Kurz</NavLink>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
