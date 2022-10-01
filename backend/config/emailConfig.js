require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service:"gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Admin Email ID
      pass: process.env.EMAIL_PASS, // Admin Password
    },
  });

  module.exports = transporter;

/*

DOCUMENTATION FOR SENDING EMAIL
---------------------------------------------------------------

=> Go to your Google account at https://myaccount.google.com/
=> Go to Security,
=> In "Signing in to Google" section choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification.
=> Back to Security in "Signing in to Google" section choose App passwords.
=> From the Select app drop down choose Other (Custom name) and put/type a name e.g. nodemailer.
=> A modal dialog will appear with the password. Get that password and use it in your code.

SAMPLE CODE FOR SENDING EMAIL
---------------------------------------------------------------

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR-USERNAME',
        pass: 'THE-GENERATED-APP-PASSWORD'
    }
});

send();

async function send() {
    const result = await transporter.sendMail({
        from: 'YOUR-USERNAME',
        to: 'RECEIVERS_EMAIL',
        subject: 'Hello World',
        text: 'Hello World'
    });

    console.log(JSON.stringify(result, null, 4));
}

*/