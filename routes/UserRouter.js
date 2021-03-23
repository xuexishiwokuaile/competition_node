import { Router } from "express";
var router = Router();
import User from "../model/User.js";

router.use(function(req,res,next) {
  if (req.session) {
    console.log("session",req.session.role);
  }
  next();
})
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/find",function(req,res,next) {
  console.log(req.session.role);
  res.send("success");
})

router.post("/add",function(req,res,next) {
  var user = new User();
  user = req.body;
  res.cookie("signed",true,{httpOnly:true,maxAge:1000});
  req.session.role = "student";
  res.send("success");
})

export default router;
