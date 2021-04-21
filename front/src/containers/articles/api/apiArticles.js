import {apiClient} from "../../../configs/axios";

export const getArticlesList = async ({ limit }) => {
  return apiClient.get(`/posts?limit=${limit}`);
}

export const getOneArticle = async ({ articleId }) => {
  return apiClient.get(`/posts/${articleId}`);
}

export const createArticle = async({ sendData }) => {
  return apiClient.post('/posts/create', sendData);
}

export const updateArticle = async ({ articleId, sendData }) => {
  return apiClient.put(`/posts/${articleId}/update`, sendData);
}

export const delArticle = async ({ articleId }) => {
  return apiClient.delete(`/posts/${articleId}/delete`);
}
