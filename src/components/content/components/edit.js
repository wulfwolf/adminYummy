import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import BreadcrumbComponent from "./breadcrumb";
import {
  createIngredientsApi,
  editIngredientApi,
  editRecipeApi,
  getIngredientsApi,
  updatePreparationApi,
} from "../api";
import { useStore } from "effector-react";
import globalState from "../../../effector/src/globalState";
import { createRecipesApi } from "../api";
import { renderItem } from "../../../utils/function";
const { TextArea } = Input;
function Edit({
  recipe,
  preparation,
  ingredient,
  addRecipe,
  addIngredient,
  addPreparation,
}) {
  const { accessToken } = useStore(globalState.$store);
  const [ingredients, setIngredients] = useState([]);
  const formItemLayout = {
    wrapperCol: {
      sm: { span: 24 },
    },
  };
  const getIngredients = async () => {
    const res = await getIngredientsApi(accessToken);
    if (res.success === true) {
      setIngredients(res.ingredient);
    }
  };
  useEffect(() => {
    getIngredients();
  }, []);

  const onFinish = async (value) => {
    if (recipe && !addRecipe) {
      await editRecipeApi({
        recipe: { ...value, _id: recipe?._id },
        accessToken,
      });
    } else if (recipe && addRecipe) {
      await createRecipesApi({ recipe: value, accessToken });
    }
    if (ingredient && !addIngredient) {
      await editIngredientApi({
        ingredient: { ...value, _id: ingredient?._id },
        accessToken,
      });
    } else if (ingredient && addIngredient) {
      await createIngredientsApi({ ingredient: value, accessToken });
    }
    if (preparation) {
      updatePreparationApi({
        accessToken,
        preparation: value,
        prepareID: preparation?._id,
      });
    }
    console.log(value);
  };
  console.log(ingredients);

  if (recipe) {
    return (
      <>
        <BreadcrumbComponent recipe={recipe} />
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          initialValues={{
            warningTags: recipe?.warningTags,
            instruction: recipe?.instruction,
            recipeName: recipe?.recipeName,
            desc: recipe?.desc,
            img: recipe?.img,
            meal: recipe?.meal,
          }}
        >
          <Form.Item label="Tên công thức" name={"recipeName"}>
            <Input value={recipe?.recipeName} />
          </Form.Item>
          <Form.Item label="Mô tả" name={"desc"}>
            <TextArea rows={4} value={recipe?.desc} />
          </Form.Item>
          <Form.Item label="URL ảnh" name={"img"}>
            <Input value={recipe?.img} />
          </Form.Item>
          <Form.Item label="Chỉ dẫn">
            <Form.List name="instruction">
              {(fields, { add, remove }, { errors }) => {
                return (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...formItemLayout}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Hãy nhập đầy đủ các lời chỉ dẫn.",
                            },
                          ]}
                          noStyle
                        >
                          <TextArea style={{ width: "60%" }} />
                        </Form.Item>

                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                            style={{ marginLeft: 30 }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Thêm chỉ dẫn
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </Form.Item>
          <Form.Item label="Bữa ăn" name={"meal"}>
            <Select value={recipe?.meal}>
              <Select.Option value="Bữa sáng">Bữa sáng</Select.Option>
              <Select.Option value="Bữa trưa">Bữa trưa</Select.Option>
              <Select.Option value="Bữa tối">Bữa tối</Select.Option>
              <Select.Option value="Bữa xế">Bữa xế</Select.Option>
              <Select.Option value="Tráng miệng">Tráng miệng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="warningTags" label="Thẻ cảnh báo">
            <Checkbox.Group>
              <Row>
                <Col span={10}>
                  <Checkbox value="ALCOHOL" style={{ lineHeight: "32px" }}>
                    ALCOHOL
                  </Checkbox>
                </Col>
                <Col span={10}>
                  <Checkbox value="FASTFOOD" style={{ lineHeight: "32px" }}>
                    FASTFOOD
                  </Checkbox>
                </Col>
                <Col span={10}>
                  <Checkbox value="HEALTHY FOOD" style={{ lineHeight: "32px" }}>
                    HEALTHY FOOD
                  </Checkbox>
                </Col>
                <Col span={10}>
                  <Checkbox value="FATTY FOOD" style={{ lineHeight: "32px" }}>
                    FATTY FOOD
                  </Checkbox>
                </Col>
                <Col span={10}>
                  <Checkbox value="SPICY FOOD" style={{ lineHeight: "32px" }}>
                    SPICY FOOD
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label={addRecipe ? "Thêm" : "Cập nhật"}>
            <Button type="primary" htmlType="submit">
              {`${addRecipe ? "Thêm" : "Cập nhật"}`}
            </Button>
          </Form.Item>
          <Form.Item label="Hủy">
            <Button>Hủy</Button>
          </Form.Item>
        </Form>
      </>
    );
  } else if (preparation) {
    return (
      <>
        <BreadcrumbComponent preparation={preparation} />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          initialValues={{
            recipeName: preparation?.recipeName,
            img: preparation?.img,
            preparations: renderItem(preparation),
          }}
          onFinish={onFinish}
        >
          <Form.Item label="Tên công thức" name={"recipeName"}>
            <Input value={preparation?.recipeName} disabled />
          </Form.Item>
          <Form.Item label="Ảnh" name={"img"}>
            <Image width={200} src={preparation?.img} />
          </Form.Item>
          <Form.Item label="Khâu chuẩn bị">
            <Form.List name="preparations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    return (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item name={[name, "_id"]}>
                          <Select style={{ width: 150 }}>
                            {ingredients.map((i, index) => (
                              <Select.Option value={i._id} key={index}>
                                {i.foodName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item {...restField} name={[name, "quantity"]}>
                          <Input placeholder="Khối lượng" />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm khâu chuẩn bị
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label={addPreparation ? "Thêm" : "Cập nhật"}>
            <Button type="primary" htmlType="submit">
              {`${addPreparation ? "Thêm" : "Cập nhật"}`}
            </Button>
          </Form.Item>
          <Form.Item label="Hủy">
            <Button>Hủy</Button>
          </Form.Item>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <BreadcrumbComponent ingredient={ingredient} />
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          initialValues={{
            foodName: ingredient?.foodName,
            img: ingredient?.img,
            ScanCode: ingredient?.ScanCode,
            unit: ingredient?.unit,
            kcalRate: ingredient?.kcalRate,
          }}
        >
          <Form.Item label="Tên thực phẩm" name={"foodName"}>
            <Input value={ingredient?.foodName} />
          </Form.Item>
          <Form.Item label="URL ảnh" name={"img"}>
            <Input value={ingredient?.img} />
          </Form.Item>
          <Form.Item label="ScanCode" name={"ScanCode"}>
            <Input value={ingredient?.ScanCode} />
          </Form.Item>
          <Form.Item label="Đơn vị" name={"unit"}>
            <Radio.Group>
              <Radio value="gr"> gr </Radio>
              <Radio value="ml"> ml </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tỉ lệ calo" name={"kcalRate"}>
            <Input value={ingredient?.kcalRate} />
          </Form.Item>
          <Form.Item label={addIngredient ? "Thêm" : "Cập nhật"}>
            <Button type="primary" htmlType="submit">
              {`${addIngredient ? "Thêm" : "Cập nhật"}`}
            </Button>
          </Form.Item>
          <Form.Item label="Hủy">
            <Button>Hủy</Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Edit;
