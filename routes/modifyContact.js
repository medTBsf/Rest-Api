const express = require("express");
const Joi = require("joi");
const Contact = require("../modal/model");

const router = express.Router();

router.put("/:id", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  Contact.update(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
      }
    }
  ).then(c => res.json(c));
});

router.get("/:id", (req, res) => {
  Contact.findById(req.params.id).then(c => res.json(c));
});

function validate(contact) {
  const schema = {
    name: Joi.string()
      .regex(/^[a-zA-Z\d\s]+$/)
      .required(),
    phone: Joi.number()
      .min(21000000)
      .max(99999999)
      .required(),
    email: Joi.string()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required()
  };
  return Joi.validate(contact, schema);
}

module.exports = router;
