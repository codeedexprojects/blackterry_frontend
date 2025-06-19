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

function Invoice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("14 Feb 2019");
  const [paymentStatus, setPaymentStatus] = useState("Payment Status");

  const invoiceData = [
    {
      id: "#PAY12345",
      customer: "Arya Nair",
      mobile: "9876543210",
      date: "05 Oct, 2024",
      size: "S",
      amount: "₹499",
      status: "Unpaid",
      statusColor: "bg-orange-100 text-orange-600",
    },
    {
      id: "#PAY12345",
      customer: "Sanjay Mohan",
      mobile: "9876543210",
      date: "15 Jan, 2024",
      size: "M",
      amount: "₹1,250",
      status: "Unpaid",
      statusColor: "bg-orange-100 text-orange-600",
    },
    {
      id: "#PAY12345",
      customer: "Kavya Suresh",
      mobile: "9876543210",
      date: "14 Feb 2024",
      size: "L",
      amount: "₹2,999",
      status: "Refund",
      statusColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "#PAY12345",
      customer: "Sneha Pillai",
      mobile: "9876543210",
      date: "14 Feb 2024",
      size: "XL",
      amount: "₹850",
      status: "Paid",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      id: "#PAY12345",
      customer: "Arya Nair",
      mobile: "9876543210",
      date: "14 Feb 2024",
      size: "XXL",
      amount: "₹2,999",
      status: "Paid",
      statusColor: "bg-green-100 text-green-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-aut mt-5">
        {/* Header */}
        <div className="mb-6">
          <h1 style={{ color: "black", fontSize: "1.875rem" }}>Invoice List</h1>

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
                <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                  <option>Payment Status</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Refund</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Reset Filter */}
              <button className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
                {/* <RotateCcw /> */}
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    Payment ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    Mobile
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                    Size
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoiceData.map((invoice, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {invoice.customer}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {invoice.mobile}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {invoice.date}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {invoice.size}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${invoice.statusColor}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
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
          <div className="md:hidden">
            {invoiceData.map((invoice, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {invoice.id}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {invoice.customer}
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${invoice.statusColor}`}
                  >
                    {invoice.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500 font-medium">Mobile: </span>
                    <span className="text-gray-700 font-medium">
                      {invoice.mobile}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Date: </span>
                    <span className="text-gray-700 font-medium">
                      {invoice.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Size: </span>
                    <span className="text-gray-700 font-semibold">
                      {invoice.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Amount: </span>
                    <span className="text-gray-900 font-semibold">
                      {invoice.amount}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
                    Delete
                  </button>
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

export default Invoice;
