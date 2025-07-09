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
          const response = await getAddress(userId);
          
          if (response.data) {
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

  if (location.state?.addressId && loading && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back 
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Address' : 'Add New Address'}
            </h1>
            <p className="text-gray-500 mt-1">
              {isEditing ? 'Update your delivery address' : 'Add a new delivery address'}
            </p>
          </div>

          {error && (
            <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Complete Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
                placeholder="House no., Building, Street name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="Area / Locality"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Nearby landmark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="Pincode"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="City"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                  placeholder="State"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-gray-50"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Address Type</label>
                <div className="flex space-x-2">
                  {addressTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, addressType: type }))}
                      className={`px-4 py-2 rounded-lg border transition ${formData.addressType === type 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                        : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-6">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="defaultAddress"
                    checked={formData.defaultAddress}
                    onChange={handleChange}
                    id="defaultAddress"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <label htmlFor="defaultAddress" className="text-sm font-medium text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditing ? 'Updating...' : 'Saving...'}
                  </>
                ) : isEditing ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;