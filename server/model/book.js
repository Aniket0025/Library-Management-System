const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);