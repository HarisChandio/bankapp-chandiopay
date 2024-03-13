import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signup"}></Heading>
                    <SubHeading label={"Enter your information to create an account"}></SubHeading>
                    <InputBox onChange={e => {
                        setFirstName(e.target.value)
                    }} label={"Firstname"} placeholder={"Haris"}></InputBox>
                    <InputBox onChange={e => {
                        setLastName(e.target.value)
                    }} label={"Lastname"} placeholder={"Chandio"}></InputBox>
                    <InputBox onChange={e => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"harischandio70@gmail.com"}></InputBox>
                    <InputBox onChange={e => {
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={"haris123"}></InputBox>
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3001/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        localStorage.setItem("token", response.data.token)
                        navigate('/dashboard')
                    }} label={"Signup"}></Button>
                    <BottomWarning label="Already have an account?" bottomText="SignIn" to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>

    )
}