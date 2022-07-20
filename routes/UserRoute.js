const express= require("express"); 
const usersRouter=express.Router();
const userController = require("../controllers/UserController");
const {CheckPresidenceAuthorisation} =require("../middleware/authMiddleware")


usersRouter.get("/login",userController.login);
usersRouter.post("/register/",CheckPresidenceAuthorisation,userController.addUser);
usersRouter.get("/register",CheckPresidenceAuthorisation,userController.register);
usersRouter.post("/login",userController.checkUser); 
usersRouter.get("/logout",userController.logOut_get);


module.exports=usersRouter; 