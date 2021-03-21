const router = require("express").Router();
const { checkAuth, checkOwnerData } = require("../middleware/acl");
const validator = require("../middleware/validator");
const postController = require("../controllers/postController");
const config = require("../config");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);

router.post("/create",
  [
    checkAuth,
    validator({
      title: ["required", "min:1", "max:100"],
      text: ["required", "min:1", "max:1000"],
      access: ["selectOne:all:friends:me"],
    }),
  ],
  postController.createPost,
);

router.put("/:id/update",
  [
    checkAuth,
    checkOwnerData(config.entitiePost.tableName),
    validator({
      title: ["required", "min:1", "max:100"],
      text: ["required", "min:1", "max:1000"],
      access: ["selectOne:all:friends:me"],
    }),
  ],
  postController.updatePost,
);

router.delete("/:id/delete",
  [
    checkAuth,
    checkOwnerData(
      config.entitiePost.tableName,
      config.entitiePost.authorIdName,
      config.entitiePost.identifier,
    ),
  ],
  postController.deletePost,
);

//need for test on front
// router.post("/", postController.createPost);
// router.put("/:id/update", postController.updatePost);
// router.delete("/:id/delete", postController.deletePost);

module.exports = router;
