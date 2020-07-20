module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg WHERE uid = ?";
		const uid = parseInt(req.params[0]) + 1;

		db.query(query, uid, (err, result) => {
			if (err) {
				res.redirect('/');
			}
			console.log("Reached profile.js");
			res.render('pages/profile.ejs', { pcbg: result, index: 0 });
		});
	},

	flagProfile: (req, res) => {

		let query = "SELECT * FROM pcbg WHERE uid = ?";
		const uid = parseInt(req.params[0]) + 1;

		db.query(query, uid, (err, result) => {
			if (err) {
				res.redirect('/');
			}
			console.log("Reached profile.js");

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
				to: 'juyoung.kim304@gmail.com',
				subject: 'Suspicious Account Alert',
				text: 'Profile ' + result[0].first_name + ' ' + result[0].last_name + ' has been flagged.'
			};


			transporter.sendMail(mailOptions, function (err, data) {

				if (err) {
					console.log(err);
				}

				else {
					console.log('Email sent!!!!');
				}

			});
		});

		let index = parseInt(req.params[0], 10) + 1;
		var fields = [index];
		let query2 = "UPDATE pcbg SET marked = 1 WHERE uid = ?";
		db.query(query2, fields, (err) => {
			if (err) {
				console.log(err);
				res.redirect('/');
				return;
			}
			console.log("Marked profile");
			res.redirect('/profile$' + req.params[0]);
		});
	}
}
