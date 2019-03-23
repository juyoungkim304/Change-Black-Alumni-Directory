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
    }
}
