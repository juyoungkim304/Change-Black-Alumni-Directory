module.exports = {
	searchPage: (req, res) => {
        console.log("Reached searchresults.js");
        var url = decodeURI(req.url);
        var re = /.+&(.+)/;
        searchParams = re.exec(url)[1];
        console.log(searchParams);
        
        var m;
        var searchQueries = {};
        var re1 = /(\w+:[\w\s]+)/g;
        do {
            m = re1.exec(searchParams);
            if (m) {
                param = m[1].split(':');
                searchQueries[param[0]] = param[1];
            }
        } while (m);

        console.log(searchQueries);

        function convertToQuery(queries) {
            var queryList = [];
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
                queryList.push(p + "=" + "'" + queries[q] + "'");
            }
            return queryList.join(" AND ");
        }

		let query = "SELECT first_name, last_name, major_or_program, relation FROM pcbg where " + convertToQuery(searchQueries);
        console.log(query);
		db.query(query, (err, result) => {
			if (err){
				res.redirect('/');
			}
            console.log(result);
			res.render('pages/searchresults.ejs',{pcbg: result});
        });
	}
}