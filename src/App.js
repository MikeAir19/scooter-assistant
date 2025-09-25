import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WeatherProvider } from "./context/WeatherProvider" 
//pages
import Today from "./pages/Today"
import Tomorrow from "./pages/Tomorrow"
import ShortTermForecast from "./pages/ShortTermForecast"
import LongTermForecast from "./pages/LongTermForecast"
import InfoPage from "./pages/InfoPage"

import Error from "./pages/Error"
import SharedLayout from "./pages/SharedLayout"


const App = () => {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Today />} />
            <Route path="/tomorrow" element={<Tomorrow />} />
            <Route path="/shorttermforecast" element={<ShortTermForecast />} />
            <Route path="/longtermforecast" element={<LongTermForecast />} />
            <Route path="/infopage" element={<InfoPage />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  )
}

export default App
