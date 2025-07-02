import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { addTextSlider, deleteTextSlider, getTextSliders, updateTextSlider } from '../serveices/adminApi';
import AdminLayout from '../Components/AdminLayout';

const TextSliderManagement = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    isActive: true
  });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all text sliders
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await getTextSliders();
      setSliders(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch text sliders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateTextSlider(currentId, formData);
        toast.success('Text slider updated successfully');
      } else {
        await addTextSlider(formData);
        toast.success('Text slider added successfully');
      }
      fetchSliders();
      resetForm();
    } catch (error) {
      toast.error(`Failed to ${editMode ? 'update' : 'add'} text slider`);
    }
  };

  // Edit existing slider
  const handleEdit = (slider) => {
    setFormData({
      title: slider.title,
      isActive: slider.isActive
    });
    setCurrentId(slider._id);
    setEditMode(true);
  };

  // Delete slider
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this text slider?')) {
      try {
        await deleteTextSlider(id);
        toast.success('Text slider deleted successfully');
        fetchSliders();
      } catch (error) {
        toast.error('Failed to delete text slider');
      }
    }
  };

  // Toggle slider status
  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateTextSlider(id, { isActive: !currentStatus });
      toast.success('Status updated successfully');
      fetchSliders();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: '', isActive: true });
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <AdminLayout>
    <div className="max-w-4xl mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Text Sliders</h1>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editMode ? 'Edit Text Slider' : 'Add New Text Slider'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slider Text*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter slider text (e.g., Summer Sale)"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editMode ? 'Update Slider' : 'Add Slider'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Sliders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">All Text Sliders</h2>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader className="animate-spin text-blue-500" />
          </div>
        ) : sliders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No text sliders found. Add one to get started.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sliders.map((slider) => (
              <div key={slider._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {slider.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(slider.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleStatus(slider._id, slider.isActive)}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                      title={slider.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {slider.isActive ? (
                        <ToggleRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <button
                      onClick={() => handleEdit(slider)}
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleDelete(slider._id)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default TextSliderManagement;