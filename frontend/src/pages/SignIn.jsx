import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"

export function Signin() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signin"}></Heading>
                    <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                    <InputBox label={"Email"} placeholder={"harischandio70@gmail.com"}></InputBox>
                    <InputBox label={"Password"} placeholder={"haris123"}></InputBox>
                    <Button label={"Sign In"}></Button>
                    <BottomWarning label={"Dont have an account?"} bottomText={"Sign Up"} to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}