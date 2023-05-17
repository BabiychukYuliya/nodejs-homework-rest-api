const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contactsCtrl");

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contactsShema')

router.get("/", ctrl.getAllContacts);

// router.get("/:id", ctrl.getContactById);

// router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

// router.delete("/:id", ctrl.deleteContactById);

// router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactById);

module.exports = router;
