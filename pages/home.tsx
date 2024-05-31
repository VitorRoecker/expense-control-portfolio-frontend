import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import { DollarOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import FinTable from '../components/table'
import NavBar from '@/components/navbar';
import { ExpenseService } from '@/services/expense.service';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Expense } from '@/types/interfaces/expense.interface';

const { Content } = Layout;

const Home = () => {
  const router = useRouter();

  var expenseService: ExpenseService

  var expenseItems: Expense[]

  const [cardValues, setCardValues] = useState({
    lastIncome: 1500,
    lastExpense: 800,
    total: 700,
  });

  useEffect(() => {
    debugger
    var authentication = localStorage.getItem('Authentication');

    if (authentication) {
      var userToken = JSON.parse(authentication) as UserToken

      expenseService = new ExpenseService(userToken.token)
      ExpenseGetData()
    } else {
      toast('Erro ao buscar informações do login.')
      router.replace('/')
    }
  }, [])

  async function ExpenseGetData() {
    expenseItems = await expenseService.GetAll();
  }

  const cardData = [
    { name: 'Última Entrada', icon: <UpCircleOutlined />, value: cardValues.lastIncome },
    { name: 'Última Saída', icon: <DownCircleOutlined />, value: cardValues.lastExpense },
    { name: 'Total', icon: <DollarOutlined />, value: cardValues.total },
  ];

  return (
    <Layout>
      <NavBar />
      <div style={{ display: 'flex', marginTop: '35px', justifyContent: 'center' }}>
        {cardData.map((data, index) => (
          <Card
            key={`${data.name}-${index}`}
            className="card"
            style={{
              width: 300,
              margin: '30px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div>
              <p className="mainName" style={{ margin: '20px' }}>
                {data.name} {data.icon}
              </p>
              <p>{data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </Card>
        ))}
      </div>
      <Content style={{ margin: '24px 16px 0' }}>
        <FinTable></FinTable>
      </Content>
    </Layout>
  );
};

export default Home;
