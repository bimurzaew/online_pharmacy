const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const Drug = require("../models/Drug.model");
const Category = require("../models/Category.model");

module.exports.cartsController = {
  addCart: async (req, res) => {
    try {
      await Cart.create({
        userId: req.body.userId,
        drugs: req.body.drugs,
        total: req.body.total,
      });
      res.send("cart has been added");
    } catch (err) {
      console.log(err);
    }
  },
  getCart: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      const cart = await Cart.find().lean().populate("drugs");
      res.render("cart", {
        cart,
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
  addDrugInCart: async (req, res) => {
    const drug = await Drug.findById(req.params.drugId);
    const cart = await Cart.findById(req.params.id);
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        $push: { drugs: req.params.drugId },
        total: cart.total + drug.price,
      });
      res.redirect(`/user/drug/${drug._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDrugInCart: async (req, res) => {
    const drug = await Drug.findById(req.params.drugId);
    const cart = await Cart.findById(req.params.id);
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        $pull: { drugs: req.params.drugId },
        total: cart.total - drug.price,
      });
      res.redirect(`/user/cart`);
    } catch (err) {
      console.log(err);
    }
  },
  buyDrugFromCart: async (req, res) => {
    const { id, cartId } = req.params;
    const cart = await Cart.findById(cartId);
    try {
      await User.findByIdAndUpdate(id, {
        $inc: { wallet: -cart.total },
      });
      await Cart.findByIdAndUpdate(cartId, {
        total: 0,
        drugs: [],
      });
      res.redirect("/user/cart");
    } catch (err) {
      console.log(err);
    }
  },
  cleanCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        drugs: [],
        total: 0,
      }).lean();
      res.redirect(`/user/cart`);
    } catch (err) {
      console.log(err);
    }
  },
};
