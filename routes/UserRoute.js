const express= require("express"); 
const usersRouter=express.Router();
const userController = require("../controllers/UserController");


usersRouter.get("/login",userController.login);
usersRouter.post("/register",userController.addUser); 
usersRouter.post("/login",userController.checkUser); 
usersRouter.get("/logout",userController.logOut_get);


module.exports=usersRouter; 