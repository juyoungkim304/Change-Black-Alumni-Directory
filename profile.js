module.exports = {
	profilePage: (req, res) => {
		let query = "SELECT * FROM pcbg WHERE id = 2";

		db.query(query, (error, result) => {
			if (error){
				res.redirect('/');
			}
			res.render('profile.ejs',{pcbg: result});
		});
	});
	
});