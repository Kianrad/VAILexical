const router = require("express").Router();
const DBController = require("../controllers/db.controller");
const dbController = new DBController();

router.get("/", function(req, res) {
  res.json({
    message: "Protected database manager endpoint"
  });
});

router
  .route("/words")
  .get(dbController.list)
  .post(dbController.new);

router.route("/words/init").get(dbController.init);

router
  .route("/words/:word_id")
  .get(dbController.get)
  .delete(dbController.delete);

module.exports = router;
