import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";
import Content from "./components/content";
import ContentComponent from "./components/content";
import { getRecipesApi } from "./api";
function Preparation() {
  const { accessToken } = useStore(globalState.$store);
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState([]);
  const [dataSource, setDataSource] = useState();
  const getRecipes = async () => {
    const res = await getRecipesApi();
    if (res.success === true) {
      setRes(res.recipes);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  useEffect(() => {
    const convertData = res?.map((dataResItem) =>
      dataResItem?.preparations?.map((preparationItem, index) => ({
        _id: dataResItem?._id,
        recipeName: dataResItem?.recipeName,
        img: dataResItem?.img,
        foodName: preparationItem?.ingredient?.foodName,
        kcalRate: preparationItem?.ingredient?.kcalRate,
        preparationItem: dataResItem?.preparations?.length,
        indexData: index,
      }))
    );

    setDataSource(convertData?.flat());
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      width: 100,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.preparationItem ? 0 : row?.preparationItem;
        return obj;
      },
    },
    {
      title: "Tên công thức",
      dataIndex: "recipeName",
      key: "recipeName",
      width: 300,
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.preparationItem ? 0 : row?.preparationItem;

        return obj;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      align: "center",
      width: 200,
      render: (value, row, index) => {
        const obj = {
          children: <Image src={value} />,
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.preparationItem ? 0 : row?.preparationItem;

        return obj;
      },
    },
    {
      title: "Khâu chuẩn bị",
      dataIndex: "prepare",
      key: "prepare",
      children: [
        {
          title: "Thực phẩm",
          dataIndex: "foodName",
          key: "foodName",
        },
        {
          title: "Khối lượng",
          dataIndex: "kcalRate",
          key: "kcalRate",
        },
      ],
    },
    {
      title: "Tùy chọn",
      key: "action",
      width: 150,
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {}}>
            Sửa
          </Button>
          <Popconfirm title="Xóa khâu chuẩn bị này này ?" placement="left">
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
      <ContentComponent
        dataSource={dataSource}
        title={"Khâu chuẩn bị"}
        columns={columns}
      />
    </div>
  );
}

export default Preparation;
