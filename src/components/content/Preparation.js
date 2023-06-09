import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";
import Content from "./components/content";
import ContentComponent from "./components/content";
import { getRecipesApi } from "./api";
import Edit from "./components/edit";
function Preparation() {
  const [res, setRes] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tmp, setTmp] = useState([]);
  const [add, setAdd] = useState(false);
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
    const convertData = res?.map((dataResItem) => {
      if (dataResItem?.preparations.length === 0) {
        return {
          _id: dataResItem?._id,
          recipeName: dataResItem?.recipeName,
          img: dataResItem?.img,
          preparationItem: 1,
          foodName: "",
          quantity: 0,
          indexData: 0,
        };
      } else {
        return dataResItem?.preparations?.map((preparationItem, index) => ({
          _id: dataResItem?._id,
          recipeName: dataResItem?.recipeName,
          img: dataResItem?.img,
          preparationItem: dataResItem?.preparations?.length,
          foodName: preparationItem?.ingredient?.foodName,
          quantity: preparationItem?.quantity,
          indexData: index,
        }));
      }
    });

    setDataSource(convertData?.flat());
  }, [res]);

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
          dataIndex: "quantity",
          key: "quantity",
        },
      ],
    },
    {
      title: "Tùy chọn",
      key: "action",
      width: 150,
      render: (value, row, index) => {
        const obj = {
          children: (
            <Space size="middle">
              <Button
                type="primary"
                onClick={() => {
                  setVisibleEdit(true);
                  setTmp(res?.find((tmp) => tmp._id === value._id));
                }}
              >
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
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.preparationItem ? 0 : row?.preparationItem;
        return obj;
      },
    },
  ];

  return (
    <div>
      {visibleEdit ? (
        <Edit preparation={tmp} addPreparation={add} />
      ) : (
        <ContentComponent
          dataSource={dataSource}
          title={"Khâu chuẩn bị"}
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

export default Preparation;
