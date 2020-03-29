module.exports = {
    addProfile: (req, res) => {
        res.render('pages/addProfile.ejs');

    },

    addedProfile: (req, res) => {

        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let preferred_name = req.body.preferred_name;
        let occupation = req.body.occupation;
        let relation = req.body.relation;
        let major_or_program = req.body.major_or_program;
        let location = req.body.location;
        let phone = req.body.phone;
        let email = req.body.email;
        let pic = 'http://changedirectory.s3.amazonaws.com/' + req.body.file_name;
        let external_link = ""

        var fields = [first_name, last_name, preferred_name, occupation, relation, major_or_program, location, phone, email, pic, external_link]

        let query = "INSERT INTO pcbg (first_name, last_name, preferred_name, occupation, relation, major_or_program, location, phone, email, pic, external_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(query, fields, (error) => {

            if (error){
                res.redirect('/');
                console.log(error);
            }
            console.log("Added profile");
            res.redirect('/');
        });

        //res.render('pages/addProfile.ejs');

        //});
    }
}