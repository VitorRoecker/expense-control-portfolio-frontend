import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col } from "antd";
import {
  DollarOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import FinTable from "../components/table";
import NavBar from "@/components/navbar";
import { ExpenseService } from "@/services/expense.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Expense } from "@/types/interfaces/expense.interface";

const { Content } = Layout;

const Home = () => {
  const [expenses, setExpenseItems] = useState<Expense[]>([]);
  const router = useRouter();
  var expenseService: ExpenseService;

  const [cardValues, setCardValues] = useState({
    lastIncome: 1500,
    lastExpense: 800,
    total: 700,
  });

  useEffect(() => {
    var authentication = localStorage.getItem("Authentication");

    if (authentication) {
      var userToken = JSON.parse(authentication) as UserToken;
      expenseService = new ExpenseService(userToken.token);
      ExpenseGetData(userToken.userId);
    } else {
      toast.warning("Erro ao buscar informações do login.");
      router.replace("/home");
    }
  }, []);

  async function ExpenseGetData(userId: string) {
    var expenseItems = await expenseService.GetAll(userId);
    setExpenseItems(expenseItems);
  }

  const cardData = [
    {
      name: "Última Entrada",
      icon: <UpCircleOutlined />,
      value: cardValues.lastIncome,
      id: 2,
    },
    {
      name: "Última Saída",
      icon: <DownCircleOutlined />,
      value: cardValues.lastExpense,
      id: 1,
    },
    { name: "Total", icon: <DollarOutlined />, value: cardValues.total, id: 3 },
  ];

  return (
    <Layout style={{ height: "100%" }}>
      <NavBar />
      <Content style={{ margin: "24px 16px 0" }}>
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "35px" }}>
          {cardData.map((data, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={`${data.name}-${index}`}>
              <Card
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                <div>
                  <p
                    className="mainName"
                    style={{
                      margin: "20px",
                      color: data.id === 1 ? "red" : "green",
                    }}
                  >
                    {data.name} {data.icon}
                  </p>
                  <p>
                    {data.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <FinTable />
      </Content>
    </Layout>
  );
};

export default Home;
