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
    },marker :{
        type : String,
        required : true 
    },
    image :{
        type : String, 
    },
    description : {
        type : String,
        required : true
    },
     
});

const establishment = mongoose.model('Establishment',EstablishmentSchema);
module.exports=establishment; 