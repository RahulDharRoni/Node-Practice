const express = require("express");
const tourController = require("../controllers/tourControllers");

//2.1 tours Routes
const router = express.Router();
// router.param('id', tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTourData)
  .post(tourController.postTourData);
router
  .route("/:id")
  .get(tourController.getSpecificTourDate)
  .patch(tourController.updateTourData)
  .delete(tourController.deleteTourData);

module.exports = router;
