import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import {
  BellOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import router from "next/router";

const { Header } = Layout;

const NavBar = () => {
  const [current, setCurrent] = useState("mail");

  useEffect(() => {
    if (current === "logout") {
      router.replace("/");
    }
    if (current === "graphics") {
      router.replace("/graphics");
    }
    if (current === "home") {
      router.replace("/home");
    }
  }, [current]);

  const onClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    { icon: <HomeOutlined />, label: "Home", key: "mail" },
    { icon: <LineChartOutlined />, label: "Gráficos", key: "graphics" },
    {
      icon: <LogoutOutlined />,
      label: "Sair",
      key: "logout",
      style: { display: "flex", justifyContent: "end" },
    },
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
