import NavBar from "@/components/navbar";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { Layout } from "antd";

const Graphics = () => {
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale
  );
  const chartData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
    ],
    datasets: [
      {
        label: "Entradas",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Saídas",
        data: [100, 159, 180, 8, 6],
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };

  return (
    <>
      <NavBar />
      <Layout>
        <Layout style={{ width: "80%", margin: 20 }}>
          <Line data={chartData} />
        </Layout>
      </Layout>
    </>
  );
};

export default Graphics;
