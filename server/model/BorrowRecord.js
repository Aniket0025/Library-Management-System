const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "issued", "returned", "rejected"],
      default: "requested",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    issueDate: Date,
    dueDate: Date,
    returnDate: Date,
    fine: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowRecord", borrowRecordSchema);