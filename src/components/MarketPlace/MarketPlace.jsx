import { useEffect } from 'react';
import People from '../../assets/people.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import produk from '../../assets/produk.svg';

const MarketPlaceComponent = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className='min-h-screen  bg-[#FFFFFF] py-40' id='Team'>
            <h1 className=" text-4xl md:text-5xl font-bold text-[#537052] text-center" >Market Place</h1>

            <div className="hero">
                <div className="hero-content ">

                    <div className="hero-content  " >
                        <div className="carousel rounded-box gap-5 flex-col items-center lg:flex-row md:gap-10">
                            <div className="carousel-item">
                                <div className="card bg-base-100 md:w-72 w-64 shadow-xl border border-[#556F52] ">
                                    <figure>
                                        <img
                                            src={produk}
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Tomat Chery
                                            <div className="badge badge-secondary">NEW</div>
                                        </h2>
                                        <p className='text-red-500'>Rp. 30.0000</p>
                                        <div className="card-actions justify-end">
                                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' rel="noopener noreferrer" target='_blank'>
                                                <button className="btn bg-[#537052] text-white">Buy Now</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card bg-base-100 md:w-72 w-64 shadow-xl border border-[#556F52] ">
                                    <figure>
                                        <img
                                            src={produk}
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Tomat Chery</h2>
                                        <p className='text-red-500'>Rp. 30.0000</p>
                                        <div className="card-actions justify-end">
                                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' rel="noopener noreferrer" target='_blank'>
                                                <button className="btn bg-[#537052] text-white">Buy Now</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card bg-base-100 md:w-72 w-64 shadow-xl border border-[#556F52] ">
                                    <figure>
                                        <img
                                            src={produk}
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Tomat Chery</h2>
                                        <p className='text-red-500'>Rp. 30.0000</p>
                                        <div className="card-actions justify-end">
                                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' rel="noopener noreferrer" target='_blank'>
                                                <button className="btn bg-[#537052] text-white">Buy Now</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="card bg-base-100 md:w-72 w-64 shadow-xl border border-[#556F52] ">
                                    <figure>
                                        <img
                                            src={produk}
                                            alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">Tomat Chery</h2>
                                        <p className='text-red-500'>Rp. 30.0000</p>
                                        <div className="card-actions justify-end">
                                            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' rel="noopener noreferrer" target='_blank'>
                                                <button className="btn bg-[#537052] text-white">Buy Now</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default MarketPlaceComponent