import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { addCarousal, deleteCarousel, getCarousels, updateCarousal } from '../serveices/adminApi';
import AdminLayout from '../Components/AdminLayout';

// Base URL for images
const IMAGE_BASE_URL = "https://blackterry.in/uploads/";

const CarouselManager = () => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    link: ''
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      setLoading(true);
      const response = await getCarousels();
      if (response.data.success) {
        setCarousels(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching carousels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: null,
      link: ''
    });
    setPreviewImage(null);
    setShowAddForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('link', formData.link);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (editingItem) {
        await updateCarousal(formDataToSend, editingItem._id);
      } else {
        await addCarousal(formDataToSend);
      }

      resetForm();
      fetchCarousels();
    } catch (error) {
      console.error('Error saving carousel:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: null,
      link: item.link
    });
    setPreviewImage(null);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this carousel item?')) {
      try {
        await deleteCarousel({}, id);
        fetchCarousels();
      } catch (error) {
        console.error('Error deleting carousel:', error);
      }
    }
  };

  const toggleActive = async (item) => {
    try {
      const formData = new FormData();
      formData.append('isActive', !item.isActive);
      await updateCarousal(formData, item._id);
      fetchCarousels();
    } catch (error) {
      console.error('Error updating carousel status:', error);
    }
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return `https://via.placeholder.com/400x200?text=No+Image`;
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, prepend the base URL
    return `${IMAGE_BASE_URL}${imagePath}`;
  };

  
  return (
   <div>
        <div className="min-h-screen bg-gray-50 ">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-3xl font-bold text-gray-900">Carousel Management</h4>
                 
                </div>
                <button
                style={{backgroundColor:"#50311D"}}
                  onClick={() => setShowAddForm(true)}
                  className=" text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Add New Carousel
                </button>
              </div>
            </div>
    
            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingItem ? 'Edit Carousel Item' : 'Add New Carousel Item'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
    
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link
                      </label>
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
    
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <Upload size={20} />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required={!editingItem}
                        />
                      </label>
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      {editingItem && !previewImage && editingItem.image && (
                        <div className="flex items-center gap-2">
                          <img
                            src={getImageUrl(editingItem.image)}
                            alt="Current"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="text-sm text-gray-500">Current image</span>
                        </div>
                      )}
                    </div>
                  </div>
    
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      style={{backgroundColor:"#50311D"}}
                      className="text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Save size={20} />
                      {editingItem ? 'Update' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
    
            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p>Loading carousel items...</p>
                </div>
              </div>
            )}
    
            {/* Carousel Grid */}
            {!loading && carousels.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carousels.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(item.title)}`;
                        }}
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => toggleActive(item)}
                          className={`p-2 rounded-full ${
                            item.isActive 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-500 text-white'
                          }`}
                        >
                          {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                      </div>
                    </div>
      
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <ExternalLink size={16} className="text-gray-500" />
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm truncate"
                        >
                          {item.link}
                        </a>
                      </div>
      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
      
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
      
                      <div className="mt-3 text-xs text-gray-500">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    
            {/* Empty State */}
            {!loading && carousels.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-500 mb-4">
                  <Upload size={48} className="mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No carousel items found</h3>
                  <p>Get started by adding your first carousel item.</p>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  style={{backgroundColor:"#50311D"}}
                  className="text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  Add First Carousel
                </button>
              </div>
            )}
          </div>
        </div>
   </div>
  );
};

export default CarouselManager;