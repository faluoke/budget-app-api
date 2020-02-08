var express = require("express");
var router = express.Router();
const DAL = require("../DAL/dataAccessLayer");

// GET budgets
router.get("/budgets", (req, res) => {
  DAL.getAllBudget(req, res);
});

router.get("/budget/:id", (req, res) => {
  DAL.getOneBudget(req, res);
});

router.post("/budget/create", (req, res) => {
  DAL.addBudget(req, res);
});

router.put("/budget/update/:id", (req, res) => {
  DAL.updateBudget(req, res);
});

router.delete("/budget/delete/:id", (req, res) => {
  DAL.deleteBudget(req, res);
});

module.exports = router;
