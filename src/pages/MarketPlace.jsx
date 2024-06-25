import React from 'react'
import NavbarMarket from '../components/MarketPlace/NavbarMarket';
import MarketPlaceComponent from '../components/MarketPlace/MarketPlace';
import NavbarMarketResponsive from '../components/Responsive/NavbarMarketplace';

const MarketPlace = () => {
    return (
        <div id='market' className=' min-h-screen'>
            <NavbarMarket />
            <NavbarMarketResponsive />
            <MarketPlaceComponent />
        </div>
    )
}

export default MarketPlace