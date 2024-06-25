/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import heroImage from '../../assets/hero.png'
import fotogh from '../../assets/fotogh.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div
            className="hero min-h-screen  "
            style={{
                backgroundImage: `url(${heroImage})`,
            }} id='Home'>
            <div className="hero-overlay bg-none bg-black bg-opacity-30 "></div>
            <div className="hero-content py-20 md:py-10">
                <div className="hero-content flex-col items-center lg:flex-row gap-10 md:gap-52 " >
                    <div data-aos="fade-right">
                        <h1 className="text-2xl md:text-5xl font-bold text-white" >Agri-ICS Dashboard</h1>
                        <h1 className="text-2xl md:text-5xl font-bold text-white">for  Agriculture</h1>
                        <h1 className="text-2xl md:text-5xl font-bold text-white">Smart Greenhouse</h1>
                        <p className="py-2 text-white">
                            Let’s check
                        </p>
                        <button className="btn bg-white text-[#537054] rounded-2xl hover:text-white">Dashboard</button>
                    </div>
                    <img
                        src={fotogh}
                        className="md:max-w-sm max-w-40  rounded-lg shadow-none" data-aos="fade-left" />
                </div>
            </div>
        </div>
    )
}

export default Hero