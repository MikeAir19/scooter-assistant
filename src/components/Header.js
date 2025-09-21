import "./Header.css"
import SA_logo from '../img/SA_logo.png'
import SA_title from '../img/SA_title.png'

const Header = () => {
  return (
    <div className="header-logo">
      <img src={SA_logo} alt="" />
      <img src={SA_title} alt="" />
    </div>
  )
}

export default Header