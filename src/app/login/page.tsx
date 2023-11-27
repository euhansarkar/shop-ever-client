"use client";
import { Button, Col, Input, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res?.data?.accessToken);
      if (res?.data?.accessToken) {
        router.push(`/profile`);
        message.success(`user logged in successfully`);
      }
      storeUserInfo({ accessToken: res?.data?.accessToken });
    } catch (err) {}
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="email"
                type="text"
                size="large"
                label="User Email"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
