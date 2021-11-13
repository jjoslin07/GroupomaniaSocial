const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");


dotenv.config();

// Middlewareß
app.use(express.json());

app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


module.exports = app;