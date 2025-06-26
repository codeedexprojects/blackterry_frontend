import React, { useState, useEffect } from 'react';
import { Pencil, Info, Trash2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from "/src/Components/Header";
import { deleteAddress, getAddress } from '../services/allApi';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        const response = await getAddress(userId);
        if (response.data) {
          setAddresses(response.data);
        }
      } catch (error) {
        setError('Failed to load addresses');
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.success) {
      setSuccess(location.state.success);
      setTimeout(() => setSuccess(''), 3000);
    }

    fetchAddresses();
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        const response = await deleteAddress({}, id);
        if (response.data) {
          setAddresses(prev => prev.filter(addr => addr._id !== id));
          setSuccess('Address deleted successfully');
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (error) {
        setError('Failed to delete address');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Profile</h1>

        {success && (
          <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Name & Email Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Name</span>
            <button className="text-gray-500 hover:text-black">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-500">E-mail</p>
            <p className="text-sm text-gray-700">bill.sanders@example.com</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Addresses</span>
            <Link 
              to="/add-address" 
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              + Add
            </Link>
          </div>

          {loading && addresses.length === 0 ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex items-center space-x-2 border border-gray-300 bg-white rounded px-4 py-2 text-sm text-gray-600">
              <Info className="w-4 h-4 text-gray-500" />
              <span>No addresses added</span>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div key={address._id} className="border border-gray-300 bg-white rounded p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <p className="font-medium">{address.firstName} {address.lastName}</p>
                        {address.defaultAddress && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{address.address}</p>
                      <p className="text-sm text-gray-700">{address.area}</p>
                      {address.landmark && (
                        <p className="text-sm text-gray-700">Landmark: {address.landmark}</p>
                      )}
                      <p className="text-sm text-gray-700">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-gray-700">{address.country}</p>
                      <p className="text-sm text-gray-700">Phone: {address.number}</p>
                      <p className="text-sm text-gray-700 capitalize">Type: {address.addressType.toLowerCase()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to="/add-address"
                        state={{ addressId: address._id }}
                        className="text-gray-500 hover:text-black"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDeleteAddress(address._id)}
                        disabled={loading}
                        className="text-gray-500 hover:text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/orders"
            className="text-center px-6 py-2 bg-black text-white rounded hover:bg-[#5e3b25] transition"
          >
            Your Orders
          </Link>
          <button
            onClick={handleLogout}
            className="text-center px-6 py-2 border border-black text-black rounded hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;