import "./Widget.css"

const Widget = ({ date, max, min, morning, afternoon, icon, variant, weekend, onClick }) => {
  const dayName = new Date(date).toLocaleDateString("cs-CZ", { weekday: "long" })

  const isLarge = variant === "large"
  const classNames = `widget ${isLarge ? "widget-large" : ""} ${weekend ? "weekend" : ""}`

  return (
    <div className={classNames} onClick={onClick}>
      <h3 className="widget-day">{dayName}</h3>
      <p className="widget-date">{date}</p>

      <div className="widget-section">
        <div className="widget-label">Maximální teplota</div>
        <div className="widget-value">{max} °C</div>
      </div>
      <div className="widget-section">
        <div className="widget-label">Minimální teplota</div>
        <div className="widget-value">{min} °C</div>
      </div>

      {isLarge && (
        <div className="extra-info">
          <div className="widget-section">
            <div className="widget-label">Ráno (08:00)</div>
            <div className="widget-value">{morning !== null ? `${morning} °C` : "N/A"}</div>
          </div>
          <div className="widget-section">
            <div className="widget-label">Odpoledne (17:00)</div>
            <div className="widget-value">{afternoon !== null ? `${afternoon} °C` : "N/A"}</div>
          </div>
          <div className="widget-section">
            <div className="widget-label">Pocitová teplota</div>
            <div className="widget-value">{Math.round((max + min) / 2)} °C</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Widget
