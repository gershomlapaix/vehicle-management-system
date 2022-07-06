const express = require("express");
const VehicleOwnerController = require("./../controllers/VehicleOwnerController");
const router = express.Router();

router.route("/").post(VehicleOwnerController.registerVegicleOwner);

module.exports = router;
