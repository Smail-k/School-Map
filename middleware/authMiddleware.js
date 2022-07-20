const jwt = require("jsonwebtoken"); 
const User = require("../models/User");

const authRequire = (req,res,next)=>{
    const token = req.cookies.jwt; 
    if(token){
        jwt.verify(token,"smail li kayn",(err,decode)=>{
            if(err){
                console.log(err); 
                res.redirect("/users/login"); 
            }else {
                console.log(decode); 
                next(); 
            }
        }); 
    }else{
        res.redirect("/users/login");
    }
}

const getUserInfo = (req,res,next)=>{
    const token = req.cookies.jwt; 
    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                console.log(err); 
                res.locals.user=null; 
                next(); 
            }else {
                console.log(decode); 
                const user = await User.findById(decode.id);
                res.locals.user=user; 
                next(); 
            }
        }); 
    }else{
        res.locals.user=null; 
        next();
    }
}
const CheckAuthorisation = (req,res,next)=>{
    const token = req.cookies.jwt; 
    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                console.log(err); 
                res.locals.user=null; 
                next(); 
            }else {
                console.log(decode); 
                const user = await User.findById(decode.id);
                console.log(user.role);
                if(user.role == "chef"){
                    res.locals.user=user; 
                    next();
                }
                else {
                    res.locals.user=null;
                    res.redirect("/establishment/establishments");
                }
                
            }
        }); 
    }else{
        res.locals.user=null; 
        next();
    }
}
const CheckPresidenceAuthorisation = (req,res,next)=>{
    const token = req.cookies.jwt; 
    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                //console.log(err); 
                res.locals.user=null; 
                next(); 
            }else {
                //console.log(decode); 
                const user = await User.findById(decode.id);
                //console.log(user.role);
                if(user.role == "presidence"){
                    res.locals.user=user; 
                    next();
                }
                else {
                    //console.log("hnaaa")
                    res.locals.user=null;
                    res.redirect("/users/login");
                }
                
            }
        }); 
    }else{
        res.locals.user=null; 
        res.redirect("/users/login");
    }
}

module.exports = {authRequire,getUserInfo,CheckAuthorisation,CheckPresidenceAuthorisation};