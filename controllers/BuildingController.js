const building = require("../models/Building");
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

const edit = (req,res)=>{
    Building.findOne({ _id : req.params.id }).then((result)=>{
        if(result == undefined)
            res.redirect("/establishment/establishments");
        else
            res.render("ModifyMarker",{place : result })
    }).catch((err)=>{
        res.json("error adding this place");
    })
}
const editBuilding = async (req,res)=>{
    let floorsCount = req.body.floorsCount;
    let floors = [];
    let j=0;
    for (let i = 0; i < floorsCount; i++) {
        floors[i]= {
            classroomsCount : req.body.floors[j],
            description : req.body.floors[j+1]
        }
        j+=2;
    }
    console.log("-----------------------------------"+floorsCount)
    let p = await Building.findOne({ _id : req.params.id });
    p.name = req.body.title;
    if(req.files.marker)
        p.marker = req.files.marker[0].originalname;
    if(req.files.image)
        p.image = req.files.image[0].originalname;
    p.description = req.body.description;
    p.longitude = req.body.longitude;
    p.latitude = req.body.latitude;
    p.establishment = req.body.etab;
    p.floors = floors;

    p.save().then(()=>{
        res.redirect("/establishment/establishments");
    }).catch(()=>{
        res.json("error occured while trying to modify this place , try again later !")
    })
}
module.exports = {
    BuildingByEstab,
    BuildingByKeyword,
    remove,
    edit,
    editBuilding
}