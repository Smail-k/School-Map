const Router = require("express").Router();
const placeController = require("../controllers/PlaceController");
const midlleware =require("../middleware/authMiddleware")
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

Router.get("/add",midlleware.CheckAuthorisation,placeController.add);
Router.get("/delete/:id",midlleware.CheckAuthorisation,placeController.remove);
Router.post("/addPlace",[uploadMultiple,midlleware.CheckAuthorisation],placeController.addPlace);
Router.get("/:estab",placeController.PlacesByEstab);
Router.get("/keyword/:keyword/:estab",placeController.PlacesByKeyword);
Router.get("/edit/:id",midlleware.CheckAuthorisation,placeController.edit);
Router.post("/edit/:id",[uploadMultiple,midlleware.CheckAuthorisation],placeController.editPlace);


module.exports = Router;