const express = require("express");
const contacts = require("./routes/contacts");
const modifyContact = require("./routes/modifyContact");
const mongoose = require("mongoose");
const dataBase = require("./DB");
const helmet = require("helmet");

const app = express();

mongoose.connect(dataBase.DB).then(
  () => {
    console.log("Connected to MongoDB...");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(express.json());
app.use(helmet());
app.use("/contacts", contacts);
app.use("/modify_contact", modifyContact);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
