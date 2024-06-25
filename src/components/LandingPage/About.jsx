import { useEffect } from 'react';
import Aboutimg from '../../assets/about_img.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div
            className="hero min-h-screen bg-[#EAF6EA]" id='About'>

            <div className="hero-content ">
                <div className="hero-content flex-col items-center lg:flex-row gap-10 md:gap-52 " >
                    <div data-aos="fade-right">
                        <h1 className="md:text-4xl text-lg font-bold text-[#537052]" >Something Now</h1>
                        <h1 className="md:text-4xl text-lg  font-bold text-[#537052]">About Us.</h1>

                        <p className="py-2 text-[#537052] md:text-lg text-sm">
                            Experience real-time insights and management of your greenhouse environment. <br className='md:block hidden' /> Our advanced IoT solutions empower you to monitor and control the microclimate, ensuring optimal conditions for your plants, 24/7.
                        </p>
                    </div>
                    <img
                        src={Aboutimg}
                        className="md:max-w-lg max-w-48 rounded-lg shadow-none" data-aos="fade-left" />
                </div>
            </div>
        </div>
    )
}

export default About