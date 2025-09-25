import "./ShortWidget.css"

const ShortWidget = ({ date, hourly, className = "" }) => {
  const jsDate = new Date(date)
  const dayName = jsDate.toLocaleDateString("cs-CZ", { weekday: "short" })
  const formattedDate = jsDate.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
  })

  const isWeekend = [0, 6].includes(jsDate.getDay())

  const fullDayStatus = getStatusIcon(
    hasRain(hourly, 6, 18),
    hasCold(hourly, 6, 18),
    hasSnow(hourly, 6, 18)
  )
  const morningStatus = getStatusIcon(
    hasRain(hourly, 6, 9),
    hasCold(hourly, 7, 9),
    hasSnow(hourly, 6, 9)
  )
  const afternoonStatus = getStatusIcon(
    hasRain(hourly, 15, 18),
    hasCold(hourly, 16, 18),
    hasSnow(hourly, 15, 18)
  )

  const feelsLike = getAverageTemp(hourly, 10, 16)
  const maxWind = getMaxWind(hourly)
  const rainChance = getRainChance(hourly)

  const widgetClass = `short-widget ${isWeekend ? "weekend" : ""} ${className}`.trim()

  return (
    <div className={widgetClass} role="article" aria-label={`Předpověď pro ${dayName}`}>
      {isWeekend && <div className="weekend-badge">Víkend</div>}

      <div className="short-widget-header">
        <span className="short-widget-day">{dayName}</span>
        <span className="short-widget-date">{formattedDate}</span>
      </div>

      <div className="short-widget-row">
        <div className="short-widget-label">Celý den:</div>
        <div className="short-widget-icon">{fullDayStatus}</div>
      </div>
      <div className="short-widget-row">
        <div className="short-widget-label">Ráno:</div>
        <div className="short-widget-icon">{morningStatus}</div>
      </div>
      <div className="short-widget-row">
        <div className="short-widget-label">Odpoledne:</div>
        <div className="short-widget-icon">{afternoonStatus}</div>
      </div>

      <div className="short-widget-row">
        <div className="short-widget-label">Pocitově:</div>
        <div>{feelsLike}°C</div>
      </div>
      <div className="short-widget-row">
        <div className="short-widget-label">Vítr max:</div>
        <div>{maxWind} m/s</div>
      </div>
      <div className="short-widget-row">
        <div className="short-widget-label">Srážky:</div>
        <div>{rainChance}%</div>
      </div>
    </div>
  )
}

function hasRain(hourly, from, to) {
  if (!Array.isArray(hourly)) return false
  return hourly.some(h => h.hour >= from && h.hour < to && h.rain)
}

function hasCold(hourly, from, to) {
  if (!Array.isArray(hourly)) return false
  return hourly.some(h => h.hour >= from && h.hour < to && h.temp < 10)
}

function hasSnow(hourly, from, to) {
  if (!Array.isArray(hourly)) return false
  return hourly.some(h => h.hour >= from && h.hour < to && h.snow)
}

function getStatusIcon(rain, cold, snow) {
  if (snow) return "❄️"
  if (rain && cold) return "🌧️ 🥶"
  if (rain) return "🌧️"
  if (cold) return "🥶"
  return "✅"
}

function getAverageTemp(hourly, from, to) {
  if (!Array.isArray(hourly)) return "-"
  const temps = hourly.filter(h => h.hour >= from && h.hour <= to).map(h => h.temp)
  if (temps.length === 0) return "-"
  const avg = temps.reduce((a, b) => a + b, 0) / temps.length
  return Math.round(avg)
}

function getMaxWind(hourly) {
  if (!Array.isArray(hourly)) return "-"
  const winds = hourly.map(h => h.wind ?? 0)
  return Math.max(...winds)
}

function getRainChance(hourly) {
  if (!Array.isArray(hourly)) return "-"
  const rainyHours = hourly.filter(h => h.rain).length
  const chance = (rainyHours / hourly.length) * 100
  return Math.round(chance)
}

export default ShortWidget
