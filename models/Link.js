const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "vehicleOwner"
  },

  vehicleId: {
    type: mongoose.Types.ObjectId,
    ref: "vehicles",
  },

  plateNumber: {
    type: String,
  },
});

const Link = mongoose.model("links", linkSchema);

module.exports = Link;
