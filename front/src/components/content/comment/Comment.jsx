import "./Comment.scss";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import React, { useCallback, useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import { Context } from "../../../authStore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import useApi from "../../../hooks/useApi";
import { useMutation } from "react-query";
import userPlaceholder from "../../../assets/img/user-placeholder.svg";

function Comment({ avatarImg, comment, date, nameUser, userId, commentId, deleteComment,}) {
  const { callApi } = useApi();

  const user = useContext(Context);

  const [editMode, setEditMode] = useState(false);

  const SignupSchema = Yup.object().shape({
    comment: Yup.string().min(5, "Too short!").max(100, "Too long!"),
  });

  const mutationCommentUpdate = useMutation(callApi);
  const onSubmitEdit = useCallback(
    async (items) => {
      try {
        await mutationCommentUpdate.mutate({
          url: `/comments/${commentId}/update`,
          method: "PUT",
          data: {
            ...items,
            commentId: commentId,
            userId: userId,
            user: {
              refreshToken: user[0].user.refreshToken,
            },
          },
        });
        setEditMode(false);
      } catch (e) {
        console.log(e);
      }
    },
    [mutationCommentUpdate]
  );

  return (
    <>
      {editMode === false ? (
        <div className="comment-block">
          <img
            src={
              avatarImg
                ? `http://localhost:3000/user/${userId}/avatar/`
                : userPlaceholder
            }
            alt="avatar"
          />
          <div className="comment-block__item">
            <div className="comment-block__item__content">
              {nameUser}
              <div className="comment-block__item__content__comment">
                {comment}
              </div>
              <div className="comment-block__item__content__date">{date}</div>
            </div>

            {/* btn edit/delete */}
            {editMode === false && user[0].user && user[0].user.id == userId ? (
              <div className="comment-block__item__btns">
                <Button
                  className="comment-block__item__btns__btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setEditMode(true)}
                >
                  <EditIcon className="icon" />
                  Edit
                </Button>
                <Button
                  className="comment-block__item__btns__btn"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => deleteComment(commentId)}
                >
                  <DeleteForeverIcon className="icon" />
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/*edit Mode*/}
      {editMode === true ? (
        <Formik
          initialValues={{
            comment: comment || "",
          }}
          enableReinitialize={true}
          validationSchema={SignupSchema}
          onSubmit={onSubmitEdit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="comment-block">
                <img
                  src={
                    avatarImg
                      ? `http://localhost:3000/user/${userId}/avatar/`
                      : userPlaceholder
                  }
                  alt="avatar"
                />
                <div className="comment-block__item">
                  <div className="comment-block__item__content">
                    <div className="comment-block__item__content__name">
                      {nameUser}
                    </div>
                    <Field
                      className="comment-block__item__content__comment"
                      id="comment"
                      name="comment"
                      label="Your comment..."
                      placeholder="Your comment..."
                    />
                    {errors.comment && touched.comment ? (
                      <div className="Error">{errors.comment}</div>
                    ) : null}
                  </div>

                  <div className="comment-block__item__btns">
                    <Button
                      className="comment-block__item__btns__btn"
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      <EditIcon className="icon" />
                      Edit
                    </Button>
                    <Button
                      className="comment-block__item__btns__btn"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => setEditMode(false)}
                    >
                      <CancelIcon className="icon" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </>
  );
}

Comment.propTypes = {
  avatarImg: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.string,
  nameUser: PropTypes.string,
  userId: PropTypes.string,
  commentId: PropTypes.string,
  deleteComment: PropTypes.func,
};

export default Comment;
