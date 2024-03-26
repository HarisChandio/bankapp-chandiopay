import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      navigate("/dashboard");
    }
  }, []);

  return <div></div>;
};

export default Home;
