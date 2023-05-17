const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contactsCtrl");

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact')

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/",  validateBody(schemas.addSchema), ctrl.addNewContact);

router.delete("/:id", isValidId, ctrl.deleteContactById);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
