import React, { useState } from 'react';
import NavbarDashboard from '../components/Dashboard/NavbarDashboard';
import Card from '../components/Dashboard/Card/Card'
import CardAktuator from '../components/Dashboard/Card/CardAktuator';
import ChartNutrient from '../components/Dashboard/Chart/ChartNutrient';
import ChartMicroclimate from '../components/Dashboard/Chart/ChartMicroclimate';
import SoilMoisture from '../components/Dashboard/Chart/PlantNeeds/SoilMoisture';
import WaterFlow from '../components/Dashboard/Chart/PlantNeeds/WaterFlow';
import Weight from '../components/Dashboard/Chart/PlantNeeds/Weight';
import TableNutrient from '../components/Dashboard/Table/TableNutrient';
import TableMicroclimate from '../components/Dashboard/Table/TableMicroclimate';
import TablePlant from '../components/Dashboard/Table/TablePlant';
import CardDirection from '../components/Dashboard/Card/CardDirection';
import DownloadComponents from '../components/Dashboard/Download/DownloadComponents';
import NavbarDashboardResponsive from '../components/Responsive/NavbarDashboard';

const Dashboard = () => {
    const [apiURL, setApiURL] = useState(import.meta.env.VITE_CHART_DATA); // Default ke data Dayan

    return (
        <div className='my-28 md:my-36'>
            <NavbarDashboard />
            <NavbarDashboardResponsive />
            <div className='container mx-auto px-0 md:px-28  '>
                <div role="tablist" className="tabs tabs-xs  md:tabs-md md:tabs-lifted">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Actuator" defaultChecked />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 mb-72">

                        <div className='flex flex-col md:flex-row gap-10'>
                            <CardAktuator title="Pompa Air" data="pompaair" />
                            <CardAktuator title="Lampu UV" data="lampuuv" />
                            <CardAktuator title="Pompa Nutrisi" data="pompanutrisi" />
                        </div>

                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Nutrient Tank" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='w-80 md:w-auto'>
                            <div className='flex flex-col md:flex-row gap-10'>
                                <Card title={'TDS (mg/L)'} data={'tds'} />
                                <Card title={'Water Temperature (°C)'} data={'suhu_air'} />
                                <Card title={'pH'} data={'ph'} />
                            </div>
                            <div className='flex justify-start space-x-4 my-4'>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_DAILY)}>1 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_WEEKLY)}>7 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_MONTHLY)}>30 Day</button>
                            </div>
                            <ChartNutrient title='Nutrient Chart' API={apiURL} />
                            <TableNutrient />
                        </div>

                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Microclimate" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='w-80 md:w-auto'>
                            <div className='flex flex-col gap-10'>
                                <div className='flex flex-col md:flex-row  gap-10'>
                                    <CardDirection title={'Wind Direction'} />
                                    <Card title={'Wind Speed (m/s)'} data={'kecepatan_angin'} />
                                    <Card title={'Barometric Pressure (hPa)'} data={'tekanan_udara'} />
                                </div>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'Room Temperature (°C)'} data={'suhu'} />
                                    <Card title={'Temperature DHT (°C)'} data={'temperaturedht'} />
                                    <Card title={'Humidity (%RH)'} data={'humidity'} />
                                </div>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'SVP (kPa)'} data={'svp'} />
                                    <Card title={'AVP (kPa)'} data={'avp'} />
                                    <Card title={'VPD (kPa)'} data={'vpd'} />
                                </div>
                            </div>
                            <div className='flex justify-start space-x-4 my-4'>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_DAILY)}>1 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_WEEKLY)}>7 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_MONTHLY)}>30 Day</button>
                            </div>
                            <div className='flex'>
                                <ChartMicroclimate title='Microclimate Chart' API={apiURL} />
                            </div>
                            <TableMicroclimate />
                        </div>

                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Plant Needs" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='w-80 md:w-auto'>
                            <div className='flex flex-col gap-3'>
                                <p className="text-2xl font-bold mt-2 text-[#537054]">Table 1</p>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'Water Flow (L/H)'} data={'waterflow1'} />
                                    <Card title={'Soil Moisture (%)'} data={'soilmoisture1'} />
                                    <Card title={'Weight (Gram)'} data={'berat1'} />
                                </div>
                                <p className="text-2xl font-bold mt-2 text-[#537054]">Table 2</p>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'Water Flow (L/H)'} data={'waterflow2'} />
                                    <Card title={'Soil Moisture (%)'} data={'soilmoisture2'} />
                                    <Card title={'Weight (Gram)'} data={'berat2'} />
                                </div>
                                <p className="text-2xl font-bold mt-2 text-[#537054]">Table 3</p>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'Water Flow (L/H)'} data={'waterflow3'} />
                                    <Card title={'Soil Moisture (%)'} data={'soilmoisture3'} />
                                    <Card title={'Weight (Gram)'} data={'berat3'} />
                                </div>
                                <p className="text-2xl font-bold mt-2 text-[#537054]">Table 4</p>
                                <div className='flex flex-col md:flex-row gap-10'>
                                    <Card title={'Water Flow (L/H)'} data={'waterflow4'} />
                                    <Card title={'Soil Moisture (%)'} data={'soilmoisture4'} />
                                    <Card title={'Weight (Gram)'} data={'berat4'} />
                                </div>
                            </div>
                            <div className='flex justify-start space-x-4 my-4'>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_DAILY)}>1 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_WEEKLY)}>7 Day</button>
                                <button className="py-3 px-5 bg-[#537054] text-white rounded-2xl shadow-md hover:bg-green-800" onClick={() => setApiURL(import.meta.env.VITE_CHART_MONTHLY)}>30 Day</button>
                            </div>
                            <div className='flex flex-col md:flex-row'>
                                <SoilMoisture title='Soil Moisture Table' API={apiURL} />
                                <WaterFlow title='Waterflow Table' API={apiURL} />
                                <Weight title='Weight Table' API={apiURL} />
                            </div>
                            {/* Atur ini untuk lebar ukuran tabel */}
                            <div className='min-w-screen-xl'>
                                <TablePlant />
                            </div>
                        </div>

                    </div>
                    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Download Data" />
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div className='min-h-screen flex flex-col md:justify-center md:items-center'>
                            <p className="text-xl md:text-5xl font-bold mt-2 text-[#537054]">Download Area</p>
                            <div className='my-5'>
                                <DownloadComponents />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
