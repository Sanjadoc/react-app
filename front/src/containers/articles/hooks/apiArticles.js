import {apiClient} from "../../../configs/axios";

export function getArticlesList() {
  return apiClient.get(`/posts`);
}