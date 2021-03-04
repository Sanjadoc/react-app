import Articles from "../../components/content/articles/Articles";
import { Redirect } from "react-router-dom";
import { getArticlesList } from "./hooks/apiArticles";
import { useQuery } from "react-query";
import { useState } from "react";

function ArticlesListContainer() {
  const [limit, setLimitLoad] = useState(2);

  const { data: res, isFetching } = useQuery(["posts", limit], () => getArticlesList({ limit }));

  const articlesData = res?.data || [];

  const submitLimit = () => { setLimitLoad(limit + 2); };

  return articlesData ? <Articles articlesData={articlesData} isFetching={isFetching} submitLimit={submitLimit}  /> : <Redirect to="/" />;
}

export default ArticlesListContainer;
