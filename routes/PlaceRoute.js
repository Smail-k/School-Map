const Router = require("express").Router();
const placeRouter = require("../controllers/PlaceController");

Router.get("/:estab",placeRouter.PlacesByEstab);


module.exports = Router;