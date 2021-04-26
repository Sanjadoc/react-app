import useApi from "../../../hooks/useApi";

export default function ApiArticles() {
  const { callApi } = useApi();

  const getArticlesList = async ({ limit }) => {
    return callApi(`/posts?limit=${limit}`);
  };

  const getOneArticle = async ({ articleId }) => {
    return callApi(`/posts/${articleId}`);
  };

  const createArticle = async ({ sendData }) => {
    return callApi("/posts/create", "post", sendData);
  };

  const updateArticle = async ({ articleId, sendData }) => {
    return callApi(`/posts/${articleId}/update`, "put", sendData);
  };

  const delArticle = async ({ articleId }) => {
    return callApi(`/posts/${articleId}/delete`, "delete");
  };

  return {
    getArticlesList,
    getOneArticle,
    createArticle,
    updateArticle,
    delArticle,
  };
}
