const express = require("express");

const { usersController } = require("../../controllers/usersController");
const { userMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/current", userMiddleware.protect, usersController.getCurrentUser);
router.patch(
  "/avatars",
  userMiddleware.protect,
  userMiddleware.uploadUserPhoto,
  usersController.updateMe
);

router.post(
  "/register",
  userMiddleware.checkUserRegisterData,
  usersController.register
);
router.post("/login", userMiddleware.checkUserLoginData, usersController.login);
router.post("/logout", userMiddleware.protect, usersController.logout);

router.patch(
  "/:id",
  userMiddleware.protect,
  usersController.updateUserSubscription
);

module.exports = router;
