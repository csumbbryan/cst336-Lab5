//Event Listeners
let authorLinks = document.querySelectorAll("a");
for (let authorLink of authorLinks) {
  authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo() {
  var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
  myModal.show();
  let url = `/api/author/${this.id}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let authorInfo = document.querySelector("#authorInfo");
  let authorDob = new Date(data[0].dob);
  let authorDod = new Date(data[0].dod);
  authorDob = authorDob.toLocaleDateString();
  console.log(authorInfo);
  authorDod = authorDod.toLocaleDateString();
    document.querySelector("#authorInfo").innerHTML = `<h1> ${data[0].firstName} 
                                ${data[0].lastName} </h1>`;
    document.querySelector("#authorInfo").innerHTML += `<img src="${data[0].portrait}" width="200"><br>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Date of Birth: </span> ${authorDob} </p>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Date of Death: </span> ${authorDod} </p>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Sex: </span> ${data[0].sex} </p>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Profession: </span> ${data[0].profession} </p>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Country of Origin: </span> ${data[0].country} </p>`;
    document.querySelector("#authorInfo").innerHTML += `<p> <span id="descriptor">Biography:</span> ${data[0].biography} </p>`;
    
}