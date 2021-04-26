const db = require("./db");
const Comment = require("../models/comment");
const commentTableCommentId = "commentId";

const translationComments = (wss, data) => {
    wss.clients.forEach(async (client) => {
        try {
            client.send(JSON.stringifsy(data));
        } catch (e) {
            console.log(e);
        }
    });
};

const insertInDb = async (data) => {
    const { text, userId, postId } = data;
    const date = new Date();
    const idNewMess = await db(Comment.tableName)
        .insert({ userId: userId, postId: postId, text: text, dataCreate: date, dataEdit: date, })
        .returning(commentTableCommentId);
    return db
        .select(
            "text",
            "cp.userId",
            "us.nameUser",
            "us.avatar",
            "commentId",
            "cp.postId",
        )
        .from(`${Comment.tableName} as cp`)
        .where("cp.commentId", "=", idNewMess[0])
        .join("users as us", function () {
            this.on("cp.userId", "=", "us.id");
        });
};

module.exports = {
    translationComments,
    insertInDb,
};
