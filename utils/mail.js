const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ACCOUNT_USER, // generated ethereal user
        pass: process.env.EMAIL_ACCOUNT_PASS // generated ethereal password
    }
});

function send(receiver, content) {
    // send mail with defined transport object
    return transporter.sendMail({
        from: `"Fred Foo π»" <${process.env.EMAIL_ACCOUNT_USER}>`, // sender address
        to: receiver, // list of receivers
        subject: 'Hello β', // Subject line
        text: `ιͺθ―η οΌ${content},δΊειεζζ` // plain text body
        // html: '<b>Hello world?</b>' // html body
    });
}

module.exports = { send };
