const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema : which provides the the structure to the database  in that pertucular structure the data stores
const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
