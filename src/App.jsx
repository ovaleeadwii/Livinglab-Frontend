import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import MarketPlace from "./pages/MarketPlace";

const AppContent = () => {
  const location = useLocation();

  const [showIntro, setShowIntro] = useState(
    location.pathname === "/" &&
      performance.getEntriesByType("navigation")[0]?.type !== "navigate"
  );

  useEffect(() => {
    if (!showIntro) return;

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage showIntro={showIntro} />}
        />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/market" element={<MarketPlace />} />
      </Routes>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;