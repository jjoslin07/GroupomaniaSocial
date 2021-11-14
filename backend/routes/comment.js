const express = require("express");
const commentCtrl = require("../controllers/comment-controller");
const router = express.Router();
//const auth = require("../middleware/check-auth");

router.post("/", commentCtrl.save);
router.get("/", commentCtrl.index);
router.get("/:id", commentCtrl.show);
router.patch("/:id", commentCtrl.update);
router.delete("/:id", commentCtrl.destroy);

module.exports = router;
