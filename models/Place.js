const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const placeSchema = new Schema({
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
    establishment : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Establishment'
    }    
});

const place = mongoose.model('Place',placeSchema);
module.exports=place; 