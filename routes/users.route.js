const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const { drugsController } = require("../controllers/drugs.controller");
const { cartsController } = require("../controllers/carts.controller");
const {
  categoriesController,
} = require("../controllers/categories.controller");

const router = Router();

router.post("/", usersController.addUser);
router.get("/", usersController.getUser);

router.get("/drugs", drugsController.getDrugs);
router.get("/cart/:drugId", drugsController.deleteDrug);
router.get("/categories", categoriesController.getCategories);
router.get("/drug/category/:id", drugsController.getDrugsByCategory);
router.get("/drug/:id", drugsController.getDrugById);

router.post("/cart", cartsController.addCart);
router.get("/cart", cartsController.getCart);
router.get("/cart/:id/add/:drugId", cartsController.addDrugInCart);
router.get("/cart/:id/delete/:drugId", cartsController.deleteDrugInCart);
router.get("/cart/:id/clean", cartsController.cleanCart);
router.get("/:id/cart/:cartId", cartsController.buyDrugFromCart);

router.get("/:id/balance", usersController.topUpBalance);

module.exports = router;
