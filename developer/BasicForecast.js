import { useEffect, useState } from "react"
import axios from "axios"
import Widget from "../components/Widget"
import "./BasicForecast.css"

const BasicForecast = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=49.1952&longitude=16.608&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,rain&timezone=Europe%2FPrague&forecast_days=9"

        const response = await axios.get(url)
        setData({
          daily: response.data.daily,
          hourly: response.data.hourly,
        })
      } catch (err) {
        setError("Nepodařilo se načíst předpověď.")
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [])

  const getHourlyValues = (date) => {
    if (!data?.hourly?.temperature_2m || !data?.hourly?.rain || !data?.hourly?.time) {
      return { morning: null, afternoon: null, rainMorning: null, rainAfternoon: null }
    }

    const { time, temperature_2m, rain } = data.hourly
    const morningTime = `${date}T08:00`
    const afternoonTime = `${date}T17:00`

    const morningIndex = time.indexOf(morningTime)
    const afternoonIndex = time.indexOf(afternoonTime)

    return {
      morning: morningIndex !== -1 ? temperature_2m[morningIndex] : null,
      afternoon: afternoonIndex !== -1 ? temperature_2m[afternoonIndex] : null,
      rainMorning: morningIndex !== -1 ? rain[morningIndex] : null,
      rainAfternoon: afternoonIndex !== -1 ? rain[afternoonIndex] : null,
    }
  }

  const isWeekend = (dateStr) => {
    const day = new Date(dateStr).getDay()
    return day === 0 || day === 6
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? data.daily.time.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === data.daily.time.length - 1 ? 0 : prev + 1))
  }

  if (loading) return <div className="forecast-message">Načítám předpověď…</div>
  if (error) return <div className="forecast-message error">{error}</div>
  if (!data || !data.daily?.time) return <div className="forecast-message error">Data nejsou dostupná.</div>

  const activeDate = data.daily.time[activeIndex]
  const { morning, afternoon, rainMorning, rainAfternoon } = getHourlyValues(activeDate)

  let icon = "✅"
  if ((rainMorning ?? 0) > 0 || (rainAfternoon ?? 0) > 0) {
    icon = "🌧️"
  } else if (
    morning !== null &&
    afternoon !== null &&
    (morning < 10 || afternoon < 10)
  ) {
    icon = "🥶"
  }

  return (
    <div className="forecast-wrapper">
      <div className="widget-slider-row">
        <button onClick={handlePrev} className="slider-arrow">‹</button>

        <Widget
          key={activeDate}
          date={activeDate}
          max={data.daily.temperature_2m_max[activeIndex]}
          min={data.daily.temperature_2m_min[activeIndex]}
          morning={morning}
          afternoon={afternoon}
          icon={icon}
          variant="large"
          weekend={isWeekend(activeDate)}
        />

        <button onClick={handleNext} className="slider-arrow">›</button>
      </div>

      <div className="slider-dots">
        {data.daily.time.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <section className="forecast-grid">
        {data.daily.time.map((date, index) => {
          if (index === activeIndex) return null // skip active widget

          const { morning, afternoon, rainMorning, rainAfternoon } = getHourlyValues(date)

          let icon = "✅"
          if ((rainMorning ?? 0) > 0 || (rainAfternoon ?? 0) > 0) {
            icon = "🌧️"
          } else if (
            morning !== null &&
            afternoon !== null &&
            (morning < 10 || afternoon < 10)
          ) {
            icon = "🥶"
          }

          return (
            <Widget
              key={date}
              date={date}
              max={data.daily.temperature_2m_max[index]}
              min={data.daily.temperature_2m_min[index]}
              morning={morning}
              afternoon={afternoon}
              icon={icon}
              weekend={isWeekend(date)}
              onClick={() => setActiveIndex(index)}
            />
          )
        })}
      </section>
    </div>
  )
}

export default BasicForecast
