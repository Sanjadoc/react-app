const Post = require("../models/post");

class PostController {
    
  async getAllPosts(req, res, next) {
    const limit = req.query.limit || 2;
    try {
      const dataPosts = await Post.getAllPosts(limit);
      res.json(dataPosts);
    } catch (error) {
        res.status(404).json(error.message);
    }
  }

  async getOnePost(req, res, next) {
    try {
      const dataPost = await Post.getPostByID(req.params.id);
      res.json(dataPost);
    } catch (error) {
        res.status(404).json(error.message);
    }
  }

  async createPost(req, res, next) {
    const date = new Date();
    try {
        const post = {
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId,
            access: req.body.access,
            dataCreate: date,
            dataEdit: date
        };
        await Post.createPost(post);
        res.json("Post was created!");
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

  async updatePost(req, res, next) {
    const date = new Date();
    try {
        const post = {
            title: req.body.title,
            text: req.body.text,
            userId: req.body.userId,
            access: req.body.access,
            dataEdit: date
        };
        const { id } = req.params;
        await Post.updatePostById(id, post);
        res.send(`Post with id = ${id} was updated`);
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

  async deletePost(req, res, next) {
    try {
        const { id } = req.params;
        await Post.deletePostById(id);

        res.send(`Post with id = ${id} was deleted`);
    } catch (error) {
        res.status(400).json(error.message);
    }
  }

}

module.exports = new PostController();
