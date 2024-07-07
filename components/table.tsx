import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Table,
  Tabs,
  Modal,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Form,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const { TabPane } = Tabs;
const { Option } = Select;

interface FinDto {
  key: string;
  value: string;
  description: string;
  typeMov: string;
  date: string;
}

const initialData: FinDto[] = [];

const columns: ColumnsType<FinDto> = [
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Dt. Movimentação",
    dataIndex: "date",
    key: "date",
  },
];

const FinTable = (expense: any) => {
  const [data, setData] = useState<FinDto[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | undefined>();
  const [newValue, setNewValue] = useState<number>(0);
  const [newDescription, setNewDescription] = useState("");
  const [newTypeMov, setNewTypeMov] = useState("Income");
  const [newDate, setNewDate] = useState(dayjs());
  const handleAdd = () => {
    const newKey = (data.length + 1).toString();
    const formattedValue = newTypeMov === "Expense" ? `-${newValue}` : newValue;
    const newEntry: FinDto = {
      key: newKey,
      value: formattedValue.toString(),
      description: newDescription,
      typeMov: newTypeMov,
      date: newDate.format("YYYY-MM-DD"),
    };

    setData([...data, newEntry]);
    toast.success("Movimentação adicionada");
    setIsModalVisible(false);
  };

  useEffect(() => {
  })

  const handleEdit = (key: string) => {
    setEditingKey(key);
    const entryToEdit = data.find((item) => item.key === key);
    if (entryToEdit) {
      setIsModalVisible(true);
      setNewValue(parseFloat(entryToEdit.value));
      setNewDescription(entryToEdit.description);
      setNewTypeMov(entryToEdit.typeMov);
      setNewDate(dayjs(entryToEdit.date));
      toast.success("Movimentação editada");
    }
  };

  const handleDelete = (key: string) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    toast.success("Movimentação removida");
  };

  const incomeData = data.filter((item) => item.typeMov === "Income");
  const expenseData = data.filter((item) => item.typeMov === "Expense");

  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button
          onClick={() => {
            setIsModalVisible(true);
            setNewValue(0);
            setNewDescription("");
            setNewTypeMov("Income");
            setNewDate(dayjs());
          }}
          style={{
            marginBottom: 15,
            marginTop: 15,
            backgroundColor: "black",
            color: "white",
          }}
        >
          ADICIONAR
        </Button>
      </Space>

      <Modal
        title="Adicionar Movimentação"
        open={isModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsModalVisible(false)}
        okText="Salvar"
        cancelText="Cancelar"
        okButtonProps={{ type: "default", color: "primary" }}
        cancelButtonProps={{ danger: true }}
      >
        <Form layout="vertical">
          <Form.Item required label="Valor">
            <InputNumber
              addonBefore="R$"
              placeholder="Valor"
              value={newValue}
              onChange={(value: any) => setNewValue(value)}
              type="number"
            />
          </Form.Item>
          <Form.Item required label="Dt da Movimentação">
            <DatePicker
              placeholder="Data da Movimentação"
              value={newDate}
              onChange={(date: any) => setNewDate(date)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item required label="Tipo de movimentação">
            <Select
              value={newTypeMov}
              onChange={(value) => setNewTypeMov(value)}
            >
              <Option value="Income">Entrada</Option>
              <Option value="Expense">Saída</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Descrição" required>
            <Input.TextArea
              placeholder="Descrição"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Tabs className="custom-tab" defaultActiveKey="1" type="card">
        <TabPane
          style={{ marginTop: -20, color: "black" }}
          tab="Entrada"
          key="1"
        >
          <Table
            columns={[
              ...columns,
              {
                title: "Ações",
                dataIndex: "",
                key: "actions",
                render: (_, record) => (
                  <>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record.key)}
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record.key)}
                    />
                  </>
                ),
              },
            ]}
            dataSource={incomeData}
            pagination={{ pageSize: 2 }}
            style={{ width: "100%", overflowX: "auto" }}
          />
        </TabPane>
        <TabPane style={{ marginTop: -20 }} tab="Saída" key="2">
          <Table
            columns={[
              ...columns,
              {
                title: "Ações",
                dataIndex: "",
                key: "actions",
                render: (_, record) => (
                  <>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record.key)}
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(record.key)}
                    />
                  </>
                ),
              },
            ]}
            dataSource={expenseData}
            pagination={{ pageSize: 5 }}
            style={{ width: "100%", overflowX: "auto" }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default FinTable;
