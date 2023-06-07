import { Button, Col, Form, Input, message, Row } from "antd";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "./api";

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const { email, password } = loginForm;

  const logIn = async () => {
    setIsLoading(true);
    await LoginApi(loginForm);
    if ((await LoginApi(loginForm)) === 1) {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Col span={8}>
        <p
          style={{
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Đăng nhập
        </p>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập Email!",
              },
            ]}
            value={email}
            onChange={onChangeLoginForm}
          >
            <Input name="email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
            value={password}
            onChange={onChangeLoginForm}
          >
            <Input.Password name="password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="link"
              htmlType="button"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </Button>

            <Button
              style={{
                borderRadius: "4px",
                border: "none",
              }}
              type="primary"
              htmlType="submit"
              onClick={logIn}
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
