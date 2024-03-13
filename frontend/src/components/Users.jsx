import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    //debouncing
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])
    return (
        <div className="">
            <div className="font-bold  mt-6 text-lg">
                Users
            </div>
            <div className="my-2"><input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search for users.." className="w-full px-2 py-1 border border-rounded border-slate-200" /></div>
            <div>
                {users.map((user) => <User user={user} />)}
            </div>

        </div>
    )
}

function User({ user }) {
    const naviate = useNavigate()
    return <div className="flex justify-between">
        <div className="flex  ">
            <div className=" rounded-full h-12  w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className=" flex flex-col justify-center h-full text-xl">{user.firstName[0]}</div>
            </div>
            <div className="flex flex-col justify-center  h-ful">{user.firstName} {user.lastName}</div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <Button onClick={() => {
                naviate("/send?id=" + user.id + "&name=" + user.firstName)
            }} label={"Send Money"} ></Button>
        </div>
    </div>
}