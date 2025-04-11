import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"; // Home page
import OrderDetailsEntry from "./pages/OrderDetailsEntry"; // New page to handle order entry
import OrderDetails from "./pages/OrderDetails.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import OrdersScan from "./pages/OrderScan.jsx";

function App() {
  return (
    <Routes>
      {/* Home page route */}
      <Route path="/" element={<HomePage />} />

      {/* Order Entry page route */}
      <Route path="/order-entry" element={<OrderDetailsEntry />} />

      {/* Order Details page route, passing orderId as parameter */}
      <Route path="/order/:orderId" element={<OrderDetailPage />} />

      {/* Order Details Entry page for creating an order */}
      <Route path="/orders-details" element={<OrderDetails />} />

      {/* Order scanning page for */}
      <Route path="/orders-scan" element={<OrdersScan />} />
    </Routes>
  );
}

export default App;
