const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    port: 587,
    auth: {
        user: 'noReplyQuathFiles@gmail.com', // generated ethereal user
        pass: 'Quath69Files420' // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <noReplyQuathFiles@gmail.com>', // sender address
    to: 'noReplyQuathFiles@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    //html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent'+info);
});
