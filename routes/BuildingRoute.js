const Router = require("express").Router();
const buildingController = require("../controllers/BuildingController");

Router.get("/:estab",buildingController.BuildingByEstab);
Router.get("/keyword/:keyword",buildingController.BuildingByKeyword);


module.exports = Router;