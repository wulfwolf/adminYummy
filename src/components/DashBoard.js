import { Breadcrumb, Layout, Menu, theme } from "antd";

import React, { createElement, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useStore } from "effector-react";
import globalState from "../effector/src/globalState";
import Ingredient from "./content/Ingredient";
import Recipe2 from "./content/Recipe";
import { AppleOutlined, FireOutlined } from "@ant-design/icons";
import Recipe from "./content/Recipe";
import Preparation from "./content/Preparation";
const { Header, Content, Footer, Sider } = Layout;

const DashBoard = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useStore(globalState.$store);

  useEffect(() => {}, [navigate]);

  const logout = () => {
    globalState.action.LogoutAction();
    navigate("/login");
  };
  const items2 = [
    {
      label: "Công thức",
      icon: FireOutlined,
      children: [
        { subLabel: "Công thức", screenName: "Recipe" },
        { subLabel: "Khâu chuẩn bị", screenName: "Preparation" },
      ],
    },
    {
      label: "Thực phẩm",
      icon: AppleOutlined,
      children: [{ subLabel: "Thực phẩm", screenName: "Ingredient" }],
    },
  ].map((item, index) => {
    return {
      key: Math.random(),
      icon: createElement(item.icon),
      label: item.label,
      children: item.children?.map((sub, j) => {
        return {
          key: Math.random(),
          label: sub.subLabel,
          onClick: () => {
            navigate(sub.screenName);
          },
        };
      }),
    };
  });
  return (
    <>
      <Layout style={{ height: "100%", minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 100,
            width: "100%",
          }}
        >
          <div className="logo">Yummy</div>
          <div className="logOut" onClick={logout}>
            Đăng xuất
          </div>
        </Header>

        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
            <Breadcrumb.Item>Recipe</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0", background: "white" }}>
            <Sider style={{ background: "white" }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<Navigate to="recipe" />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/ingredient" element={<Ingredient />} />
                <Route path="/preparation" element={<Preparation />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          YUMMY by ThinhNguyen
        </Footer>
      </Layout>
    </>
  );
};

export default DashBoard;
