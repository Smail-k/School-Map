const Place = require("../models/Place");

const PlacesByEstab = (req,res)=>{
    Place.find({establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}

const PlacesByKeyword = (req,res)=>{
    Place.find({"description" : {$regex : req.params.keyword}}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}


module.exports = {
    PlacesByEstab,
    PlacesByKeyword
}
