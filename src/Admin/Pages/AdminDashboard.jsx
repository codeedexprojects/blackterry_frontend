import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  ChevronDown,
  Calendar,
  Filter,
  Eye,
  MoreHorizontal,
  Loader,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDashboardCounts, getDashboardGraph, getRecentOrders } from "../serveices/adminApi";

function AdminDashboard() {
  const [loading, setLoading] = useState({
    counts: true,
    graph: true,
    orders: true
  });
  const [error, setError] = useState({
    counts: null,
    graph: null,
    orders: null
  });
  const [dashboardData, setDashboardData] = useState({
    counts: null,
    graph: null,
    orders: null
  });

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch counts data
        const countsResponse = await getDashboardCounts();
        setDashboardData(prev => ({
          ...prev,
          counts: countsResponse.data
        }));
        
        // Fetch graph data
        const graphResponse = await getDashboardGraph();
        setDashboardData(prev => ({
          ...prev,
          graph: graphResponse.data
        }));
        
        // Fetch recent orders
        const ordersResponse = await getRecentOrders();
        setDashboardData(prev => ({
          ...prev,
          orders: ordersResponse.data
        }));
      } catch (err) {
        setError({
          counts: err.message || "Failed to load counts",
          graph: err.message || "Failed to load graph data",
          orders: err.message || "Failed to load recent orders"
        });
      } finally {
        setLoading({
          counts: false,
          graph: false,
          orders: false
        });
      }
    };

    fetchDashboardData();
  }, []);

  // Transform graph data for the chart
  const transformGraphData = (graphData) => {
    if (!graphData || !graphData.data) return [];
    return graphData.data.map(item => ({
      name: item.monthName.slice(0, 3), // Short month name (Jan, Feb, etc.)
      sales: item.totalRevenue,
      orders: item.orderCount
    }));
  };

  // Transform recent orders data for the table
  const transformRecentOrders = (ordersData) => {
    if (!ordersData || !ordersData.data) return [];
    return ordersData.data.map(order => ({
      id: order.orderId,
      productName: order.products[0]?.productId?.title || 'Unknown Product',
      customer: order.shippingAddress?.name || order.userId?.name || 'Unknown Customer',
      location: `${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}`,
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: new Date(order.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      quantity: order.products.reduce((total, product) => total + product.quantity, 0),
      amount: `₹${order.finalPayableAmount}`,
      status: order.status,
      statusColor: getStatusColor(order.status),
      rawData: order
    }));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    const colors = {
      Delivered: "bg-green-500",
      Processing: "bg-yellow-500",
      Shipped: "bg-blue-500",
      Cancelled: "bg-red-500",
      Pending: "bg-gray-400",
    };
    return colors[status] || "bg-gray-400";
  };

  // Stats cards data based on API response
  const statsCards = [
    {
      title: "Total Customers",
      value: dashboardData.counts?.totalUsers || '0',
      change: "+0%",
      changeText: "from yesterday",
      trend: "up",
      icon: Users,
      iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Orders",
      value: dashboardData.counts?.totalOrders || '0',
      change: "+0%",
      changeText: "from past week",
      trend: "up",
      icon: Package,
      iconBg: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Recent Orders",
      value: dashboardData.counts?.recentOrders || '0',
      change: "+0%",
      changeText: "from yesterday",
      trend: "up",
      icon: ShoppingCart,
      iconBg: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
    {
      title: "Total Earnings",
      value: `₹${dashboardData.counts?.totalRevenue || '0'}`,
      change: "+0%",
      changeText: "from last month",
      trend: "up",
      icon: DollarSign,
      iconBg: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last 30 days</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border-2 ${card.borderColor} shadow-sm hover:shadow-md transition-shadow group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                      card.trend === "up" ? "bg-green-50" : "bg-red-50"
                    }`}>
                      {card.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                      <span className={`text-xs font-medium ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {card.change}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{card.changeText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sales Chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sales Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">Monthly sales performance overview</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700">Sales</span>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm">2024</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6">
            {loading.graph ? (
              <div className="h-80 flex items-center justify-center">
                <Loader className="animate-spin text-blue-500" />
              </div>
            ) : error.graph ? (
              <div className="h-80 flex items-center justify-center text-red-500">
                {error.graph}
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={transformGraphData(dashboardData.graph)} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-600 mt-1">Latest customer orders and their status</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">View all</span>
            </button>
          </div>
          {loading.orders ? (
            <div className="p-8 flex justify-center">
              <Loader className="animate-spin text-blue-500" />
            </div>
          ) : error.orders ? (
            <div className="p-8 text-center text-red-500">
              {error.orders}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="text-right p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transformRecentOrders(dashboardData.orders).map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.productName}</p>
                            <p className="text-xs text-gray-500">{order.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                          <p className="text-xs text-gray-500">Customer</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-gray-900">{order.date}</p>
                          <p className="text-xs text-gray-500">{order.time}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-gray-900">{order.quantity}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusDot(order.status)}`}></div>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;