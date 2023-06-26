const nodemailer = require("nodemailer");

async function emailVerification(email, subject, verify, template) {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: template(verify),
    });

}


module.exports = emailVerification;