import { useEffect, useState } from "react"
import axios from "axios"
import "./Tomorrow.css"

const Tomorrow = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTomorrow = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=49.1952&longitude=16.608&hourly=temperature_2m,rain,cloud_cover,snowfall,relative_humidity_2m&daily=sunrise,sunset&timezone=Europe%2FPrague&forecast_days=2"
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setError("Nepodařilo se načíst počasí pro zítřek.")
      } finally {
        setLoading(false)
      }
    }

    fetchTomorrow()
  }, [])

  if (loading) return <div className="tomorrow">Načítám zítřejší počasí…</div>
  if (error) return <div className="tomorrow-message error">{error}</div>
  if (!data?.hourly || !data?.daily || !data.daily.time?.[1]) return null

  const tomorrowDate = new Date(data.daily.time[1])
  const dayName = tomorrowDate.toLocaleDateString("cs-CZ", { weekday: "long" })
  const dateString = tomorrowDate.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" })

  const hourly = data.hourly
  const daily = data.daily

  const getIndex = (targetTime) => hourly.time.indexOf(targetTime)

  const isoDate = daily.time[1]
  const morningIndex = getIndex(`${isoDate}T08:00`)
  const afternoonIndex = getIndex(`${isoDate}T17:00`)

  const tempMorning = hourly.temperature_2m[morningIndex]
  const tempAfternoon = hourly.temperature_2m[afternoonIndex]
  const rainMorning = hourly.rain[morningIndex]
  const rainAfternoon = hourly.rain[afternoonIndex]
  const cloudMorning = hourly.cloud_cover[morningIndex]
  const cloudAfternoon = hourly.cloud_cover[afternoonIndex]
  const snowMorning = hourly.snowfall[morningIndex]
  const snowAfternoon = hourly.snowfall[afternoonIndex]
  const humidityMorning = hourly.relative_humidity_2m[morningIndex]
  const humidityAfternoon = hourly.relative_humidity_2m[afternoonIndex]

  const sunrise = daily.sunrise[1]?.split("T")[1] || "N/A"
  const sunset = daily.sunset[1]?.split("T")[1] || "N/A"

  let icon = "✅"
  if (rainMorning > 0 || rainAfternoon > 0) {
    icon = "🌧️"
  } else if (tempMorning < 10 || tempAfternoon < 10) {
    icon = "🥶"
  }

  return (
    <div className="tomorrow">
      <h2>{dayName}, {dateString} {icon}</h2>

      <div className="weather-details">
        <div className="time-block">
          <h3>🕗 Ráno (8:00)</h3>
          <p>🌡️ Teplota: {tempMorning} °C</p>
          <p>🌧️ Déšť: {rainMorning} mm</p>
          <p>☁️ Oblačnost: {cloudMorning} %</p>
          <p>❄️ Sněžení: {snowMorning} mm</p>
          <p>💧 Vlhkost: {humidityMorning} %</p>
          <p>🌄 Východ slunce: {sunrise}</p>
        </div>

        <div className="time-block">
          <h3>🕔 Odpoledne (17:00)</h3>
          <p>🌡️ Teplota: {tempAfternoon} °C</p>
          <p>🌧️ Déšť: {rainAfternoon} mm</p>
          <p>☁️ Oblačnost: {cloudAfternoon} %</p>
          <p>❄️ Sněžení: {snowAfternoon} mm</p>
          <p>💧 Vlhkost: {humidityAfternoon} %</p>
          <p>🌆 Západ slunce: {sunset}</p>
        </div>
      </div>
    </div>
  )
}

export default Tomorrow
