module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg WHERE uid = ?";
		const uid = parseInt(req.params[0]) + 1;
		console.log(uid);

		db.query(query, uid, (err, result) => {
			if (err){
				res.redirect('/');
			}
			console.log("Reached profile.js");
			console.log(result);
			res.render('pages/profile.ejs',{pcbg: result});
		});
		

	}
}
