module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg";

		db.query(query, (err, result) => {
			if (err){
				res.redirect('/');
			}
			console.log("Reached profile.js");
			res.render('pages/profile.ejs',{pcbg: result, index: req.params[0]});
		});
		

	}
}
