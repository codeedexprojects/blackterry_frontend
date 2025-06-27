import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleOrder=()=>{
    navigate('/order-list')
  }

  useEffect(() => {
    const checkTimer = setTimeout(() => {
      setShowCheck(true);
    }, 500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8 tracking-wide">
          THANK YOU FOR ORDERING
        </h1>

        {/* Animated Checkmark */}
        <div className="mb-8 flex justify-center">
          <div
            className={`
              w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center
              transform transition-all duration-700 ease-out
              ${showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
            `}
          >
            <Check
              className={`
                w-10 h-10 text-white
                transform transition-all duration-500 ease-out delay-300
                ${showCheck ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={`
            transform transition-all duration-700 ease-out
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            ORDER PLACED
          </h2>

          <div className="mb-6">
            <p className="text-gray-600 font-medium mb-1">
              Estimated Delivery
            </p>
            <p className="text-gray-400 text-sm">
              June 5, 2025
            </p>
          </div>

          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            We've emailed you a confirmation and we'll notify you when your order has shipped.
          </p>

          <button
            style={{ backgroundColor: '#50311D' }}
            onClick={handleOrder}
            className="w-full hover:brightness-90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 tracking-wide"
          >
            VIEW ORDER DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}
