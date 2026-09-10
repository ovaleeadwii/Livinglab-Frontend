import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('livingSmartUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginOrRegister = (userData) => {
    setUser(userData);
    localStorage.setItem('livingSmartUser', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('livingSmartUser');
    setCurrentPage('home');
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && <LandingPage setPage={setCurrentPage} user={user} />}
      {currentPage === 'shop' && <ShopPage setPage={setCurrentPage} user={user} />}
      {currentPage === 'dashboard' && <DashboardPage setPage={setCurrentPage} user={user} />}
      {currentPage === 'auth' && <AuthPage setPage={setCurrentPage} onLoginSuccess={handleLoginOrRegister} />}
      {currentPage === 'profile' && <ProfilePage setPage={setCurrentPage} user={user} onLogout={handleLogout} />}
    </div>
  );
}