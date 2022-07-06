const express = require("express");
const { registerDefinition, registerDefinitions } = require("swaggiffy");
const VehicleOwnerController = require("./../controllers/VehicleOwnerController");
const router = express.Router();

router.route("/register").post(VehicleOwnerController.registerVegicleOwner);
router.route("/getall").get(VehicleOwnerController.getOwners);

router.delete("/remove", VehicleOwnerController.removeAll);

registerDefinition(router, {
  tags: "Vehicle owners",
  mappedSchema: "owners",
  basePath: "/api/vehicles/owner",
});
module.exports = router;
