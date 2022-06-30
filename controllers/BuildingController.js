const Building = require("../models/Building");

const BuildingByEstab = (req,res)=>{
    Building.find({id : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch(()=>{
        res.status(500).json("error occured while fetching Buildings !");
    })
}

const BuildingByKeyword = (req,res)=>{
    Building.find({"description" : {$regex : req.params.keyword}}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}
module.exports = {
    BuildingByEstab,
    BuildingByKeyword
}