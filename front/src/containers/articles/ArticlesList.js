import React, { useEffect, useState } from "react";

import Articles from "../../components/content/articles/Articles";
import { Redirect } from "react-router-dom";
import { getArticlesList } from "./hooks/apiArticles";

function ArticlesListContainer() {
  const [articles, setArticles] = useState([]);

  const getArticlesData = () => {
    async function fetchData() {
      const { data } = await getArticlesList();
      setArticles(data);
    }
    fetchData();
  };

  useEffect(getArticlesData, []);

  return articles ? <Articles articlesData={articles} /> : <Redirect to="/" />;
}

export default ArticlesListContainer;
