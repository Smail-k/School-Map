const express = require("express"); 
const mongoose = require("mongoose"); 
const cookieParser = require("cookie-parser");
const place = require("./models/Place")
const establishmentRouter = require("./routes/EstablishmentRoute");
const placeRouter = require("./routes/PlaceRoute");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//connect to mongodb
const dbURI = process.env.MONGOURI;
mongoose.connect(dbURI,{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>{
    app.listen(port)
    console.log("connected successfully !!")
})
    .catch((err)=>console.log(err)); 

app.set("view engine","ejs");

//middlware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true})); 
app.use(cookieParser()); 
app.use(express.json());


app.use("/establishment",establishmentRouter);
app.use("/place",placeRouter);


app.get("/",(req,res)=>{
    // place.find().then((places)=>{
    //     res.render("Home",{title : "map view",places : places});
    // }).catch((err)=>{
    //     res.status(500).json("erreur lors de chargement des emplacements !")
    // })
    res.redirect("/establishment/establishments");
}); 