const express = require("express");

const router = express.Router();

const { contactsController } = require("../../contactsController/index");
const { contactMiddleware } = require("../../middlewares/index");

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
