import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
export function Dashboard() {
    const [balance, setBalance] = useState(0)
    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get("http://localhost:3001/api/v1/account/balance", {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response)
            setBalance(response.data.balance)
        }
        fetchData()
    },[])
    return (
        <div>
            <AppBar />
            <div className="m-8">
                <Balance value= {parseInt(balance)}/>
                <Users />
            </div>
        </div>
    )
}