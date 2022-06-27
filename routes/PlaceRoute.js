const Router = require("express").Router();
const placeRouter = require("../controllers/PlaceController");

Router.get("/:estab",placeRouter.PlacesByEstab);
Router.get("/keyword/:keyword",placeRouter.PlacesByKeyword);


module.exports = Router;