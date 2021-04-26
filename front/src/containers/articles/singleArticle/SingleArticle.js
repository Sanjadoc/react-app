import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import SingleArticle from "../../../components/content/articles/singleArticle/SingleArticle";
import useApi from '../../../hooks/useApi';
import { useQuery } from "react-query";
import useRequireAuth from '../../../hooks/useRequireAuth';

function SingleArticleContainer({ routes }) {

    const { callApi } = useApi();

    useRequireAuth(false);

    const articleId = routes.match.params.id;

    const { data: res } = useQuery("posts", () => callApi(`/posts/${articleId}`));

    const articleData = res || " ";

    return articleData ? <SingleArticle articlesData={articleData} /> : <Redirect to="/" />;
}

SingleArticleContainer.propType = {
    routes: PropTypes.object.isRequired,
}


export default SingleArticleContainer;
