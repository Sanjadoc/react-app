const router = require("express").Router();
const commentController = require("../controllers/commentController");
const { checkAuth, checkOwnerData } = require("../middleware/acl");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getOneComment);
router.post("/create/", checkAuth, commentController.createComment);
router.put("/:id/update/", checkAuth, commentController.updateComment);
router.delete("/:id/delete", checkAuth, commentController.deleteComment);

module.exports = router;
