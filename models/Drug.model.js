const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  recipe: Boolean,
  image: String,
  description: String,
});

const Medicine = mongoose.model("Drug", medicineSchema);

module.exports = Medicine;
