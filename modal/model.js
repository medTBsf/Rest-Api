const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String
});

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
