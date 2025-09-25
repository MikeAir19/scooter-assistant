import "./ShortTermForecast.css"
import ShortWidget from "../components/ShortWidget"
import { useContext, useState } from "react"
import { WeatherContext } from "../context/WeatherProvider"

const ShortTermForecast = () => {
  const { forecast, loading, error } = useContext(WeatherContext)
  const [activeIndex, setActiveIndex] = useState(0)

  const visibleForecast = forecast?.slice(0, 7) || []

  if (loading) return <div className="shortterm">Načítám předpověď…</div>
  if (error) return <div className="shortterm-message error">Nepodařilo se načíst data z počasí.</div>
  if (visibleForecast.length === 0) return <div className="shortterm-message error">Žádná data k zobrazení.</div>

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? visibleForecast.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === visibleForecast.length - 1 ? 0 : prev + 1))
  }

  const activeDay = visibleForecast[activeIndex]

  return (
    <section className="shortterm" aria-label="Krátkodobá předpověď">
      <h2 className="shortterm-title">Výhled na příštích 7 dní</h2>

      <div className="shortterm-slider-wrapper">
        <div className="shortterm-slider-container">
          <button
            className="slider-arrow desktop"
            onClick={handlePrev}
            aria-label="Předchozí den"
            type="button"
          >
            ‹
          </button>

          <div className="shortterm-slider" role="region" aria-live="polite">
            <ShortWidget
              date={activeDay.date}
              hourly={activeDay.hourly}
              className="featured"
            />
          </div>

          <button
            className="slider-arrow desktop"
            onClick={handleNext}
            aria-label="Další den"
            type="button"
          >
            ›
          </button>
        </div>

        <div className="slider-dots desktop-only" aria-hidden="false">
          {visibleForecast.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Přejít na den ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        <div className="shortterm-controls mobile-row" aria-hidden="true">
          <button
            className="slider-arrow mobile"
            onClick={handlePrev}
            aria-label="Předchozí den"
            type="button"
          >
            ‹
          </button>

          <div className="slider-dots mobile-only" role="tablist" aria-label="Výběr dne">
            {visibleForecast.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Přejít na den ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          <button
            className="slider-arrow mobile"
            onClick={handleNext}
            aria-label="Další den"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShortTermForecast
