import React, { useEffect, useState } from "react";
import { getRecipesApi } from "./api";
import { Button, Image, Popconfirm, Space, Tag, Tooltip } from "antd";
import ContentComponent from "./components/content";
import Edit from "./components/edit";
import { checkTags } from "../../utils/function";
function Recipe() {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selected, setSelected] = useState();
  const [res, setRes] = useState([]);
  const [dataSource, setDataSource] = useState();
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
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
    {
      title: "Tên công thức",
      dataIndex: "recipeName",
      key: "recipeName",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      ellipsis: {
        showTitle: false,
      },
      render: (value, row, index) => {
        const obj = {
          children: (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          ),
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (value, row, index) => {
        const obj = {
          children: (
            <Image width={120} src={value} style={{ alignSelf: "center" }} />
          ),
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
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
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
    {
      title: "Cảnh báo",
      dataIndex: "warningTags",
      key: "warningTags",
      width: 130,
      render: (value, row, index) => {
        const obj = {
          children: value.map((item) => (
            <Tag color={checkTags(item)} key={item}>
              {item}
            </Tag>
          )),
          props: {},
        };
        obj.props.rowSpan =
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
    {
      title: "Tùy chọn",
      key: "action",
      width: 150,
      render: (value, row, index) => {
        const obj = {
          children: (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEditRecipe(value)}>
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
          row?.indexData % row?.instructions ? 0 : row?.instructions;
        return obj;
      },
    },
  ];
  useEffect(() => {
    const convertData = res?.map((dataResItem) =>
      dataResItem?.instruction?.map((instructionItem, index) => ({
        _id: dataResItem?._id,
        recipeName: dataResItem?.recipeName,
        desc: dataResItem?.desc,
        img: dataResItem?.img,
        instruction: instructionItem,
        instructions: dataResItem?.instruction?.length,
        meal: dataResItem.meal,
        warningTags: dataResItem.warningTags,
        indexData: index,
      }))
    );

    setDataSource(convertData?.flat());
  }, [res]);

  const handleEditRecipe = (record) => {
    setVisibleEdit(true);
    // setSelected(record);
    setTmp(res?.find((tmp) => tmp._id === record._id));
  };
  return (
    <div>
      {visibleEdit ? (
        <Edit recipe={tmp} addRecipe={add} />
      ) : (
        <ContentComponent
          dataSource={dataSource}
          title={"Công thức"}
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

export default Recipe;
