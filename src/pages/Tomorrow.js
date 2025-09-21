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
      <h2>{dayName}, {dateString}</h2>

      <div className="status-box">
        <p className="status-label">Status</p>
        <p className="status-value">{icon}</p>
      </div>

      <div className="weather-details">
        <div className="time-block">
          <h3>Ráno (08:00)</h3>
          <div className="block-row"><span>Teplota:</span><span>{tempMorning} °C</span></div>
          <div className="block-row"><span>Déšť:</span><span>{rainMorning} mm</span></div>
          <div className="block-row"><span>Oblačnost:</span><span>{cloudMorning} %</span></div>
          <div className="block-row"><span>Sněžení:</span><span>{snowMorning} mm</span></div>
          <div className="block-row"><span>Vlhkost:</span><span>{humidityMorning} %</span></div>
          <div className="block-row"><span>Východ slunce:</span><span>{sunrise}</span></div>
        </div>

        <div className="time-block">
          <h3>Odpoledne (17:00)</h3>
          <div className="block-row"><span>Teplota:</span><span>{tempAfternoon} °C</span></div>
          <div className="block-row"><span>Déšť:</span><span>{rainAfternoon} mm</span></div>
          <div className="block-row"><span>Oblačnost:</span><span>{cloudAfternoon} %</span></div>
          <div className="block-row"><span>Sněžení:</span><span>{snowAfternoon} mm</span></div>
          <div className="block-row"><span>Vlhkost:</span><span>{humidityAfternoon} %</span></div>
          <div className="block-row"><span>Západ slunce:</span><span>{sunset}</span></div>
        </div>
      </div>
    </div>
  )
}

export default Tomorrow
