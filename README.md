# Konfigurasi Sebelum membuat project frontend

- Install vite
- install tailwind
- install daisy ui
- install react router
- install axios
- install chart js
- install chartjs-adapter-date-fns
- install react-chartjs-2
- install chartjs-plugin-zoom

## Menu aktif

import React, { useState } from 'react';
import chart from '../assets/chart.svg';
import logo from '../assets/logo.svg';

const Navbar = () => {
const [activeItem, setActiveItem] = useState('Home');

    const menuItems = ['Home', 'About Us', 'Team', 'Contact Us', 'Dashboard'];

    return (
        <div className="navbar header">
            <div className='container px-10'>
                <div className="w-12 rounded-full">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">AGRI-ICS</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-2">
                        {menuItems.map((item) => (
                            <li key={item}>
                                <a
                                    className={`text-base hover:bg-[#2E3E2E] hover:text-white ${
                                        activeItem === item ? 'bg-green-500 text-white' : 'text-[#2E3E2E]'
                                    }`}
                                    onClick={() => setActiveItem(item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li>
                            <div className="w-16 rounded-full">
                                <img src={chart} alt="Chart" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default Navbar;

# UX

Tentu, berikut adalah contoh isi UX yang dioptimalkan untuk kata-kata yang ingin Anda gunakan pada website dashboard IoT untuk greenhouse:

---

### Something Now

**Welcome to Greenhouse IoT Dashboard**

Experience real-time insights and management of your greenhouse environment. Our advanced IoT solutions empower you to monitor and control the microclimate, ensuring optimal conditions for your plants, 24/7.

### About Us

**Who We Are**

At Greenhouse IoT Solutions, we are dedicated to revolutionizing agriculture with cutting-edge technology. Our mission is to provide seamless, real-time monitoring and control of greenhouse environments, enhancing productivity and sustainability.

### Dashboard Features

**24 Hour Data Monitoring**

Stay informed around the clock. Our dashboard provides continuous updates on all critical parameters, ensuring your plants thrive under optimal conditions.

**Plant Needs**

Understand and address the specific requirements of your plants. Our system analyzes data to provide insights into water, light, and nutrient needs.

**Actuator Control**

Efficiently manage your greenhouse's actuators. From irrigation systems to ventilation, our dashboard allows for precise control to maintain ideal growing conditions.

**Microclimate Management**

Gain comprehensive control over the microclimate within your greenhouse. Monitor temperature, humidity, and other vital factors to create the perfect environment for your crops.

---

Is there anything else you would like to include or modify?

# API

--ambil data terbaru untuk ditampilkan pada dashboard
https://c-greenproject.org:3333/getOneData

--ambil 10 data untuk ditampilkan pada tabel
https://c-greenproject.org:3333/getdatatable

--ambil 10 data setiap menit untuk chart atau grafik
https://c-greenproject.org:3333/getdatachart

--ambil data selama rentang waktu satu hari (untuk grafik/chart satu hari)
https://c-greenproject.org:3333/getDataForOneDay

--ambil ata selama rentang waktu satu minggu (untuk grafik/ chart seminggu)
https://c-greenproject.org:3333/getDataForSevenDays

--ambil data selama rentang waktu satu bulan (untuk grafik/chart sebulan)
https://c-greenproject.org:3333/getDataForonemonth

-download 100 data terbaru
https://c-greenproject.org:3333/download100latestdata

-download data satu hari
https://c-greenproject.org:3333/downloaddailydata

-download data satu minggu
https://c-greenproject.org:3333/downloadweeklydata

-download data satu bulan
https://c-greenproject.org:3333/downloadmonthlydata

data terbaru :
{
"count": 1,
"result": [
{
"timestamp": "13-06-24 11:39:59",
"id": 7767854,
#ACTUATOR
"pompanutrisi": 0,
"pompaair": null,
"lampuuv": null,
#NUTRIENT TANK
"ph": 13.3181,
"tds": 37,
"suhu_air": 27.75,
#microclimate
"winddirection": 0,
"kecepatan_angin": 0,
"suhu": 37.02,
"tekanan_udara": 94684.38,
"humidity": 61.9,
"svp": 6.28,
"avp": 3.89,
"vpd": 2.39,
"temperaturedht": 35.9
#pLANT Needs
"waterflow1": 0,
"waterflow2": 0,
"waterflow3": 0,
"waterflow4": 0,
"soilmoisture1": 46.18,
"soilmoisture2": 47.26,
"soilmoisture3": 54.33,
"soilmoisture4": 50.79,
"berat1": 0,
"berat2": 0,
"berat3": 0,
"berat4": 0,

}
]
}

# ONE DATA

{
"count": 1,
"result": [
{
"timestamp": "13-06-24 11:39:59",
"id": 7767854,
"ph": 13.3181,
"tds": 37,
"suhu_air": 27.75,
"winddirection": 0,
"kecepatan_angin": 0,
"infrared1": null,
"infrared2": null,
"infrared3": null,
"berat1": 0,
"waterflow1": 0,
"waterflow2": 0,
"waterflow3": 0,
"waterflow4": 0,
"soilmoisture1": 46.18,
"soilmoisture2": 47.26,
"soilmoisture3": 54.33,
"soilmoisture4": 50.79,
"berat2": 0,
"berat3": 0,
"berat4": 0,
"suhu": 37.02,
"tekanan_udara": 94684.38,
"pompanutrisi": 0,
"pompaair": null,
"lampuuv": null,
"pyrano": null,
"humidity": 61.9,
"svp": 6.28,
"avp": 3.89,
"vpd": 2.39,
"temperaturedht": 35.9
}
]
}
