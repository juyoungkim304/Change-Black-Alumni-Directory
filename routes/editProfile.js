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
        //let index = req.params[0];
        //let first_name = req.body.first_name;
        //let last_name = req.body.last_name;

        //let query = "UPDATE

        db.query(query, (err, result) => {
            if (err){
                res.redirect('/');
            }
            console.log("Edited editProfile.js");
            //res.redirect('/^\/profile\$(\d+)/');
        });
    }
}
