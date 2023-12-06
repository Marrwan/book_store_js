require("dotenv").config();
var express = require("express");

var bookRouter = require("./routes/book");
const { ERROR500 } = require("./middlewares/Errors/APIError");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/books", bookRouter);

app.use(function (err, _req, _res, next) {
  if (!err.statusCode || err.statusCode >= 500) {
    process.NODE_ENV !== 'production' ? console.log({err}) : null
    throw new ERROR500()
  }
  next(err)
});
app.use(function (err, _req, res, _next) {
  res.setHeader("Content-Type", "application/json");
  return res.status(err.statusCode).json({ error: err.message });
});

module.exports = app;
