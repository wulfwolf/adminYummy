import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

function ModalComponent({
  isLoading,
  showUpdateRecipeModal,
  disableModal,
  fields,
  selectedRecipe,
}) {
  const [dataUpdateRecipeForm, setDataUpdateRecipeForm] = useState({
    recipeName: selectedRecipe?.recipeName,
    desc: selectedRecipe?.desc,
    img: selectedRecipe?.img,
    preparations: selectedRecipe?.preparations,
    instruction: selectedRecipe?.instruction,
    meal: selectedRecipe?.meal,
    warningTags: selectedRecipe?.warningTags,
  });
  const handleSubmit = (data) => {
    console.log(data);
  };
  const finishHandle = (data) => {
    console.log(data);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 14, offset: 10 },
      sm: { span: 20, offset: 4 },
    },
  };
  return (
    <div>
      <Modal
        destroyOnClose={true}
        open={showUpdateRecipeModal}
        title="Cập nhật công thức"
        transitionName=""
        maskTransitionName=""
        onCancel={disableModal}
        footer={[<></>]}
        width={1000}
      >
        <Form
          name="dynamic_form_item"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
          fields={[
            { name: "recipeName", value: dataUpdateRecipeForm.recipeName },
            { name: "desc", value: dataUpdateRecipeForm.desc },
            { name: "img", value: dataUpdateRecipeForm.img },
            { name: "preparations", value: dataUpdateRecipeForm.preparations },
            { name: "instruction", value: dataUpdateRecipeForm.instruction },
            { name: "meal", value: dataUpdateRecipeForm.meal },
            { name: "warningTags", value: dataUpdateRecipeForm.warningTags },
          ]}
          initialValues={{
            recipeName: dataUpdateRecipeForm.recipeName,
            desc: dataUpdateRecipeForm.desc,
            img: dataUpdateRecipeForm.img,
            preparations: dataUpdateRecipeForm.preparations,
            instruction: dataUpdateRecipeForm.instruction,
            meal: dataUpdateRecipeForm.meal,
            warningTags: dataUpdateRecipeForm.warningTags,
          }}
          onFinish={finishHandle}
        >
          <Form.Item
            label="Tên công thức"
            name="recipeName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên công thức",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="img"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập url",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.List name="preparationss">
            {(fields, { add, remove }, { errors }) => {
              fields.length === 0 &&
                fields.push({ key: "", name: "", fieldKey: "" });
              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "preparation" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        wrapperCol={{
                          xs: { span: 24, offset: 0 },
                          sm: { span: 20, offset: 4 },
                        }}
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input preparation's step or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input style={{ width: "95%" }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ marginLeft: 15 }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Thêm
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              );
            }}
          </Form.List> */}
          <Form.List name="instructionss">
            {(fields, { add, remove }, { errors }) => {
              fields.length === 0 &&
                fields.push({ key: "", name: "", fieldKey: "" });
              console.log(fields);

              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Hướng dẫn" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        wrapperCol={{
                          xs: { span: 24, offset: 0 },
                          sm: { span: 20, offset: 4 },
                        }}
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input instruction's step or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input style={{ width: "95%" }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ marginLeft: 15 }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Thêm
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
          <Form.Item
            label="Bữa ăn"
            name="meal"
            rules={[
              {
                required: true,
                message: "Vui lòng kiểu bữa ăn",
              },
            ]}
          >
            <Select>
              <Select.Option value={"Bữa sáng"}>Bữa sáng</Select.Option>
              <Select.Option value={"Bữa trưa"}>Bữa trưa</Select.Option>
              <Select.Option value={"Bữa tối"}>Bữa tối</Select.Option>
              <Select.Option value={"Tráng miệng"}>Tráng miệng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Cảnh báo" name="warningTags">
            <Select>
              <Select.Option value={"HEALTHY FOOD"}>HEALTHY FOOD</Select.Option>
              <Select.Option value={"FATTY FOOD"}>FATTY FOOD</Select.Option>
              <Select.Option value={"SPICY FOOD"}>SPICY FOOD</Select.Option>
              <Select.Option value={"ALCOHOL"}>ALCOHOL</Select.Option>
              <Select.Option value={"FASTFOOD"}>FASTFOOD</Select.Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Xác nhận
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalComponent;
