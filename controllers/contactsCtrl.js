const { Contact } = require('../models/contact');
const express = require("express");

const { HttpError, ctrlWrapper } = require("../helpers");


const getAllContacts = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
};

const addNewContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
};



module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
