const db = require("../services/db");

class Post {
  static tableName = "posts";

  static async getAllPosts() {
    return db.select().from(Post.tableName);
  }

  static async getPostByID(id) {
    return db.select().from(Post.tableName).where("id", "=", id);
  }

  static async createPost(data) {
    return db(Post.tableName).insert({ ...data });
  }

  static async updatePostById(postId, newPostData) {
    return db(Post.tableName)
      .where("id", "=", postId)
      .update({
        p_title: newPostData.p_title,
        p_descriptions: newPostData.p_descriptions,
      });
  }

  static async deletePostById(postId) {
    return db(Post.tableName).where("id", "=", postId).delete();
  }
}

module.exports = Post;
