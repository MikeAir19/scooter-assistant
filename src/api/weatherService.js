import axios from "axios"

const API_URL = "https://api.open-meteo.com/v1/forecast"
const LAT = 49.1952
const LON = 16.608

const DAILY_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset"
].join(",")

const HOURLY_PARAMS = [
  "temperature_2m",
  "rain",
  "windspeed_10m",
  "snowfall",
  "cloud_cover",
  "relative_humidity_2m"
].join(",")

const CURRENT_PARAMS = [
  "temperature_2m",
  "cloud_cover",
  "snowfall",
  "relative_humidity_2m"
].join(",")

export async function fetchWeatherData() {
  const response = await axios.get(API_URL, {
    params: {
      latitude: LAT,
      longitude: LON,
      daily: DAILY_PARAMS,
      hourly: HOURLY_PARAMS,
      current: CURRENT_PARAMS,
      timezone: "Europe/Prague",
      forecast_days: 14
    }
  })

  return transformData(response.data)
}

function transformData(data) {
  return data.daily.time.map((date, i) => {
    const hourly = data.hourly.time
      .map((time, h) => {
        if (!time.startsWith(date)) return null
        return {
          hour: parseInt(time.slice(11, 13)),
          temp: data.hourly.temperature_2m[h],
          rain: data.hourly.rain[h], 
          wind: data.hourly.windspeed_10m[h],
          snowfall: data.hourly.snowfall[h],
          cloudCover: data.hourly.cloud_cover[h],
          humidity: data.hourly.relative_humidity_2m[h]
        }
      })
      .filter(Boolean)

    const isToday = i === 0

    return {
      date,
      sunrise: data.daily.sunrise[i]?.split("T")[1] ?? null,
      sunset: data.daily.sunset[i]?.split("T")[1] ?? null,
      hourly,
      currentTemp: isToday ? data.current?.temperature_2m ?? null : null,
      cloudCover: isToday ? data.current?.cloud_cover ?? null : null,
      snowfall: isToday ? data.current?.snowfall ?? null : null,
      humidity: isToday ? data.current?.relative_humidity_2m ?? null : null
    }
  })
}
