
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


// module.exports = {
//   markPage: (req, res) => {
//       let query = "SELECT * FROM pcbg";

//       db.query(query, (err, result) => {
//           if (err){
//               res.redirect('/');
//           }
//           console.log("Reached markProfile.js");
//       });
//   },

//   markedPage: (req, res) => {
//       //REQUIRES body-parser npm plugin
//       let index = parseInt(req.params[0], 10) + 1;
//       let last_name = req.body.last_name;

//       var fields = [last_name, index]

//       let query = "UPDATE pcbg SET last_name = 'Marked!!' WHERE uid = ?";

//       db.query(query, fields, (err) => {
//           if (err){
//             console.log(err);
//               res.redirect('/');
//               return;
//           }
//           console.log("Marked profile");
//           res.redirect('/profile$' + req.params[0]);
//       });
//   }
// }

