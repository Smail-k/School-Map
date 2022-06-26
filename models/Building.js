const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const BuildingSchema = new Schema({
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
    marker :{
        type : String,
        required : true 
    },
    image :{
        type : String, 
    },
    floors : [ {
        classroomsCount : Number,
        description : String,
    }],
    establishment : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Establishment'
    } 
});

const building = mongoose.model('Building',BuildingSchema);
module.exports=building; 