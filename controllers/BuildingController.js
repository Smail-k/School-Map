const Building = require("../models/Building");

const BuildingByEstab = (req,res)=>{
    Building.find({id : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch(()=>{
        res.status(500).json("error occured while fetching Buildings !");
    })
}

module.exports = {
    BuildingByEstab
}