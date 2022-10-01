const express = require("express");
const router = express.Router();
const UserAuthController = require("../controllers/auth.controller");
const checkuserauthmiddleware = require("../middlewares/auth.middleware");

// Express Public Routes
router.post("/registeruser",UserAuthController.registerUser)
router.post("/loginuser",UserAuthController.loginUser)
router.post("/sendpaswordresetemail",UserAuthController.sendPasswordResetEmailToUser)
router.post("/resetpassword/:id/:token",UserAuthController.resetUserPassword)

// Express Auth Middleware -  To Protect Private Routes
// Express Route Level Middleware - To Protect Private Route
router.use("/changepassword",checkuserauthmiddleware)
router.use("/getloggedinuserinfo",checkuserauthmiddleware)

// Express Private Routes
router.post("/changepassword",UserAuthController.changeUserPassword)
router.get("/getloggedinuserinfo",UserAuthController.getLoggedInUserInfo)

module.exports = router
