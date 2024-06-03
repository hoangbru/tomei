import { apiClient } from "@/lib/axiosClient";

export const signup = (url: string, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

export const login = (url: string, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

export const createGuestSession = (url: string) => {
  return apiClient.get(url);
};
