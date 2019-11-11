export function sendEmail(to, subject, html) {
  const sgMail = require('@sendgrid/mail');

  sgMail.setApiKey('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');

  sgMail.send({
    from: 'cassio.gsoares@hotmail.com',
    to,
    subject,
    html
  });
}