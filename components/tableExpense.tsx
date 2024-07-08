import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select, Form, Table } from "antd";
import { toast } from "react-toastify";
import { ExpenseService } from "../services/expense.service";
import router from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CategoryService } from "@/services/category.service";
import { getCategoryItems } from "@/utils/getCategory";

const { Option } = Select;

const ExpenseTable = () => {
  const [expenseService, setExpenseService] = useState<any>();
  const [expenseList, setExpenseList] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [newDescription, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [newCategoryId, setCategoryId] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState("");
  const [expenses, setExpenses] = useState<any>();

  const [form] = Form.useForm();

  useEffect(() => {
    const authentication = localStorage.getItem("Authentication");
    if (authentication) {
      const userToken = JSON.parse(authentication);
      const service = new ExpenseService(userToken.token);
      const serviceCategories = new CategoryService(userToken.token);

      setExpenseService(service);
      getExpenseList(service, userToken.userId);
      fetchCategoryItems(serviceCategories, userToken.userId);
      setUserId(userToken.userId);
    } else {
      router.replace("/");
    }
  }, []);

  const fetchCategoryItems = async (
    service: CategoryService,
    userId: string
  ) => {
    const categories: any = await getCategoryItems(service, userId);
    setCategoryList(categories);
  };

  const getExpenseList = async (service: ExpenseService, userId: string) => {
    try {
      const expenses: any = await service.GetAll(userId);
      const filteredExpenses = expenses.filter(
        (expense: any) => expense.type === 1
      );
      setExpenseList(filteredExpenses);
    } catch (error) {
      toast.error("Erro ao buscar a lista de despesas.");
    }
  };

  const handleAddExpense = async () => {
    const newExpense = {
      userId: userId,
      amount: amount,
      description: newDescription,
      categoryId: newCategoryId,
      expirationDate: expirationDate,
      type: 1,
    };
    try {
      await expenseService.Post(newExpense);
      toast.success("Gasto salvo com sucesso!");
      handleCloseModal();
      getExpenseList(expenseService, userId);
    } catch (error) {
      toast.error("Erro ao adicionar gasto");
    }
  };

  const handleUpdateExpense = async () => {
    const updatedExpense = {
      ...expenses,
      amount: amount,
      description: newDescription,
      categoryId: newCategoryId,
      expirationDate: expirationDate,
      type: 1,
    };
    try {
      await expenseService.Put(updatedExpense, updatedExpense.id);
      toast.success("Gasto atualizado com sucesso!");
      handleCloseModal();
      getExpenseList(expenseService, userId);
    } catch (error) {
      toast.error("Erro ao atualizar gasto");
    }
  };

  const handleDeleteExpense = (expenseId: any) => {
    Modal.confirm({
      title: "Excluir saída",
      content: "Tem certeza que deseja excluir esta saída?",
      onOk: async () => {
        await expenseService.Delete(expenseId);
        getExpenseList(expenseService, userId);
      },
      onCancel: () => {},
      okButtonProps: { style: { backgroundColor: "red" } },
    });
  };

  const handleOpenModal = (expense?: any) => {
    if (expense) {
      setExpenses(expense);
      setAmount(expense.amount);
      setDescription(expense.description);
      setCategoryId(expense.categoryId);
      setExpirationDate(expense.expirationDate);
      setCurrentExpenseId(expense.id);
      setEditing(true);
    } else {
      setEditing(false);
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setAmount(0);
    setDescription("");
    setCategoryId("");
    setExpirationDate("");
    setCurrentExpenseId("");
    setEditing(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Valor",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `R$ ${amount.toFixed(2)}`,
    },
    {
      title: "Data de Inclusão",
      dataIndex: "inclusionDate",
      key: "inclusionDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Data de Expiração",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Categoria",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId: string) => {
        const category: any = categoryList.find(
          (cat: any) => cat.id === categoryId
        );
        return category ? category.name : "Desconhecido";
      },
    },
    {
      title: "Ações",
      dataIndex: "",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteExpense(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={expenseList}
        columns={columns}
        rowKey="id"
        title={() => (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => handleOpenModal()}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "black",
                color: "white",
              }}
            >
              ADICIONAR SAÍDA
            </Button>
          </div>
        )}
      />
      <Modal
        title={editing ? "Editar Saída" : "Adicionar saída"}
        open={isModalVisible}
        onCancel={handleCloseModal}
        onOk={editing ? handleUpdateExpense : handleAddExpense}
        okButtonProps={{ type: "default", color: "primary" }}
        cancelButtonProps={{ danger: true }}
        okText="Salvar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryId"
            label="Categoria"
            initialValue={newCategoryId}
            rules={[
              {
                required: true,
                message: "Por favor, selecione uma categoria!",
              },
            ]}
          >
            <Select onChange={(event: any) => setCategoryId(event)}>
              {categoryList
                .filter((c: any) => c.type === 1)
                .map((e: any) => (
                  <Option key={e.id} value={e.id}>
                    {e.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="Valor"
            initialValue={amount}
            rules={[{ required: true, message: "Por favor, insira o valor!" }]}
          >
            <Input
              onChange={(event: any) => setAmount(event.target.value)}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="expirationDate"
            label="Data de Expiração"
            initialValue={expirationDate}
            rules={[
              {
                required: true,
                message: "Por favor, selecione uma data de expiração!",
              },
            ]}
          >
            <Input
              onChange={(event: any) => setExpirationDate(event.target.value)}
              type="date"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            initialValue={newDescription}
            rules={[
              { required: true, message: "Por favor, insira uma descrição!" },
            ]}
          >
            <Input.TextArea
              onChange={(event: any) => setDescription(event.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseTable;