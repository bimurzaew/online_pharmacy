const { Router } = require("express");

const router = Router();

router.use("/admin", require("./admin.route"));
router.use("/user", require("./users.route"));

module.exports = router;
