import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { Button } from "@material-ui/core";
import Comment from "../../comment/Comment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import notAvatar from "../../../../assets/img/user-placeholder.svg";
import useApi from "../../../../hooks/useApi";

function CommentsArticles({ user, postId, userId }) {
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState(5);
  const [comments, setComments] = useState([]);
  const [countComments, setCountComment] = useState(0);

  const { callApi } = useApi();

  async function fetchComments(limit = 5) {
    const data = await callApi(`/comments?postId=${postId}&limit=${limit}`);
    setCountComment(Number(data.countComments[0].count));
    setComments([...comments, data.dataComments]);
  }

  const { data, refetch } = useQuery( [`comments ${postId}`, limit], () => fetchComments(limit), {staleTime: Infinity, } );

  useEffect(() => { refetch(); }, [data, limit, queryClient]);

  const SignupSchema = Yup.object().shape({
    comment: Yup.string().min(5, "Too short!").max(100, "Too long!"),
  });

  const [ws, setWs] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const findObjInCommentArr = (id) => {
    for (let i = 0; i < comments.length; i++) {
      const findIndex = comments[i].findIndex((el) => el.commentId === id);

      if (findIndex !== -1) {
        return {
          commentNumberArr: i,
          indexInThisArr: findIndex,
        };
      }
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      console.log("Socket connected");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "newMess") {
        if (postId === message.data[0].postId) {
          setComments([message.data, ...comments]);
        }
      } else if (message.event === "delMess") {
        if (postId === message.data.postId) {
          const indexs = findObjInCommentArr(message.data.commentId);
          if (indexs) {
            const { commentNumberArr, indexInThisArr } = indexs;
            setComments([
              ...comments.slice(0, commentNumberArr),
              [
                ...comments[commentNumberArr].slice(0, indexInThisArr),
                ...comments[commentNumberArr].slice(indexInThisArr + 1),
              ],
              ...comments.slice(commentNumberArr + 1),
            ]);
          }
        }
      } else if (message.event === "accessDenied") {
        console.log(`Access denied`);
      } else {
        console.log(`${message.event} doesn't exist`);
      }
    };

    socket.onclose = () => {
      console.log("Socket close");
      setTimeout(() => {
        setRefresh((r) => !r);
      }, 3000);
    };

    socket.onerror = (e) => {
      console.log("Socket error", e);
    };

    setWs(socket);
  }, [comments, refresh]);

  const onSubmitComment = async (items, { resetForm }) => {
    try {
      console.log(items);
      const message = {
        event: "message",
        id: user.refreshToken,
        data: {
          ...items,
          userId: user.id,
          postId: postId,
          user: {
            refreshToken: user.refreshToken,
          },
        },
      };

      ws.send(JSON.stringify(message));
      resetForm({});
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (id) => {
    try {
      const message = {
        event: "deleteComm",
        id: user.refreshToken,
        data: {
          commentId: id,
          userId: user.id,
          postId: postId,
          user: {
            refreshToken: user.refreshToken,
          },
        },
      };

      ws.send(JSON.stringify(message));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments: {countComments}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion-typography">
            {user && (
              <Formik
                initialValues={{
                  comment: "",
                }}
                enableReinitialize={true}
                validationSchema={SignupSchema}
                onSubmit={onSubmitComment}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="comment-block">
                      <img
                        src={
                          user
                            ? `http://localhost:3000/user/${user.id}/avatar/`
                            : notAvatar
                        }
                        alt="avatar"
                      />
                      <div className="comment-block__item">
                        <div className="comment-block__item__content">
                          <div className="comment-block__item__content__name">
                            {user.nameUser}
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

                        {/*btn add*/}
                        {user.id === userId ? (
                          <div className="comment-block__item__btns">
                            <Button
                              className="comment-block__item__btns__btn"
                              variant="contained"
                              color="primary"
                              size="large"
                              type="submit"
                            >
                              Add comment
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}

            {comments.map((el) =>
              el.map((item) => (
                <Comment
                  key={item.commentId}
                  date={item.date}
                  comment={item.text}
                  userId={item.userId}
                  nameUser={item.first_name}
                  avatarImg={user.avatar}
                  commentId={item.commentId}
                  deleteComment={deleteComment}
                />
              ))
            )}

            <Button
              size="large"
              variant="contained"
              color="primary"
              className="btn-load-more"
              onClick={() => {
                setLimit(limit + 5);
              }}
            >
              Load more...
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

CommentsArticles.propType = {
  submitLimit: PropTypes.func.isRequired,
  date: PropTypes.string,
  nameUser: PropTypes.string,
  userId: PropTypes.string,
  postId: PropTypes.string,
};

export default CommentsArticles;
