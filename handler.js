'use strict';

// importing AWS sdk
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.REGION
});

// Instatiating the SES from AWS SDK
const ses = new AWS.SES();

// The function to send SES email message
exports.sendMail = (event, context, callback) => {
  const bccEmailAddresses = event.body.bccEmailAddresses;
  const ccEmailAddresses = event.body.ccEmailAddresses;
  const toEmailAddresses = event.body.toEmailAddresses;
  const bodyData = event.body.bodyData;
  const bodyCharset = event.body.bodyCharset;
  const subjectdata = event.body.subjectdata;
  const subjectCharset = event.body.subjectCharset;
  const sourceEmail = event.body.sourceEmail;
  const replyToAddresses = event.body.replyToAddresses;

// The parameters for sending mail using ses.sendEmail()
  const emailParams = {
    Destination: {
      BccAddresses: bccEmailAddresses,
      CcAddresses: ccEmailAddresses,
      ToAddresses: toEmailAddresses
    },
    Message: {
      Body: {
        Text: {
          Data: bodyData,
          Charset: bodyCharset
        }
      },
      Subject: {
        Data: subjectdata,
        Charset: subjectCharset
      }
    },
    Source: sourceEmail,
    ReplyToAddresses: replyToAddresses
  };

// the response to send back after email success.
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Mail sent successfully'
    }),
  };

// The sendEmail function taking the emailParams and sends the email requests.
  ses.sendEmail(emailParams, function (err, data) {
      if (err) {
          console.log(err, err.stack);
          callback(err);
      } else {
        console.log("SES successful");
        console.log(data);
        callback(null, response);
      }
  });
};
