import React, { useState } from 'react';
import chart from '../../assets/chart.svg';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';


const NavbarDashboard = () => {
    const [active, setActive] = useState('#Dashboard');

    return (
        <div className="navbar header shadow-lg  md:block hidden">
            <div className='container px-10'>
                <div className="w-12 rounded-full">
                    <img src={logo} alt="logo" />
                </div>
                <div className="flex-1">


                    <Link to="/" className="btn btn-ghost text-2xl text-[#559155] font-bold">AGRI-ICS</Link>

                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-2">
                        <li>
                            <Link to='/'

                                className={`text-lg font-medium ${active === '#Home' ? 'bg-green-900 text-white shadow-lg rounded-2xl' : 'text-[#2E3E2E]'} hover:bg-[#2E3E2E] hover:text-white hover:rounded-2xl `}
                                onClick={() => setActive('#Home')}
                            >
                                Home
                            </Link>
                        </li>

                        <li>

                            <a
                                href='#Dashboard'
                                className={`text-lg font-medium ${active === '#Dashboard' ? 'bg-green-900 text-white shadow-lg rounded-2xl' : 'text-[#2E3E2E]'} hover:bg-[#2E3E2E] hover:text-white hover:rounded-2xl`}
                                onClick={() => setActive('#Dashboard')}
                            >
                                Dashboard
                            </a>


                        </li>
                        <li>
                            <Link to='/market' className="w-16 rounded-full" >

                                <img src={chart} alt="chart" />

                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavbarDashboard;
