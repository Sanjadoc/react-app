import Articles from "../../components/content/articles/Articles";
import { Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "react-query";
import useRequireAuth from "../../hooks/useRequireAuth";
import { useState } from "react";

function ArticlesListContainer() {

  const { callApi } = useApi();
  
  useRequireAuth(false);
  const { user } = useAuth();
  const [limit, setLimitLoad] = useState(2);
   const { data: res, isFetching} = useQuery(["posts", limit], () => callApi(`/posts?limit=${limit}`));
  const articlesData = res || [];
  const submitLimit = () => { setLimitLoad(limit + 2); };

  return articlesData ? 
          <Articles articlesData={articlesData} user={user} isFetching={isFetching} submitLimit={submitLimit}  /> 
          : <Redirect to="/" />;
}

export default ArticlesListContainer;
