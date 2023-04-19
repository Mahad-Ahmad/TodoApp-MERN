var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var todoRouter = require("./routes/todo");
var todoListRouter = require("./routes/todoList");

var cors = require("cors");

var app = express();
connectDB();
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/todo", todoRouter);
app.use("/todoList", todoListRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.use("/", indexRouter);
}

module.exports = app;
