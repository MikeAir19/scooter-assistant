import { useMemo, useState } from "react"
import "./ClothesWidget.css"

const getClothingRecommendation = (temp, wind) => {
  let base = ""
  let icon = ""

  if (temp >= 22) {
    base = "Tričko, kraťasy"
    icon = "👕🩳"
  } else if (temp >= 18) {
    base = "Lehká mikina, kraťasy"
    icon = "🧥🩳"
  } else if (temp >= 15) {
    base = "Mikina, džíny"
    icon = "🧥👖"
  } else if (temp >= 10) {
    base = "Lehká bunda, džíny"
    icon = "🧥👖"
  } else if (temp >= 5) {
    base = "Bunda, džíny"
    icon = "🧥👖"
  } else if (temp >= 0) {
    base = "Bunda, termoprádlo, džíny"
    icon = "🧥🧦👖"
  } else {
    base = "Silná bunda, termoprádlo, čepice"
    icon = "🧥🧣🧢"
  }

  if (wind >= 6) {
    base += " + čepice (fouká)"
  }

  return { text: base, icon }
}

const ClothesWidget = ({ temp, wind }) => {
  const [expanded, setExpanded] = useState(false)

  const recommendation = useMemo(() => {
    if (typeof temp !== "number") return null
    return getClothingRecommendation(temp, wind ?? 0)
  }, [temp, wind])

  const toggleExpanded = () => setExpanded(prev => !prev)

  return (
    <section
      className={`clothes-widget ${expanded ? "expanded" : ""}`}
      onClick={toggleExpanded}
    >
      <div className="clothes-header">
        <span className="clothes-icon">{recommendation?.icon ?? "🧥"}</span>
        <span className="clothes-temp">
          {typeof temp === "number" ? `${Math.round(temp)}°C` : "Načítám…"}
        </span>
      </div>

      {expanded && recommendation && (
        <div className="clothes-details">
          <p className="clothes-recommendation">{recommendation.text}</p>
          <p className="clothes-wind">
            Vítr: {typeof wind === "number" ? `${wind.toFixed(1)} km/h` : "?"}
          </p>
        </div>
      )}

      {!recommendation && (
        <p className="clothes-loading shimmer">
          Načítám doporučení podle počasí…
        </p>
      )}
    </section>
  )
}

export default ClothesWidget
