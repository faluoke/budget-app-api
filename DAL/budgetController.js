const Budget = require("../model/budget");
const Transaction = require("../model/transaction");
// Budgets

// Get all
const getAllBudget = (req, res) => {
  Budget.find({ userId: req.header("user-id") }, (err, posts) => {
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
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Cannot find budget item" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add budget
const addBudget = (req, res) => {
  const budget = new Budget({
    name: req.body.name,
    type: req.body.type,
    planned: req.body.planned,
    received: req.body.received,
    userId: req.body.userId,
  });
  budget
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Successfully added budget item", newBudget: result });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Update budget
const updateBudget = (req, res) => {
  id = req.params.id;
  Budget.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => {
      res.status(200).json({
        message: "Successfully updated budget item",
        updatedBudget: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// Delete budget
const deleteBudget = async (req, res) => {
  id = req.params.id;
  transactions = await Transaction.find({
    budgetId: id,
  });
  transactionIds = transactions.map((transaction) => {
    return transaction._id;
  });
  try {
    await Transaction.deleteMany({
      _id: {
        $in: transactionIds,
      },
    });
    result = await Budget.findByIdAndDelete(id);
    res.status(200).json({
      message: "Successfully deleted budget item and transactions associated.",
      budgetItem: result,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllBudget,
  getOneBudget,
  addBudget,
  updateBudget,
  deleteBudget,
};
