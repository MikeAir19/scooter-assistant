import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

// Objekt s cestami a názvy sekcí
const sectionTitles = {
  "/": "Dnes",
  "/tomorrow": "Zítra",
  "/shorttermforecast": "Týdenní předpověď",
  "/longtermforecast": "Dlouhodobá předpověď",
  "/customlocationforecast": "Vyhledej město",
  "/infopage": "Informace",
  "/cursepage": "Kurz"
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const getSectionTitle = () => sectionTitles[location.pathname] || "";

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
          {Object.entries(sectionTitles).map(([path, label]) => (
            <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
