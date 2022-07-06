const mongoose = require("mongoose");

const vehicleOwnerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      maxlength: 16,
      minlength: 16,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 13,
      minlength: 13,
    },

    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VehicleOwner = mongoose.model("vehicleOwner", vehicleOwnerSchema);
module.exports = VehicleOwner;
