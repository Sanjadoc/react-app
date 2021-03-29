import {apiClient} from "../../../configs/axios";

export const getOneUser = async ({ userId, sendData }) => {
  return apiClient.get(`/user/${userId}`);
}

export const updateProfile = async ({ userId, sendData }) => {
  return apiClient.put(`/user/${userId}/update`, sendData);
}

export const sendAvatar = async ({ userId, sendData }) => {
  return apiClient.put(`/user/${userId}/sendAvatar`, sendData);
}

