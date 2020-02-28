var express = require("express");
var router = express.Router();
const DAL = require("../DAL/transactionController");

// GET budgets
router.get("/transactions", (req, res) => {
  DAL.getAllTransactions(req, res);
});

router.get("/transaction/:id", (req, res) => {
  DAL.getOneTransaction(req, res);
});

router.post("/transaction/create", (req, res) => {
  DAL.addTransaction(req, res);
});

router.put("/transaction/update/:id", (req, res) => {
  DAL.updateTransaction(req, res);
});

router.delete("/transaction/delete/:id", (req, res) => {
  DAL.deleteTransaction(req, res);
});

module.exports = router;
