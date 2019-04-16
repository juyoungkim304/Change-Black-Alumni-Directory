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
    var departmentsQuery = "";
    for(var i = 0; i < departments.length; i++) {
        if(departments[i].checked) {
            departmentsQuery += "$mp:" + departments[i].value;
        }
    }
    if(firstName !== "") {
        queryUrl += "$fn:" + firstName;
    }
    if(lastName !== "") {
        queryUrl += "$ln:" + lastName;
    }
    if(departmentsQuery !== "") {
        queryUrl += departmentsQuery;
    }
    return '/searchresults=&' + queryUrl;
}
