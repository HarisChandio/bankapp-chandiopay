import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signin} from "./pages/SignIn";
import {Signup} from "./pages/SignUp";
import {Dashboard }from "./pages/Dashboard";
import {SendMoney }from "./pages/SendMoney";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
