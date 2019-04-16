var page_number = document.querySelector('#page-num');
var pagination_list = document.querySelector('#pagination-list');
var next_btn = document.querySelector('#next');
var prev_btn = document.querySelector('#previous');

var num_pages = Math.ceil(pcbg.length/9);

for(var i = 0; i < num_pages; i++) {
    var num = document.createElement('li');

    if(i == page_num-1) {
        num.setAttribute('class', 'page-item active');
    } else {
        num.setAttribute('class', 'page-item');
    }
    
    var num_link = document.createElement('a');
    num_link.setAttribute('class', 'page-link');
    num_link.innerHTML = (i+1).toString();

    num.appendChild(num_link);

    num.addEventListener('click', function () {
        alert("need to add some functionality here");
    });

    pagination_list.insertBefore(num, next_btn);
}

prev_btn.addEventListener('click', function () {
    alert('need to add some functionality here');
});

next_btn.addEventListener('click', function () {
    alert('need to add some functionality here');
});

if(page_num === 1) {
    prev_btn.setAttribute('class', 'page-item disabled');
}

if(page_num === num_pages) {
    next_btn.setAttribute('class', 'page-item disabled');
}