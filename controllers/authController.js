const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/User");

const signToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const createToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("vmsToken", token, {
    secure: false,
    httpOnly: true,
  });

  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res) => {
  const { names, email, password, nationalId, phoneNumber } = req.body;

  const user = await User.findOne({ nationalId, phoneNumber,email });

  try {
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    } else {
      const newUser = await User.create({
        names,
        email,
        password,
      });
  
      res.json({ message: `New user created` }).status(201);
    }
  } catch (err) {
    console.log("something went wrong",err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Please provide email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new Error("Incorrect email or password"));
  }

  req.user = user;
  createToken(user, 200, req, res);
};

exports.protect = async (req, res, next) => {
  let token = "";
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.vmsToken) {
      token = req.cookies.vmsToken;
    }

    if (!token) {
      return next(new Error("You're not logged in.", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const properUser = await User.findById(decoded.id);
    if (!properUser) {
      return next(new Error("The token belongs to this user diminished."));
    }

    req.user = properUser;
    next();
  } catch (err) {
    console.error(err);
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const token = req.cookies.vmsToken;
    if (!token) return res.json(false);

    await promisify(jwt.verify)(req.cookies.vmsToken, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({ users }).status(200);
};

exports.updateUser = async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { role: "ADMIN" });

  res.status(204).json({
    status: "success",
  });
};


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    next();
  };
};