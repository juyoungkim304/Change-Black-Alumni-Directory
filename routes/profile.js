module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg";

		db.query(query, (err, result) => {
			if (err){
				res.redirect('/');
			}
			console.log("Reached profile.js");
			//console.log(req.params[0]);
			res.render('pages/profile.ejs',{pcbg: result, index: req.params[0]});
		});
	}
}
