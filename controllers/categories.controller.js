const Category = require("../models/Category.model");

module.exports.categoriesController = {
  addCategory: async (req, res) => {
    try {
      await Category.create({
        name: req.body.name,
      });
      res.send("category has been added");
    } catch (err) {
      console.log(err);
    }
  },
  updateCategory: async (req, res) => {
    try {
      await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      res.send("category has been updated");
    } catch (err) {
      console.log(err);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.send("category has been deleted");
    } catch (err) {
      console.log(err);
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      res.render("categories", {
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
