const User = require("../model/user");
const validation = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { error } = validation.validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exist" });
  // After passing above validation
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json({ message: "Successfully registered user" });
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { error } = validation.validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(401)
      .json({ message: "Email or password does not match" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(401)
      .json({ message: "Email or password does not match" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "600s",
  });
  res.header("auth-token", token);

  res.status(200).json({
    message: `${user.firstName} ${user.lastName} is logged in successfully`,
    token: token,
    email: req.body.email,
  });
};

const getAuthStatus = (req, res) => {
  res.status(200).json({
    message: "Successfully Authenticated",
    authenticated: true,
  });
};

module.exports = { registerUser, loginUser, getAuthStatus };
