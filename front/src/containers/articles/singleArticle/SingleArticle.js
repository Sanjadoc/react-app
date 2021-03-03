import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import SingleArticle from "../../../components/content/articles/singleArticle/SingleArticle";
import { getOneArticle } from "../hooks/apiArticles";
import { useQuery } from "react-query";

function SingleArticleContainer({ routes }) {

    const articleId = routes.match.params.id;

    const { data: res } = useQuery("posts", async() => await getOneArticle({ articleId }));

    const articleData = res?.data || " ";

    return articleData ? <SingleArticle articlesData={articleData} /> : <Redirect to="/" />;
}

SingleArticleContainer.propType = {
    routes: PropTypes.object.isRequired,
}


export default SingleArticleContainer;
