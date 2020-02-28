const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
  name: { type: String, required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);
