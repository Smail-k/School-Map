const Router = require("express").Router();
const EstablishmentController = require("../controllers/EstablishmentController");
const {CheckPresidenceAuthorisation} =require("../middleware/authMiddleware")

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

Router.get("/add",CheckPresidenceAuthorisation,EstablishmentController.add);
Router.post("/add",[uploadMultiple,CheckPresidenceAuthorisation],EstablishmentController.addEstablishment);

Router.get("/edit/:id",EstablishmentController.edit);
Router.post("/edit/:id",[uploadMultiple,CheckPresidenceAuthorisation],EstablishmentController.editEstab);
Router.get("/delete/:id",CheckPresidenceAuthorisation,EstablishmentController.remove);

Router.get("/establishments",EstablishmentController.getEstablishments);
Router.get("/establishmentsJson",EstablishmentController.getEstablishmentsJson);
Router.get("/:id",EstablishmentController.getEstablishmentById);


module.exports = Router;