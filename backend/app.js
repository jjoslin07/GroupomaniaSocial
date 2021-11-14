const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const commentRoute = require("./routes/comment");
const imageRoute = require("./routes/images");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/comments", commentRoute);
app.use("/images", imageRoute);

module.exports = app;