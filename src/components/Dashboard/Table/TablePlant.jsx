import React, { useState, useEffect } from "react";
import axios from "axios";

const TablePlant = () => {
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
    <section className="bg-white pt-5 pb-1 rounded-3xl my-5 ">
      <h1 className="text-left text-2xl font-bold mb-4 mt-2 text-[#537054] ">
        Plant Needs Table
      </h1>
      <div className="mb-8 overflow-hidden rounded-lg shadow">
        <div className=" overflow-x-auto">
          <table className="overflow-x-auto">
            <thead>
              <tr className="text-sm font-semibold tracking-wide text-left text-white bg-[#537052] uppercase border-b bg-tablecuy">
                <th className=" px-2  after:py-3 ">No</th>
                <th className=" px-2  after:py-3 ">Timestamp</th>
                <th className=" px-2  after:py-3  text-center">Waterflow 1</th>
                <th className=" px-2  after:py-3  text-center">Waterflow 2</th>
                <th className=" px-2  after:py-3  text-center">Waterflow 3</th>
                <th className=" px-2  after:py-3  text-center">Waterflow 4</th>
                <th className=" px-2  after:py-3  text-center">
                  Soil Moisture 1
                </th>
                <th className=" px-2  after:py-3  text-center">
                  Soil Moisture 2
                </th>
                <th className=" px-2  after:py-3  text-center">
                  Soil Moisture 3
                </th>
                <th className=" px-2  after:py-3  text-center">
                  Soil Moisture 4
                </th>
                <th className=" px-2  after:py-3  text-center">Weight 1</th>
                <th className=" px-2  after:py-3  text-center">Weight 2</th>
                <th className=" px-2  after:py-3  text-center">Weight 3</th>
                <th className=" px-2  after:py-3  text-center">Weight 4</th>
                <th className=" px-2  after:py-3  text-center">Weight 1</th>
                <th className=" px-2  after:py-3  text-center">Weight 2</th>
                <th className=" px-2  after:py-3  text-center">Weight 3</th>
                <th className=" px-2  after:py-3  text-center">Weight 4</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {data.map((item, index) => (
                <tr key={index} className="text-gray-700 border-b">
                  <td className=" px-2  after:py-3 p-hero">{index + 1}</td>
                  <td className=" px-2  after:py-3 p-hero">{item.timestamp}</td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.waterflow1}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.waterflow2}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.waterflow3}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.waterflow4}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.soilmoisture1}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.soilmoisture2}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.soilmoisture3}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.soilmoisture4}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat1}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat2}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat3}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat4}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat1}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat2}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat3}
                  </td>
                  <td className=" px-2  after:py-3 p-hero text-center">
                    {item.berat4}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TablePlant;
