import React, { useCallback } from "react";

import ApiArticles from "../api/apiArticles";
import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

function DeleteArticleBtn({ articleId }) {

  const {delArticle} = ApiArticles();

  const { mutate: deleleArticle } = useMutation(delArticle);

  const handleSubmitDelete = useCallback(
    async () => {
      try {
        await deleleArticle({ articleId });
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line
    [deleleArticle]
  );

  return (
    <>
      <Button onClick={handleSubmitDelete} variant="contained" color="secondary">
        <DeleteForeverIcon className="icon" />
        Delete
      </Button>
    </>
  );
}

DeleteArticleBtn.propTypes = {
  articleId: PropTypes.number,
  handleClose: PropTypes.func,
};

export default DeleteArticleBtn;
