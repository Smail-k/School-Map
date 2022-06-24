const Router = require("express").Router();
const EstablishmentController = require("../controllers/EstablishmentController");

Router.get("/establishments",EstablishmentController.getEstablishments);
Router.get("/establishmentsJson",EstablishmentController.getEstablishmentsJson);
Router.get("/:id",EstablishmentController.getEstablishmentById);


module.exports = Router;