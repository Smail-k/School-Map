const Router = require("express").Router();
const buildingController = require("../controllers/BuildingController");

Router.get("/:estab",buildingController.BuildingByEstab);


module.exports = Router;