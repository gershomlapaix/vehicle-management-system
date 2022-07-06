const Vehicle = require("../models/Vehicle");

exports.registerVehicle = async (req, res) => {
  const {
    chasisNumber,
    manufacturingCompany,
    manufacturingYear,
    price,
    plateNumber,
    modelName,
  } = req.body;

  const createdVehicle = await Vehicle.create({
    chasisNumber,
    manufacturingCompany,
    manufacturingYear,
    price,
    plateNumber,
    modelName,
  });

  res.json({ message: `New vehicle created` }).status(201);
};
