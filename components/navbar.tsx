import React, { useEffect, useState } from "react";
import { Menu, Layout, Modal } from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import router from "next/router";
import { UserService } from "@/services/user.service";

const { Header } = Layout;
const { SubMenu } = Menu;

const NavBar = () => {
  const [current, setCurrent] = useState("");

  var userService: UserService;
  var userToken: UserToken;

  useEffect(() => {
    var authentication = localStorage.getItem("Authentication");

    if (authentication) {
      userToken = JSON.parse(authentication) as UserToken;
      userService = new UserService(userToken.token);
    } else {
      router.replace("/");
    }

    handleMenuActions();
  }, [current]);

  const handleMenuActions = async () => {
    switch (current) {
      case "logout":
        localStorage.removeItem("Authentication");
        router.replace("/");
        break;
      case "graphics":
        router.replace("/graphics");
        break;
      case "home":
        router.replace("/home");
        break;
      case "delete":
        await confirmDelete();
        break;
      default:
        break;
    }
  };

  const confirmDelete = async () => {
    Modal.confirm({
      title: "Excluir usuário",
      content:
        "Tem certeza que deseja excluir este usuário? Você será deslogado automaticamente",
      onOk: async () => {
        await userService.Delete(userToken.userId);
        localStorage.removeItem("Authentication");
        router.replace("/");
      },
      onCancel: () => setCurrent("home"),
      okButtonProps: { style: { backgroundColor: "red" } },
    });
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  const items = [
    { icon: <HomeOutlined />, label: "Home", key: "home" },
    { icon: <LineChartOutlined />, label: "Gráficos", key: "graphics" },
    {
      label: "Usuário",
      key: "account",
      icon: <DownOutlined />,
      children: [
        { icon: <DeleteOutlined />, label: "Deletar conta", key: "delete" },
        { icon: <LogoutOutlined />, label: "Sair", key: "logout" },
      ],
    },
  ];

  return (
    <>
      <Header style={{ backgroundColor: "black" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={onClick}
          style={{ float: "right", backgroundColor: "black" }}
        >
          {items.map((item) =>
            item.children ? (
              <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
                style={{ backgroundColor: "black" }}
              >
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    icon={subItem.icon}
                    style={{ backgroundColor: "black" }}
                  >
                    {subItem.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{ backgroundColor: "black" }}
              >
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Header>
    </>
  );
};

export default NavBar;