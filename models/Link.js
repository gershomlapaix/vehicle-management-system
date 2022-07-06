const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "vehicleOwner",
    required: true,
  },

  vehicleId: {
    type: mongoose.Types.ObjectId,
    ref: "vehicles",
  },

  plateNumber: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model("links", linkSchema);

module.exports = Link;
