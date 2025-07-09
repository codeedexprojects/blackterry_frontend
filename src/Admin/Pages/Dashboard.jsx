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
  // Inline ProtectedRoute function
  const ProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem("adminToken");
    return adminToken ? children : <Navigate to="/admin/login" />;
  };

  return (
    <Routes>
      {/* Admin login route (public) */}
      <Route path="/login" element={<AdminLogin />} />

      {/* All protected admin routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/orderlist"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Orderlist />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoice"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Invoice />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Product />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <EditProductForm />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/userlist"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-details"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserDetails />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/text-slider"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <TextSliderManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/carousal"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CarouselManagement />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
}

export default AdminRoutes;
