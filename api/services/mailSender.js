const nodemailer = require("nodemailer");

const mailSender = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_AMDIN_USER, // generated ethereal user
    pass: process.env.MAIL_ADMIN_PASS, // generated ethereal password
  },
});

module.exports = mailSender;
