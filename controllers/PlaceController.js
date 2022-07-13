const Place = require("../models/Place");
const Building = require("../models/Building");
const Estab = require("../models/Establishment");


const PlacesByEstab = (req,res)=>{
    Place.find({establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}

const PlacesByKeyword = (req,res)=>{
    Place.find({"description" : {$regex : req.params.keyword},establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}

const add = (req,res)=>{
   res.render("CreateMarker");
}

const addPlace = (req,res)=>{
    console.log(req.files.image[0].originalname+"---")
    if(req.body.type == "place"){
        let place = new Place({
            name : req.body.title, 
            marker : req.files.marker[0].originalname,
            image : req.files.image[0].originalname,
            description : req.body.description,
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            establishment : req.body.etab
        }); 
        place.save().then(()=>{
            res.redirect("/place/add");
        }).catch((err)=>{
            res.json("error adding this place");
        })
    }else if(req.body.type == "batiment"){
        //res.json(req.body.floorsCount+"----");
        let floorsCount = req.body.floorsCount;
        let floors = [];
        let j=0;
        for (let i = 0; i < floorsCount; i++) {
            floors[j]= {
                classroomsCount : req.body.floors[i],
                description : req.body.floors[i+1]
            }
            i++;
            j++;
        }
        //res.json(floors[1].description+"----")
        console.log(req.files);
        let building = new Building({
            name : req.body.title, 
            marker : req.files.marker[0].originalname,
            image : req.files.image[0].originalname,
            description : req.body.description,
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            floors : floors,
            establishment : "62b447937e035e19280a00de"
        }); 
        building.save().then(()=>{
            res.render("CreateMarker");
        }).catch((err)=>{
            res.json("error adding this place");
        })
    }else{

    }
 }
 const remove = (req,res)=>{
    console.log(req.params.id+"******")
    Place.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/establishment/establishments");
    }).catch((err)=>{
        res.json("error adding this place");
    })
}

module.exports = {
    PlacesByEstab,
    PlacesByKeyword,
    add,
    addPlace // post action
    ,remove
}
