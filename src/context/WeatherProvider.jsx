import { createContext, useEffect, useState } from "react"
import { fetchWeatherData } from "../api/weatherService"

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWeatherData()
      .then(setForecast)
      .catch((err) => {
        console.error(err)
        setForecast([])
        setError("Nepodařilo se načíst data z počasí.")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <WeatherContext.Provider value={{ forecast, loading, error }}>
      {children}
    </WeatherContext.Provider>
  )
}
