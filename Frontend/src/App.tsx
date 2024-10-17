import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Products from "./components/Products"
import TransacStats from "./components/TransacStats"
import BarChartCompo from "./components/BarChartCompo"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Products" element={<Products></Products>}></Route>
      <Route path="/Stats" element={<TransacStats></TransacStats>}></Route>
      <Route path="/Charts" element={<BarChartCompo></BarChartCompo>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
