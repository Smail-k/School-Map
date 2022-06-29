const User = require("../models/User");
const jwt = require("jsonwebtoken");

function errorHandler(err){
    console.log("*****************************"+err.message+err.code+"******************************************"); 
    let errors = {email : "" , password :""}
    if(err.message.includes("User validation failed")){
        //console.log(Object.values(err.errors)[0].path); 
        Object.values(err.errors).forEach(error =>{
            errors[error.path]=error.message; 
        }) 
    }else if(err.code==11000){
        errors['email']= "ce email est deja lié a un ancien compte"; 
    }
    else if(err.message.includes("incorrect password"))
        errors["password"]="mot de passe incorrecte";
    else 
        errors["email"]="email incorrecte";
    return errors;
}
const addUser = (req,res)=>{
    const user = new User({
        name : req.body.name,
        email : req.body.email ,
        username : req.body.username,
        password : req.body.password
    }); 
    user.save().then(()=>{
        const token = createToken(user._id);
        res.cookie("jwt",token,{ httpOnly : true, maxAge : maxAge}); 
        res.status(200).redirect("/users/login");
    }).catch((err)=>{
        let errors = errorHandler(err);
        res.status(400).json(errorHandler(error));
    })
}


const checkUser= async (req,res) => {
    const emailUser= req.body.email; 
    const passwordUser = req.body.password;  
    console.log(emailUser+"-------------")
    try {
        const user = await User.login(emailUser,passwordUser); 
        const token =createToken(user._id);
        res.cookie("jwt",token,{httpOnly : true,maxAge : maxAge*1000});
        res.status(200).json({user : user._id}); 
    } catch (error) {
        //console.log(error);
        res.status(401).json(errorHandler(error));
    }
}

const logOut_get = (req,res)=>{
    res.cookie("jwt","",{maxAge : 1}); 
    res.redirect("/");
}

const login= (req,res)=>{
    res.render("Home",{title:"login"}); 
}
const register= (req,res)=>{
    res.render("Register",{title:"register"}); 
}
const maxAge = 1 * 24 * 60 * 60; 
const createToken= (id) =>{
    return jwt.sign({ id },"smail li kayn",{
        expiresIn : maxAge
    }); 
}

module.exports = {
    addUser,
    checkUser,
    logOut_get,
    login,
    register
}