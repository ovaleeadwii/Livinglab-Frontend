import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import MarketPlace from './pages/MarketPlace';




const App = () => {
  return (
    <>
      {/* <LandingPage />*/}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/market' element={<MarketPlace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App