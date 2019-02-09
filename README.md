# Change-Black-and-Latinx-Directory
A directory for the Black and Latinx alumni of Vanderbilt University

To run node app:
1. Install node.
2. Navigate to change-black-and-latinx-directory (which you likely are already in) in your terminal.
3. If you haven't already, run the following commands in your terminal:
   - `npm install ejs`
   - `npm install express`
   - `npm install mysql`
4. In your terminal, run `node app`
5. In your browser, navigate to `localhost:8080` and you should be good to go!

To add to node app:
1. Create a new sub-folder in `public` that will contain all of the javascript and css files (as well as anything else that modifies your ejs file). Within this sub-folder, create sub-folders for each of your file types (e.g. `scripts` for .js files, `styles` for your .css files, etc.).
2. Add your .ejs file to `views/pages`. Be sure to change file directory for .css and .js files linked inside of your .ejs file.
