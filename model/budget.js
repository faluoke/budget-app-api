const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Budget", budgetSchema);
