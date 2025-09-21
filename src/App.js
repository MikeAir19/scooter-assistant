import { BrowserRouter, Routes, Route } from "react-router-dom"
import Today from "./pages/Today"
import BasicForecast from "./pages/BasicForecast"
import LongTermForecast from "./pages/LongTermForecast"
import Error from "./pages/Error"
import SharedLayout from "./pages/SharedLayout"
import Tomorrow from "./pages/Tomorrow"


const App = () => {
  return <BrowserRouter>
    <Routes>

      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Today />} />
        <Route path="/tomorrow" element={<Tomorrow />} />
        <Route path="/basicforecast" element={<BasicForecast />} />
        <Route path="/longtermforecast" element={<LongTermForecast />} />
        <Route path="*" element={<Error />} />
      </Route>

    </Routes>
  </BrowserRouter>
}

export default App