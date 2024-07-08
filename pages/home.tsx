import React, { useEffect, useState } from "react";
import { Layout, Card, Row, Col, Tabs, Spin } from "antd";
import {
  DollarOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import FinTable from "../components/tableCategory";
import NavBar from "@/components/navbar";
import { ExpenseService } from "@/services/expense.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Expense } from "@/types/interfaces/expense.interface";
import ExpenseTable from "@/components/tableExpense";
import IncomeTable from "@/components/tableIncome";
import { IncomeService } from "@/services/income.service";
import { Income } from "@/types/interfaces/income.interface";

const { Content } = Layout;
const { TabPane } = Tabs;

const Home = () => {
  const [expenses, setExpenseItems] = useState<Expense[]>([]);
  const [income, setIncomeItems] = useState<Income[]>([]);
  const [lastExpense, setLastExpense] = useState<number>(0);
  const [lastIncome, setLastIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setUserToken] = useState<UserToken>();

  const router = useRouter();
  var expenseService: ExpenseService;
  var incomeService: IncomeService;

  useEffect(() => {
    var authentication = localStorage.getItem("Authentication");
    if (authentication) {
      var userToken = JSON.parse(authentication) as UserToken;
      expenseService = new ExpenseService(userToken.token);
      incomeService = new IncomeService(userToken.token);

      setUserToken(userToken);
      Promise.all([
        ExpenseGetData(userToken.userId),
        IncomeGetData(userToken.userId),
      ])
        .then(() => setLoading(false))
        .catch(() => {
          toast.error("Erro ao carregar os dados.");
          setLoading(false);
        });
    } else {
      router.replace("/");
    }
  }, []);

  async function ExpenseGetData(userId: string) {
    var expenseItems = await expenseService.GetAll(userId);
    setExpenseItems(expenseItems);
    if (expenseItems.length > 0) {
      const mostRecentExpense = Math.max(
        ...expenseItems.map((exp) => new Date(exp.inclusionDate).getTime())
      );
      const recentExpenseItem = expenseItems.find(
        (exp) => new Date(exp.inclusionDate).getTime() === mostRecentExpense
      );
      if (recentExpenseItem) {
        setLastExpense(recentExpenseItem.amount);
      }
    }
    calculateTotal(expenseItems, income);
  }
  async function IncomeGetData(userId: string) {
    var incomeItems = await incomeService.GetAll(userId);
    setIncomeItems(incomeItems);
    if (incomeItems.length > 0) {
      const mostRecentIncome = Math.max(
        ...incomeItems.map((inc) => new Date(inc.inclusionDate).getTime())
      );
      const recentIncomeItem = incomeItems.find(
        (inc) => new Date(inc.inclusionDate).getTime() === mostRecentIncome
      );
      if (recentIncomeItem) {
        setLastIncome(recentIncomeItem.amount);
      }
    }
    calculateTotal(expenses, incomeItems);
  }

  const calculateTotal = (expenses: Expense[], income: Income[]) => {
    const totalIncome = income.reduce((acc, inc) => acc + inc.amount, 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    setTotal(totalIncome - totalExpenses);
  };

  const cardData = [
    {
      name: "Última Entrada",
      icon: <UpCircleOutlined />,
      value: lastIncome,
      id: 2,
    },
    {
      name: "Última Saída",
      icon: <DownCircleOutlined />,
      value: lastExpense,
      id: 1,
    },
    { name: "Total", icon: <DollarOutlined />, value: total, id: 3 },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Content style={{ margin: "24px 16px 0" }}>
        {loading ? (
          <Spin
            tip="Carregando..."
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          />
        ) : (
          <>
            <Row
              gutter={[16, 16]}
              justify="center"
              style={{ marginTop: "35px" }}
            >
              {cardData.map((data, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={`${data.name}-${index}`}
                >
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
                        {data?.value?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Card style={{ margin: 10 }}>
              <Tabs defaultActiveKey="categoria">
                <TabPane tab="Categoria" key="categoria">
                  <FinTable />
                </TabPane>
                <TabPane tab="Entrada" key="entrada">
                  <IncomeTable />
                </TabPane>
                <TabPane tab="Saída" key="saida">
                  <ExpenseTable />
                </TabPane>
              </Tabs>
            </Card>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Home;