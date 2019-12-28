module.exports = {
    addProfile: (req, res) => {
        res.render('pages/addProfile.ejs');
    },

    addedProfile: (req, res) => {
        let uid_query = "SELECT MAX(uid) FROM pcbg";
        /*db.query(uid_query, (err, uidresult) => {

            if (err){
                res.redirect('/');
            }
            console.log(uidresult);*/

        let uid = 10;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let preferred_name = req.body.preferred_name;
        let occupation = req.body.occupation;
        let relation = req.body.relation;
        let major_or_program = req.body.major_or_program;
        let location = req.body.location;
        let phone = req.body.phone;
        let email = req.body.email;
        let pic = ""
        let external_link = ""

        var fields = [uid, first_name, last_name, preferred_name, occupation, relation, major_or_program, location, phone, email, pic, external_link]

        let query = "INSERT INTO pcbg VALUES uid = ?, first_name = ?, last_name = ?, preferred_name = ?, occupation = ?, relation = ?, major_or_program = ?, location = ?, phone = ?, email = ?, pic = ?, external_link = ?";

        db.query(query, fields, (error) => {

            if (error){
                res.redirect('/');
            }
            console.log("Added profile");
            res.redirect('/profile$' + uid);
        });

        res.render('pages/addProfile.ejs');

    //});
    }
}