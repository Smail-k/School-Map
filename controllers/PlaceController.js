const Place = require("../models/Place");

const PlacesByEstab = (req,res)=>{
    Place.find({establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}


module.exports = {
    PlacesByEstab,
}
