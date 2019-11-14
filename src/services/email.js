export function sendEmail(to, subject, html) {
  const sgMail = require('@sendgrid/mail');

  sgMail.setApiKey(process.env.SENDGRIDAPIKEY);

  sgMail.send({
    from: 'cassio.galvao@outlook.com',
    to,
    subject,
    html
  });
}

export function scheduleEmail(callback) {
  const schedule = require('node-schedule');
 
  schedule.scheduleJob('8 * * *', function() {
    console.log('Sending Newsletter E-mail!!!');
    callback();
  });
}