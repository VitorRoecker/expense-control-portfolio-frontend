import React, { useEffect, useState } from "react";
import { Button, Space, Modal, Input, Select, Form, Table } from "antd";
import { toast } from "react-toastify";
import { CategoryService } from "../services/category.service";
import router from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getCategoryItems } from "../utils/getCategory";

const { Option } = Select;

const FinTable = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [userIdCategory, setUserId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryType, setNewCategoryType] = useState(1);
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryData, setCategoryData] = useState<any>();

  const [catService, setCatService] = useState<any>();

  useEffect(() => {
    const authentication = localStorage.getItem("Authentication");
    if (authentication) {
      const userToken = JSON.parse(authentication);
      const service = new CategoryService(userToken.token);
      setCatService(service);
      setUserId(userToken.userId);
      fetchCategoryItems(service, userToken.userId);
    } else {
      toast.warning("Erro ao buscar informações do login.");
      router.replace("/home");
    }
  }, []);

  console.log(catService);

  const fetchCategoryItems = async (
    service: CategoryService,
    userId: string
  ) => {
    const catItems: any = await getCategoryItems(service, userId);
    setCategoryList(catItems);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(true);
    setCategoryData(category);
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.description);
    setNewCategoryType(category.type);
    setIsCategoryModalVisible(true);
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = {
      ...categoryData,
      name: newCategoryName,
      description: newCategoryDescription,
      type: newCategoryType,
    };
    try {
      await catService.Put(updatedCategory, categoryData.id);
      toast.success("Categoria atualizada com sucesso!");
      setIsCategoryModalVisible(false);
      getCategoryItems(catService, userIdCategory);
    } catch (error) {
      toast.error("Erro ao atualizar categoria");
    }
  };

  const handleDeleteCategory = async (categoryId: any) => {
    Modal.confirm({
      title: "Excluir categoria",
      content: "Tem certeza que deseja excluir esta categoria?",
      onOk: async () => {
        await catService.Delete(categoryId);
        getCategoryItems(catService, userIdCategory);
      },
      onCancel: () => {},
      okButtonProps: { style: { backgroundColor: "red" } },
    });
  };

  const handleAddCategory = async () => {
    const newCategory = {
      userId: userIdCategory,
      name: newCategoryName,
      description: newCategoryDescription,
      type: newCategoryType,
    };
    try {
      await catService.Post(newCategory);
      toast.success("Categoria adicionada com sucesso!");
      setIsCategoryModalVisible(false);
      getCategoryItems(catService, userIdCategory);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryType(1);
    } catch (error) {
      toast.error("Erro ao adicionar categoria");
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string | any[] }, b: { name: string | any[] }) =>
        a.name.length - b.name.length,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type: number) => (type === 2 ? "Entrada" : "Saída"),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Data de Inclusão",
      dataIndex: "inclusionDate",
      key: "inclusionDate",
      render: (date: string | number | Date) => new Date(date).toLocaleString(),
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
            onClick={() => handleEditCategory(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={categoryList}
        columns={columns}
        rowKey="id"
        title={() => (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => setIsCategoryModalVisible(true)}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "black",
                color: "white",
              }}
            >
              ADICIONAR CATEGORIA
            </Button>
          </div>
        )}
      />

      <Modal
        title={editingCategory ? "Editar categoria" : "Adicionar categoria"}
        open={isCategoryModalVisible}
        onOk={editingCategory ? handleUpdateCategory : handleAddCategory}
        maskClosable={false}
        keyboard={false}
        onCancel={() => {
          setIsCategoryModalVisible(false);
          setNewCategoryName("");
          setNewCategoryDescription("");
          setNewCategoryType(1);
          setEditingCategory(false);
          setCategoryData(null);
        }}
        okText="Salvar"
        cancelText="Cancelar"
        okButtonProps={{ type: "default", color: "primary" }}
        cancelButtonProps={{ danger: true }}
      >
        <Form layout="vertical">
          <Form.Item required label="Nome da Categoria">
            <Input
              placeholder="Nome da Categoria"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </Form.Item>
          <Form.Item required label="Descrição">
            <Input.TextArea
              placeholder="Descrição"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item required label="Tipo">
            <Select
              value={newCategoryType}
              onChange={(value) => setNewCategoryType(value)}
            >
              <Option value={1}>Saída</Option>
              <Option value={2}>Entrada</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FinTable;
