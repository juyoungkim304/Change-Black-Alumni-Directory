# Change++ Black Alumni Directory
![Change Logo](https://github.com/juyoungkim304/Change-Black-and-Latinx-Directory/blob/master/ChangeLogo.JPG)

## A directory for the Black Alumni Organization of Peabody College at Vanderbilt University

### To run the application:
1. Install node.
2. Navigate to change-black-and-latinx-directory (which you likely are already in) in your terminal.
3. If you haven't already, run the following commands in your terminal:
   - `npm install ejs`
   - `npm install express`
   - `npm install mysql`
   - `npm install body-parser --save`
   - `npm install passport`
   - `npm install passport-auth0`
   - `npm install router`
   - `npm install express-session`
   - `npm install dotenv`
4. In your terminal, run `node app`
5. In your browser, navigate to `localhost:8080` and you should be good to go!

### Functionality
- Landing page with different categories for searching
- Search results page that displays all user profiles
- User-specific profile pages
- Add/edit/delete/mark profile functions
- Admin authentication and functions for maintaining the application

### To add to node app:
1. Create a new sub-folder in `public` that will contain all of the javascript and css files (as well as anything else that modifies your ejs file). Within this sub-folder, create sub-folders for each of your file types (e.g. `scripts` for .js files, `styles` for your .css files, etc.).
2. Add your .ejs file to `views/pages`. Be sure to change file directory for .css and .js files linked inside of your .ejs file.

Current Contributors: Juyoung Kim (juyoungkim304), Tabitha Lee (tabithasylee), Bao Pham, Stella Wang (stellawangty)
Previous Contributors: Jonathan Steward, Arjun Keerthi (arjunkeerthi), Joe Huang, Zubeir Osman (osmanzm)
