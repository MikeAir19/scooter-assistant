import "./App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WeatherProvider } from "./context/WeatherProvider"
//pages
import Today from "./pages/Today"
import Tomorrow from "./pages/Tomorrow"
import ShortTermForecast from "./pages/ShortTermForecast"
import LongTermForecast from "./pages/LongTermForecast"
import InfoPage from "./pages/InfoPage"
import CursePage from "./pages/CursePage"

import Error from "./pages/Error"
import SharedLayout from "./pages/SharedLayout"
import CustomLocationForecast from "./pages/CustomLocationForecast"

//img
import SA_logo from './img/SA_logo.png'
import SA_title from './img/SA_title.png'


const App = () => {
  return (
    <>
      <header className="header-logo">
        <img className="img-logo" src={SA_logo} alt="" />
        <img className="img-title" src={SA_title} alt="" />
      </header>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Today />} />
              <Route path="/tomorrow" element={<Tomorrow />} />
              <Route path="/shorttermforecast" element={<ShortTermForecast />} />
              <Route path="/longtermforecast" element={<LongTermForecast />} />
              <Route path="/customlocationforecast" element={<CustomLocationForecast />} />
              <Route path="/infopage" element={<InfoPage />} />
              <Route path="/cursepage" element={<CursePage />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
      <footer>
        <p>Vytvořil Michael Rumler pro kurz Reactu ENGETO. 2025</p>
      </footer>
    </>
  )
}

export default App
