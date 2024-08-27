const Router = require("express");
const router = new Router();

const typeController = require("../controllers/typeController");

router.post("/", typeController);
router.get("/", typeController);

module.exports = router;
