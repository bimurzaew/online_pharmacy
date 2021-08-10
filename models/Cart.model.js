const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  drugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drug",
    },
  ],
  total:Number,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
