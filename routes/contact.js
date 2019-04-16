const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

/* GET contact page. */
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', (req, res) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(
    'smtps://USER%40gmail.com:PASSWORD@smtp.gmail.com',
  );

  /* To use Gmail you may need to configure
  "Allow Less Secure Apps" in your Gmail account
   unless you are using 2FA in which case you would
   have to create an Application Specific password.
   You also may need to unlock your account with
   "Allow access to your Google account" to use SMTP.
   */

  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: '"Mig Mig" <YOUR_EMAIL>', // sender address
    to: 'WHERE_TO_EMAIL', // list of receivers
    subject: 'Website submission', // Subject line
    text: `You have a submission with the fallowing details... Name:${
      req.body.name
    } Email:${req.body.email} Message:${req.body.message}`, // plaintext body
    html: `<p>You have a submission with the fallowing details... <p><ul><li>Name:${
      req.body.name
    }</li><li>Email:${req.body.email}</li><li>Message:${
      req.body.message
    }</li></ul>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
    res.redirect('/');
  });
});

module.exports = router;
