const Contact = require('../models/contact');
const express = require("express");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require('../helpers');



const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

// const getContactById = async (req, res) => {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);

//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
// };

// const addNewContact = async (req, res) => {
//     // const { error } = addSchema.validate(req.body);

//     // if (error) {
//     //   throw HttpError(400, "missing required name field");
//     // }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
// };

// const deleteContactById = async (req, res) => {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({ message: "contact deleted" });
// };

// const updateContactById = async (req, res) => {
//     // const { error } = addSchema.validate(req.body);

//     // if (error) {
//     //   throw HttpError(400, "missing fields");
//     // }
//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getContactById: ctrlWrapper(getContactById),
  // addNewContact: ctrlWrapper(addNewContact),
  // deleteContactById: ctrlWrapper(deleteContactById),
  // updateContactById: ctrlWrapper(updateContactById),
};
