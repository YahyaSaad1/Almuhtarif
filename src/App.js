import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Categories from './pages/Categories';
import Customers from './pages/Customers';
import Reports from './pages/Reports';
import ReviewsManagement from './pages/ReviewsManagement';
import Settings from './pages/Settings';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import Stores from './pages/Stores';
import AddStore from './pages/AddStore';
import MyOrders from './pages/MyOrders';
import SavedAddresses from './pages/SavedAddresses';
import Wishlist from './pages/Wishlist';
import PaymentMethods from './pages/PaymentMethods';
import Plumbing from './pages/Plumbing';
import Painting from './pages/Painting';
import ContactUs from './pages/ContactUs';

function App() {
  const location = useLocation();

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'merchant';
    // admin, merchant, user
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const hideLayoutPaths = ['/login', '/register'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname.toLowerCase());

  return (
    <div dir='rtl' className="app-container">
      {!shouldHideLayout && (
        <Navbar 
          userRole={userRole} 
          setUserRole={setUserRole} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      )}

      <div className={shouldHideLayout ? "full-width-content" : "main-layout"}>
        {!shouldHideLayout && (
          <Sidebar 
            userRole={userRole} 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
          />
        )}

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Main userRole={userRole} />} />
            <Route path="/profile" element={<Profile userRole={userRole} />} />
            <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
            <Route path="/orders" element={<Orders userRole={userRole} />} />
            <Route path="/categories" element={<Categories userRole={userRole} />} />
            <Route path="/customers" element={<Customers userRole={userRole} />} />
            <Route path="/reports" element={<Reports userRole={userRole} />} />
            <Route path="/reviews" element={<ReviewsManagement userRole={userRole} />} />
            <Route path="/settings" element={<Settings userRole={userRole} />} />
            <Route path="/products/add" element={<AddProduct userRole={userRole} />} />
            <Route path="/products" element={<Products userRole={userRole} />} />
            <Route path="/stores" element={<Stores userRole={userRole} />} />
            <Route path="/stores/add" element={<AddStore userRole={userRole} />} />
            <Route path="/my-orders" element={<MyOrders userRole={userRole} />} />
            <Route path="/addresses" element={<SavedAddresses userRole={userRole} />} />
            <Route path="/wishlist" element={<Wishlist userRole={userRole} />} />
            <Route path="/payment-methods" element={<PaymentMethods userRole={userRole} />} />
            <Route path="/plumbing" element={<Plumbing userRole={userRole} />} />
            <Route path="/painting" element={<Painting userRole={userRole} />} />
            <Route path="/contactus" element={<ContactUs userRole={userRole} />} />

            <Route path="/login" element={<Login setUserRole={setUserRole} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;