module.exports = {
  editPage: (req, res) => {
    let query = "SELECT * FROM pcbg WHERE uid = ?";
		const uid = parseInt(req.params[0]) + 1;

		db.query(query, uid,(err, result) => {
			if (err){
				res.redirect('/');
			}
			console.log("Reached editProfile.js");
			res.render('pages/editProfile.ejs',{pcbg: result, index: 0});
		});
  },

  editedPage: (req, res) => {
    //REQUIRES body-parser npm plugin
    let index = parseInt(req.params[0], 10) + 1;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let preferred_name = req.body.preferred_name;
    let relation = req.body.relation;
    let major_or_program = req.body.major_or_program;
    let location = req.body.location;
    let occupation = req.body.occupation;
    let organization = req.body.organization;
    let graduation_year = req.body.graduation_year;
    let phone = req.body.phone;
    let email = req.body.email;
    let external_link = req.body.external_link;
    let pic = req.body.file_name;

    var fields = [first_name, last_name, preferred_name, relation, major_or_program, location, occupation, organization, graduation_year, phone, email, pic, external_link, index];

    let query = "UPDATE pcbg SET first_name = ?, last_name = ?, preferred_name = ?, relation = ?, major_or_program = ?, location = ?, occupation = ?, organization = ?, graduation_year = ?, phone = ?, email = ?, pic = ?, external_link = ? WHERE uid = ?";

    db.query(query, fields, (err) => {
      if (err) {
        console.log(err);
        res.redirect('/');
        return;
      }
      console.log(fields);
      console.log("Updated profile with uid " + index);
      res.redirect('/profile$' + req.params[0]);
    });
  }
}
