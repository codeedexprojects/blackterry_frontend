import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Edit,
  Trash2,
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker";
import { getOrders, deleteOrder } from "../serveices/adminApi";
import { UpdateStatusModal } from "../Components/Orders/StatusModal";

function Orderlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("14 Feb 2019");
  const [orderStatus, setOrderStatus] = useState("Order Status");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteOrder(orderToDelete._id);
      
      // Remove the deleted order from the state
      setOrders(prevOrders => 
        prevOrders.filter(order => order._id !== orderToDelete._id)
      );
      
      // Close the modal and reset state
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
      
      // Optional: Show success message
      alert("Order deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders...");
        const response = await getOrders();
        console.log("API Response:", response);

        // Correct way to access the orders data
        const ordersData = response.data.orders || [];
        console.log("Orders array:", ordersData);

        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusStyles = {
    active: "bg-green-100 text-green-700",
    expired: "bg-orange-100 text-orange-700",
    pending: "bg-yellow-100 text-yellow-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    processing: "bg-purple-100 text-purple-700"
  };

  // Format status for display
  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.shippingAddress?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      orderStatus === "Order Status" || orderStatus === ""
        ? true
        : order.status?.toLowerCase() === orderStatus.toLowerCase();

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
        <div className="text-red-500">Error loading orders: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-black text-3xl">Order List</h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Order ID & Customer name"
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMM yyyy"
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer w-full"
              />
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Order Status Filter */}
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option>Order Status</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Cancelled</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Reset Filter */}
            <button
              className="text-red-500 text-sm font-medium hover:text-red-600 transition-colors"
              onClick={() => {
                setSearchTerm("");
                setOrderStatus("Order Status");
                setStartDate(new Date());
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
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  CUSTOMER
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  ADDRESS
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  PRODUCTS
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  PAYMENT
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  AMOUNT
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {order.orderId || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-700">
                      {order.shippingAddress?.name || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {order.shippingAddress ?
                        `${order.shippingAddress.address || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.pincode || ''}`
                        : 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-600">
                      {order.products?.map(p =>
                        `${p.quantity}x ${p.productId?.title || 'Unknown'} (${p.size}, ${p.color})`
                      ).join(", ") || 'N/A'}
                    </td>

                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {order.paymentMethod || 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      ₹{order.finalPayableAmount || '0'}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status?.toLowerCase()] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      <button
                        className="mr-2 p-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowStatusModal(true);
                        }}
                      >
                        <Edit></Edit>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                        onClick={() => {
                          setOrderToDelete(order);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Trash2></Trash2>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-4 px-6 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {order.orderId || 'N/A'}
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {order.shippingAddress?.name || 'N/A'}
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status?.toLowerCase()] ||
                      "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500 font-medium">Phone: </span>
                    <span className="text-gray-700 font-medium">
                      {order.shippingAddress?.phone || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Date: </span>
                    <span className="text-gray-700 font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Products: </span>
                    <span className="text-gray-700 font-semibold">
                      {order.products?.map(p => `${p.quantity}x ${p.size}`).join(", ") || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-medium">Amount: </span>
                    <span className="text-gray-900 font-semibold">
                      ₹{order.finalPayableAmount || '0'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowStatusModal(true);
                    }}
                  >
                    <Edit></Edit>
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
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-xl font-light text-black mb-4">
              Do you really want to delete this order?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Order ID: {orderToDelete?.orderId || 'N/A'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setOrderToDelete(null);
                }}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDeleteOrder}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showStatusModal && (
        <UpdateStatusModal
          order={selectedOrder}
          onClose={() => setShowStatusModal(false)}
          onStatusUpdate={handleStatusUpdate}
        />
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
  );
}

export default Orderlist;