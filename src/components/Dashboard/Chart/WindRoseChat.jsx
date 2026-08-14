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

const WindChartdht = () => {
  const [options, setOptions] = useState({
    chart: {
      polar: true,
      type: "column",
    },
    title: {
      text: "Wind Rose Diagram",
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
      labels: {
        style: {
          color: "#666",
        },
      },
    },
    yAxis: {
      min: 0,
      endOnTick: false,
      showLastLabel: true,
      title: {
        text: "Wind Speed (m/s)",
      },
      labels: {
        formatter: function () {
          return this.value;
        },
      },
      reversedStacks: false,
    },
    tooltip: {
      formatter: function () {
        const windSpeed = this.point.windSpeed
          ? `${this.point.windSpeed.toFixed(2)} m/s`
          : "No data";
        const windDirection = this.point.windDirection
          ? `${this.point.windDirection.toFixed(2)}°`
          : "No data";
        return `<b>${this.x}</b><br/>${this.series.name}: ${this.y.toFixed(
          2
        )} m/s<br/>Wind Direction: ${windDirection}<br/>Date: ${
          this.point.timestamp
        }`;
      },
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
        console.log("Data fetched from API:", data.result);

        const allData = data.result;
        const windDirections = allData.map((item) => item.winddirection);
        const windSpeeds = allData.map((item) => item.kecepatan_angin);
        const timestamps = allData.map((item) => item.timestamp);

        console.log("Wind Directions:", windDirections);
        console.log("Wind Speeds:", windSpeeds);
        console.log("Timestamps:", timestamps);

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

        const getCategoryIndex = (direction) => {
          const angles = [
            0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5,
            270, 292.5, 315, 337.5, 360,
          ];
          for (let i = 0; i < angles.length - 1; i++) {
            if (direction >= angles[i] && direction < angles[i + 1]) {
              return i;
            }
          }
          return 0; // Default ke "N" jika tidak cocok
        };

        const calculateAverageDirection = (directions) => {
          let x = 0;
          let y = 0;
          directions.forEach((dir) => {
            const radians = (dir * Math.PI) / 180;
            x += Math.cos(radians);
            y += Math.sin(radians);
          });
          const avgRadians = Math.atan2(y, x);
          return ((avgRadians * 180) / Math.PI + 360) % 360;
        };

        const createDirectionData = (directions, timestamps, speeds) =>
          categories.map((category, index) => {
            const filteredIndexes = directions
              .map((direction, i) =>
                getCategoryIndex(direction) === index ? i : -1
              )
              .filter((i) => i !== -1);

            const filteredDirections = filteredIndexes.map(
              (i) => directions[i]
            );
            const filteredSpeeds = filteredIndexes.map((i) => speeds[i]);
            const filteredTimestamps = filteredIndexes.map(
              (i) => timestamps[i]
            );

            const filteredData = {
              sumSpeed: filteredSpeeds.reduce((acc, speed) => acc + speed, 0),
              count: filteredSpeeds.length,
            };

            const avgDirection =
              filteredData.count > 0
                ? calculateAverageDirection(filteredDirections)
                : 0;

            return {
              y:
                filteredData.count > 0
                  ? filteredData.sumSpeed / filteredData.count
                  : 0,
              timestamp: filteredTimestamps[0] || "No data",
              windSpeed:
                filteredData.count > 0
                  ? filteredData.sumSpeed / filteredData.count
                  : 0,
              windDirection: avgDirection,
            };
          });

        const seriesData = [
          {
            name: "Wind Speed",
            data: createDirectionData(
              windDirections,
              timestamps,
              windSpeeds
            ).map((item) => ({
              y: item.windSpeed,
              timestamp: item.timestamp,
              windSpeed: item.windSpeed,
              windDirection: item.windDirection,
            })),
            color: "#26355D",
            yAxis: 0,
          },
        ];

        console.log("Series Data:", seriesData);

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

export default WindChartdht;
