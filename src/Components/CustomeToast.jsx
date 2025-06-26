import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

// Style map
const toastStyles = {
  success: {
    icon: <FaCheckCircle className="text-green-600" size={22} />,
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-l-4 border-green-500'
  },
  error: {
    icon: <FaTimesCircle className="text-red-600" size={22} />,
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-l-4 border-red-500'
  },
  info: {
    icon: <FaInfoCircle className="text-blue-600" size={22} />,
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-l-4 border-blue-500'
  },
  warning: {
    icon: <FaExclamationTriangle className="text-yellow-600" size={22} />,
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-l-4 border-yellow-500'
  }
};

const ToastMessage = ({ type, message }) => (
  <div className={`w-full rounded-md shadow-md p-3 flex gap-3 items-start ${toastStyles[type].bg} ${toastStyles[type].border}`}>
    <div className="mt-0.5">{toastStyles[type].icon}</div>
    <div>
      <p className={`text-sm font-semibold ${toastStyles[type].text}`}>{message}</p>
    </div>
  </div>
);

export const showToast = (type, message) => {
  toast(<ToastMessage type={type} message={message} />, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    className: 'p-0 m-0 !bg-transparent !shadow-none !min-h-0',
    bodyClassName: 'p-0 m-0'
  });
};

export const CustomToastContainer = () => (
  <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    limit={3}
    className="!w-auto !max-w-sm"
  />
);
