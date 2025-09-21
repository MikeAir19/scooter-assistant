import "./Widget.css"

const Widget = ({ date, max, min, morning, afternoon, icon, expanded, onClick, onClose }) => {
  const dayName = new Date(date).toLocaleDateString("cs-CZ", { weekday: "long" })

  return (
    <>
      <div className="widget" onClick={onClick}>
        <h3>{dayName} {icon}</h3>
        <p>📅 {date}</p>
        <p>🌡️ Max: {max} °C</p>
        <p>🌡️ Min: {min} °C</p>
      </div>

      {expanded && (
        <div className="widget-overlay" onClick={onClose}>
          <div className="widget expanded">
            <h3>{dayName} {icon}</h3>
            <p>📅 {date}</p>
            <p>🌡️ Max: {max} °C</p>
            <p>🌡️ Min: {min} °C</p>
            <div className="extra-info">
              <p>🌅 Ráno v 8:00: {morning !== null ? `${morning} °C` : "N/A"}</p>
              <p>🌇 Odpoledne v 17:00: {afternoon !== null ? `${afternoon} °C` : "N/A"}</p>
              <p>📈 Pocitová teplota: {Math.round((max + min) / 2)} °C</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Widget
