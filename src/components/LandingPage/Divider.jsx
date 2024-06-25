/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import clock from '../../assets/clock_divider.svg';
import picture from '../../assets/image_divider.svg';
import security from '../../assets/security_divider.svg';

const Divider = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <section className='py-10 bg-[#537052]'>
            <div className="container mx-auto px-5 flex flex-row justify-evenly">
                <div className='flex flex-col items-center' data-aos="fade-up">
                    <img
                        src={clock}
                        className="md:w-24 w-14 rounded-lg shadow-none" />
                    <div className='pt-5 text-center'>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            24 Hour Data
                        </p>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            Monitoring
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-center' data-aos="fade-up" data-aos-delay="200">
                    <img
                        src={picture}
                        className="md:w-24 w-14 rounded-lg shadow-none" />
                    <div className='pt-5 text-center'>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            Plant
                        </p>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            Pictures
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-center' data-aos="fade-up" data-aos-delay="400">
                    <img
                        src={security}
                        className="md:w-24 w-14 rounded-lg shadow-none" />
                    <div className='pt-5 text-center'>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            24 Hours
                        </p>
                        <p className="md:text-2xl text-sm text-white font-semibold">
                            Security
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Divider;
