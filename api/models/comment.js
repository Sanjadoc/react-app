const db = require("../services/db");
const User = require("./user");
class Comment {
  static tableName = "commentsPosts";

  static async getAllComments(limit, postId) {
    return db
      .select("commentId", "text", "cp.userId", "us.first_name", "us.avatar")
      .from(`${Comment.tableName} as cp`)
      .where("cp.postId", "=", postId)
      .join(`${User.tableName} as us`, function () {
        this.on("cp.userId", "=", "us.id");
      })
      .limit(limit)
      .orderBy("dataEdit");
  }

  static async getCountCommentsPost(postId) {
    return db.count().from(Comment.tableName).where({ postId });
  }

  static async getOneComment(id) {
    return db
      .select()
      .from(Comment.tableName)
      .where("commentId", "=", id)
      .first();
  }

  static async createComment(data) {
    return db(Comment.tableName).insert({ ...data });
  }

  static async updateCommentById(commentId, newCommentData) {
    return db(Comment.tableName).where({ commentId }).update({
      text: newCommentData.text,
      dataEdit: newCommentData.dataEdit,
    });
  }

  static async deleteCommentById(commentId) {
    return db(Comment.tableName).where({commentId}).delete();
  }

}

module.exports = Comment;
