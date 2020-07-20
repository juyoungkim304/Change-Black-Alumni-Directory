module.exports = {

    requestEditPage: (req, res) => {
        res.render('../views/pages/requestEdit.ejs');
    },

    requestEdit: (req, res) => {

        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;

        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'blackalumrepoalerts@gmail.com', // email account you are sending from
                pass: 'Pineapple123' // password to email account you are sending from
            }
        });

        let mailOptions = {
            from: 'Vanderbilt Alumni Directory',
            to: 'connoisseurbao@gmail.com',
            subject: 'Profile Edit Request',
            text: 'Profile Edit Request from ' + name + ' (' + email + ' ),\n' + message
        };


        transporter.sendMail(mailOptions, function (err, data) {

            if (err) {
                console.log(err);
            }

            else {
                console.log('Email sent!!!!');
            }
        });
        res.redirect('/');
    }
}