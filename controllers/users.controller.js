const path = require("path");
const User = require("../models/User.model");
const Category = require("../models/Category.model");

module.exports.usersController = {
  addUser: async (req, res) => {
    try {
      const { image } = req.files;
      const newFileName = `/images${Math.floor(
        Math.random() * 1000
      )}${path.extname(image.name)}`;

      image.mv(`./public${newFileName}`, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await User.create({
            name: req.body.name,
            wallet: req.body.wallet,
            recipe: req.body.recipe,
            image: newFileName,
            isVaccinate: req.body.isVaccinate,
          });
          res.json("user has been added");
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const categories = await Category.find().lean();
      const user = await User.find().lean().populate("drugs", "name");
      res.render("user", {
        user,
        categories,
      });
    } catch (err) {
      console.log(err);
    }
  },
  topUpBalance: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await User.findByIdAndUpdate(user, {
        wallet: Number(user.wallet + Math.floor(Math.random() * 10000)),
      });
      res.redirect("/user");
    } catch (err) {
      console.log(err);
    }
  },
};
