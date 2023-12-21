const express = require("express");

const router = express.Router();

const {
  contactsController,
} = require("../../controllers/contactsController/index");
const { contactMiddleware, userMiddleware } = require("../../middlewares");

router.use(userMiddleware.protect);

router.use("/:contactId", contactMiddleware.checkContactId);

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getContact);

router.post(
  "/",
  contactMiddleware.checkCreateContactData,
  contactsController.createContact
);

router.delete("/:contactId", contactsController.deleteContact);

router.put(
  "/:contactId",
  contactMiddleware.checkUpdateContactData,
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  contactMiddleware.checkUpdateStatusData,
  contactsController.updateStatus
);

module.exports = router;
