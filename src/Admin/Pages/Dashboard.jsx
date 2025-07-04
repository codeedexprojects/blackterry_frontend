import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import Orderlist from "./Orderlist";
import UserList from "./UserList";
import Invoice from "./Invoice";
import Product from "./Product";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AddProduct from "./AddProduct";
import UserDetails from "./UserDetails";
import TextSliderManagement from "./TextSliderManage";
import CarouselManagement from "./CarousalManage";
import EditProductForm from "./EditProduct";

function AdminRoutes() {
  return (
    <Routes>
      {/* Login route without layout */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* All other routes with AdminLayout */}
      <Route path="/dashboard" element={
        <AdminLayout >
          <AdminDashboard />
        </AdminLayout>
      } />
      
      <Route path="/orderlist" element={
        <AdminLayout >
          <Orderlist />
        </AdminLayout>
      } />
      
      <Route path="/invoice" element={
        <AdminLayout >
          <Invoice />
        </AdminLayout>
      } />
      
      <Route path="/product" element={
        <AdminLayout >
          <Product />
        </AdminLayout>
      } />
      
      <Route path="/add-product" element={
        <AdminLayout>
          <AddProduct />
        </AdminLayout>
      } />
      
      <Route path="/edit-product/:id" element={
        <AdminLayout >
          <EditProductForm />
        </AdminLayout>
      } />
      
      <Route path="/userlist" element={
        <AdminLayout >
          <UserList />
        </AdminLayout>
      } />
      
      <Route path="/user-details" element={
        <AdminLayout >
          <UserDetails />
        </AdminLayout>
      } />
      
      
      
      <Route path="/text-slider" element={
        <AdminLayout >
          <TextSliderManagement />
        </AdminLayout>
      } />
      
      <Route path="/carousal" element={
        <AdminLayout >
          <CarouselManagement />
        </AdminLayout>
      } />
      
      {/* Redirect routes */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
}

export default AdminRoutes;