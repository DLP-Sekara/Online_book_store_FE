import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import { NotificationContext } from "../context/NotificationContext";

const useFetch = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const { handleError } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);
  const baseUrl = import.meta.env.VITE_API_URL;

  // Create an axios instance with a base URL
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });
  const axiosInstanceForm = axios.create({
    baseURL: baseUrl,
  });

  // Add an interceptor to the axios instance to set the Authorization header
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json"; // Add Content-Type header
      config.headers["Access-Control-Allow-Origin"] = "*"; // Add Access-Control-Allow-Origin header
      config.headers["Cache-Control"] = "no-cache"; // Cache prevent
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add an interceptor to the axios instance to set the Authorization header for Form
  axiosInstanceForm.interceptors.request.use(
    (configForm) => {
      if (token) {
        configForm.headers.Authorization = `Bearer ${token}`;
      }
      configForm.headers["Content-Type"] = "multipart/form-data"; // Add Content-Type header
      configForm.headers["Access-Control-Allow-Origin"] = "*"; // Add Access-Control-Allow-Origin header
      configForm.headers["Cache-Control"] = "no-cache"; // Cache prevent
      return configForm;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //custom hook for data manipulations
  const fetchAction = async ({ query, body, method = "post", params }) => {
    setFetchLoading(true);
    try {
      const response = await axiosInstance({
        url: `${baseUrl}${query}`,
        method,
        data: body,
        params,
      });
      setFetchLoading(false);
      return response.data;
    } catch (err) {
      setFetchLoading(false);
      handleError(err);
      return {
        responseType: "fail",
        message: err.response.data.message,
      };
    }
  };

  //custom hook for form data manipulations
  const fetchActionForm = async ({ query, body, method = "post", params }) => {
    setFetchLoading(true);
    try {
      const response = await axiosInstanceForm({
        url: `${baseUrl}${query}`,
        method,
        data: body,
        params,
      });
      setFetchLoading(false);
      return response.data;
    } catch (err) {
      setFetchLoading(false);
      handleError(err);
    }
  };

  return { fetchAction, fetchActionForm, fetchLoading };
};
export default useFetch;
