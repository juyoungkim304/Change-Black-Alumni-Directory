// Populates webpage with data given in 'results' parameter, which is a list of json objects
function fillInData(results, is_authenticated) {
  console.log("Inside populateWebpage.js")
  // Container where each row of results is appended to
  var searchResultContainer = document.querySelector("#resultsContainer");

  // Pagination bar at bottom of searchResultContainer - need to add rows before this
  var pagination = document.querySelector("#pagination");

  // Store each row to be appended
  var row;

  // Handles case where no results are found corresponding to query
  if (results.length === 0) {
    row = document.createElement('div');
    row.setAttribute('class', 'row-div row no-results');
    var no_results = document.createElement('div');
    no_results.setAttribute('class', 'container');
    var p_no_results = document.createElement('p');
    p_no_results.innerHTML = 'No results were found.';
    var a_no_results = document.createElement('a');
    a_no_results.innerHTML = 'Try a new search.';
    a_no_results.setAttribute('href', 'http://localhost:5000');
    no_results.appendChild(p_no_results);
    no_results.appendChild(a_no_results);
    row.appendChild(no_results);
  }

  // Isolate results corresponding to current page
  var i = 8 * (p_num - 1);
  var end = i + 7;

  // Loop through each of the results for current page
  for (; i < results.length && i <= end; i++) {
    // Each row stores 4 results, so after every 4 elements in 'results' array, we append row to
    // searchResultsContainer and create a new empty row
    if (i % 4 == 0) {
      // Only insert row if it has already been populated, which is always at the end of the row
      // but not at the beginning of a page (since row hasn't been initialized), hence the check
      // that i is not a multiple of 8. If, in the future you decide to change number of results
      // per page, change 8 to that number per page (same with rows, change 4 to number per row).
      // Then also change above in 'var i = 8*(page_num-1); var end = i+7' the 8 to number per
      // page and 7 to number minus 1.
      if (i % 8 !== 0) {
        var temp = row;
        searchResultContainer.insertBefore(temp, pagination);
      }
      row = document.createElement('div');
      row.setAttribute('class', 'row-div row');
    }

    // Generate HTML outer layer for each element in row
    var rowElement = document.createElement('div');
    rowElement.setAttribute('class', 'col-sm-3');

    // Fill this row element
    var element = createContent(results[i], is_authenticated);
    rowElement.appendChild(element);

    // Append back to row
    row.appendChild(rowElement);
  }

  // Append last row to container
  searchResultContainer.insertBefore(row, pagination);
}

// Fills, places, and formats data from 'content' parameter (the json object for a single result) into a div
// and return that div
function createContent(content, is_authenticated) {

  // Create container for each element
  var outsideDiv = document.createElement('div');
  outsideDiv.setAttribute('class', 'card');

  // Get and format image
  var img = document.createElement('img');
  img.setAttribute('src', content['pic']);
  img.setAttribute('class', 'card-image card-img-top');

  // Create and format div to hold rest of information
  var innerDiv = document.createElement('div');
  innerDiv.setAttribute('class', 'card-body');

  var textWrapDiv = document.createElement('div');
  textWrapDiv.setAttribute('class','text-wrap')

  // Name
  var name = document.createElement('h5');
  name.setAttribute('class', 'card-title');
  name.innerHTML = content['first_name'] + ' ' + content['last_name'];

  // Major
  var major_relation = document.createElement('p');
  major_relation.setAttribute('class', 'card-text');
  major_relation.innerHTML = 'Program: ' + content['major_or_program'] + "<br><br>Status: " + content['relation'];


  if (is_authenticated) {
    var marked = document.createElement('p');
    if (content['marked']) {
      marked.innerHTML = 'Admin Note: <b>MARKED</b>';
    } else {
      marked.innerHTML = '<br>';
    }
  }

  var link = document.createElement('a');
  link.setAttribute('class', 'btn btn-primary');
  link.setAttribute('href', 'http://localhost:5000/profile$' + (content['uid'] - 1));
  link.innerHTML = "More";

  // Append information (besides image) to the inner div
  innerDiv.appendChild(name);
  // Append text to text-wrap before inner
  textWrapDiv.appendChild(major_relation);
  innerDiv.appendChild(textWrapDiv);
  if (is_authenticated) {
    innerDiv.appendChild(marked);
  }
  innerDiv.appendChild(link);

  // Append image and inner div to the overall element div that is returned
  outsideDiv.appendChild(img);
  outsideDiv.appendChild(innerDiv);

  return outsideDiv;
}

fillInData(pcbg, is_authenticated);
