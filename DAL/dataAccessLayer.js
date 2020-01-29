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
  id = req.params.budgetId;
  Budget.findById(id)
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "cannot find budget" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = { getAllBudget, getOneBudget };
