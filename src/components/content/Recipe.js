import React, { useEffect, useState } from "react";
import { createRecipesApi, getRecipesApi } from "./api";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";
import Content from "./components/content";

import {
  Button,
  Divider,
  Image,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import ContentComponent from "./components/content";
import Edit from "./components/edit";
function Recipe() {
  const navigate = useNavigate();
  const { accessToken } = useStore(globalState.$store);
  const [recipes, setRecipes] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const getRecipes = async () => {
    const res = await getRecipesApi();
    if (res.success === true) {
      setRecipes(res.recipes);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  const recipesData =
    recipes &&
    recipes.length > 0 &&
    recipes.map((recipes) => {
      return { ...recipes, key: recipes.id };
    });
  const columns = [
    {
      title: "Tên công thức",
      dataIndex: "recipeName",
      key: "recipeName",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (_, { img }) => {
        return <Image width={120} src={img} style={{ alignSelf: "center" }} />;
      },
    },
    {
      title: "Hướng dẫn",
      dataIndex: "instruction",
      key: "instruction",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Bữa ăn",
      dataIndex: "meal",
      key: "meal",
    },
    {
      title: "Cảnh báo",
      dataIndex: "warningTags",
      key: "warningTags",
      width: 130,
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            const checkTags = () => {
              switch (tag) {
                case "HEALTHY FOOD":
                  return "green";
                case "FASTFOOD":
                  return "orange";
                case "FATTY FOOD":
                  return "yellow";
                case "SPICY FOOD":
                  return "red";
                case "ALCOHOL":
                  return "purple";
                default:
                  break;
              }
            };
            return (
              <Tag color={checkTags()} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Tùy chọn",
      key: "action",
      width: 150,
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditRecipe(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa công thức này ?"
            placement="left"
            // onConfirm={() => handleDeleteRecipe(record)}
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleEditRecipe = (record) => {
    setVisibleEdit(true);
  };
  return (
    <div>
      {visibleEdit ? (
        <Edit />
      ) : (
        <ContentComponent
          dataSource={recipesData}
          title={"Công thức"}
          columns={columns}
        />
      )}
    </div>
  );
}

export default Recipe;
