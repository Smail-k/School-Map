const Router = require("express").Router();
const buildingController = require("../controllers/BuildingController");

Router.get("/:estab",buildingController.BuildingByEstab);
Router.get("/keyword/:keyword/:estab",buildingController.BuildingByKeyword);
Router.get("/delete/:id",buildingController.remove);


module.exports = Router;