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
          classes: 'ring-2 ring-red-800 border-red-600 text-white bg-slate-900',
          icon: <MdErrorOutline size={24} className="text-red-400" />
        };
      case 'success':
        return {
          classes: 'ring-2 ring-emerald-800 border-emerald-600 text-white bg-slate-900',
          icon: <AiOutlineCheckCircle size={24} className="text-emerald-400" />
        };
      case 'warning':
        return {
          classes: 'ring-2 ring-amber-800 border-amber-600 text-white bg-slate-900',
          icon: <RiAlertLine size={24} className="text-amber-400" />
        };
      case 'info':
      case 'information':
        return {
          classes: 'ring-2 ring-purple-800 border-purple-600 text-white bg-slate-900',
          icon: <IoInformationCircleOutline size={24} className="text-purple-400" />
        };
      default:
        return {
          classes: 'ring-2 ring-purple-800 border-purple-600 text-white bg-slate-900',
          icon: <IoInformationCircleOutline size={24} className="text-purple-400" />
        };
    }
  };

  const { classes, icon } = handleType();

  return (
    <div
      className={`fixed inset-0 top-12 right-4 md:right-auto md:left-auto z-50 transition-opacity duration-300 ${showAlert ? 'opacity-100' : 'opacity-0'}`}
      aria-live="assertive"
    >
      <div className={`flex justify-between p-4 items-center shadow-xl rounded-lg max-w-md w-full mx-4 md:mx-0 relative transform transition-transform duration-300 ${showAlert ? 'translate-y-0' : '-translate-y-12'} ${classes}`}>
        <div className="flex items-center gap-3">
          {icon}
          <p className="text-white text-sm font-medium">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className={`rounded-md focus:outline-none hover:opacity-70 transition-opacity ${type === 'error' ? 'text-red-400' : type === 'success' ? 'text-emerald-400' : type === 'warning' ? 'text-amber-400' : 'text-purple-400'}`}
          >
            <GiCancel size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
