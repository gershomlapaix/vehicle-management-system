const express = require("express");
const { registerDefinition, registerDefinitions } = require("swaggiffy");
const pollingController = require("./../controllers/pollingController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("ADMIN"),
    pollingController.createPolling
  )
  .get(pollingController.getCandidates);

router.route("/:id").get(pollingController.getOneCandidate);

router
  .route("/recorded/:id")
  .get(authController.protect, pollingController.recordedVoters);
router
  .route("/makevote/:id/candidate/:candidateId")
  .patch(authController.protect, pollingController.vote);

router.delete(
  "/delete",
  authController.protect,
  authController.restrictTo("ADMIN"),
  pollingController.deletePolls
);

registerDefinition(router, {
  tags: "Polls",
  mappedSchema: "polls",
  basePath: "/api/vote",
});
module.exports = router;
