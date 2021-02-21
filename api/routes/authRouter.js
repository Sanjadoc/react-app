const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.get("/verify/:token", authController.emailVerify);
router.get("/logout", authController.logout);

router.post("/social/google", authController.google);

router.post("/social/facebook", authController.facebook);

module.exports = router;