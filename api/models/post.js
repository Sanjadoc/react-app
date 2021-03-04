const db = require("../services/db");
class Post {
  static tableName = "posts";

  static async getAllPosts(limit) {
    return db.select().from(Post.tableName).limit(limit).orderBy("id");
  }

  static async getPostByID(id) {
    return db.select().from(Post.tableName).where("id", "=", id).first();
  }

  static async createPost(data) {
    return db(Post.tableName).insert({ ...data });
  }

  static async updatePostById(postId, newPostData) {
    return db(Post.tableName)
      .where("id", "=", postId)
      .update({
        title: newPostData.title,
        text: newPostData.text,
        userId: newPostData.userId,
        access: newPostData.access,
        dataEdit: newPostData.dataEdit
      });
  }

  static async deletePostById(postId) {
    return db(Post.tableName).where("id", "=", postId).delete();
  }

}

module.exports = Post;
