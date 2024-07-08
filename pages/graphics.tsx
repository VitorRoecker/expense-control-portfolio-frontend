import React, { useLayoutEffect, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Layout } from "antd";
import NavBar from "@/components/navbar";
import { Expense } from "@/types/interfaces/expense.interface";
import { Income } from "@/types/interfaces/income.interface";
import { ExpenseService } from "@/services/expense.service";
import { IncomeService } from "@/services/income.service";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graphics = () => {
  const [expenses, setExpenseItems] = useState<Expense[]>([]);
  const [income, setIncomeItems] = useState<Income[]>([]);
  const [chartData, setChartData] = useState<any>({
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
        data: [],
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Saídas",
        data: [],
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  });

  let expenseService: ExpenseService;
  let incomeService: IncomeService;

  useEffect(() => {
    const fetchData = async () => {
      const authentication = localStorage.getItem("Authentication");
      if (authentication) {
        const userToken = JSON.parse(authentication);
        expenseService = new ExpenseService(userToken.token);
        incomeService = new IncomeService(userToken.token);

        try {
          const expenseData = await expenseService.GetAll(userToken.userId);
          const incomeData = await incomeService.GetAll(userToken.userId);

          setExpenseItems(expenseData);
          setIncomeItems(incomeData);

          updateChartData(expenseData, incomeData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const updateChartData = (expenses: Expense[], income: Income[]) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
    ];

    const incomeByMonth = Array.from({ length: 7 }, () => 0);
    const expenseByMonth = Array.from({ length: 7 }, () => 0);

    expenses.forEach((expense) => {
      const monthIndex = new Date(expense.inclusionDate).getMonth();
      expenseByMonth[monthIndex] += expense.amount;
    });

    income.forEach((incomeItem) => {
      const monthIndex = new Date(incomeItem.inclusionDate).getMonth();
      incomeByMonth[monthIndex] += incomeItem.amount;
    });

    setChartData({
      labels: months,
      datasets: [
        {
          label: "Entradas",
          data: incomeByMonth,
          borderColor: "green",
          backgroundColor: "green",
        },
        {
          label: "Saídas",
          data: expenseByMonth,
          borderColor: "red",
          backgroundColor: "red",
        },
      ],
    });
  };

  return (
    <>
      <NavBar />
      <Layout style={{ minHeight: "100vh" }}>
        <Layout style={{ width: "80%", margin: 20 }}>
          <Line data={chartData} />
        </Layout>
      </Layout>
    </>
  );
};

export default Graphics;
