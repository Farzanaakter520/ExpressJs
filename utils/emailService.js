const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, text, attachmentBuffer, attachmentName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // অথবা smtp server
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      attachments: [
        {
          filename: attachmentName,
          content: attachmentBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: err.message };
  }
};
