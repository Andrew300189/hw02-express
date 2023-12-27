const {Contact} = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
}

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
      throw HttpError(404, "contact not found");
  }
  res.json(result);
}

const add = async (req, res) => {
  try {
      const result = await Contact.create(req.body);
      res.status(201).json(result);
  } catch (error) {
      throw HttpError(400, "missing required fields");
  }
}

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
      throw HttpError(400, "missing fields");
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
      throw HttpError(404, "contact not found");
  }
  res.json(result);
}
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
      throw HttpError(404, "Not found");
  }
  res.json(result);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
      throw HttpError(404, "Contact not found");
  }
  res.json({ message: "contact deleted" });
}



module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
}