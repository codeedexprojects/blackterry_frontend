import React, { useState, useEffect } from 'react';
import { Pencil, Info, Trash2, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from "/src/Components/Header";
import { deleteAddress, getAddress, getProfile } from '../services/allApi';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const isUserLoggedIn = () => {
    return localStorage.getItem('userToken') && localStorage.getItem('userId');
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      setProfileLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setProfileLoading(true);

        const userId = localStorage.getItem('userId');

        // Fetch user profile
        const profileResponse = await getProfile(userId);
        if (profileResponse.data) {
          setUser(profileResponse.data.user);
        }

        // Fetch addresses
        const addressResponse = await getAddress(userId);
        if (addressResponse.data) {
          setAddresses(addressResponse.data);
        }

        if (location.state?.success) {
          setSuccess(location.state.success);
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (error) {
        setError('Failed to load profile data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
        setProfileLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const confirmDeleteAddress = (id) => {
    if (!isUserLoggedIn()) {
      alert('Please login to manage your addresses');
      return;
    }
    setAddressToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteAddress = async () => {
    try {
      setLoading(true);
      const response = await deleteAddress({}, addressToDelete);
      if (response.data) {
        setAddresses(prev => prev.filter(addr => addr._id !== addressToDelete));
        setSuccess('Address deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError('Failed to delete address');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setAddressToDelete(null);
    }
  };

  // User not logged in state
  if (!isUserLoggedIn()) {
    return (
      <div>
        <Header />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-md space-y-4">
              <h2 className="text-2xl font-semibold">Please Login to View Your Profile</h2>
              <p className="text-gray-600">
                Access your profile, addresses, and order history by logging in to your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 bg-black text-white rounded hover:bg-[#5e3b25] transition"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-6 py-2 border border-black text-black rounded hover:bg-gray-100 transition"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (profileLoading) {
    return (
      <div>
        <Header />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to delete this address? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAddress}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
          {user ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{user.name}</span>
                <button className="text-gray-500 hover:text-black">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-sm text-gray-700">{user.phone}</p>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">No profile data available</div>
          )}
        </div>

        {/* Address Section */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
            <Link
              to="/add-address"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-black transition"
            >
              + Add New
            </Link>
          </div>

          {loading && addresses.length === 0 ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded">
              <Info className="w-5 h-5 text-gray-500" />
              <span>No addresses added yet.</span>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                >
                  {address.defaultAddress && (
                    <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}

                  <div className="space-y-1 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">
                      {address.firstName} {address.lastName}
                    </p>
                    <p>{address.address}, {address.area}</p>
                    {address.landmark && <p>Landmark: {address.landmark}</p>}
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>{address.country}</p>
                    <p>Phone: {address.number}</p>
                    <p className="capitalize">Type: {address.addressType.toLowerCase()}</p>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <Link
                      to="/add-address"
                      state={{ addressId: address._id }}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => confirmDeleteAddress(address._id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Bottom Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/order-list"
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