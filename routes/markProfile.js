module.exports.markPage = function(req,res){
    let index = parseInt(req.params[0], 10) + 1;
    var fields = [index];
    let query = "UPDATE pcbg SET marked = 1 WHERE uid = ?";
    db.query(query, fields, (err) => {
        if (err){
            console.log(err);
            res.redirect('/');
            return;
        }
        console.log("Marked profile");
        res.redirect('/profile$' + req.params[0]);
    });
}