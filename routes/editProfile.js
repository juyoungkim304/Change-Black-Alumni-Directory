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
        let index = req.params[0];
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let preferred_name = req.body.preferred_name;
        let bio = req.body.bio;
        let relation = req.body.relation;
        let major_or_program = req.body.major_or_program;
        let location = req.body.location;
        let phone = req.body.phone;
        let email = req.body.email;

        var fields = [first_name, last_name, preferred_name, bio, relation, major_or_program, location, phone, email]

        let query = "UPDATE pcbg SET first_name = ?, last_name = ?, preferred_name = ?, bio = ?, relation = ?, major_or_program = ?, location = ?, phone = ?, email = ? WHERE uid = ?";

        db.query(query, fields, index, (err, result) => {

            if (err){
                res.redirect('/');
            }
            console.log("Edited editProfile.js");
            res.redirect('/^\/profile\$(\d+)/');
        });
    }
}
