const router = require("express").Router();
const checkAuth = require("../middleware/acl").checkAuthorized;
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/:create", checkAuth, postController.createPost);
router.put("/:id/update", checkAuth, postController.updatePost);
router.delete("/:id/delete", checkAuth, postController.deletePost);

module.exports = router;

