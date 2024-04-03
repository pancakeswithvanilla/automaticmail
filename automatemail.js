// Import required modules
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const cron = require("node-cron");
const fs = require("fs");
require('dotenv').config(); 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD
    }
});
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
const htmlContent = fs.readFileSync('test.ejs', 'utf8')
const renderedHTML = ejs.render(htmlContent, { currentDate });
const mailOptions = { 
    to: process.env.YAHOO_USER, 
    from: process.env.GMAIL_USER,
    subject: 'Test Email', 
    html: renderedHTML
};
cron.schedule('* * * * *', () => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});
