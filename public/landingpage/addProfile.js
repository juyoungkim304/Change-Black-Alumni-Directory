
  document.querySelector('#searchBtn').addEventListener("click", function () {
      queryUrl = createModifiedURL();
      window.location.href = queryUrl;
  });



function createModifiedURL() {

  return '/addProfile=1&';
}