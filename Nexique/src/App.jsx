import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// Import your pages
import Land from "./pages/Land";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./NotFound";

// Import your contexts
import { UserProvider } from "./contexts/UserContext";
import  ProtectedRoute  from "./components/ProtectRoute";
import Proceed from "./pages/Proceed";

function App() {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();

    nprogress.done();

    return () => {
      nprogress.done();
    };
  }, [location]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/getstarted" element={<Land />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}

          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Proceed /></ProtectedRoute>} />


        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
