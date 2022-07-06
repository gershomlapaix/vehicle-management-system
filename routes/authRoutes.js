const express = require("express");
const { registerDefinition, registerDefinitions } = require("swaggiffy");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/register").post(userController.register);

// define the swgger document for this API

router.route("/getAllUsers").get(userController.getAllUsers);

router.post("/login", userController.signin);
router.get("/in", userController.checkLogin);

router.patch("/update/:id", userController.updateUser);

// docker routes definition
registerDefinition(router, {
  tags: "Users",
  mappedSchema: "User",
  basePath: "/api/users",
});
module.exports = router;
