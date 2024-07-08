import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Select, Form, Table } from "antd";
import { toast } from "react-toastify";
import { IncomeService } from "../services/income.service";
import router from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CategoryService } from "@/services/category.service";
import { getCategoryItems } from "@/utils/getCategory";

const { Option } = Select;

const IncomeTable = () => {
  const [incomeService, setIncomeService] = useState<any>();
  const [incomeList, setIncomeList] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [newDescription, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [newCategoryId, setCategoryId] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentIncomeId, setCurrentIncomeId] = useState("");
  const [income, setIncome] = useState<any>();

  const [form] = Form.useForm();

  useEffect(() => {
    const authentication = localStorage.getItem("Authentication");
    if (authentication) {
      const userToken = JSON.parse(authentication);
      const service = new IncomeService(userToken.token);
      const serviceCategories = new CategoryService(userToken.token);

      setIncomeService(service);
      getIncomeList(service, userToken.userId);
      fetchCategoryItems(serviceCategories, userToken.userId);
      setUserId(userToken.userId);
    } else {
      toast.warning("Erro ao buscar informações do login.");
      router.replace("/home");
    }
  }, []);

  const fetchCategoryItems = async (
    service: CategoryService,
    userId: string
  ) => {
    const categories: any = await getCategoryItems(service, userId);
    setCategoryList(categories);
  };

  const getIncomeList = async (service: IncomeService, userId: string) => {
    try {
      const income: any = await service.GetAll(userId);
      const filteredIncome = income.filter((income: any) => income.type === 2);
      setIncomeList(filteredIncome);
    } catch (error) {
      toast.error("Erro ao buscar a lista de despesas.");
    }
  };

  const handleAddIncome = async () => {
    const newIncome = {
      userId: userId,
      amount: amount,
      description: newDescription,
      categoryId: newCategoryId,
      entryDate: entryDate,
      type: 2,
    };
    try {
      await incomeService.Post(newIncome);
      toast.success("Entrada adicionada com sucesso!");
      handleCloseModal();
      getIncomeList(incomeService, userId);
    } catch (error) {
      toast.error("Erro ao adicionar entrada");
    }
  };

  const handleUpdateIncome = async () => {
    const updatedData = {
      ...income,
      amount: amount,
      description: newDescription,
      categoryId: newCategoryId,
      entryDate: entryDate,
      type: 2,
    };
    try {
      await incomeService.Put(updatedData, updatedData.id);
      toast.success("Gasto atualizado com sucesso!");
      handleCloseModal();
      getIncomeList(incomeService, userId);
    } catch (error) {
      toast.error("Erro ao atualizar gasto");
    }
  };

  const handleDeleteIncome = (incomeId: any) => {
    Modal.confirm({
      title: "Excluir entrada",
      content: "Tem certeza que deseja excluir esta entrada?",
      onOk: async () => {
        await incomeService.Delete(incomeId);
        getIncomeList(incomeService, userId);
      },
      onCancel: () => {},
      okButtonProps: { style: { backgroundColor: "red" } },
    });
  };

  const handleOpenModal = (income?: any) => {
    if (income) {
      setIncome(income);
      setAmount(income.amount);
      setDescription(income.description);
      setCategoryId(income.categoryId);
      setEntryDate(income.entryDate);
      setCurrentIncomeId(income.id);
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
    setEntryDate("");
    setCurrentIncomeId("");
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
      title: "Data de Entrada",
      dataIndex: "entryDate",
      key: "entryDate",
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
            onClick={() => handleDeleteIncome(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={incomeList}
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
              ADICIONAR ENTRADA
            </Button>
          </div>
        )}
      />
      <Modal
        title={editing ? "Editar entrada" : "Adicionar entrada"}
        open={isModalVisible}
        onOk={editing ? handleUpdateIncome : handleAddIncome}
        onCancel={handleCloseModal}
        okText="Salvar"
        okButtonProps={{ type: "default", color: "primary" }}
        cancelButtonProps={{ danger: true }}
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
                .filter((c: any) => c.type === 2)
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
            rules={[{ required: true, message: "Por favor, insira a valor!" }]}
          >
            <Input
              onChange={(event: any) => setAmount(event.target.value)}
              type="number"
            />
          </Form.Item>
          <Form.Item
            name="entryDate"
            label="Data de Entrada"
            initialValue={entryDate}
            rules={[
              {
                required: true,
                message: "Por favor, selecione uma data de expiração!",
              },
            ]}
          >
            <Input
              onChange={(event: any) => setEntryDate(event.target.value)}
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

export default IncomeTable;
