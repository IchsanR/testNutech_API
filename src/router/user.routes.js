const express = require("express");
const {
	userDetail,
	allUser,
	registerUser,
	loginUser,
} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter
	.get("/user/:id_user", userDetail)
	.get("/user", allUser)
	.post("/register", registerUser)
	.post("/login", loginUser);

module.exports = userRouter;
