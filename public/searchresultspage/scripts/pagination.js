var page_number = document.querySelector('#page-num');
var pagination_list = document.querySelector('#pagination-list');
var next_btn = document.querySelector('#next');
var prev_btn = document.querySelector('#previous');

// Number of pages and set this in page num display on page (e.g. Page 2 of 10)
var num_pages = Math.ceil(pcbg.length/8) === 0 ? 1 : Math.ceil(pcbg.length/8);
document.querySelector('#total-page-num').innerHTML = num_pages;

// Number of digits in page number
var num_digits = p_num.toString().length;

// Loop through each page and create a new number link for the pagination bar
for(var i = 0; i < num_pages; i++) {
    var num = document.createElement('li');

    if(i == p_num-1) {
        num.setAttribute('class', 'page-item active'); // Current page number will be highlighted
    } else {
        num.setAttribute('class', 'page-item');
    }
    
    var num_link = document.createElement('a');
    num_link.setAttribute('class', 'page-link');
    // Need to reconstruct url (which is sent back to searchresults.js - probably a better a way to 
    // build this site, but that's what we got). So, keep everything (since query is still same, just 
    // displaying different portion of it - definitely could have avoided re-querying the database since
    // we're still using same results) except update page number (which becomes i+1).
    var index_of_ampersand = s_url.indexOf('&');
    num_link.setAttribute('href', s_url.substr(0,15) + (i+1) + s_url.substr(15+num_digits));
    num_link.innerHTML = (i+1).toString();
    num.appendChild(num_link);

    pagination_list.insertBefore(num, next_btn);
}

// Make sure previous button doesn't work if on page 1 and next button doesn't work if on last page.
// In any other situation, make them go to previous or next page, respectively (similar to above)
if(p_num === 1) {
    prev_btn.setAttribute('class', 'page-item disabled');
    document.querySelector('#previous a').setAttribute('class', 'page-link disable');
} else {
    document.querySelector('#previous a').setAttribute('href', s_url.substr(0,15) + (p_num-1) + s_url.substr(15+num_digits));
}

if(p_num === num_pages) {
    next_btn.setAttribute('class', 'page-item disabled');
    document.querySelector('#next a').setAttribute('class', 'page-link disable');
} else {
    document.querySelector('#next a').setAttribute('href', s_url.substr(0,15) + (p_num+1) + s_url.substr(15+num_digits));
}