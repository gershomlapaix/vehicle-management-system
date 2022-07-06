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
    const createdVehicle = await Vehicle.create({
      chasisNumber,
      manufacturingCompany,
      manufacturingYear,
      modelName,
    });
  } catch (err) {
    console.log("Something went wrong", err);
  }

  res.json({ message: `New vehicle created` }).status(201);
};
