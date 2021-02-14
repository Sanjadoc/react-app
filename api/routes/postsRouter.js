const router = require("express").Router();
const {checkAuth, checkOwnerData} = require("../middleware/acl");
const postController = require("../controllers/postController");
const config = require("../config.entities");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/:create", checkAuth, postController.createPost);

router.put("/:id/update", 
        [checkAuth, checkOwnerData(config.entitiePost.tableName)], 
        postController.updatePost);
        
router.delete("/:id/delete", 
        [checkAuth, checkOwnerData(config.entitiePost.tableName, 
                                   config.entitiePost.authorIdName, 
                                   config.entitiePost.identifier)], 
        postController.deletePost);

module.exports = router;

