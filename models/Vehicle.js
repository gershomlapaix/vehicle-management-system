const mongoose = require("mongoose");
const { registerSchema, registerSchemas } = require("swaggiffy");

const vehicleSchema = new mongoose.Schema({
  chasisNumber: {
    type: String,
    required: true,
  },
  manufacturingCompany: {
    type: String,
    required: true,
  },
  manufacturingYear: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  plateNumber: {
    type: String,
  },
  modelName: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("vehicles", vehicleSchema);
registerSchema("vehicles", vehicleSchema, { orm: "mongoose" });

module.exports = Vehicle;
