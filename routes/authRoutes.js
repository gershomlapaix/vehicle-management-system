const express = require("express");
// const authController = require("../controllers/authController");
const { registerDefinition, registerDefinitions } = require("swaggiffy");
const userController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/register")
  .post(userController.register);

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
