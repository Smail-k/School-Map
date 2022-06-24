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

module.exports = {
    getEstablishments,
    getEstablishmentById,
    getEstablishmentsJson
}
