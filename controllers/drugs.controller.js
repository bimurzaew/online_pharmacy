const path = require("path");
const Drug = require("../models/Drug.model");
const Cart = require("../models/Cart.model");
const Category = require("../models/Category.model");

module.exports.drugsController = {
  addDrug: async (req, res) => {
    try {
      const { image } = req.files;
      const newFileName = `/images${Math.floor(
        Math.random() * 1000
      )}${path.extname(image.name)}`;

      await image.mv(`./public${newFileName}`, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await Drug.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            recipe: req.body.recipe,
            image: newFileName,
            description: req.body.description,
          });
          image.save();
        }
      });
      res.send("drug has been added");
    } catch (err) {
      console.log(err);
    }
  },
  updateDrug: async (req, res) => {
    try {
      await Drug.findByIdAndUpdate(req.params.id, req.body);
      res.send("drug has been updated");
    } catch (err) {
      console.log(err);
    }
  },
  deleteDrug: async (req, res) => {
    try {
      await Drug.findByIdAndDelete(req.params.id);
      res.redirect("/user/cart");
    } catch (err) {
      console.log(err);
    }
  },
  getDrugs: async (req, res) => {
    try {
      const { page = 1, limit = 6 } = req.query;
      const categories = await Category.find().lean();
      const drugs = await Drug.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();
      res.render("home", {
        drugs,
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDrugById: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      const drug = await Drug.findById(req.params.id).lean();
      res.render("the_drug", {
        drug,
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getDrugsByCategory: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      const drug = await Drug.find({ category: req.params.id }).lean();
      res.render("drugs_category", {
        drug,
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
