const { default: mongoose } = require("mongoose");
const Link = require("./../models/Link");
const Vehicle = require("./../models/Vehicle");
const VehicleOwner = require("./../models/VehicleOwner");

exports.createLink = async (req, res) => {
  const { vehicleId, ownerId, plateNumber } = req.body;
  const link = new Link({
    vehicleId,
    ownerId,
    plateNumber,
  });
  try {
    await link.save();

    await Vehicle.findByIdAndUpdate(
      mongoose.Types.ObjectId(vehicleId),
      {
        plateNumber,
      },
      function (err, vehicle) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated vehicle : ", vehicle);
        }
      }
    );
    res.status(201).send(link);
  } catch (error) {
    res.status(400).send(error);
  }
};
