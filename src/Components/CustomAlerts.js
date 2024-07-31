import React, { useEffect, useState } from 'react';
import { MdErrorOutline } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiAlertLine } from "react-icons/ri";
import { IoInformationCircleOutline } from "react-icons/io5";

const CustomAlert = ({ message, onClose, type }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (message) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [message]);

  const handleClose = () => {
    setShowAlert(false);
    setTimeout(() => onClose(), 300); // Delay to match animation duration
  };

  const handleType = () => {
    switch (type) {
      case 'error':
        return {
          classes: 'ring-2 ring-red-800 border-red-400 text-red-600 bg-gray-100',
          icon: <MdErrorOutline size={27} className="text-red-400" />
        };
      case 'success':
        return {
          classes: 'ring-2 ring-green-800 border-green-400 text-green-600 bg-gray-100',
          icon: <AiOutlineCheckCircle size={27} className="text-green-400" />
        };
      case 'warning':
        return {
          classes: 'ring-2 ring-yellow-800 border-yellow-400 text-yellow-600 bg-gray-100',
          icon: <RiAlertLine size={27} className="text-yellow-400" />
        };
      case 'info':
        return {
          classes: 'ring-2 ring-blue-800 border-blue-400 text-blue-600 bg-gray-100',
          icon: <IoInformationCircleOutline size={27} className="text-blue-400" />
        };
      default:
        return {
          classes: 'ring-2 ring-blue-800 border-blue-400 text-blue-600 bg-gray-100',
          icon: <IoInformationCircleOutline size={27} className="text-blue-400" />
        };
    }
  };

  const { classes, icon } = handleType();

  return (
    <div
      className={`fixed inset-0 top-12 left-[26rem] z-50 transition-opacity duration-300 ${showAlert ? 'opacity-100' : 'opacity-0'}`}
      aria-live="assertive"
    >
      <div className={`flex justify-between p-[0.7rem] items-center shadow-lg rounded-full max-w-[50rem] w-full mx-4 md:mx-0 relative transform transition-transform duration-300 ${showAlert ? 'translate-y-0' : '-translate-y-12'} ${classes}`}>
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end ">
          <button
            onClick={handleClose}
            className={`rounded-md focus:outline-none ${type === 'error' ? 'text-red-400 hover:text-red-800' : type === 'success' ? 'text-green-400 hover:text-green-800' : type === 'warning' ? 'text-yellow-400 hover:text-yellow-800' : 'text-blue-400 hover:text-blue-800'}`}
          >
            <GiCancel size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
