/*
 * @Author: chenanran
 * @Date: 2021-03-23 09:51:15
 */

import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

export default router;
