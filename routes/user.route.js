const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

//user routes

//get user info : auth check
router.get("/me", authMiddleware, userController.getUserInfo);

module.exports = router;
