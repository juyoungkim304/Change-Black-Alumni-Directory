//import queryResults from "./server/index.js";


function createNewHeaders() {

  // for (let result in queryResults) {
  //     document.getElementsByTagName("body").appendChild(result);
  // }
    for(let i = 0; i < 10; i++){
        let newHeader = document.createElement("h1");
        let j = document.createTextNode(i);
        console.log(j);
        newHeader.appendChild(j);
        document.getElementsByTagName("body").appendChild(j);

    }
}
