import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import { Heading } from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoCard from "../components/LogoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signInAcc = async () => {
    try {
      const response = await axios.post(
        `https://${BACKEND_URL}/api/v1/user/signin`,
        {
          username,
          password,
        }
      );

      if (response.status !== 200) {
        toast.error(response.data.msg);
      } else {
        localStorage.setItem("token", response.data.token);
        toast.success("Successfully Logged In", {
          onClose: () => navigate(`/dashboard`),
        });
      }
    } catch (error) {
      toast.error("Sign In failed. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer autoClose={400} hideProgressBar={true} />
      <div className="grid grid-cols 1 md:grid-cols-2">
        <div className="hidden md:block">
          <LogoCard />
        </div>
        <div className="bg-gray-300 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={"Sign in"} />
              <SubHeading
                label={"Enter your credentials to access your account"}
              />
              <InputBox
                placeholder="user@gmail.com"
                label={"Email"}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <InputBox
                type={"password"}
                placeholder="123456"
                label={"Password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="pt-4">
                <Button label={"Sign in"} onClick={signInAcc} />
              </div>
              <BottomWarning
                label={"Don't have an account?"}
                buttonText={"Sign up"}
                to={"/signup"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
