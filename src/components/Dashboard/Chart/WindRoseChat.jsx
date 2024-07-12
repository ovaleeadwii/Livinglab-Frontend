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
      text: "Pie Chart",
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
    axios
      .get("https://c-greenproject.org:3333/getdatachart")
      .then((response) => {
        const data = response.data;

        // Assuming the API response contains data like this:
        // { Winddirection: {N: value, NNE: value, ...}, kecepatan_angin: {lowSpeed: [], mediumSpeed: [], ...} }
        const windDirections = data.Winddirection || {};
        const windSpeeds = data.kecepatan_angin || {};

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
        const windData = categories.map(
          (category) => windDirections[category] || 0
        );

        const newSeries = [
          {
            name: "Calm",
            data: windData,
            color: "#84e3c8",
          },
          {
            name: "1.54 m/s",
            data: windSpeeds.lowSpeed || [],
            color: "#a8e6cf",
          },
          {
            name: "3.09 m/s",
            data: windSpeeds.mediumSpeed || [],
            color: "#dcedc1",
          },
          {
            name: "5.14 m/s",
            data: windSpeeds.highSpeed || [],
            color: "#ffd3b6",
          },
          {
            name: "8.23 m/s",
            data: windSpeeds.veryHighSpeed || [],
            color: "#ffaaa5",
          },
          {
            name: "10.80 m/s",
            data: windSpeeds.veryVeryHighSpeed || [],
            color: "#ff8b94",
          },
          {
            name: "15.50 m/s",
            data: windSpeeds.extremeSpeed || [],
            color: "#ff7480",
          },
        ];

        setOptions((prevOptions) => ({
          ...prevOptions,
          series: newSeries,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WindRoseChart;
