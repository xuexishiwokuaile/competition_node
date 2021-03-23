import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import { dirname ***REMOVED*** from 'path';
import { fileURLToPath ***REMOVED*** from 'url';

import indexRouter from "./routes/IndexRouter.js";
import usersRouter from "./routes/UserRouter.js";

var app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false ***REMOVED***));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    name: "SESSIONID",
    secret: "sessiontest",
  ***REMOVED***)
);

app.use("/", indexRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
***REMOVED***

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {***REMOVED***;

  // render the error page
  res.status(err.status || 500);
  res.render("error");
***REMOVED***

export default app;
