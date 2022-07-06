const { default: mongoose } = require("mongoose");
const Link = require("./../models/Link");
const Vehicle = require("./../models/Vehicle");

exports.createLink = async (req, res) => {
  const { vehicleId, ownerId, plateNumber } = req.body;
  try {
    const found = await Link.findOne({ plateNumber });

    if (found) {
      return res.status(400).json({
        status: "fail",
        message: "Link already exists",
      });
    }
    const newLink = await Link.create({
      ownerId,
      vehicleId,
      plateNumber,
    });
    res.send(newLink).status(201);

    const doc = await Vehicle.findByIdAndUpdate(
      vehicleId,
      { plateNumber },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ status: "success", data: { doc } });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getLinks = async (req, res) => {
  const links = await Link.find();
  res.send(links).status(200);
};

exports.removeAll = async (req, res) => {
  await Link.deleteMany({});

  res.send("data deleted");
};
