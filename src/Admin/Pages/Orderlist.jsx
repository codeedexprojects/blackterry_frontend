import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import HeaderAdmin from "../Components/HeaderAdmin";
import Sidebar from "../Components/Sidebar";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker";
import AdminLayout from "../Components/AdminLayout";

function Orderlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("14 Feb 2019");
  const [paymentStatus, setPaymentStatus] = useState("Payment Status");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const OrdersData = [
    {
      id: "00001",
      customer: "Arya Nair",
      address: "8587 Frida Ports",
      product: "kurti",
      size: "S",
      payment: "COD",
      status: "pending",
    },
    {
      id: "00002",
      customer: "Arya Nair",
      address: "8587 Frida Ports",
      product: "kurti",
      size: "S",
      payment: "COD",
      status: "pending",
    },
    {
      id: "00003",
      customer: "Arya Nair",
      address: "8587 Frida Ports",
      product: "kurti",
      size: "S",
      payment: "COD",
      status: "pending",
    },
    {
      id: "00004",
      customer: "Arya Nair",
      address: "8587 Frida Ports",
      product: "kurti",
      size: "S",
      payment: "COD",
      status: "pending",
    },
    {
      id: "00005",
      customer: "Arya Nair",
      address: "8587 Frida Ports",
      product: "kurti",
      size: "S",
      payment: "COD",
      status: "pending",
    },
  ];

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Expired: "bg-orange-100 text-orange-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
  };

  // Handle capitalization for status display and styles
  const formatStatus = (status) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  // Optionally you can filter/search the orders based on inputs here
  // For example, filtering by search term in customer or id:
  const filteredOrders = OrdersData.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      filterDate === "All Dates" || filterDate === "" ? true : true; // you can implement date filter logic here

    const matchesPayment =
      paymentStatus === "Payment Status" || paymentStatus === ""
        ? true
        : order.payment === paymentStatus;

    return matchesSearch && matchesDate && matchesPayment;
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-aut mt-5">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ color: "black", fontSize: "1.875rem" }}>Order List</h1>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search By Coupon code & name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="text-gray-500 w-5 h-5" />
              <span className="text-sm font-medium text-gray-600">
                Filter By
              </span>

              {/* Date Filter */}
              <div className="relative">
                <Datepicker
                  selected={filterDate}
                  onChange={(date) => setFilterDate(date)}
                  dateFormat="dd MMM yyyy"
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer w-full"
                />
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Payment Status Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option>Order Status</option>
                  <option>Pending</option>
                  <option>processing</option>
                  <option>cancelled</option>
                  <option>shipped</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option>category</option>
                  <option>kurti</option>
                  <option>pant</option>
                  <option>tupatta</option>
                  <option>matternity wear</option>
                  <option>offer zone</option>
                  <option>night wear</option>
                  <option>running material</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Reset Filter */}
              <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                Reset Filter
              </button>
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    CUSTOMER
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    ADDRESS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    PRODUCT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    SIZE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    PAYMENT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {order.customer}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {order.address}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {order.product}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {order.size}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {order.payment}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          statusStyles[formatStatus(order.status)] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm  font-semibold text-gray-900">
                      <button className="mr-2 p-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                        onClick={() => {
                          setOrderToDelete(order);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {order.id}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {order.customer}
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[formatStatus(order.status)] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500 font-medium">Mobile: </span>
                    <span className="text-gray-700 font-medium">
                      {order.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Date: </span>
                    <span className="text-gray-700 font-medium">
                      {order.product}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Size: </span>
                    <span className="text-gray-700 font-semibold">
                      {order.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Amount: </span>
                    <span className="text-gray-900 font-semibold">
                      {order.payment}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    onClick={() => {
                      setOrderToDelete(order);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-6  max-w-sm">
              <h2
                style={{ fontSize: "20px", fontWeight: "200", color: "black" }}
              >
                Do you really want to delete this order?
              </h2>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-sm font-small text-gray-600 hover:text-gray-800"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white text-sm font-small rounded hover:bg-red-600"
                  onClick={() => {
                    // Here you can handle deletion logic (e.g. update state, call API)
                    console.log("Deleted order:", orderToDelete);
                    setShowDeleteConfirm(false);
                    setOrderToDelete(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
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
    </AdminLayout>
  );
}

export default Orderlist;
