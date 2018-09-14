const express = require("express");
const Joi = require("joi");
const Contact = require("../modal/model");

const router = express.Router();

router.get("/", (req, res) => {
  Contact.find().then(item => res.json(item));
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let newContact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  };

  const contact = new Contact(newContact);
  contact.save().then(c => res.json(c));
  res.send(newContact._id);
});

router.delete("/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id).then(result => res.json(result));
});

function validate(contact) {
  const schema = {
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(15)
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
