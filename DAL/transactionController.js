const mongoose = require("mongoose");
const Transaction = require("../model/transaction");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Successfully connected to database"))
  .catch(err => {
    console.log(err);
  });

//Transactions

// Get all
const getAllTransactions = (req, res) => {
  Transaction.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(posts);
  });
};

// Get one
const getOneTransaction = (req, res) => {
  id = req.params.id;
  Transaction.findById(id)
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Cannot find transaction item" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add budget
const addTransaction = (req, res) => {
  const transaction = new Transaction({
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
    name: req.body.name,
    budgetId: req.body.budgetId
  });
  transaction
    .save()
    .then(result => {
      res.status(201).json({
        message: "Successfully added transaction item",
        newTransaction: result
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

// Update budget
const updateTransaction = (req, res) => {
  id = req.params.id;
  Transaction.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(result => {
      res.status(200).json({
        message: "Successfully updated budget item",
        updatedBudget: result
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

// Delete budget
const deleteTransaction = (req, res) => {
  id = req.params.id;
  Transaction.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        res.status(200).json({
          message: "Successfully deleted budget item",
          deletedBudget: result
        });
      } else {
        res.status(404).json({ message: "budget item not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  getAllTransactions,
  getOneTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
