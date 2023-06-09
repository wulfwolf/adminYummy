import { Button, Image, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getIngredientsApi } from "./api";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";
import ContentComponent from "./components/content";
import Edit from "./components/edit";
function Ingredient() {
  const { accessToken } = useStore(globalState.$store);
  const [ingredients, setIngredients] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [add, setAdd] = useState(false);
  const getIngredients = async () => {
    const res = await getIngredientsApi(accessToken);
    if (res.success === true) {
      setIngredients(res.ingredient);
    }
  };
  useEffect(() => {
    getIngredients();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
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
              setVisibleEdit(true);
              setSelected(record);
            }}
          >
            Sửa
          </Button>
          <Popconfirm title="Xóa thực phẩm này ?" placement="left">
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {visibleEdit ? (
        <Edit ingredient={selected} addIngredient={add} />
      ) : (
        <ContentComponent
          dataSource={ingredients}
          title={"Thực phẩm"}
          columns={columns}
          handleAdd={() => {
            setAdd(true);
            setVisibleEdit(true);
          }}
        />
      )}
    </div>
  );
}

export default Ingredient;
