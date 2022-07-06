const VehiclerOwner = require("../models/VehicleOwner");

exports.registerVegicleOwner = async (req, res) => {
  const { firstName, lastName, nationalId, phoneNumber, address } = req.body;

  try {
    const found = await VehiclerOwner.findOne({ nationalId, phoneNumber });

    if (found) {
      res.json({ error: `Vehicle owner already exists` }).status(201);
      return;
    } else {
      const newVehicleOwner = await VehiclerOwner.create({
        firstName,
        lastName,
        nationalId,
        phoneNumber,
        address,
      });

      res.json({ message: `New vehicle owner created` }).status(201);
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
};

exports.getOwners = async (req, res) => {
  const carsOwners = await VehiclerOwner.find();

  res.send(carsOwners).status(200);
};

exports.removeAll = async (req, res) => {
  await VehiclerOwner.deleteMany({});

  res.send("data deleted");
};
