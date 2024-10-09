import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Products from "./components/Products"
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Products" element={<Products></Products>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
