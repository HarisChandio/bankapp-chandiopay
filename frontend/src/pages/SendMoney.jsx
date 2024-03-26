import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Appbar from "../components/Appbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const transferMoney = async () => {
    const token = localStorage.getItem("token");
    try {
      if (amount < 1) {
        return toast.error("The Minimum amount you can transfer is ₹1");
      }
      toast.info("Transferring.....");
      await axios.post(
        `https://${BACKEND_URL}/api/v1/account/transfer`,
        {
          amount,
          to: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await new Promise((res) => setTimeout(() => {res()},500))
      toast.success(`Rs ${amount} is transferred successfully to ${name}`, {
        onClose: () => navigate("/dashboard"),
      });
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div>
      <div>
      <ToastContainer
        autoClose={300}
        hideProgressBar={true}
        position="top-center"
        stacked={true}
      />
        <Appbar />
      </div>
      <div className="flex justify-center bg-gray-100 h-screen">
        <div className="h-full flex flex-col justify-center">
          <div className="border max-w-md p-3 space-y-2 w-96 border-black bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1 ">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-3">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {name[0].toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-gray-400 bg-background px-3 py-2 text-sm focus:outline-none"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={transferMoney}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white"
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
