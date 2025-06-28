import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "/src/Components/Header";
import { addAddress, getAddress, updateAddress } from '../services/allApi';

const AddAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    address: '',
    area: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: 'India',
    addressType: 'Home',
    defaultAddress: false
  });

  const addressTypes = ['Home', 'Work', 'Other'];

  useEffect(() => {
    if (location.state?.addressId) {
      const fetchAddress = async () => {
        try {
          setLoading(true);
          const userId = localStorage.getItem('userId');
          
          // Fetch all addresses for the user
          const response = await getAddress(userId);
          
          if (response.data) {
            // Find the specific address by ID
            const addressToEdit = response.data.find(addr => addr._id === location.state.addressId);
            
            if (addressToEdit) {
              setFormData({
                firstName: addressToEdit.firstName || '',
                lastName: addressToEdit.lastName || '',
                number: addressToEdit.number || '',
                address: addressToEdit.address || '',
                area: addressToEdit.area || '',
                landmark: addressToEdit.landmark || '',
                pincode: addressToEdit.pincode || '',
                city: addressToEdit.city || '',
                state: addressToEdit.state || '',
                country: addressToEdit.country || 'India',
                addressType: addressToEdit.addressType || 'Home',
                defaultAddress: addressToEdit.defaultAddress || false
              });
              setAddressId(location.state.addressId);
              setIsEditing(true);
            } else {
              setError('Address not found');
            }
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setError('Failed to load address');
        } finally {
          setLoading(false);
        }
      };
      fetchAddress();
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const addressData = { ...formData, userId };

      let response;
      if (isEditing) {
        response = await updateAddress(addressData, addressId);
      } else {
        response = await addAddress(addressData);
      }

      if (response.data) {
        navigate('/profile', { state: { success: isEditing ? 'Address updated successfully' : 'Address added successfully' } });
      } else {
        setError(response.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner when fetching address data for editing
  if (location.state?.addressId && loading && !isEditing) {
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
      
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Profile
        </button>

        <h1 className="text-2xl font-semibold mb-6">
          {isEditing ? 'Edit Address' : 'Add New Address'}
        </h1>

        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {addressTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end md:justify-start">
              <input
                type="checkbox"
                name="defaultAddress"
                checked={formData.defaultAddress}
                onChange={handleChange}
                id="defaultAddress"
                className="mr-2"
              />
              <label htmlFor="defaultAddress" className="text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>

         <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-black text-white rounded hover:bg-[#5e3b25] transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? 'Updating...' : 'Saving...'}
                </span>
              ) : isEditing ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;