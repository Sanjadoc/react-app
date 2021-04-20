import React, { useCallback } from "react";

import { Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PropTypes from "prop-types";
import useApi from "../../users/hooks/useApi";
import { useMutation } from "react-query";

function DeleteArticleBtn({ articleId }) {

  const { callApi } = useApi();
  
  // const delArticle = ({ articleId }) => {
  //   return callApi(
  //     {
  //       url: `/posts/${articleId}/delete`,
  //       method: "DELETE",
  //       data: { articleId }
  //     }
  //   );
  // }

  // const { mutate: deleleArticle } = useMutation(delArticle);

  // const handleSubmitDelete = useCallback(
  //   async () => {
  //     try {
  //       await deleleArticle({ articleId });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   // eslint-disable-next-line
  //   [deleleArticle]
  // );

  const mutation = useMutation(callApi);
	const handleSubmitDelete = useCallback(() => {
		try {
			mutation.mutate({
				url: `/posts/${articleId}/delete`,
				method: "DELETE",
				data: { articleId },
			});
		} catch (e) {
			console.log(e);
		}
	}, [mutation]);

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
