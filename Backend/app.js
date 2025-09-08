require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");

const authorizationRouter = require("./routes/authorization");
const usersRouter = require("./routes/users");
const questionDifficultyRouter = require("./routes/questionDifficulty");
const questionRouter = require("./routes/question");
const categoryRouter = require("./routes/category");

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type, Authorization`);
  next();
};

const swaggerBase = require("./docs/swaggerBase.json");
const docsDir = path.join(__dirname, "docs");
fs.readdirSync(docsDir).forEach((file) => {
  if (file !== "swaggerBase.json") {
    const routeDoc = require(path.join(docsDir, file));
    swaggerBase.paths = { ...swaggerBase.paths, ...routeDoc };
  }
});

var app = express();

app.use(allowCrossDomain);
app.options("*", allowCrossDomain);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerBase));
app.use("/", authorizationRouter);
app.use("/users", usersRouter);
app.use("/difficulties", questionDifficultyRouter);
app.use("/questions", questionRouter);
app.use("/categories", categoryRouter);

module.exports = app;
