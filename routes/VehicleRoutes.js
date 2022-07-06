const express = require("express");
const authController = require("../controllers/authController");
const { registerDefinition, registerDefinitions } = require("swaggiffy");
const VehicleController = require("./../controllers/VehicleController");
const router = express.Router();

router
  .route("/register")
  .post(authController.protect, VehicleController.registerVehicle);
router.route("/getall").get(VehicleController.getVehicles);

router.delete("/remove", VehicleController.removeAll);

registerDefinition(router, {
  tags: "Polls",
  mappedSchema: "vehicles",
  basePath: "/api/vehicles",
});
module.exports = router;
