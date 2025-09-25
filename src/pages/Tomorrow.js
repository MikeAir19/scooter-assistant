import { useContext } from "react"
import { WeatherContext } from "../context/WeatherProvider"
import ClothesWidget from "../components/ClothesWidget"
import "./Tomorrow.css"

const Tomorrow = () => {
  const { forecast, loading } = useContext(WeatherContext)

  if (loading) {
    return (
      <div className="tomorrow-message">
        Načítám zítřejší počasí…
      </div>
    )
  }

  if (!forecast || forecast.length < 2) {
    return (
      <div className="tomorrow-message error">
        Nepodařilo se načíst počasí pro zítřek.
      </div>
    )
  }

  const tomorrow = forecast[1]
  const tomorrowDate = new Date(tomorrow.date)
  const dayName = tomorrowDate.toLocaleDateString("cs-CZ", { weekday: "long" })
  const dateString = tomorrowDate.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" })

  const getHourData = (hour) => tomorrow.hourly.find(h => h.hour === hour)

  const morning = getHourData(8)
  const afternoon = getHourData(17)

  const rainMorning = typeof morning?.rain === "number" ? morning.rain.toFixed(1) : "?"
  const rainAfternoon = typeof afternoon?.rain === "number" ? afternoon.rain.toFixed(1) : "?"

  const iconMorning =
    parseFloat(rainMorning) > 0 ? "🌧️"
    : morning?.temp < 10 ? "🥶"
    : "✅"

  const iconAfternoon =
    parseFloat(rainAfternoon) > 0 ? "🌧️"
    : afternoon?.temp < 10 ? "🥶"
    : "✅"

  const icon =
    iconMorning === "🌧️" || iconAfternoon === "🌧️" ? "🌧️"
    : iconMorning === "🥶" || iconAfternoon === "🥶" ? "🥶"
    : "✅"

  return (
    <div className="tomorrow">
      <h2>{dayName}, {dateString}</h2>

      <div className="status-box">
        <p className="status-label">Zítra</p>
        <p className="status-value">{icon}</p>
      </div>

      <div className="weather-details">
        <div className="time-block">
          <h3>Ráno (08:00)</h3>
          <div className="block-row"><span>Status:</span><span>{iconMorning}</span></div>
          <div className="block-row"><span>Teplota:</span><span>{morning?.temp} °C</span></div>
          <div className="block-row"><span>Srážky:</span><span>{rainMorning} mm</span></div>
          <div className="block-row"><span>Sněžení:</span><span>{morning?.snowfall} mm</span></div>
          <div className="block-row"><span>Oblačnost:</span><span>{morning?.cloudCover} %</span></div>
          <div className="block-row"><span>Vlhkost:</span><span>{morning?.humidity} %</span></div>
          <div className="block-row"><span>Vítr:</span><span>{morning?.wind} km/h</span></div>
          <div className="block-row"><span>Východ slunce:</span><span>{tomorrow.sunrise}</span></div>
          <ClothesWidget hour={8} temp={morning?.temp} wind={morning?.wind} />
        </div>

        <div className="time-block">
          <h3>Odpoledne (17:00)</h3>
          <div className="block-row"><span>Status:</span><span>{iconAfternoon}</span></div>
          <div className="block-row"><span>Teplota:</span><span>{afternoon?.temp} °C</span></div>
          <div className="block-row"><span>Srážky:</span><span>{rainAfternoon} mm</span></div>
          <div className="block-row"><span>Sněžení:</span><span>{afternoon?.snowfall} mm</span></div>
          <div className="block-row"><span>Oblačnost:</span><span>{afternoon?.cloudCover} %</span></div>
          <div className="block-row"><span>Vlhkost:</span><span>{afternoon?.humidity} %</span></div>
          <div className="block-row"><span>Vítr:</span><span>{afternoon?.wind} km/h</span></div>
          <div className="block-row"><span>Západ slunce:</span><span>{tomorrow.sunset}</span></div>
          <ClothesWidget hour={17} temp={afternoon?.temp} wind={afternoon?.wind} />
        </div>
      </div>
    </div>
  )
}

export default Tomorrow
