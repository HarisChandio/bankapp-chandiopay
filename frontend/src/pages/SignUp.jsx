import React, { useState } from "react";
import { Heading } from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoCard from "../components/LogoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupAcc = async () => {
    try {
      const res = await axios.post(
        `https://${BACKEND_URL}/api/v1/user/signup`,
        {
          firstName,
          lastName,
          username,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Succesfully Signed Up", {
        onClose: () => navigate(`/dashboard`),
      });
    } catch (error) {
      toast.error("Error while Signing Up");
    }
  };

  return (
    <div>
      <ToastContainer autoClose={500} hideProgressBar={true} />

      <div className="grid grid-cols 1 md:grid-cols-2">
        <div className="hidden md:block">
          <LogoCard />
        </div>
        <div className="bg-gray-300 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={"Sign up"} />
              <SubHeading
                label={"Enter your infromation to create an account"}
              />
              <InputBox
                placeholder="Tony"
                label={"First Name"}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <InputBox
                placeholder="Stark"
                label={"Last Name"}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <InputBox
                placeholder="tony@gmail.com"
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
                <Button label={"Sign up"} onClick={signupAcc} />
              </div>
              <BottomWarning
                label={"Already have an account?"}
                buttonText={"Sign in"}
                to={"/signin"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
