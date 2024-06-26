import { CiBank } from "react-icons/ci";
import { Link } from "react-router-dom";
import DropdownComponent from "./DropdownComponent";

const Appbar = ({ name }) => {
  return (
    <div className="flex justify-between border-b-2 h-16 shadow-md">
      <Link to={"/dashboard"} className="flex items-center ml-4">
        <CiBank size={30} />
        <h1 className="text-2xl ml-2 font-bold">
          Chandio<span className="text-blue-500">Pay</span>
        </h1>
      </Link>

      <div className="flex items-center">
        {name && name.length ? (
          <div className="flex">
            <div className="flex flex-col justify-center mr-4 font-semibold text-lg">
              Hello
            </div>
            <div className="rounded-full h-10 w-10 bg-gray-200 flex justify-center mt-1 mr-4">
              <div className="flex flex-col justify-center h-full text-xl">
                {name && name.length && name[0].toUpperCase()}
              </div>
            </div>
          </div>
        ) : null}

        <div>
          <div>
            <DropdownComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
