var express = require("express");
var router = express.Router();
const DAL = require("../DAL/userController");

router.post("/register", (req, res) => {
  DAL.registerUser(req, res);
});

router.post("/login", (req, res) => {
  DAL.loginUser(req, res);
});

router.get("/", require("../middlewares/verifyToken"), (req, res) => {
  DAL.getAuthStatus(req, res);
});

module.exports = router;
