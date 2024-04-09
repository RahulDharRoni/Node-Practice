const express = require("express");

const userController = require("../controllers/userControllers");

//2.3 Users Routes
const routers = express.Router();
routers
  .route("/")
  .get(userController.getAllUserData)
  .post(userController.postUserData);
routers
  .route(":id")
  .get(userController.getSpecificUserDate)
  .patch(userController.updateUserData)
  .delete(userController.deleteUserData);

module.exports = routers;
