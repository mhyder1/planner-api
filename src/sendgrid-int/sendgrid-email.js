require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: "thanki.monika@gmail.com", // Change to your recipient
    from: "thanki.monika@gmail.com", // Change to your verified sender
    subject: "Test email from SendGrid",
    text: "Test email for Monika Thanki",
    html: "<strong>Test email for Monika Thanki</strong>",
};
sgMail
    .send(msg)
    .then(() => {
        console.log("Email sent");
    })
    .catch((error) => {
        console.error(error);
    });