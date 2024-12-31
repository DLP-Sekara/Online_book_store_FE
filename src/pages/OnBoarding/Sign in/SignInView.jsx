import React, { useContext, useEffect, useState } from "react";
import { Typography, Form, Input, Checkbox, Button } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import { NotificationContext } from "../../../context/NotificationContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getLocalStoragedata,
  setLocalStorageData,
} from "../../helpers/StorageHelper";
import MailIcon from "../../../assets/images/svg/onBoarding/MailIcon";
import Password from "../../../assets/images/svg/onBoarding/Password";
import AppStore from "../../../assets/images/svg/onBoarding/AppStore";
import PlayStore from "../../../assets/images/svg/onBoarding/PlayStore";
import CustomButton from "../../../components/buttons/CustomButton";
import SignInServices from "../../../services/SignInServices";
import { emailFieldValidation } from "../../../utils/validations/validation";
const { Text, Link } = Typography;

const SignInView = () => {
  const { openNotification, handleError, token } =
    useContext(NotificationContext);
  const { setToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { loginUser } = SignInServices();
  const location = useLocation();

  useEffect(() => {
    // const rememberMe = localStorage.getItem("rememberMe") === "true";
    // setRememberMe(rememberMe);
  }, []);

  const handleClick = () => {
    setLoading(true);
    navigate("/onboarding/sign-up");
  };

  const LoginFormSubmission = async (e) => {
    setUploading(true);

    const data = {
      email: e?.email,
      password: e?.password,
    };

    if (rememberMe) {
      setLocalStorageData("rememberedEmail", e?.email);
      setLocalStorageData("rememberedPassword", e?.password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberMe");
    }
    console.log(data);
    const response = await loginUser(data);
    if (response) {
      if (response.responseType === "success") {
        setToken(response?.output?.data?.token);
        setLocalStorageData("userRole", response?.output?.data?.role);
        setLocalStorageData("token", response?.output?.data?.token);
        if (response?.output?.data?.token) {
          navigate("../");
        }
      } else if (response.responseType === "fail") {
        openNotification("error", response?.output?.message);
      } else if (response.responseType === "error") {
        handleError(response?.output);
      }
    } else {
      openNotification("error", "Something went wrong");
    }
    setUploading(false);
  };

  return (
    <div
      className={
        "z-10 w-full rounded-3xl bg-white p-5 sm:w-[500px]  md:px-10 md:py-7"
      }
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.57)",
      }}
    >
      <Text className="flex items-center justify-center pb-10 text-[20px] font-semibold text-colorTextGray">
        Log in to Continue
      </Text>
      <Form
        className="w-full"
        onFinish={LoginFormSubmission}
        initialValues={{
          email: getLocalStoragedata("rememberedEmail") || "",
          password: getLocalStoragedata("rememberedPassword") || "",
          remember: localStorage.getItem("rememberMe") === "true",
        }}
      >
        <div className="flex flex-row items-center gap-1 pb-1 capitalize">
          <MailIcon />
          <Text className="text-md font-medium">Email *</Text>
        </div>
        <Form.Item
          name="email"
          style={{ textAlign: "left" }}
          rules={[{ validator: emailFieldValidation }]}
        >
          <Input
            size="large"
            placeholder="Enter email"
            className="ant-input-affix-wrapper-focused:!bg-white hover:!bg-white focus:!bg-white"
            maxLength={100}
            autoComplete="off"
            onKeyDown={(e) => {
              const key = e.key;
              if (!/^[A-Za-z+.@0-9]*$/.test(key) && key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>

        <div className="flex flex-row items-center gap-1 pb-1 capitalize">
          <Password />
          <Text className="text-md font-medium">Password *</Text>
        </div>
        <Form.Item
          name="password"
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
            maxLength={60}
          />
        </Form.Item>

        <div className="flex flex-row justify-between">
          <Form.Item
            name="remember"
            valuePropName="checked"
            className="flex items-center justify-center"
          >
            <Checkbox
              checked={rememberMe}
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
            >
              <Text className="text-xs font-medium">Remember me</Text>
            </Checkbox>
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <CustomButton
            type="primary"
            className="w-full"
            size="large"
            htmlType="submit"
            loading={uploading}
            buttonName="Log In"
          />
        </Form.Item>
      </Form>
      <Text className="flex items-center justify-center gap-1">
        Don’t have a company?
        <Link
          loading={loading.toString()}
          onClick={handleClick}
          style={{ color: "var(--primary)" }}
        >
          Sign up
        </Link>
      </Text>
      <div className="flex items-center justify-center">
        <div className="flex flex-row pt-3 gap-3">
          <AppStore />
          <PlayStore />
        </div>
      </div>
    </div>
  );
};

export default SignInView;
