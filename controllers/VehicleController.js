const Vehicle = require("../models/Vehicle");

exports.registerVehicle = async (req, res) => {
  const {
    chasisNumber,
    manufacturingCompany,
    manufacturingYear,
    price,
    modelName,
  } = req.body;

  try {
    const found = await Vehicle.findOne({ chasisNumber });

    if (found) {
      res.json({ error: `Vehicle already exists` }).status(201);
      return;
    } else {
      const createdVehicle = await Vehicle.create({
        chasisNumber,
        manufacturingCompany,
        manufacturingYear,
        price,
        modelName,
      });

      res.json({ message: `New vehicle created`, createdVehicle }).status(201);
    }
  } catch (err) {
    console.log("Something went wrong", err);
  }
};

exports.getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();

  res.send(vehicles).status(200);
};

exports.removeAll = async (req, res) => {
  await Vehicle.deleteMany({});

  res.send("data deleted");
};
