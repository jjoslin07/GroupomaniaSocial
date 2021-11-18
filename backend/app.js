const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const imageRoute = require("./routes/images");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/images", imageRoute);

module.exports = app;
