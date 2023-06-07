import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  createIngredientsApi,
  createRecipesApi,
  getIngredientsApi,
  getRecipesApi,
} from "./api";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";
import Content from "./components/content";
import ContentComponent from "./components/content";
function Ingredient() {
  // const [image, setImage] = useState(null);
  const { accessToken } = useStore(globalState.$store);

  const [isLoading, setIsLoading] = useState(false);
  const [dataAddIngredientForm, setDataAddIngredientForm] = useState({
    foodName: "",
    img: "",
    ScanCode: "",
    unit: "",
  });
  const [dataUpdateIngredientForm, setDataUpdateIngredientForm] = useState({
    foodName: "",
    img: "",
    ScanCode: "",
    unit: "",
  });

  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const res = await getIngredientsApi(accessToken);
    if (res.success === true) {
      setIngredients(res.ingredient);
    }
  };

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const ingredientsData =
    ingredients &&
    ingredients.length > 0 &&
    ingredients.map((ingredients) => {
      return { ...ingredients, key: ingredients.id };
    });

  const columns = [
    {
      title: "Tên thực phẩm",
      dataIndex: "foodName",
      key: "foodName",
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 100,
      render: (_, { img }) => {
        return <Image width={100} src={img} />;
      },
    },
    { title: "ScanCode", dataIndex: "ScanCode", key: "ScanCode" },
    { title: "Đơn vị", dataIndex: "unit", key: "unit" },
    { title: "Tỉ lệ kcal/100g", dataIndex: "kcalRate", key: "kcalRate" },
    {
      title: "Tùy chọn",
      key: "action",
      width: 150,
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              // handleShowUpdateIngredientModal(record);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa thực phẩm này ?"
            placement="left"
            // onConfirm={() => handleDeleteIngredient(record)}
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ContentComponent
        dataSource={ingredients}
        title={"Thực phẩm"}
        columns={columns}
      />
    </>
  );
}

export default Ingredient;
