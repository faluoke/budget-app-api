const mongoose = require("mongoose");
const Budget = require("../model/budget");
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

// Get all
const getAllBudget = (req, res) => {
  Budget.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    res.status(200).json(posts);
  });
};

// Get one
const getOneBudget = (req, res) => {
  id = req.params.id;
  Budget.findById(id)
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Cannot find budget item" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add budget
const addBudget = (req, res) => {
  const budget = new Budget({
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount
  });
  budget
    .save()
    .then(result => {
      res
        .status(200)
        .json({ message: "Successfully added budget item", newBudget: result });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

// Update budget
const updateBudget = (req, res) => {
  id = req.params.id;
  Budget.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
const deleteBudget = (req, res) => {
  id = req.params.id;
  Budget.findByIdAndDelete(id)
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
  getAllBudget,
  getOneBudget,
  addBudget,
  updateBudget,
  deleteBudget
};
