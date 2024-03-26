import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import Appbar from "../components/Appbar";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    balance: 0,
    username: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      axios
        .get(`https://${BACKEND_URL}/api/v1/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        });
    } catch (e) {
      toast.error("error while fetching the data");
    }
  }, []);

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`https://${BACKEND_URL}/api/v1/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status == 200) {
        localStorage.removeItem("token");
        navigate("/signup");
      } else {
        toast.error("Error While Deleting Account");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) {
    return <CircleSpinnerOverlay />;
  }

  return (
    <div>
      <ToastContainer hideProgressBar={true} autoClose={500} />
      <Appbar name={userData.firstName} />
      <div className="flex items-center justify-center h-screen">
        <div className="md:grid grid-cols-4 grid-rows-2 bg-white gap-2 p-4 rounded-xl">
          <div className="md:col-span-1 h-48 shadow-xl">
            <div className="flex w-full h-full relative">
              <img
                src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
                className="w-44 h-44 m-auto"
                alt=""
              />
            </div>
          </div>
          <div className="md:col-span-3 h-48 shadow-xl space-y-2 p-3">
            <div className="flex">
              <span className="text-sm  font-bold uppercase border-2 rounded-l px-4 py-2 whitespace-no-wrap w-2/6">
                Name:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={userData.firstName + " " + userData.lastName}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2  whitespace-no-wrap w-2/6">
                Email:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={userData.username}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm border font-bold uppercase rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Id:
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={userData.id}
                readOnly
              />
            </div>
            <div className="flex">
              <span className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6">
                Balance (in Rs):
              </span>
              <input
                className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                type="text"
                value={userData.balance}
                readOnly
              />
            </div>
            <div className="py-10">
              <button
                onClick={() => navigate("/edit")}
                className="bg-blue-500 px-6 py-2 mr-6 text-white uppercase font-black"
              >
                Update Account
              </button>

              <button
                onClick={() => setOpen(!open)}
                className="bg-red-500 px-6 py-2 text-white uppercase font-black"
              >
                Delete Account
              </button>

              <div>
                <Dialog open={open} handler={() => setOpen(!open)}>
                  <DialogHeader>Warning: Account Deletion</DialogHeader>
                  <DialogBody>
                    Are you sure you want to delete your account? This action is
                    irreversible, and all data will be permanently lost.
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => setOpen(!open)}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button
                      variant="gradient"
                      color="red"
                      onClick={deleteAccount}
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
