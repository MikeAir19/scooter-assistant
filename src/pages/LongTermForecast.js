import "./LongTermForecast.css"
import LongWidget from "../components/LongWidget"
import { useContext, useState } from "react"
import { WeatherContext } from "../context/WeatherProvider"

const LongTermForecast = () => {
  const { forecast, loading, error } = useContext(WeatherContext)
  const [activeIndex, setActiveIndex] = useState(0)

  if (loading) return <div className="longterm">Načítám předpověď…</div>
  if (error) return <div className="longterm-message error">Nepodařilo se načíst data z počasí.</div>
  if (!forecast || forecast.length === 0) return <div className="longterm-message error">Žádná data k zobrazení.</div>

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? forecast.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === forecast.length - 1 ? 0 : prev + 1))
  }

  const formatRange = (data) => {
    const start = new Date(data[0].date)
    const end = new Date(data[data.length - 1].date)
    const format = (d) =>
      d.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric" })
    return `${format(start)} – ${format(end)}`
  }

  return (
    <section className="longterm">
      <h2 className="longterm-title">Výhled na příštích 14 dní</h2>

      <div className="longterm-slider-block">
        <div className="longterm-slider-container">
          <button className="slider-arrow" onClick={handlePrev}>‹</button>
          <div className="longterm-slider">
            <LongWidget {...forecast[activeIndex]} className="featured" />
          </div>
          <button className="slider-arrow" onClick={handleNext}>›</button>
        </div>

        <div className="slider-dots">
          {forecast.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="slider-range">
          {formatRange(forecast)}
        </div>
      </div>

      <div className="longterm-grid">
        {forecast.map((day, index) => (
          <LongWidget key={index} {...day} />
        ))}
      </div>
    </section>
  )
}

export default LongTermForecast
