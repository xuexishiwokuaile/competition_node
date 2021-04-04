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
import expressWs from "express-ws";

import indexRouter from "./routes/IndexRouter.js";
import userRouter from "./routes/UserRouter.js";
import competitionRouter from "./routes/CompetitionRouter.js";
import takepartRouter from "./routes/TakepartRouter.js";
import typeRouter from "./routes/TypeRouter.js";
import messageRouter from "./routes/MessageRouter.js";
import commentRouter from "./routes/CommentRouter.js";
import searchRouter from "./routes/SearchRouter.js";
import applyRouter from "./routes/ApplyRouter.js";
import teamRouter from "./routes/TeamRouter.js";

import { checkRole } from "./middleWare/CheckRole.js";
import { updateCookie } from "./middleWare/UpdateCookie.js";

const app = express();

expressWs(app);

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

// 配置路由
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/competition", competitionRouter);
app.use("/takepart", takepartRouter);
app.use("/type", typeRouter);
app.use("/message", messageRouter);
app.use("/comment", commentRouter);
app.use("/search", searchRouter);
app.use("/apply", applyRouter);
app.use("/team", teamRouter);

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
