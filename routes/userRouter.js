const Router = require("express");
const router = new Router();

const UserController = require("../controllers/userControllers");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/auth", UserController.check);

module.exports = router;
