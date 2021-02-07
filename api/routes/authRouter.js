const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);

router.post("/registration", authController.registration);

router.get("/verify/:token", authController.emailVerify);

router.get("/logout", authController.logout);

module.exports = router;