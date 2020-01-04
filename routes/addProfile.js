module.exports = {
    addProfile: (req, res) => {
      let query = "SELECT * FROM pcbg";

      db.query(query, (err, result) => {
          if (err){
              res.redirect('/');
          }
          console.log("Reached addProfile.js");
          res.render('pages/addProfile.ejs',{pcbg: result, index: req.params[0]});
      });
  },

  addedProfile: (req, res) => {
      //let index = req.params[0];
      //let first_name = req.body.first_name;
      //let last_name = req.body.last_name;

      //let query = "UPDATE

      if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }

      let first_name = req.body.first_name;
      let preferred_name = req.body.preferred_name;
      let last_name = req.body.last_name;
      let relation = req.body.relation;
      let major = req.body.major;
      let location = req.body.location;
      let bio = req.body.bio;
      let phone_number = req.body.phone_number;
      let email = req.body.email;
      let pic = "";

      let query = "INSERT INTO pcbg VALUES first_name = ?, preferred_name = ?, last_name = ?, relation = ?, major = ?, location = ?, bio = ?, phone_number = ?, email = ?, pic = ?";


      db.query(query, (err, result) => {
          if (err){
              res.redirect('/');
          }
          console.log("Edited addProfile.js");
          res.redirect('/');
      });
      res.render('pages/addProfile.ejs');
  }
}