const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const EstablishmentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    longitude : {
        type : String,
        required : true
    },
    latitude : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image :{
        type : String, 
    },   
});

const establishment = mongoose.model('Establishment',EstablishmentSchema);
module.exports=establishment; 