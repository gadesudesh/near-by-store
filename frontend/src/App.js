import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import ShopDetail from './pages/customer/ShopDetail';
import SearchResults from './pages/customer/SearchResults';
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import RetailerProducts from './pages/retailer/RetailerProducts';
import RetailerInventory from './pages/retailer/RetailerInventory';
import RetailerAnalytics from './pages/retailer/RetailerAnalytics';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === 'retailer' ? '/retailer/dashboard' : '/customer/dashboard'} /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'retailer' ? '/retailer/dashboard' : '/customer/dashboard'} /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={user.role === 'retailer' ? '/retailer/dashboard' : '/customer/dashboard'} /> : <SignupPage />} />

      {/* Customer Routes */}
      <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
      <Route path="/customer/search" element={<ProtectedRoute role="customer"><SearchResults /></ProtectedRoute>} />
      <Route path="/customer/shop/:id" element={<ProtectedRoute role="customer"><ShopDetail /></ProtectedRoute>} />

      {/* Retailer Routes */}
      <Route path="/retailer/dashboard" element={<ProtectedRoute role="retailer"><RetailerDashboard /></ProtectedRoute>} />
      <Route path="/retailer/products" element={<ProtectedRoute role="retailer"><RetailerProducts /></ProtectedRoute>} />
      <Route path="/retailer/inventory" element={<ProtectedRoute role="retailer"><RetailerInventory /></ProtectedRoute>} />
      <Route path="/retailer/analytics" element={<ProtectedRoute role="retailer"><RetailerAnalytics /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-200">404</h1>
            <p className="text-gray-500 mt-2">Page not found</p>
          </div>
        </div>
      } />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AppRoutes />
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover theme="light" />
      </Router>
    </AuthProvider>
  );
}

export default App;