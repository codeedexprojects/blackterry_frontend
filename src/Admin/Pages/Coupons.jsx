import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import AdminLayout from "../Components/AdminLayout";

function Coupons() {
  const CouponData = [
    {
      discount: "40%",
      coupontitle: "Summer Sale",
      code: "summer40",
      startdate: "05 Oct, 2024",
      enddate: "25 Oct, 2024",
      status: "Expired",
      statusColor: "bg-orange-100 text-orange-700",
    },
    {
      discount: "40%",
      coupontitle: "Summer Sale",
      code: "summer40",
      startdate: "05 Oct, 2024",
      enddate: "25 Oct, 2024",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      discount: "40%",
      coupontitle: "Summer Sale",
      code: "summer40",
      startdate: "05 Oct, 2024",
      enddate: "25 Oct, 2024",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      discount: "40%",
      coupontitle: "Summer Sale",
      code: "summer40",
      startdate: "05 Oct, 2024",
      enddate: "25 Oct, 2024",
      status: "Expired",
      statusColor: "bg-green-100 text-green-700",
    },
  ];

  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const toggleMenu = (index) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Coupons</h1>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Coupon code & name"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  DISCOUNT
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  COUPON TITLE
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  CODE
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  Start Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  End Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CouponData.map((coupon, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                    {coupon.discount}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                    {coupon.coupontitle}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">
                    {coupon.code}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600">
                    {coupon.startdate}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                    {coupon.enddate}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${coupon.statusColor}`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 bg-blue-100 px-3 py-1 rounded text-sm font-medium"
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {CouponData.map((coupon, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {coupon.coupontitle}
                  </div>
                  <div className="text-sm text-gray-500">{coupon.code}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${coupon.statusColor}`}
                >
                  {coupon.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <div className="text-gray-500">Discount</div>
                  <div className="font-semibold">{coupon.discount}</div>
                </div>
                <div>
                  <div className="text-gray-500">Start Date</div>
                  <div className="font-medium">{coupon.startdate}</div>
                </div>
                <div>
                  <div className="text-gray-500">End Date</div>
                  <div className="font-medium">{coupon.enddate}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded"
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button className="flex-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4" />
            Prev. Page
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Next Page
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedCoupon && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Coupon</h2>

              <div className="space-y-4">
                {/* Coupon Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Coupon Title
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedCoupon.coupontitle}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                  />
                </div>

                {/* Code & Discount */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Code
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCoupon.code}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Discount
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCoupon.discount}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCoupon.startdate}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedCoupon.enddate}
                      className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    defaultValue={selectedCoupon.status}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle update logic here
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Coupons;
