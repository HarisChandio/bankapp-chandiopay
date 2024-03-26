import React from 'react'

const InputBox = ({label, placeholder , onChange, type}) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input placeholder={placeholder} onChange={onChange} type={type || "text"}  className="w-full px-2 py-1 rounded-md focus:outline-none border border-black" />
    </div>
  )
}

export default InputBox