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
    Place.find({"description" : {$regex : req.params.keyword,"$options": "i"},establishment : req.params.estab}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}

const add = (req,res)=>{
   res.render("CreateMarker",{type : "place"});
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
        let building = new Building({
            name : req.body.title, 
            marker : req.files.marker[0].originalname,
            image : req.files.image[0].originalname,
            description : req.body.description,
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            floors : floors,
            establishment : req.body.etab
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
const edit = (req,res)=>{
    console.log(req.params.id+"******")
    Place.findOne({ _id : req.params.id }).then((result)=>{
        if(result == undefined)
            res.redirect("/establishment/establishments");
        else
            res.render("ModifyMarker",{place : result })
    }).catch((err)=>{
        res.json("error adding this place");
    })
}
const editPlace = async (req,res)=>{
    let p = await Place.findOne({ _id : req.params.id });
    p.name = req.body.title;
    if(req.files.marker)
        p.marker = req.files.marker[0].originalname;
    if(req.files.image)
        p.image = req.files.image[0].originalname;
    p.description = req.body.description;
    p.longitude = req.body.longitude;
    p.latitude = req.body.latitude;
    p.establishment = req.body.etab;

    p.save().then(()=>{
        res.redirect("/establishment/establishments");
    }).catch(()=>{
        res.json("error occured while trying to modify this place , try again later !")
    })
}
module.exports = {
    PlacesByEstab,
    PlacesByKeyword,
    add,
    addPlace, // post action
    remove,
    edit,
    editPlace
}
