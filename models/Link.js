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
});
