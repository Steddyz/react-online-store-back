const Router = require("express");
const router = new Router();

router.post("/register");
router.post("/login");
router.get("/auth", (req, res) => {
  res.json({ message: "server working" });
});

module.exports = router;
