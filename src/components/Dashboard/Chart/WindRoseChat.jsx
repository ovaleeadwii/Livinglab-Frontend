import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import windbarb from "highcharts/modules/windbarb";
import more from "highcharts/highcharts-more";
import dataModule from "highcharts/modules/data";

windbarb(Highcharts);
more(Highcharts);
dataModule(Highcharts);

const WindRoseChart = () => {
  const [options, setOptions] = useState({
    chart: {
      polar: true,
      type: "column",
    },
    title: {
      text: "Wind Rose",
    },
    pane: {
      size: "85%",
    },
    xAxis: {
      tickmarkPlacement: "on",
      categories: [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ],
    },
    yAxis: {
      min: 0,
      endOnTick: false,
      showLastLabel: true,
      title: {
        text: "Frequency (%)",
      },
      labels: {
        formatter: function () {
          return this.value + "%";
        },
      },
      reversedStacks: false,
    },
    tooltip: {
      valueSuffix: "%",
    },
    plotOptions: {
      series: {
        stacking: "normal",
        shadow: false,
        groupPadding: 0,
        pointPlacement: "on",
      },
    },
    series: [],
  });

  useEffect(() => {
    const apiUrl = "https://c-greenproject.org:3333/getdatachart"; // ganti dengan API URL yang benar

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log("Data fetched from API:", data);

        // Ekstraksi data dari API
        const windDirections = data.result.map((item) => item.suhu_air);
        const windSpeeds = data.result.map((item) => item.humidity);

        // Transformasi data sesuai dengan kategori arah angin
        const categories = [
          "N",
          "NNE",
          "NE",
          "ENE",
          "E",
          "ESE",
          "SE",
          "SSE",
          "S",
          "SSW",
          "SW",
          "WSW",
          "W",
          "WNW",
          "NW",
          "NNW",
        ];

        const seriesData = categories.map((category, index) => ({
          name: category,
          data: windDirections[index] || [],
          color: index % 2 === 0 ? "#84e3c8" : "#a8e6cf",
        }));

        setOptions((prevOptions) => ({
          ...prevOptions,
          series: seriesData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WindRoseChart;
