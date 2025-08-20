const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const questionDifficultyRouter = require("./routes/questionDifficulty");
const questionRouter = require("./routes/question");
const categoryRouter = require("./routes/category");

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

var app = express();

app.use(allowCrossDomain);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/question-difficulties", questionDifficultyRouter);
app.use("/questions", questionRouter);
app.use("/categories", categoryRouter);

module.exports = app;
