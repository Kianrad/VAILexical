const router = require("express").Router();
const ApiController = require("../controllers/api.controller");
const apiController = new ApiController();

router.get("/", function(req, res) {
  res.json({
    message: "calculate complexity endpoint"
  });
});

router.route("/complexity").post(apiController.calculate);

module.exports = router;
