module.exports.deletePage = function(req,res){
    let index = parseInt(req.params[0], 10) + 1;
    var fields = [index]
    let query = "DELETE FROM pcbg WHERE uid = ?";
    db.query(query, fields, (err) => {
        if (err){
            console.log(err);
            res.redirect('/');
            return;
        }
        console.log("got deleted");
        res.redirect('/');
    });
}
