import { Link } from "react-router-dom"
import "./Error.css"

const Error = () => {
  return (
    <section className="error-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">Stránka nenalezena</p>
      <Link to="/" className="error-link">Zpět na úvodní stránku</Link>
    </section>
  )
}

export default Error
