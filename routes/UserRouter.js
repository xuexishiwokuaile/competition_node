import { Router ***REMOVED*** from "express";
var router = Router();
import User from "../model/User.js";

router.use(function(req,res,next) {
  if (req.session) {
    console.log("session",req.session.role);
  ***REMOVED***
  next();
***REMOVED***)
***REMOVED*** GET users listing.***REMOVED***
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
***REMOVED***

router.get("/find",function(req,res,next) {
  console.log(req.session.role);
  res.send("success");
***REMOVED***)

router.post("/add",function(req,res,next) {
  var user = new User();
  user = req.body;
  res.cookie("signed",true,{httpOnly:true,maxAge:1000***REMOVED***
  req.session.role = "student";
  res.send("success");
***REMOVED***)

export default router;
