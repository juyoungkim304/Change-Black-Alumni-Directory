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


	}
}
