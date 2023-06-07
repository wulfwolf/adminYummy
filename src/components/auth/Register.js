import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../assets/constants/index";
import axios from "axios";
import { API_ENDPOINT } from "../../constant";

export default function Register() {
  const navigate = useNavigate();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    email: "s1@gmail.com",
    password: "123123",
    confirmPassword: "123123",
  });

  const [isLoading, setIsLoading] = useState(false);

  const signUpHandle = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_ENDPOINT}/admin/auth/register`, {
        email: email,
        password: password,
      });
      if (res) {
        setIsLoading(false);
        console.log(res);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const { email, password, confirmPassword } = registerForm;

  const handleRegister = () => {
    if (password !== confirmPassword) {
      message.error("Mật khẩu và mật khẩu xác nhận không giống nhau");
    } else {
      // console.log({ ...registerForm, image: file });
      signUpHandle();
    }
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={10}>
          <p style={{ textAlign: "center", fontSize: 24 }}>Đăng ký tài khoản</p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              email: email,
              password: password,
              confirmPassword: confirmPassword,
            }}
            autoComplete="off"
            onFinish={handleRegister}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập Email",
                },
              ]}
              value={email}
              onChange={onChangeRegisterForm}
            >
              <Input name="email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
              value={password}
              onChange={onChangeRegisterForm}
            >
              <Input.Password name="password" />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
              value={confirmPassword}
              onChange={onChangeRegisterForm}
            >
              <Input.Password name="confirmPassword" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="link"
                htmlType="button"
                onClick={() => navigate("/login")}
              >
                Đã có tài khoản
              </Button>

              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: "4px",
                  border: "none",
                }}
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
