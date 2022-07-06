const VehiclerOwner = require("../models/VehicleOwner");

exports.registerVegicleOwner = async (req, res) => {
  const { firstName, lastName, nationalId, phoneNumber, address } = req.body;

  try {
    const newVehicleOwner = await VehiclerOwner.create({
      firstName,
      lastName,
      nationalId,
      phoneNumber,
      address,
    });

    res.json({ message: `New vehicle owner created` }).status(201);
  } catch (err) {
    console.log("something went wrong", err);
  }
};
