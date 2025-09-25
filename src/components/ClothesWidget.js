import { useContext, useMemo } from "react"
import { WeatherContext } from "../context/WeatherProvider"
import "./ClothesWidget.css"

const getClothingRecommendation = (temp) => {
  if (temp >= 22) return "Tričko, kraťasy"
  if (temp >= 18) return "Lehká mikina, kraťasy"
  if (temp >= 15) return "Mikina, džíny"
  if (temp >= 10) return "Lehká bunda, džíny"
  if (temp >= 5) return "Bunda, džíny"
  if (temp >= 0) return "Bunda, termoprádlo, džíny"
  return "Silná bunda, termoprádlo, čepice"
}

const ClothesWidget = () => {
  const weather = useContext(WeatherContext)

  const currentHour = new Date().getHours()

  const currentTemp = useMemo(() => {
    const today = weather?.[0]
    if (!today) return null
    const hourData = today.hourly.find(h => h.hour === currentHour)
    return hourData?.temp ?? today.currentTemp ?? null
  }, [weather, currentHour])

  const recommendation = useMemo(() => {
    if (typeof currentTemp !== "number") return null
    return getClothingRecommendation(currentTemp)
  }, [currentTemp])

  return (
    <section className="clothes-widget">
      <h2 className="clothes-title">Doporučení oblečení</h2>
      {currentTemp !== null ? (
        <div className="clothes-content">
          <p className="clothes-temp">Aktuální teplota: <strong>{Math.round(currentTemp)}°C</strong></p>
          <p className="clothes-recommendation">{recommendation}</p>
        </div>
      ) : (
        <p className="clothes-loading">Načítám doporučení podle počasí…</p>
      )}
    </section>
  )
}

export default ClothesWidget
