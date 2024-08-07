import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Layout, Spin } from "antd";
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
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  let expenseService: ExpenseService;
  let incomeService: IncomeService;

  useEffect(() => {
    const fetchData = async () => {
      const authentication = localStorage.getItem("Authentication");
      if (authentication != null) {
        const userToken = JSON.parse(authentication);
        expenseService = new ExpenseService(userToken.token);
        incomeService = new IncomeService(userToken.token);

        try {
          const [expenseData, incomeData] = await Promise.all([
            expenseService.GetAll(userToken.userId),
            incomeService.GetAll(userToken.userId),
          ]);

          setExpenseItems(expenseData);
          setIncomeItems(incomeData);

          updateChartData(expenseData, incomeData);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setLoading(false);
        }
      } else {
        router.replace("/");
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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <Layout style={{ width: "80%", margin: 20 }}>
            <Line data={chartData} />
          </Layout>
        )}
      </Layout>
    </>
  );
};

export default Graphics;