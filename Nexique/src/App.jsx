import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import your pages
import Land from "./pages/Land";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./NotFound";
import Proceed from "./pages/Proceed";
import ProductShow from "./pages/ProductShow";

// Import your components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectRoute";

// Import your contexts
import { UserProvider } from "./contexts/UserContext";

const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  

  return (
    <UserProvider>
      <Routes>
        {/* Routes without Navbar */}
        <Route path="/getstarted" element={<Land />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes with Navbar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Home />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Order />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <ProductShow />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes without Navbar */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Cart />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <LayoutWithNavbar>
                <Profile />
              </LayoutWithNavbar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Proceed />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
