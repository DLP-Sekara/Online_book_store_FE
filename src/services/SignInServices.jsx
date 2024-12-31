import React from "react";
import useFetch from "../hooks/useFetch";

const SignInServices = () => {
  const { fetchAction } = useFetch();

  const handleResponse = (response) => {
    if (response?.success) {
      return { responseType: "success", output: response };
    } else {
      return { responseType: "fail", output: response };
    }
  };

  const loginUser = async (data) => {
    try {
      console.log("Login data:", data);
      const response = await fetchAction({
        query: "/customer/signin",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Login error:", error);
      return { responseType: "error", output: error };
    }
  };

  const signUpUser = async (data) => {
    try {
      console.log("SignUp data:", data);
      const response = await fetchAction({
        query: "/customer/signup",
        body: data,
      });
      return handleResponse(response);
    } catch (error) {
      console.error("SignUp error:", error);
      return { responseType: "error", output: error };
    }
  };

  return { loginUser, signUpUser };
};

export default SignInServices;
