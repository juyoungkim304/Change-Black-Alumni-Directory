    document.querySelector('#searchBtn').addEventListener("click", function () {
        queryUrl = createModifiedURL();
        window.location.href = queryUrl;
    });

    // Creates the url corresponding to the selections made on the landing page that will be sent to
    // the searchresults page and be decoded into the right database queries (so see searchresults.js
    // to better understand what's going on here)
    function createModifiedURL() {
        var queryUrl = "";
        var firstName = document.querySelector('#firstNameInput').value;
        var lastName = document.querySelector('#lastNameInput').value;
        var department = document.getElementsByClassName("form-check-input-department");
        var major = document.getElementsByClassName("form-check-input-major");
        var relation = document.getElementsByClassName("form-check-input-relation");

        var departmentsQuery = "";
        for (var i = 0; i < department.length; i++) {
            if (department[i].checked) {
                departmentsQuery += "$d:" + department[i].value;
            }
        }

        var majorsQuery = "";
        for (var i = 0; i < major.length; i++) {
            if (major[i].checked) {
                majorsQuery += "$mp:" + major[i].value;
            }
        }

        var relationQuery = "";
        for(let i = 0; i < status.length; i++){
            if(status[i].checked){
                statusQuery+= "$rl:"+ status[i].value;
            }
        }

        if (firstName !== "") {
            queryUrl += "$fn:" + firstName;
        }
        if (lastName !== "") {
            queryUrl += "$ln:" + lastName;
        }
        if (departmentsQuery !== "") {
            queryUrl += departmentsQuery;
        }
        if (majorsQuery !== "") {
            queryUrl += majorsQuery;
        }
        if(relationQuery !== ""){
            queryUrl += relationQuery;
        }
        // Note, every new criteria is started with '$', hence every new additon to 'queryUrl'
        // starting with '$'
        // Search-landing page always goes to page 1, so we hard-code in a 1 before '&'
        return '/searchresults=1&' + queryUrl;
    }
