const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const multer = require("multer");
const path = require("path");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});
const fileFilter = (req, file, callback) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg"
	) {
		callback(null, true);
	} else {
		callback(new Error("Unsupported files", false));
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
	fileFilter: fileFilter,
});

app.post("/api/upload", upload.array("file"), (req, res) => {
	try {
		return res.status(200).json("File uploaded successfully.");
	} catch (error) {
		console.log(error);
	}
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
