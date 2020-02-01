var express = require("express");
var router = express.Router();
const DAL = require("../DAL/dataAccessLayer");

/* GET users listing. */
router.get("/budgets", (req, res) => {
  DAL.getAllBudget(req, res);
});

router.get("/budget/:id", (req, res) => {
  DAL.getOneBudget(req, res);
});

router.post("/budget/create", (req, res) => {
  DAL.addBudget(req, res);
});

module.exports = router;
