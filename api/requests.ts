import apiClient from "./client";
import { SCHOOLENDPOINTS } from "./endpoints";

export const getRequest = async (url: string, params?: any) => {
  const response = await apiClient.get(url, { params });
  return response.data;
};
export const postRequest = async (url: string, data: any) => {
  const response = await apiClient.post(url, data);
  return response.data;
};
