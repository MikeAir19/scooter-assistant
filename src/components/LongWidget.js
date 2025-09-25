import "./LongWidget.css"

const LongWidget = ({ date, hourly, className = "" }) => {
  const jsDate = new Date(date)
  const dayName = jsDate.toLocaleDateString("cs-CZ", { weekday: "short" })
  const formattedDate = jsDate.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
  })

  const isWeekend = [0, 6].includes(jsDate.getDay())

  const fullDayStatus = getStatusIcon(
    hasRain(hourly, 5, 24),
    hasCold(hourly, 5, 24)
  )

  const morningStatus = getStatusIcon(
    hasRain(hourly, 5, 9),
    hasCold(hourly, 7, 9)
  )

  const afternoonStatus = getStatusIcon(
    hasRain(hourly, 15, 18),
    hasCold(hourly, 17, 18)
  )

  const widgetClass = `long-widget ${isWeekend ? "weekend" : ""} ${className}`

  return (
    <div className={widgetClass}>
      {isWeekend && <div className="weekend-badge">Víkend</div>}

      <div className="long-widget-header">
        <span className="long-widget-day">{dayName}</span>
      </div>
      <div className="long-widget-date">{formattedDate}</div>

      <div className="long-widget-row">
        <span className="long-widget-label">Celý den</span>
        <span className="long-widget-icon">{fullDayStatus}</span>
      </div>

      <div className="long-widget-row">
        <span className="long-widget-label">Ráno</span>
        <span className="long-widget-icon">{morningStatus}</span>
      </div>

      <div className="long-widget-row">
        <span className="long-widget-label">Odpo.</span>
        <span className="long-widget-icon">{afternoonStatus}</span>
      </div>
    </div>
  )
}

function hasRain(hourly, from, to) {
  return hourly.some(h => h.hour >= from && h.hour < to && h.rain)
}

function hasCold(hourly, from, to) {
  return hourly.some(h => h.hour >= from && h.hour < to && h.temp < 10)
}

function getStatusIcon(rain, cold) {
  if (rain && cold) return "🌧️ 🥶"
  if (rain) return "🌧️"
  if (cold) return "🥶"
  return "✅"
}

export default LongWidget
