import axios from "axios";
import { ref } from "vue";
import { $h } from "./helper";
export const sendingPercent = ref(0);

export const ax = axios.create({
  baseURL: $h.env("VITE_API_URL"),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(localStorage.getItem("token") && {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    "Access-Control-Allow-Origin": "true",
  },
  onUploadProgress: (progressEvent) => {
    sendingPercent.value = parseInt(
      Math.round((progressEvent.loaded / progressEvent.total) * 100)
    );
  },
});

export const getAxios = () => {
  return axios.create({
    baseURL: $h.env("VITE_API_URL"),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      "Access-Control-Allow-Origin": "true",
    },
    onUploadProgress: (progressEvent) => {
      sendingPercent.value = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );
    },
  });
};

export const getUploadAxios = () => {
  return axios.create({
    baseURL: $h.env("VITE_API_URL"),
    headers: {
      Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
      ...(localStorage.getItem("token") && {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      "Access-Control-Allow-Origin": "true",
    },
    onUploadProgress: (progressEvent) => {
      sendingPercent.value = parseInt(
        Math.round((progressEvent.loaded / progressEvent.total) * 100)
      );
    },
  });
};

export default ax;
