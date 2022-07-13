const Building = require("../models/Building");

const BuildingByEstab = (req,res)=>{
    Building.find({establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch(()=>{
        res.status(500).json("error occured while fetching Buildings !");
    })
}

const BuildingByKeyword = (req,res)=>{
    Building.find({"description" : {$regex : req.params.keyword},establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}
const remove = (req,res)=>{
    console.log(req.params.id+"******")
    Building.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/establishment/establishments");
    }).catch((err)=>{
        res.json("error removing this building");
    })
}
module.exports = {
    BuildingByEstab,
    BuildingByKeyword,
    remove
}