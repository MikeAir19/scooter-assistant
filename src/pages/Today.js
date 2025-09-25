import { useContext } from "react"
import { WeatherContext } from "../context/WeatherProvider"
// import ClothesWidget from "../components/ClothesWidget"
import "./Today.css"


const Today = () => {
  const { forecast, loading } = useContext(WeatherContext)

  if (loading) return <div className="today">Načítám počasí…</div>
  if (!forecast || forecast.length === 0 || !forecast[0]?.hourly) {
    return <div className="today-message error">Nepodařilo se načíst počasí pro dnešek.</div>
  }

  const now = new Date()
  const hour = now.getHours()
  const dayName = now.toLocaleDateString("cs-CZ", { weekday: "long" })
  const dateString = now.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" })
  const timeString = now.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })

  const timeLabel = hour >= 5 && hour < 9
    ? "ráno"
    : hour >= 9 && hour < 12
      ? "dopoledne"
      : hour >= 12 && hour < 18
        ? "odpoledne"
        : "večer"

  const greetingPrefix = timeLabel === "večer" ? "Dobrý" : "Dobré"
  const adjectiveForm = timeLabel === "večer" ? "ý" : "é"

  const today = forecast[0]
  const hourly = today.hourly ?? []
  const sunrise = today.sunrise ?? "?"
  const sunset = today.sunset ?? "?"
  const currentTemp = today.currentTemp ?? "?"
  const cloudCover = today.cloudCover ?? "?"
  const snowfall = today.snowfall ?? "?"
  const humidity = today.humidity ?? "?"

  const getHourData = (targetHour) => hourly.find(h => h.hour === targetHour)

  const morning = getHourData(8)
  const afternoon = getHourData(17)

  const tempMorning = morning?.temp ?? "?"
  const tempAfternoon = afternoon?.temp ?? "?"
  const rainMorning = typeof morning?.rain === "number" ? morning.rain.toFixed(1) : "?"
  const rainAfternoon = typeof afternoon?.rain === "number" ? afternoon.rain.toFixed(1) : "?"

  const dayRainTotal = hourly.reduce((sum, h) => typeof h.rain === "number" ? sum + h.rain : sum, 0)
  const dayMinTemp = Math.min(...hourly.map(h => typeof h.temp === "number" ? h.temp : Infinity))
  let icon = "✅"
  if (dayRainTotal > 0) {
    icon = "🌧️"
  } else if (dayMinTemp < 10 || (typeof currentTemp === "number" && currentTemp < 10)) {
    icon = "🥶"
  }

  let iconMorning = "✅"
  if ((parseFloat(rainMorning) || 0) > 0) {
    iconMorning = "🌧️"
  } else if (typeof tempMorning === "number" && tempMorning < 10) {
    iconMorning = "🥶"
  }

  let iconAfternoon = "✅"
  if ((parseFloat(rainAfternoon) || 0) > 0) {
    iconAfternoon = "🌧️"
  } else if (typeof tempAfternoon === "number" && tempAfternoon < 10) {
    iconAfternoon = "🥶"
  }

  const greeting =
    icon === "✅"
      ? `${greetingPrefix} ${timeLabel} přeji! Dnes je`
      : icon === "🥶"
        ? `Krásn${adjectiveForm}, ale studen${adjectiveForm} ${timeLabel} přeji, dnes je`
        : `Pěkn${adjectiveForm} sychrav${adjectiveForm} ${timeLabel} přeji! Dnes je`

  const decision =
    icon === "✅"
      ? "a v následujících časech můžeš jet:"
      : icon === "🥶"
        ? "a je zima, koloběžku si radši rozmysli!"
        : "a prší, takže koloběžku nech radši doma!"

  return (
    <div className="today">
      <p className="greeting-line">
        {greeting} {dayName}, {dateString} {timeString} {decision}
      </p>

      <div className="weather-details">
        <div className="status-row">
          <div className="status-box main-status">
            <p className="status-label">Aktuální status</p>
            <p className="status-icon">{icon}</p>
          </div>
          <div className="temp-box">
            <p className="temp-label">Aktuální teplota</p>
            <p className="temp-value">{currentTemp} °C</p>
          </div>
        </div>

        <div className="time-block">
          <h3>Ráno (08:00)</h3>
          <div className="block-row"><span>Status:</span><span>{iconMorning}</span></div>
          <div className="block-row"><span>Teplota:</span><span>{tempMorning} °C</span></div>
          <div className="block-row"><span>Srážky:</span><span>{rainMorning} mm</span></div>
          <div className="block-row"><span>Východ slunce:</span><span>{sunrise}</span></div>
          <div className="block-row"><span>Východ slunce:</span><span></span></div>
        </div>

        <div className="time-block">
          <h3>Odpoledne (17:00)</h3>
          <div className="block-row"><span>Status:</span><span>{iconAfternoon}</span></div>
          <div className="block-row"><span>Teplota:</span><span>{tempAfternoon} °C</span></div>
          <div className="block-row"><span>Srážky:</span><span>{rainAfternoon} mm</span></div>
          <div className="block-row"><span>Západ slunce:</span><span>{sunset}</span></div>
        </div>

        <div className="extra-info">
          <div className="block-row"><span>Oblačnost:</span><span>{cloudCover} %</span></div>
          <div className="block-row"><span>Sněžení:</span><span>{snowfall} mm</span></div>
          <div className="block-row"><span>Vlhkost:</span><span>{humidity} %</span></div>
        </div>
      </div>
    </div>
  )
}

export default Today
