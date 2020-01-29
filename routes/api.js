var express = require("express");
var router = express.Router();
const DAL = require("../DAL/dataAccessLayer");

/* GET users listing. */
router.get("/budgets", function(req, res, next) {
  DAL.getAllBudget(req, res);
});

module.exports = router;
