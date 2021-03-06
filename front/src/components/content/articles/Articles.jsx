import "./Articles.scss";

import AddEditArticlesBtn from "../../../containers/articles/singleArticle/AddEditArticlesBtn";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Button } from "@material-ui/core";
import CommentsArticles from "./components/commentsArticles";
import DeleteArticleBtn from "../../../containers/articles/singleArticle/DeleteArticleBtn";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { articlesDataType } from "./articlesType/articlesType";

function Articles({ articlesData, isFetching, submitLimit, user }) {
  return (
    <div className="articles">
      <h1>Articles list page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed tempor
        sapien. Suspendisse tellus lorem, tempus ac orci in
      </p>
      <div className="articles__list">
        {isFetching && <p>Wait, article is loading...</p>}
        {!isFetching &&
          articlesData.map((item, i) => (
            <div className="articles__list__item" key={i}>
              <Link to={`/articles/${item.id}`}>
                <h2>
                  {item.id}. {item.title}{" "}
                </h2>
                <p>Small descriptions: {item.text}</p>
                <p>Create by user id: {item.userId}</p>
                <br />
                <p>Available to: {item.access}</p>
                <p>Create date: {item.dataCreate}</p>
                <p>Edit date: {item.dataEdit}</p>
              </Link>
              {user.id === item.userId && (
                <AddEditArticlesBtn isCreate={false} id={item.id} />
              )}
              <p></p>
              {user.id === item.userId && (
                <DeleteArticleBtn articleId={item.id} />
              )}

              <CommentsArticles 
                key={item.id}
                user={user}  
                avatarImg={item.avatar || ""}
                date={item.dataCreate}
                nameUser={item.first_name}
                postId={item.id}
                userId={item.userId}
                />
                    
              </div>
          ))}
      </div>

      {!isFetching && (
        <Button
          variant="contained"
          color="primary"
          aria-label="Show more"
          startIcon={<ArrowDownwardIcon />}
          endIcon={<ArrowDownwardIcon />}
          onClick={submitLimit}
        >
          Show more
        </Button>
      )}
    </div>
  );
}

Articles.propType = {
  articlesData: PropTypes.arrayOf(articlesDataType),
  isFetching: PropTypes.bool,
  submitLimit: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articlesData: [],
  isFetching: false,
};

export default Articles;
