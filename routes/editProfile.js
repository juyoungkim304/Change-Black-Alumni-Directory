module.exports = {
    editPage: (req, res) => {
        let query = "SELECT * FROM pcbg";

        db.query(query, (err, result) => {
            if (err){
                res.redirect('/');
            }
            console.log("Reached editProfile.js");
            res.render('pages/editProfile.ejs',{pcbg: result, index: req.params[0]});
        });
    },

    editedPage: (req, res) => {
        //REQUIRES body-parser npm plugin
        let index = parseInt(req.params[0], 10) + 1;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let preferred_name = req.body.preferred_name;
        let bio = req.body.bio;
        let relation = req.body.relation;
        let major_or_program = req.body.major_or_program;
        let location = req.body.location;
        let phone = req.body.phone;
        let email = req.body.email;

        var fields = [first_name, last_name, preferred_name, relation, major_or_program, location, phone, email, index]

        let query = "UPDATE pcbg SET first_name = ?, last_name = ?, preferred_name = ?, relation = ?, major_or_program = ?, location = ?, phone = ?, email = ? WHERE uid = ?";

        db.query(query, fields, (err) => {
            if (err){
              console.log(err);
                res.redirect('/');
                return;
            }
            console.log("Updated profile with uid " + index);
            res.redirect('/profile$' + req.params[0]);
        });
    }
}
