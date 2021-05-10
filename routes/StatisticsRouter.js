/*
 * @Author: chenanran
 * @Date: 2021-05-09 19:31:52
 */

import { Router } from "express";
const router = Router();

router.get("/findLineChartDataByCom", async function (req, res, next) {
    const lineChartData = [];
    for (let i = 0; i < 7; i += 1) {
        lineChartData.push({
            x: new Date("May 5, 2021").getTime() + 1000 * 60 * 60 * 24 * i,
            y1: Math.floor(Math.random() * 10) + 10,
            y2: Math.floor(Math.random() * 10) + 10,
        });
    }
    res.send(lineChartData);
});

router.get("/findTypeData", async function (req, res, next) {
    res.send(
        [{
            x: "数学",
            y: 90,
        },
        {
            x: "物理",
            y: 66,
        },
        {
            x: "化学",
            y: 62,
        },
        {
            x: "生物",
            y: 46,
        },
        {
            x: "计算机",
            y: 116,
        }]
    );
});

export default router;
