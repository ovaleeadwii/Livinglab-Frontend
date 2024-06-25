import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, zoomPlugin, Filler);

const WaterFlow = ({ title, API }) => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch(API);
                const data = await response.json();
                // console.log("Received data", data.result);

                // Fungsi untuk mengonversi format tanggal
                const convertDateFormat = (timestamp) => {
                    const [datePart, timePart] = timestamp.split(' ');
                    const [day, month, year] = datePart.split('-');
                    return `${20}${year}-${month}-${day}T${timePart}`;
                };

                // Menyiapkan data untuk masing-masing parameter
                const parameters = ["waterflow1", "waterflow2", "waterflow3", "waterflow4"];
                const parameterMapping = {
                    waterflow1: 'Water Flow 1',
                    waterflow2: 'Water Flow 2',
                    waterflow3: 'Water Flow 3',
                    waterflow4: 'Water Flow 4',
                };

                const getRandomColor = () => {
                    const red = Math.floor(Math.random() * 256);
                    const green = Math.floor(Math.random() * 256);
                    const blue = Math.floor(Math.random() * 256);
                    return `rgba(${red}, ${green}, ${blue}`;
                };

                const datasets = parameters.map(param => {
                    const baseColor = getRandomColor(); // Warna dasar (tanpa opasitas)
                    const borderColor = `${baseColor}, 1)`; // Warna garis penuh opasitas
                    const fillColor = `${baseColor}, 0.1)`; // Warna area diisi dengan opasitas 10%
                    return {
                        label: parameterMapping[param],
                        data: data.result.map(item => ({
                            x: new Date(convertDateFormat(item.timestamp)),
                            y: item[param]
                        })),
                        borderColor: borderColor,
                        borderWidth: 1,
                        backgroundColor: fillColor,
                        tension: 0.1,
                        fill: true, // Mengaktifkan pengisian
                        pointRadius: 2, // Ukuran titik pada garis
                        hoverBorderWidth: 1
                    };
                });

                setChartData({
                    datasets: datasets,
                });


            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        fetchData();
    }, [API]);

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm' // Format waktu 24 jam
                    }
                },
                ticks: {
                    source: 'data',
                    autoSkip: true,
                }
            }
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        modifierKey: 'ctrl'
                    },
                    mode: "x",
                    speed: 100,
                },
                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 0.5,
                },
            },
        },
    };

    return (
        <div className="p-1 w-full">
            <div className="bg-white p-1 shadow rounded-lg bg-cardcuy">
                <h1 className="text-left text-2xl font-bold mb-4 mt-2 text-[#537054] ">{title}</h1>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default WaterFlow;
