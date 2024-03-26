  import Dashboard from "./pages/Dashboard";
  import EditProfile from "./pages/EditProfile";
  import Home from "./pages/Home";
  import Profile from "./pages/Profile";
  import SendMoney from "./pages/SendMoney";
  import Signin from "./pages/Signin";
  import Signup from "./pages/Signup";
  import { Routes, Route } from "react-router-dom";

  function App() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/send"} element={<SendMoney />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/edit"} element={<EditProfile />} />
        </Routes>
      </div>
    );
  }

  export default App;
