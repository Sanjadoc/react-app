const Comment = require("../models/comment");
const db = require("../services/db");

class CommentController {
    
  async getComments(req, res, next) {
    const postId = req.query.postId;
    const limit = req.query.limit || 5;
    // const postId = req.body.postId;
    // const limit = req.body.limit || 5;
    try {
      const dataComments = await Comment.getAllComments(limit, postId);
      const countComments = await Comment.getCountCommentsPost(postId);
      res.json({dataComments , countComments});
    } catch (error) {
        res.status(404).json(error.message);
    }
  }

  async getOneComment(req, res, next) {
    try {
        const commentId = req.params.id;
        const dataComment = await Comment.getOneComment(commentId);
      res.json(dataComment);
    } catch (error) {
        res.status(404).json(error.message);
    }
  }

  async createComment(req, res, next) {
    try {
        const date = new Date();
        const data = req.body;
        const commentInfo = {
            userId: data.userId,
            text: data.text,
            dataCreate: date,
            dataEdit: date,
            postId: data.postId
        };
        await Comment.createComment(commentInfo);
        res.json("Comment was created!");
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

  async updateComment(req, res, next) {
    try {
        const date = new Date();
        const commentInfo = {
            text: req.body.text,
            dataEdit: date,
        };
        const { id } = req.params;
        await Comment.updateCommentById(id, commentInfo);
        res.send(`Comment with id = ${id} was updated`);
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

  async deleteComment(req, res, next) {
    try {
        const { id } = req.params;
        await Comment.deleteCommentById(id);
        res.send(`Comment with id = ${id} was deleted`);
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

}

module.exports = new CommentController();
