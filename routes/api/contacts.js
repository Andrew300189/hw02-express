
const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const checkContactOwnership = require("../../middlewares/checkContactOwnership");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, checkContactOwnership, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", authenticate, isValidId, checkContactOwnership, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", authenticate, isValidId, checkContactOwnership, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", authenticate, isValidId, checkContactOwnership, ctrl.deleteById);

module.exports = router;
