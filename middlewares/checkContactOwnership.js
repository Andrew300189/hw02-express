const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const checkContactOwnership = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      throw HttpError(404, "Contact not found");
    }

    if (contact.owner.toString() !== req.user._id.toString()) {
      throw HttpError(403, "Unauthorized. You are not the owner of this contact.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkContactOwnership;
