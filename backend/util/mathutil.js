const nodemailer = require("nodemailer");
const mathutil = {
  generateOTP: function () {
    return Math.floor(Math.random() * 9000) + 1000;
  },
  sendOTPMail: function (email, otp) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3f5f4d0db10de3",
        pass: "c1072f6fcb9080",
      },
    });

    // Email content
    let mailOptions = {
      from: "ankitsharma4880@gmail.com",
      to: email,
      subject: "Your OTP",
      html:
        "<p>Your OTP is: <strong>" + otp + "</strong> valid upto 10 mins.</p>",
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(
          "Error occurred while sending email:",
          error.message
        );
      }
      console.log("Email sent:", info.response);
    });
  },
};
module.exports = mathutil;
