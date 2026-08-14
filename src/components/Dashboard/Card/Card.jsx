import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ title, data }) => {
  // State untuk menyimpan nilai dari data yang diterima dari API
  const [value, setValue] = useState(null);

  // useEffect untuk melakukan fetch data dari API setiap 1 detik
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        // Melakukan request ke endpoint yang disimpan dalam environment variable
        const response = await axios.get(import.meta.env.VITE_LAST_DATA);
        // Mengambil nilai data yang sesuai dengan prop 'data'
        const dataValue = response.data.result[0][data];
        // Menyimpan nilai data ke state 'value'
        setValue(dataValue);
      } catch (error) {
        // Menampilkan error jika terjadi kesalahan saat fetch data
        console.error(error);
      }
    };
    // merefresh fetchData setiap 1 detik
    const intervalId = setInterval(fetchData, 1000);
    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [data]); // useEffect tergantung pada perubahan 'data'

  return (
    <div className="flex flex-col items-center rounded-3xl bg-[#ACCCAB] border-4 border-[#556F52]  shadow-lg w-full ">
      <h1 className="text-xl font-bold mt-1 md:mt-5 text-[#537054] ">
        {title}
      </h1>
      <div className="flex flex-col justify-center items-center text-center gap-2 md:gap-5 my-5 md:my-2">
        <h1 className="text-2xl font-bold mt-2 text-[#537054]  ">{value}</h1>
      </div>
    </div>
  );
};

export default Card;
