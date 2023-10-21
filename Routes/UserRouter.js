const express = require("express");
const { createUser, signIn ,getUserProfile } = require("../controller/UserController");
const Router = express.Router();

Router.post("/signup", createUser).post("/signin", signIn).get("/me" , getUserProfile)

module.exports = { UserRouter: Router };
