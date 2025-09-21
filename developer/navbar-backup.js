// import "./Navbar.css"
// import { NavLink, useLocation } from "react-router-dom"
// import { useState } from "react"

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()

//   //otevírání/zavírání menu
//   const toggleMenu = () => setMenuOpen(prev => !prev)

//   //název sekce 
//   const getSectionTitle = () => {
//     if (location.pathname === "/") return "Dnes"
//     if (location.pathname === "/tomorrow") return "Zítra"
//     if (location.pathname === "/basicforecast") return "Týdenní předpověď"
//     if (location.pathname === "/longtermforecast") return "Dlouhodobá předpověď"
//     return ""
//   }

//   return (
//     <header>
//       <div className="mobile-header" onClick={toggleMenu}>
//         {/* dynamický název */}
//         <span>{getSectionTitle()}</span>
//         {/* ikona menu */}
//         <div className="menu-icon">
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//       </div>

//       {/* navigace - otevírání */}
//       <nav className={menuOpen ? "open" : ""}>
//       {/* navigace - zavírání */}
//         <NavLink to="/" onClick={() => setMenuOpen(false)}>Dnes</NavLink>
//         <NavLink to="/tomorrow" onClick={() => setMenuOpen(false)}>Zítra</NavLink>
//         <NavLink to="/basicforecast" onClick={() => setMenuOpen(false)}>Týdenní předpověď</NavLink>
//         <NavLink to="/longtermforecast" onClick={() => setMenuOpen(false)}>Dlouhodobá předpověď</NavLink>
//       </nav>
//     </header>
//   )
// }

// export default Navbar


// css:

// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

// header {
//   background-color: #ffffff;
//   border-bottom: 2px solid #0077cc;
//   padding: 1rem 0;
//   font-family: 'Poppins', sans-serif;
//   box-shadow: 0 4px 12px rgba(0, 119, 204, 0.05);
//   position: relative;
//   z-index: 10;
// }

// /* Desktop navigace */
// nav {
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
//   flex-wrap: wrap;
//   transition: all 0.3s ease;
// }

// nav a {
//   text-decoration: none;
//   color: #0077cc;
//   font-weight: 600;
//   font-size: 1.1rem;
//   transition: color 0.3s ease, transform 0.2s ease;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   font-family: 'Poppins', sans-serif;
// }

// nav a:hover {
//   color: #005fa3;
//   transform: scale(1.05);
//   background-color: #e6f2ff;
// }

// nav a.active {
//   color: #ffffff;
//   background-color: #0077cc;
//   border-radius: 4px;
// }

// /* 📱 Mobilní zobrazení */
// @media (max-width: 600px) {
//   .mobile-header {
//     font-size: 1.3rem;
//     font-weight: 600;
//     color: #0077cc;
//     cursor: pointer;
//     padding: 0.8rem 1rem;
//     border-radius: 8px;
//     background-color: #f0f8ff;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     box-shadow: 0 4px 12px rgba(0, 119, 204, 0.05);
//     margin: 0 1rem;
//   }

//   .mobile-header span {
//     flex-grow: 1;
//   }

//   .menu-icon {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 4px;
//     padding-left: 1rem;
//   }

//   .menu-icon span {
//     display: block;
//     width: 22px;
//     height: 3px;
//     background-color: #0077cc;
//     border-radius: 2px;
//     transition: background-color 0.3s ease;
//   }

//   .menu-icon:hover span {
//     background-color: #005fa3;
//   }

//   nav {
//     display: none;
//     flex-direction: column;
//     align-items: center;
//     gap: 0.5rem;
//     margin-top: 0.5rem;
//     padding-bottom: 1rem;
//     background-color: #ffffff;
//     box-shadow: 0 4px 12px rgba(0, 119, 204, 0.05);
//   }

//   nav.open {
//     display: flex;
//   }

//   nav a {
//     font-size: 1.2rem;
//     padding: 0.4rem 0.8rem;
//     width: 100%;
//     text-align: center;
//   }
// }

// /* Desktop: skryj mobilní nadpis */
// @media (min-width: 601px) {
//   .mobile-header {
//     display: none;
//   }
// }










