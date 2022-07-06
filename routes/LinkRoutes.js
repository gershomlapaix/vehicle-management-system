const express = require("express");
const LinkController = require("./../controllers/LinkController");
const router = express.Router();

router.route("/").post(LinkController.createLink).get(LinkController.getLinks);
router.delete("/remove", LinkController.removeAll);

module.exports = router;
