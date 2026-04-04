const nodemailer = require('nodemailer');

// Pre-configure the Nodemailer transporter using your environmental variables
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an automated Scholarship Reminder Email Alert.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} message - The custom body text of the email alert.
 * @returns {Promise<boolean>} True if the email dispatched successfully, false otherwise.
 */
const sendEmail = async (to, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, // Send to the user's provided email address
      subject: 'Scholarship Deadline Alert',
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to} (ID: ${info.messageId})`);
    return true;

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
};

module.exports = {
  sendEmail
};
