const router = require("express").Router();
const authController = require("../controllers/authController");
const validator = require("../middleware/validator");

router.post("/login",[
    validator({
        email: ["required", "email"],
        password: ["required"],
    }), authController.login]);

router.post("/registration",[
    validator({
        email: ["required", "email", "unique:users:email"],
        password: ["required", "min:8", "max:50"],
    }), authController.registration]);
router.get("/verify/:token", authController.emailVerify);
router.get("/logout", authController.logout);

router.post("/social/google", authController.google);
router.post("/social/facebook", authController.facebook);

module.exports = router;