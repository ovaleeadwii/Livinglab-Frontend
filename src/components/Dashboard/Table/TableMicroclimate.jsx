import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TableMicroclimate = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_10_DATA);
                // console.log("ini responnya: ", response.data.result)
                // setData(formattedData);
                setData(response.data.result);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="bg-white px-5 pt-5 pb-1 rounded-3xl my-5 ">
            <h1 className="text-left text-2xl font-bold mb-4 mt-2 text-[#537054] ">Microclimate Table</h1>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-white bg-[#537052] uppercase border-b bg-tablecuy">
                                <th className="px-4 py-3 ">No</th>
                                <th className="px-4 py-3 ">Timestamp</th>
                                <th className="px-4 py-3  text-center">Wind Direction</th>
                                <th className="px-4 py-3  text-center">Wind Speed</th>
                                <th className="px-4 py-3  text-center">Room Temperature</th>
                                <th className="px-4 py-3  text-center">Temperature DHT</th>
                                <th className="px-4 py-3  text-center">Barometric Pressure</th>
                                <th className="px-4 py-3  text-center">Humidity</th>
                                <th className="px-4 py-3  text-center">svp</th>
                                <th className="px-4 py-3  text-center">avp</th>
                                <th className="px-4 py-3  text-center">vpd</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white ">
                            {data.map((item, index) => (
                                <tr key={index} className="text-gray-700 border-b">
                                    <td className="px-4 py-3 p-hero">{index + 1}</td>
                                    <td className="px-4 py-3 p-hero">{item.timestamp}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.winddirection}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.kecepatan_angin}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.suhu}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.temperaturedht}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.tekanan_udara}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.humidity}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.svp}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.avp}</td>
                                    <td className="px-4 py-3 p-hero text-center">{item.vpd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default TableMicroclimate;
