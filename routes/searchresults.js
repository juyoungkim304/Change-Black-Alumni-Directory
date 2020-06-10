module.exports = {
	searchPage: (req, res) => {
        console.log("Reached searchresults.js");

        // Extract part of url containing search queries that user inputted
        //var url = decodeURI(req.url);
        var url = decodeURI(req.url);

        // In order for searches to work properly, urls sent to search results page are formatted as follows:
        //      - start with /searchresults=
        //      - next put the current page number
        //      - then, put an ampersand ('&')
        //      - put all database queries. These each start with '$', then two-letter abbreviation
        //        for database key (see below for these conversions), then ':', then value desired
        //        for this criteria. Ex: /searchresults=2&$fn:John$rl:Alumni  --> This indicates that
        //        we are on page 2, searching for first_name = 'John' and relation = 'Alumni'.

        // Grabs page number and queries (part after ampersand)
        var re = /.+([0-9]+)&(.+)/;
        searchParams = re.exec(url);
        var page_number;

        if(searchParams === null) { // Checks whether or not any search criteria was provided
            searchParams = '';
            re = /[0-9]+/; // If no search params, still need to get page number
            page_number_matches = re.exec(url);
            page_number = parseInt(page_number_matches,10);
        } else {
            page_number = searchParams[1]; // Results from regex are in a array, so need to index
            searchParams = searchParams[2];
        }

        // Store all the queries in a javascript object, with the criteria-type as the keys and the
        // (possibly multiple) value(s) for each criteria as the values (each in a list) for each key
        var searchQueries = {
            'fn':[],
            'ln':[],
            'd':[],
            'mp':[],
            'rl':[]
        };

        // Populate searchQueries with each key-value inside url
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

        // Converts the query object into a string to be utilized in a sql query command (can see conversions here)
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
                            case 'd':
                                return 'department';
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
                        queryList.push(p + " RLIKE " + "'" + queries[q].join("' OR " + p + "='") + "'");
                    }
                }
            }

            return queryList.length === 0 ? "*" : '(' + queryList.join(") AND (") + ')';
        }

        // Handles the case where no search criteria provided, resulting in displaying all available
        // results contained in database
        var converted = convertToQuery(searchQueries);
        var selection = converted === "*" ? converted : "first_name, last_name, department, major_or_program, relation, pic, uid";
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
            console.log(result.length);
			res.render('pages/searchresults.ejs',{pcbg: result, page_num: page_number, search_url: url});
        });
	}
}
