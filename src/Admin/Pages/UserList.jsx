import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import HeaderAdmin from "../Components/HeaderAdmin";
import Sidebar from "../Components/Sidebar";
import AdminLayout from "../Components/AdminLayout";

function UserList() {
  const navigate = useNavigate();

  const UserData = [
    {
      customer: "Arya Nair",
      mobile: "9876543210",
      address: "8587 Frida Ports",
      city: "Kochi",
      state: "Kerala",
      pincode: "619522",
    },
    {
      customer: "Sanjay Mohan",
      mobile: "9876543210",
      address: "8587 Frida Ports",
      city: "Kochi",
      state: "Kerala",
      pincode: "619522",
    },
    {
      customer: "Kavya Suresh",
      mobile: "9876543210",
      address: "8587 Frida Ports",
      city: "Kochi",
      state: "Kerala",
      pincode: "619522",
    },
    {
      customer: "Sneha Pillai",
      mobile: "9876543210",
      address: "8587 Frida Ports",
      city: "Kochi",
      state: "Kerala",
      pincode: "619522",
    },
    {
      customer: "Arya Nair",
      mobile: "9876543210",
      address: "8587 Frida Ports",
      city: "Kochi",
      state: "Kerala",
      pincode: "619522",
    },
  ];
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleView = (user) => {
    navigate("/admin/user-details", { state: { user } });
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-aut  mt-5">
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
                placeholder="Search By Coupon code & name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className=" bg-blue-100 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    USERNAME
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
                    PINCODE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {UserData.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {user.customer}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {user.mobile}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {user.address}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {user.city}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {user.state}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {user.pincode}
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
                          <button
                            onClick={() => handleView(user)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            Suspend
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {UserData.map((user, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {user.customer}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {user.mobile}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500 font-medium">Address: </span>
                    <span className="text-gray-700 font-medium">
                      {user.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">City: </span>
                    <span className="text-gray-700 font-medium">
                      {user.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">State: </span>
                    <span className="text-gray-700 font-semibold">
                      {user.state}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Pincode: </span>
                    <span className="text-gray-900 font-semibold">
                      {user.pincode}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuIndex(openMenuIndex === index ? null : index)
                    }
                    className="text-red-600 hover:text-red-900"
                  >
                    ⋮
                  </button>
                  {openMenuIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                      <button
                        onClick={() => handleView(user)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100  text-green-600"
                      >
                        View
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100  text-yellow-600">
                        Suspend
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
    </AdminLayout>
  );
}

export default UserList;
