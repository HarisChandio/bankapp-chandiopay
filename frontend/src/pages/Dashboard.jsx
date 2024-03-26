import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../config";

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [id , setId] = useState(0);

  const fetchBalance = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://${BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
        setFirstName(res.data.firstName);
        setId(res.data.id);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error while fetching the data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBalance(); // Fetch initial balance

    const interval = setInterval(() => {
      fetchBalance(); // Fetch updated balance periodically
    }, 1000); // Interval set to 5 seconds, adjust as needed

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);

  if (loading) {
    return <CircleSpinnerOverlay />;
  }

  return (
    <div>
      <ToastContainer autoClose={500} hideProgressBar={true}/>
      <Appbar name={firstName} />
      <div className="m-8">
        <Balance value={balance.toFixed(2)} />
        <Users id={id}/>
      </div>
    </div>
  );
};

export default Dashboard;
