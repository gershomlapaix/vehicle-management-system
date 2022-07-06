const express = require("express");
const VehicleController = require("./../controllers/VehicleController");
const router = express.Router();

router.route("/").post(VehicleController.registerVehicle);

module.exports = router
