import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, X, AlertTriangle } from "lucide-react";
import { deleteUser, getUsers, userStatusChange } from "../serveices/adminApi";

function UserList() {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  
  // Modal states
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    user: null,
    newStatus: null,
    loading: false
  });
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
    loading: false
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response && response.data && response.data.users) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    navigate("/admin/user-details", { state: { user } });
  };

  const handleSuspend = (user) => {
    const newStatus = user.status === "true" || user.status === "active" ? "suspended" : "active";
    setStatusModal({
      isOpen: true,
      user: user,
      newStatus: newStatus,
      loading: false
    });
    setOpenMenuIndex(null);
  };

  const handleDelete = (user) => {
    setDeleteModal({
      isOpen: true,
      user: user,
      loading: false
    });
    setOpenMenuIndex(null);
  };

  const confirmStatusChange = async () => {
    try {
      setStatusModal(prev => ({ ...prev, loading: true }));
      
      const reqBody = {
        status: statusModal.newStatus
      };
      
      await userStatusChange(statusModal.user.id, reqBody);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === statusModal.user.id 
            ? { ...user, status: statusModal.newStatus }
            : user
        )
      );
      
      // Close modal
      setStatusModal({
        isOpen: false,
        user: null,
        newStatus: null,
        loading: false
      });
      
    } catch (error) {
      console.error("Error updating user status:", error);
      setError("Failed to update user status");
      setStatusModal(prev => ({ ...prev, loading: false }));
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleteModal(prev => ({ ...prev, loading: true }));
      
      await deleteUser(deleteModal.user.id);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.filter(user => user.id !== deleteModal.user.id)
      );
      
      // Close modal
      setDeleteModal({
        isOpen: false,
        user: null,
        loading: false
      });
      
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
      setDeleteModal(prev => ({ ...prev, loading: false }));
    }
  };

  const getDefaultAddress = (addresses) => {
    if (!addresses || addresses.length === 0) {
      return {
        address: "No address",
        city: "N/A",
        state: "N/A",
        pincode: "N/A"
      };
    }
    
    const defaultAddr = addresses.find(addr => addr.defaultAddress) || addresses[0];
    return {
      address: defaultAddr.address || "No address",
      city: defaultAddr.city || "N/A",
      state: defaultAddr.state || "N/A",
      pincode: defaultAddr.pincode || "N/A"
    };
  };

  if (loading) {
    return (
      <div>
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading users...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ color: "black", fontSize: "1.875rem" }}>Users List</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium text-gray-700"
              />
            </div>
            <div className="text-sm text-gray-600">
              Total Users: {filteredUsers.length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-100 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    USERNAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    MOBILE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    ADDRESS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    CITY
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    STATE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => {
                  const defaultAddress = getDefaultAddress(user.addresses);
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                        {user.name}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-600">
                        {user.phone}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-600">
                        {defaultAddress.address}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                        {defaultAddress.city}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                        {defaultAddress.state}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === "active" || user.status === "true"
                              ? "bg-green-100 text-green-800"
                              : user.status === "suspended"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status === "true" ? "Active" : user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 relative">
                        <button
                          onClick={() =>
                            setOpenMenuIndex(
                              openMenuIndex === index ? null : index
                            )
                          }
                          className="text-gray-600 hover:text-gray-900"
                        >
                          ⋮
                        </button>
                        {openMenuIndex === index && (
                          <div className="absolute right-6 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                            {/* <button
                              onClick={() => handleView(user)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              View
                            </button> */}
                            <button
                              onClick={() => handleSuspend(user)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {user.status === "true" || user.status === "active" ? "Suspend" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDelete(user)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {filteredUsers.map((user, index) => {
              const defaultAddress = getDefaultAddress(user.addresses);
              return (
                <div
                  key={user.id}
                  className="p-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        {user.email}
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        {user.phone}
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "active" || user.status === "true"
                          ? "bg-green-100 text-green-800"
                          : user.status === "suspended"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "true" ? "Active" : user.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-500 font-medium">Address: </span>
                      <span className="text-gray-700 font-medium">
                        {defaultAddress.address}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">City: </span>
                      <span className="text-gray-700 font-medium">
                        {defaultAddress.city}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">State: </span>
                      <span className="text-gray-700 font-semibold">
                        {defaultAddress.state}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">Pincode: </span>
                      <span className="text-gray-900 font-semibold">
                        {defaultAddress.pincode}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                      className="text-gray-600 hover:text-gray-900"
                    >
                      ⋮
                    </button>
                    {openMenuIndex === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button
                          onClick={() => handleView(user)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-green-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleSuspend(user)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-yellow-600"
                        >
                          {user.status === "true" || user.status === "active" ? "Suspend" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No users found</div>
            {searchTerm && (
              <div className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Prev. Page
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Change Modal */}
      {statusModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {statusModal.newStatus === "suspended" ? "Suspend User" : "Activate User"}
              </h3>
              <button
                onClick={() => setStatusModal({ isOpen: false, user: null, newStatus: null, loading: false })}
                className="text-gray-400 hover:text-gray-600"
                disabled={statusModal.loading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to {statusModal.newStatus === "suspended" ? "suspend" : "activate"} the user{" "}
                <span className="font-semibold">{statusModal.user?.name}</span>?
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStatusModal({ isOpen: false, user: null, newStatus: null, loading: false })}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                disabled={statusModal.loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  statusModal.newStatus === "suspended"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={statusModal.loading}
              >
                {statusModal.loading ? "Processing..." : statusModal.newStatus === "suspended" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Delete User
              </h3>
              <button
                onClick={() => setDeleteModal({ isOpen: false, user: null, loading: false })}
                className="text-gray-400 hover:text-gray-600"
                disabled={deleteModal.loading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to delete the user{" "}
                <span className="font-semibold">{deleteModal.user?.name}</span>?
              </p>
              <p className="text-red-600 text-sm mt-2">
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, user: null, loading: false })}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                disabled={deleteModal.loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                disabled={deleteModal.loading}
              >
                {deleteModal.loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;