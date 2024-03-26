import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Users = ({id}) => {

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`)
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => {
            setTimeout(() => {
              setFilter(e.target.value);
            }, 200);
          }}
          className="w-full outline-none border border-black px-2 py-1 rounded"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} key={user._id} myId={id}/>
        ))}
      </div>
    </>
  );
};

function User({ user, myId }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {user.id !== myId ? (
          <Button
            label={"Send Money"}
            onClick={() => {
              navigate(`/send?name=${user.firstName}&id=${user.id}`);
            }}
          />
        ) : (
          <Link to={'/send'} className="text-center px-12 py-1 flex flex-col justify-center border border-gray-500 font-thin text-lg hover:bg-gray-200">
            Send
          </Link>
        )}
      </div>
    </div>
  );
}
