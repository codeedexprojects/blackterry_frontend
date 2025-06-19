import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";

function UserDetails() {
  const { state } = useLocation();
  const user = state?.user;
  const [modalType, setModalType] = useState(null);

  if (!user) {
    return <div className="p-8 text-gray-500">No user selected.</div>;
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
          Users Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: User Details */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
              Users Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input className="w-full p-2 rounded border border-gray-300 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input className="w-full p-2 rounded border border-gray-300 text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input className="w-full p-2 rounded border border-gray-300 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input className="w-full p-2 rounded border border-gray-300 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  rows="3"
                  className="w-full p-2 rounded border border-gray-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right: Profile Image + Orders */}
          <div className="flex flex-col gap-6">
            {/* Profile Image & Buttons */}
            <div className="bg-white p-4 md:p-5 rounded-lg shadow-sm flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User"
                className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover mb-4"
              />
              <div className="flex flex-wrap justify-center gap-2 w-full">
                <button
                  onClick={() => setModalType("suspend")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded flex-1 sm:flex-none min-w-[100px]"
                >
                  Suspend
                </button>
                <button
                  onClick={() => setModalType("reactivate")}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded flex-1 sm:flex-none min-w-[100px]"
                >
                  Reactivate
                </button>
                <button
                  onClick={() => setModalType("delete")}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded flex-1 sm:flex-none min-w-[100px]"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Orders</h2>
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-3 text-left">Product</th>
                      <th className="py-2 px-3 text-left">Payment</th>
                      <th className="py-2 px-3 text-left">Status</th>
                      <th className="py-2 px-3 text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      "Pending",
                      "Processing",
                      "Cancelled",
                      "Shipped",
                      "Delivered",
                    ].map((status, i) => (
                      <tr key={i}>
                        <td className="py-2 px-3 whitespace-nowrap">
                          KURTI SET
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          {
                            [
                              "Credit Card",
                              "UPI",
                              "COD",
                              "Credit Card",
                              "Credit Card",
                            ][i]
                          }
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              {
                                Pending: "bg-purple-100 text-purple-700",
                                Processing: "bg-yellow-100 text-yellow-800",
                                Cancelled: "bg-red-100 text-red-600",
                                Shipped: "bg-green-100 text-green-600",
                                Delivered: "bg-blue-100 text-blue-600",
                              }[status]
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap">2099 Rs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType === "suspend" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-500 text-2xl">✖</span>
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Do you want to Suspend this?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              You can reactivate it later
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Close
              </button>
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "reactivate" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-green-500 text-2xl">✖</span>
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Do you want to Reactivate this?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              All Permission will be restored
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Close
              </button>
              <button
                className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Reactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-center shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-red-500 text-2xl">✖</span>
              </div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Delete this profile?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              This action is permanent and cannot be undone
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Close
              </button>
              <button
                className="bg-red-400 hover:bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium flex-1"
                onClick={() => setModalType(null)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default UserDetails;
