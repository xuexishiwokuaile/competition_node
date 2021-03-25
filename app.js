/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import indexRouter from "./routes/indexRouter.js";
import usersRouter from "./routes/userRouter.js";

import { checkRole } from "./middleWare/checkRole.js";
import { updateCookie } from "./middleWare/updateCookie.js";

var app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("competition"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        name: "SESSIONID",
        secret: "competition",
    })
);

// 添加自定义中间件
app.use("/", checkRole);
app.use("/", updateCookie);

app.use("/", indexRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

export default app;
