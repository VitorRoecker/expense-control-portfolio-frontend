import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  DeleteOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import router from "next/router";
import { UserService } from "@/services/user.service";
import { toast } from "react-toastify";

const { Header } = Layout;

const NavBar = () => {
  const [current, setCurrent] = useState("mail");

  var userService: UserService;
  var userToken: UserToken;

  useEffect(() => {
    var authentication = localStorage.getItem("Authentication");

    if (authentication) {
      userToken = JSON.parse(authentication) as UserToken;
      userService = new UserService(userToken.token);
    } else {
      toast.warning("Erro ao buscar informações do login.");
      router.replace("/home");
    }

    if (current === "logout") {
      localStorage.removeItem("Authentication");
      router.replace("/");
    }
    if (current === "graphics") {
      router.replace("/graphics");
    }
    if (current === "home") {
      router.replace("/home");
    }
    if (current == "delete") {
      userService.Delete(userToken.userId);
    }

    setCurrent("mail");
  }, [current]);

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  const items = [
    { icon: <HomeOutlined />, label: "Home", key: "mail" },
    { icon: <LineChartOutlined />, label: "Gráficos", key: "graphics" },
    { icon: <DeleteOutlined />, label: "Deletar conta", key: "delete" },
    { icon: <LogoutOutlined />, label: "Sair", key: "logout", style: { display: "flex", justifyContent: "end" }, },
  ];

  return (
    <>
      <Menu
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default NavBar;
