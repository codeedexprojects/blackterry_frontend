import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker";
import { getInvoices } from "../serveices/adminApi";

function Invoice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());
  const [paymentStatus, setPaymentStatus] = useState("Payment Status");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices();
        const invoiceData = response.data.invoices || [];
        
        const transformedInvoices = invoiceData.map(invoice => ({
          id: invoice.invoice_Number,
          customer: invoice.address?.name || invoice.userId?.name || 'N/A',
          mobile: invoice.address?.phone || invoice.userId?.phone || 'N/A',
          date: new Date(invoice.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          size: invoice.products?.[0]?.size || 'N/A',
          productName: invoice.products?.[0]?.productId?.title || 'Unknown Product',
          amount: `₹${invoice.totalAmount}`,
          status: invoice.status,
          statusColor: getStatusColor(invoice.status),
          rawData: invoice
        }));
        
        setInvoices(transformedInvoices);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError(err.message || "Failed to fetch invoices");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-600';
      case 'unpaid':
        return 'bg-orange-100 text-orange-600';
      case 'refund':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      paymentStatus === "Payment Status" || paymentStatus === ""
        ? true
        : invoice.status.toLowerCase() === paymentStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-black text-3xl">Invoice List</h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Invoice, Customer or Product"
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
                <option>Payment Status</option>
                <option>Paid</option>
                <option>Unpaid</option>
                <option>Refund</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Reset Filter */}
            <button
              className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setPaymentStatus("Payment Status");
                setFilterDate(new Date());
              }}
            >
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
            <thead className="bg-blue-100 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-black-700">
                  Invoice Number
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
                  Product
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
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
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
                      {invoice.productName}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {invoice.size}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${invoice.statusColor}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                          View
                        </button>
                        <button className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 px-6 text-center text-gray-500">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => (
              <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {invoice.id}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {invoice.customer}
                    </div>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${invoice.statusColor}`}>
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
                    <span className="text-gray-500 font-medium">Product: </span>
                    <span className="text-gray-700 font-semibold">
                      {invoice.productName}
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
                    View
                  </button>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No invoices found
            </div>
          )}
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
  );
}

export default Invoice;