module.exports = {
	searchPage: (req, res) => {
        console.log("Reached searchresults.js");

        // Extract part of url containing search queries that user inputted
        //var url = decodeURI(req.url);
        var url = decodeURI(req.url);
        var re = /.+&(.+)/;
        searchParams = re.exec(url);
        if(searchParams === null) { // Checks whether or not any search criteria was provided
            searchParams = '';
        } else {
            searchParams = searchParams[1];
        }
        console.log("Search Params: " + searchParams);
        
        // Store all the queries in a javascript object, with the criteria-type as the keys and the
        // (possibly multiple) value(s) for each criteria as the values (each in a list) for each key
        var searchQueries = {
            'fn':[],
            'ln':[],
            'mp':[],
            'rl':[]
        };
        if(searchParams !== '') {
            console.log("Entered here");
            var m;
            // Extract part after '&' and pushes onto corresponding property list in searchQueries
            var re1 = /\$(\w+:[\w\s,]+)/g;
            do {
                m = re1.exec(searchParams);
                if (m) {
                    param = m[1].split(':');
                    searchQueries[param[0]].push(param[1]);
                }
            } while (m);
        }
        console.log("Search Queries:");
        console.log(searchQueries);

        // Converts the query object into a string to be utilized in a sql query command
        function convertToQuery(queries) {
            var queryList = [];
            if(Object.keys(queries).length > 0) {
               for(var q in queries) {
                    var p = (item => {
                        switch(item) {
                            case 'fn':
                                return 'first_name';
                            case 'ln':
                                return 'last_name';
                            case 'mp':
                                return 'major_or_program';
                            case 'rl':
                                return 'relation';    
                            default:
                                return '';
                        }
                    })(q);
                    if(queries[q].length !== 0) {
                        // Handles multiple values for a certain key
                        queryList.push(p + "=" + "'" + queries[q].join("' OR " + p + "='") + "'");
                    }
                } 
            }
            
            return queryList.length === 0 ? "*" : '(' + queryList.join(") AND (") + ')';
        }

        // Handles the case where no search criteria provided, resulting in displaying all available
        // results contained in database
        var converted = convertToQuery(searchQueries);
        var selection = converted === "*" ? converted : "first_name, last_name, major_or_program, relation, pic, uid"; 
        var condition = converted === "*" ? "" : " where " + converted;

        // Database query command
		let query = "SELECT " + selection + " FROM pcbg" + condition;
        console.log(query);

        // Query the database and send information to page that displays result
		db.query(query, (err, result) => {
			if (err){
				res.redirect('/');
			}
            console.log(result);
			res.render('pages/searchresults.ejs',{pcbg: result});
        });
	}
}