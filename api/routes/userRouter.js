const router = require("express").Router();
const userController = require("../controllers/userController");
const { checkAuth, checkOwnerData } = require("../middleware/acl");
const upload = require("../middleware/uploader");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id/update", userController.updateUser);
router.delete("/:id/delete", userController.deleteUser);
router.get("/:id/avatar", userController.getAvatar);
router.put("/:id/sendAvatar", upload.single("avatar"), userController.updateAvatar);
// router.put("/:id/delete", userController.deleteAvatar);

router.get("/:id/friends", (req, res) => {
  res.send(
    `<h1 style="text-align:center; color: green;">Get all friends for user ID: ${req.params.id}: <h1>`,
  );
});

module.exports = router;