import { CiBank } from 'react-icons/ci'

const LogoCard = () => {
  return (
     <div className="flex flex-col justify-center items-center h-screen">
          <div className="py-5 flex items-center">
            <CiBank size={75} />
            <h1 className="text-5xl font-extrabold ml-4">
              Chandio<span className="text-blue-500">Pay</span>
            </h1>
          </div>
          <div className="text-xl max-w-screen-sm py-5">
            <h3 className="font-mono">
            I developed this project to enhance my understanding of secure transactions 
            using ACID properties.I utilized Tailwind and React to create a seamless interface,
            while employing Node.js Express and MongoDB with sessions for database management.
            </h3>
          </div>
        </div>
  )
}

export default LogoCard