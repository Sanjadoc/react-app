const router = require("express").Router();
const {checkAuth, checkOwnerData} = require("../middleware/acl");
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/:create", checkAuth, postController.createPost);
router.put("/:id/update", 
        [checkAuth, checkOwnerData(process.env.TABLE_NAME, process.env.COLUMN_OWNER_NAME, process.env.COLUMN_ID_NAME)], 
        postController.updatePost);
router.delete("/:id/delete", 
        [checkAuth, checkOwnerData(process.env.TABLE_NAME, process.env.COLUMN_OWNER_NAME, process.env.COLUMN_ID_NAME)], 
        postController.deletePost);

module.exports = router;

