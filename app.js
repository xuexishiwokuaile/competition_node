***REMOVED***
***REMOVED***
 * @Date: 2021-03-25 00:01:05
***REMOVED***

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import { dirname ***REMOVED*** from "path";
import { fileURLToPath ***REMOVED*** from "url";
import cors from "cors";

import indexRouter from "./routes/indexRouter.js";
import userRouter from "./routes/userRouter.js";
import competitionRouter from "./routes/CompetitionRouter.js";
import takepartRouter from "./routes/TakepartRouter.js";
import typeRouter from "./routes/TypeRouter.js";
import messageRouter from "./routes/MessageRouter.js";

import { checkRole ***REMOVED*** from "./middleWare/CheckRole.js";
import { updateCookie ***REMOVED*** from "./middleWare/UpdateCookie.js";

var app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false ***REMOVED***));
app.use(cookieParser("competition"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        name: "SESSIONID",
        secret: "competition",
***REMOVED***)
);

// 添加自定义中间件
app.use("/", checkRole);
app.use("/", updateCookie);

// 配置路由
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/competition", competitionRouter);
app.use("/takepart", takepartRouter);
app.use("/type", typeRouter);
app.use("/message", messageRouter);

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
