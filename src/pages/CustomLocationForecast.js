import { useState } from "react"
import axios from "axios"
import "./CustomLocationForecast.css"

const API_URL = "https://api.open-meteo.com/v1/forecast"
const DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "precipitation_sum"
].join(",")

const CustomLocationForecast = () => {
  const [location, setLocation] = useState("")
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setForecast(null)

    try {
      const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: { name: location }
      })

      const result = geoRes.data?.results?.[0]
      if (!result) throw new Error("Město nenalezeno")

      const { latitude, longitude } = result

      const weatherRes = await axios.get(API_URL, {
        params: {
          latitude,
          longitude,
          daily: DAILY_PARAMS,
          timezone: "Europe/Prague",
          forecast_days: 7
        }
      })

      const daily = weatherRes.data.daily
      const formatted = daily.time.map((date, i) => {
        const parsedDate = new Date(date)
        const formattedDate = parsedDate.toLocaleDateString("cs-CZ", {
          day: "numeric",
          month: "numeric"
        })
        const weekday = parsedDate.toLocaleDateString("cs-CZ", { weekday: "long" })
        const isWeekend = [0, 6].includes(parsedDate.getDay())

        const isCold = daily.temperature_2m_min[i] < 10
        const isWet = daily.precipitation_sum[i] > 0

        let status = "✅"
        if (isCold && isWet) status = "🥶 🌧️"
        else if (isCold) status = "🥶"
        else if (isWet) status = "🌧️"

        return {
          date: formattedDate,
          weekday,
          isWeekend,
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i],
          sunrise: daily.sunrise[i]?.split("T")[1],
          sunset: daily.sunset[i]?.split("T")[1],
          status
        }
      })

      setForecast(formatted)
    } catch (err) {
      console.error(err)
      setError("Nepodařilo se načíst data. Zkontroluj název města.")
    }
  }

  return (
    <section className="custom-forecast">
      <h2 className="custom-title">Výhled na 7 dní</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Např. Brno"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Získat předpověď</button>
      </form>

      {error && <p className="error">{error}</p>}

      {forecast && (
        <div className="forecast-results">
          {forecast.map((day, i) => (
            <div key={i} className="forecast-day">
              {day.isWeekend && <span className="weekend-badge">Víkend</span>}
              <h3>{day.weekday} – {day.date}</h3>
              <p className="status">Status: {day.status}</p>
              <p>Teplota: {Math.round(day.min)}°C až {Math.round(day.max)}°C</p>
              <p>Východ slunce: {day.sunrise}</p>
              <p>Západ slunce: {day.sunset}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CustomLocationForecast
