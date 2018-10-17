var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Hello from API")
});

// Routing for Uudenmaan Ikkunapalvelu
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  const htmlEmail = `
  <h3>Contact Details</h3>
  <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.number}</li>
      <li>Address: ${req.body.address}</li>
      <li>Promise: ${req.body.promise}</li>
  <ul>
  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.emailAddress || "your_email_address",
      pass: process.env.password || "your_password"
    }
  });

  let mailOptions = {
    from: req.body.email, // sender address
    to: process.env.emailAddress || "your_email_address", // list of receivers
    subject: "New Message", // Subject line
    email: req.body.email, // plain text body
    html: htmlEmail // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ msg: "fail" });
      console.log(error);
    } else {
      res.json({ msg: "success" });
      console.log("success");
    }
  });
});

app.use(router);

exports.app = app;