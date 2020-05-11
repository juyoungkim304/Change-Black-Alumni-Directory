module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg WHERE uid = ?";
		const uid = parseInt(req.params[0]) + 1;

		db.query(query, uid,(err, result) => {
			if (err){
				res.redirect('/');
			}
			console.log("Reached profile.js");
			res.render('pages/profile.ejs',{pcbg: result, index: 0});
		});
	},

	sendEmail: (req, res) => {

	let query = "SELECT * FROM pcbg WHERE uid = ?";
	const uid = parseInt(req.params[0]) + 1;

	db.query(query, uid,(err, result) => {
		if (err){
			res.redirect('/');
		}
		console.log("Reached profile.js");

		const nodemailer = require('nodemailer');

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'te752456@gmail.com', // email account you are sending from
				pass: 'abcde12345@' // password to email account you are sending from
			}
		});

		let mailOptions = {
			from: 'Vanderbilt Alumni Directory',
			to: 'juyoung.kim304@gmail.com',
			subject: 'Suspicious Account Alert',
			text: 'Profile ' + result[0].first_name + ' ' + result[0].last_name + ' has been flagged.'
		};


		transporter.sendMail(mailOptions, function(err, data) {

			if (err) {
				console.log('Error Occurs');
			}

			else {
				console.log('Email sent!!!!');
			}

		});

		res.redirect('/profile$' + req.params[0]);
	});
}
}
