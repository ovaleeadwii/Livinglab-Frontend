import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Pilihan: 'home', 'shop', 'dashboard'

  return (
    <div className="app-container">
      {currentPage === 'home' && <LandingPage setPage={setCurrentPage} />}
      {currentPage === 'shop' && <ShopPage setPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <DashboardPage setPage={setCurrentPage} />}
    </div>
  );
}