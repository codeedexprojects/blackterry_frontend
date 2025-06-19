import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import Sidebar from "../Components/Sidebar";
import HeaderAdmin from "../Components/HeaderAdmin";
import productImage from "/src/assets/product.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../Components/AdminLayout";
import { Navigate } from "react-router-dom";

function AdminDashboard() {
  const salesData = [
    { name: "5k", sales: 20 },
    { name: "30k", sales: 30 },
    { name: "20k", sales: 60 },
    { name: "25k", sales: 10 },
    { name: "30k", sales: 70 },
    { name: "35k", sales: 80 },
    { name: "40k", sales: 140 },
    { name: "45k", sales: 150 },
  ];

  const statsCards = [
    {
      title: "Total Customers",
      value: "40,689",
      change: "8.5% Up from yesterday",
      trend: "up",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "10293",
      change: "1.3% Up from past week",
      trend: "up",
      icon: Package,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Recent Orders",
      value: "10293",
      change: "4.3% Down from yesterday",
      trend: "down",
      icon: ShoppingCart,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Earnings",
      value: "$89,000",
      change: "4.3% Down from yesterday",
      trend: "down",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      productName: "Stylish Crop Top",
      location: "6098 Marjolaine Landing",
      date: "12.09.2019 - 12:53 PM",
      price: 423,
      amount: "$34,295",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      productName: "Stylish Crop Top",
      location: "6098 Marjolaine Landing",
      date: "12.09.2019 - 12:53 PM",
      price: 423,
      amount: "$34,295",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      productName: "Stylish Crop Top",
      location: "6098 Marjolaine Landing",
      date: "12.09.2019 - 12:53 PM",
      price: 423,
      amount: "$34,295",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      productName: "Stylish Crop Top",
      location: "6098 Marjolaine Landing",
      date: "12.09.2019 - 12:53 PM",
      price: 423,
      amount: "$34,295",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-xl mt-5 font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded p-4 border border-gray-200 text-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 ${card.iconBg} rounded flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="mb-1">
                <h3 className="text-xs text-gray-600">{card.title}</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {card.value}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {card.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span
                  className={
                    card.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Details */}
      <div className="bg-white rounded border border-gray-200 p-4 space-y-2 text-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-900 text-base">
            Sales Details
          </h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 text-xs">
              <span>October</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 text-xs">
              <span>October</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="h-64 bg-white rounded relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded border border-gray-200 text-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900 text-base">
            Recent Orders
          </h2>
          <button className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-gray-900 text-xs">
            <span>October</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2 p-4 bg-gray-50 font-semibold text-gray-700 text-xs">
          <div>Product Name</div>
          <div>Location</div>
          <div>Date - Time</div>
          <div>Piece</div>
          <div>Amount</div>
          <div>Status</div>
        </div>
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-6 gap-2 p-4 border-t border-gray-100 items-center"
          >
            <div className="flex items-center gap-2">
              <img
                src={productImage}
                alt={order.productName}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-xs font-medium text-gray-900">
                {order.productName}
              </span>
            </div>
            <div className="text-xs text-gray-600">{order.location}</div>
            <div className="text-xs text-gray-600">{order.date}</div>
            <div className="text-xs font-semibold text-gray-900">
              {order.price}
            </div>
            <div className="text-xs font-semibold text-gray-900">
              {order.amount}
            </div>
            <div>
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${order.statusColor}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
