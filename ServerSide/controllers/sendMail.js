var nodemailer = require('nodemailer');


const sendMail = (options) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILACCOUNT,
            pass: process.env.PASSSWORDEMAIL
        }
    });

    var mailOptions = {
        from: process.env.EMAILACCOUNT,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });

}

module.exports = sendMail;


