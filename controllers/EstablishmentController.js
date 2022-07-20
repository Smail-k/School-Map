const Establishment = require("../models/Establishment");

const getEstablishments = (req,res)=>{
    Establishment.find().then((result)=>{
        res.status(200).render("Index",{title : "map View",places : result})
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}
const getEstablishmentById = (req,res)=>{
    Establishment.findOne({id : req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}
const getEstablishmentsJson = (req,res)=>{
    Establishment.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.json("error occured while fetching establishments !!");
    })
}
const edit = (req,res)=>{
    Establishment.findOne({ _id : req.params.id }).then((result)=>{
        if(result == undefined)
            res.redirect("/establishment/establishments");
        else
            res.render("ModifyMarker",{place : result })
    }).catch((err)=>{
        res.json("error modifing this place");
    })
}
const editEstab = async (req,res)=>{
    let p = await Establishment.findOne({ _id : req.params.id });
    p.name = req.body.title;
    if(req.files.marker)
        p.marker = req.files.marker[0].originalname;
    if(req.files.image)
        p.image = req.files.image[0].originalname;
    p.description = req.body.description;
    p.longitude = req.body.longitude;
    p.latitude = req.body.latitude;

    p.save().then(()=>{
        res.redirect("/establishment/establishments");
    }).catch(()=>{
        res.json("error occured while trying to modify this place , try again later !")
    })
}
const add = (req,res)=>{
    res.render("CreateMarker",{type : "estab"});
}
const addEstablishment = (req,res)=>{
    let estab = new Establishment({
        name : req.body.title, 
        marker : req.files.marker[0].originalname,
        image : req.files.image[0].originalname,
        description : req.body.description,
        longitude : req.body.longitude,
        latitude : req.body.latitude
    });
    estab.save().then(()=>{
        res.status(200).redirect("/establishment/add");
    }).catch((err)=>{
        res.status(500).json("error adding this estab , please try again later");
    })
}
const remove = (req,res)=>{
    Establishment.findByIdAndRemove(req.params.id).then(()=>{
        res.redirect("/establishment/establishments");
    }).catch((err)=>{
        res.json("error adding this place");
    })
}
module.exports = {
    getEstablishments,
    getEstablishmentById,
    getEstablishmentsJson,
    edit,
    editEstab,
    add,
    addEstablishment,
    remove
}
