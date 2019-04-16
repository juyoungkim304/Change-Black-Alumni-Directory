

    document.querySelector('#searchBtn').addEventListener("click", function () {
        queryUrl = createModifiedURL();
        alert(queryUrl);
        window.location.href = queryUrl;
    });

    function createModifiedURL() {
        var queryUrl = "";
        var firstName = document.querySelector('#firstNameInput').value;
        var lastName = document.querySelector('#lastNameInput').value;
        var departments = document.getElementsByClassName("form-check-input");

        var status = document.getElementsByClassName("form-check-input-status");

        var departmentsQuery = "";
        for (var i = 0; i < departments.length; i++) {
            if (departments[i].checked) {
                departmentsQuery += "$mp:" + departments[i].value;
            }
        }

        console.log(status);
        console.log(departments);

        var statusQuery = "";
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

        if(statusQuery !== ""){
            queryUrl += statusQuery;
        }

        return '/searchresults=&' + queryUrl;
    }