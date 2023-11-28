import React from 'react';
import { Button, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface FinDto {
  key: string;
  value: string;
  description: string;
  typeMov: string;
  date: string; 
}

const data: FinDto[] = [
  {
    key: '1',
    value: '100.00',
    description: 'Payment for services',
    typeMov: 'Income',
    date: '2023-11-28', 
  },
  {
    key: '2',
    value: '-50.00',
    description: 'Grocery shopping',
    typeMov: 'Expense',
    date: '2023-11-29', 
  },
  {
    key: '3',
    value: '200.00',
    description: 'Received payment',
    typeMov: 'Income',
    date: '2023-11-30', 
  },
];

const columns: ColumnsType<FinDto> = [
  {
    title: 'Valor',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Tipo de Movimentação',
    dataIndex: 'typeMov',
    key: 'typeMov',
  },
  {
    title: 'Dt. Movimentação',
    dataIndex: 'date',
    key: 'date',
  },
  {
    key: 'delete',
    render: () => (
      <Button
        type="text"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete()}
      ></Button>
    ),
  },
  {
    key: 'edit',
    render: () => (
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => handleEdit()}
      ></Button>
    ),
  },
];

const handleDelete = () => {
  alert("Deletado");
};

const handleEdit = () => {
  alert("Alterado");
};

const FinTable = () => 

<Table style={{
              width: '1500px',
              margin: '30px',
              textAlign: 'center',
            }}
            columns={columns} dataSource={data} />;

export default FinTable;
