const Router = require("express").Router();
const buildingController = require("../controllers/BuildingController");

const multer = require("multer");
 
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
       
        cb(null,'./public');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage : storage});
var uploadMultiple = upload.fields([{ name: 'marker', maxCount: 10 }, { name: 'image', maxCount: 10 }])


Router.get("/:estab",buildingController.BuildingByEstab);
Router.get("/keyword/:keyword/:estab",buildingController.BuildingByKeyword);
Router.get("/delete/:id",buildingController.remove);
Router.get("/edit/:id",buildingController.edit);
Router.post("/edit/:id",uploadMultiple,buildingController.editBuilding);


module.exports = Router;