const express = require("express");

const router = express.Router();

const { contactsController } = require("../../contactsController/index");
const { contactMiddleware } = require("../../middlewares/index");

router.use("/:contactId", contactMiddleware.checkContactId);

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getContact);

router.post("/", contactsController.createContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContact);

module.exports = router;
