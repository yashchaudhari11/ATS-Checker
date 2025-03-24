const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "atharvmarathe4@gmail,com",
    pass: "byvn nioi sxes trto",
  },
});

const sendOtp = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: "atharmarathe4@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

module.exports = { sendOtp };
