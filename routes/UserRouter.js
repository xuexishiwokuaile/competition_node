/*
 * @Author: chenanran
 * @Date: 2021-03-25 00:01:05
 */

import { Router } from "express";
import UserService from "../service/userService.js";

const router = Router();

const userService = new UserService();

// TODO： 验证session
router.use(function (req, res, next) {
    if (req.session) {
        console.log("session", req.session.role);
    }
    next();
});
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

/**
 * @description:
 */
router.post("/login", function (req, res, next) {});

/**
 * @description 添加用户
 * @param {name, password, phone, gender}
 * @url /user/add
 * @return {}
 */
router.post("/add", function (req, res, next) {
    userService.add(req, res, next).then(
        (result) => {
            res.json({
                code: "0",
                msg: result,
            });
        },
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            });
        }
    );
});

/**
 * @description 删除用户
 * @param {id}
 * @url /user/delete
 * @return {}
 */
router.delete("/delete", async function (req, res, next) {
    userService.delete(req, res, next).then(
        (result) => {
            res.json({
                code: "0",
                msg: result,
            });
        },
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            });
        }
    );
});

/**
 * @description 更新用户密码
 * @param {id, password}
 * @url /user/updatePassword
 * @return {}
 */
router.put("/updatePassword", async function (req, res, next) {
    userService.updatePassword(req, res, next).then(
        (result) => {
            res.json(
                res.json({
                    code: "0",
                    msg: result,
                })
            );
        },
        (e) => {
            res.json({
                code: "1",
                msg: e.name + ": " + e.message,
            });
        }
    );
});

/**
 * @description 根据id查找用户
 * @param {id}
 * @url /user/findOneById
 * @return {}
 */
router.get("/findOneById", function (req, res, next) {
    userService.findOneById(req, res, next).then((result) => {
        res.send(result);
    });
});

/**
 * @description 根据name查找用户
 * @param {name}
 * @url /user/findOneByName
 * @return {}
 */
router.get("/findOneByName", function (req, res, next) {
    userService.findOneByName(req, res, next).then((result) => {
        res.send(result);
    });
});

/**
 * @description 查找所有用户
 * @param {}
 * @url /user/findAll
 * @return {}
 */
router.get("/findAll", function (req, res, next) {
    userService.findAll(req, res, next).then((result) => {
        res.send(result);
    });
});

router.post("/test", function (req, res, next) {
    user = req.body;
    res.cookie("signed", true, { httpOnly: true, maxAge: 1000 });
    req.session.role = "student";
    res.send("success");
});

export default router;
