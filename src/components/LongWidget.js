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
    hasCondition(hourly, 5, 24, h => h.rain),
    hasCondition(hourly, 5, 24, h => h.temp < 10)
  )

  const morningStatus = getStatusIcon(
    hasCondition(hourly, 5, 9, h => h.rain),
    hasCondition(hourly, 7, 9, h => h.temp < 10)
  )

  const afternoonStatus = getStatusIcon(
    hasCondition(hourly, 15, 18, h => h.rain),
    hasCondition(hourly, 17, 18, h => h.temp < 10)
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

function hasCondition(hourly, from, to, predicate) {
  return hourly.some(h => h.hour >= from && h.hour < to && predicate(h))
}

function getStatusIcon(rain, cold) {
  if (rain && cold) return "🌧️ 🥶"
  if (rain) return "🌧️"
  if (cold) return "🥶"
  return "✅"
}

export default LongWidget
