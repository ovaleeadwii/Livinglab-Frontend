import React, { useState } from 'react';
import chart from '../../assets/chart.svg';

import { Link } from 'react-router-dom';


const NavbarMarketResponsive = () => {

    return (
        <div><div className="navbar bg-base-100 header_responsive z-50 md:hidden block">

            <div className="flex-none">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/'

                                className={`text-lg font-medium  'bg-green-900 text-[#2E3E2E] hover:bg-[#2E3E2E] hover:text-white hover:rounded-2xl `}

                            >
                                Home
                            </Link>
                        </li>

                        <li>

                            <Link to='/dashboard'

                                className={`text-lg font-medium  'bg-green-900 text-[#2E3E2E] hover:bg-[#2E3E2E] hover:text-white hover:rounded-2xl`}

                            >
                                Dashboard
                            </Link>


                        </li>
                        <li>
                            <Link to='/market' className="w-16 rounded-full" >

                                <img src={chart} alt="chart" />

                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">AGRI-ICS</a>
            </div>




        </div></div>
    )
}

export default NavbarMarketResponsive