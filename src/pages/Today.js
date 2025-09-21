import { useEffect, useState } from "react"
import axios from "axios"
import "./Today.css"

const Today = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=49.1952&longitude=16.608&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover&hourly=temperature_2m,rain&daily=sunrise,sunset&timezone=Europe%2FPrague&forecast_days=1"
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setError("Nepodařilo se načíst aktuální počasí.")
      } finally {
        setLoading(false)
      }
    }

    fetchToday()
  }, [])

  if (loading) return <div className="today">Načítám počasí…</div>
  if (error) return <div className="today-message error">{error}</div>
  if (!data?.current || !data?.hourly || !data?.daily) return null

  const now = new Date()// testovací čas


  const hour = now.getHours()
  const dayName = now.toLocaleDateString("cs-CZ", { weekday: "long" })
  const dateString = now.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" })
  const timeString = now.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" })

  const getTimeLabel = () => {
    if (hour >= 5 && hour < 9) return "ráno"
    if (hour >= 9 && hour < 12) return "dooledne"
    if (hour >= 12 && hour < 18) return "odpoledne"
    return "večer"
  }

  const getGreetingPrefix = () => getTimeLabel() === "večer" ? "Dobrý" : "Dobré"
  const getAdjectiveForm = () => getTimeLabel() === "večer" ? "ý" : "é"

  const current = data.current
  const hourly = data.hourly
  const daily = data.daily

  const getIndex = (targetTime) => hourly.time.indexOf(targetTime)

  const todayDate = daily.time[0]
  const morningIndex = getIndex(`${todayDate}T08:00`)
  const afternoonIndex = getIndex(`${todayDate}T17:00`)

  //testovací hodnoty zima/déšť:

  const tempMorning = hourly.temperature_2m[morningIndex]
  const tempAfternoon = hourly.temperature_2m[afternoonIndex]
  const rainMorning = hourly.rain[morningIndex]
  const rainAfternoon = hourly.rain[afternoonIndex]


  const sunrise = daily.sunrise[0].split("T")[1]
  const sunset = daily.sunset[0].split("T")[1]

  let icon = "✅"
  if (rainMorning > 0 || rainAfternoon > 0) {
    icon = "🌧️"
  } else if (tempMorning < 10 || tempAfternoon < 10) {
    icon = "🥶"
  }

  const timeLabel = getTimeLabel()
  const greetingPrefix = getGreetingPrefix()
  const adjectiveForm = getAdjectiveForm()

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
          <div className="status-box">
            <p className="status-label">Status:</p>
            <p className="status-value">{icon}</p>
          </div>
          <div className="temp-box">
            <p className="temp-label">Teplota:</p>
            <p className="temp-value">{current.temperature_2m} °C
              🌡️
            </p>
          </div>
        </div>





        <div className="time-block">
          <h3>Ráno (8:00)</h3>
          <p>🌡️ Teplota: {tempMorning} °C</p>
          <p>🌧️ Déšť: {rainMorning} mm</p>
          <p>🌄 Východ slunce: {sunrise}</p>
        </div>

        <div className="time-block">
          <h3>Odpoledne (17:00)</h3>
          <p>🌡️ Teplota: {tempAfternoon} °C</p>
          <p>🌧️ Déšť: {rainAfternoon} mm</p>
          <p>🌆 Západ slunce: {sunset}</p>
        </div>

        <div className="extra-info">
          <p>☁️ Oblačnost: {current.cloud_cover} %</p>
          <p>❄️ Sněžení: {current.snowfall} mm</p>
          <p>💧 Vlhkost: {current.relative_humidity_2m} %</p>
        </div>
      </div>
    </div>
  )
}

export default Today
