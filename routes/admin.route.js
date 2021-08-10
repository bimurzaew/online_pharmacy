const { Router } = require("express");
const { drugsController } = require("../controllers/drugs.controller");
const {
  categoriesController,
} = require("../controllers/categories.controller");

const router = Router();

router.post("/drug", drugsController.addDrug);
router.patch("/drug/:id", drugsController.updateDrug);
router.delete("/drug/:id", drugsController.deleteDrug);
router.get("/drugs", drugsController.getDrugs);

router.post("/category", categoriesController.addCategory);
router.patch("/category/:id", categoriesController.updateCategory);
router.delete("/category/:id", categoriesController.deleteCategory);
router.get("/categories", categoriesController.getCategories);

module.exports = router;
