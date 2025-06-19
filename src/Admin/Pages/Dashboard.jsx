import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Orderlist from "./Orderlist";
import UserList from "./UserList";
import Coupons from "./Coupons";
import Invoice from "./Invoice";
import Product from "./Product";
import HeaderAdmin from "../Components/HeaderAdmin";
import AdminLogin from "./AdminLogin";
import Sidebar from "../Components/Sidebar";
import Advertisement from "./Advertisement";
import AdminDashboard from "./AdminDashboard";
import Subcategory from "./Subcategory";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import UserDetails from "./UserDetails";

function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* <HeaderAdmin toggleSidebar={toggleSidebar} /> */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/orderlist" element={<Orderlist />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/product" element={<Product />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/subcategory" element={<Subcategory />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/user-details" element={<UserDetails />} />

          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
