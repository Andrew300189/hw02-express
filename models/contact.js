const { Schema, model } = require('mongoose');
const {handleMongooseError} = require('../controllers')
const Joi = require('joi');

const monContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

monContactSchema.post('save', handleMongooseError);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});


const Contact = model('Contact', monContactSchema);

module.exports = {Contact, monContactSchema, contactSchema};