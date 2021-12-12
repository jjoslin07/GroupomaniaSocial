const express = require("express");
const imgCtrl = require("../controllers/image-controller");
const imgUploader = require("../helpers/image-uploader");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
	"/upload",
	auth.checkAuth,
	imgUploader.upload.single("file"),
	imgCtrl.upload
);

module.exports = router;
