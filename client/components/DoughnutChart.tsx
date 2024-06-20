"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ rating }: { rating: number }) => {
  return (
    <div id="chart" className="chart-container relative h-20 w-20">
      <Doughnut
        data={{
          labels: ["rating"],
          datasets: [
            {
              label: "count",
              data: [rating.toFixed(1)],
              backgroundColor: ["#FF6384"],
              circumference: rating * 36,
              borderWidth: 0,
            },
          ],
        }}
        options={{
          cutout: "85%",
          plugins: {
            legend: {
              display: false,
            },
          },
          radius: "70%",
        }}
        plugins={[backgroundCircle, doughnutLabel]}
      ></Doughnut>
    </div>
  );
};

export default DoughnutChart;

const doughnutLabel = {
  id: "doughnutLabel",
  afterDatasetsDraw: function (chart: any, args: any, options: any) {
    const { ctx, data } = chart;

    const centerX = chart.getDatasetMeta(0).data[0].x;
    const centerY = chart.getDatasetMeta(0).data[0].y;

    // text
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].data[0], centerX, centerY);
  },
};

const backgroundCircle = {
  id: "backgroundCircle",
  beforeDraw: function (chart: any, args: any, options: any) {
    const { ctx } = chart;
    ctx.save();

    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
    const width = outerRadius - innerRadius;

    const angle = Math.PI / 180;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = "grey";
    ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
    ctx.stroke();
  },
};
