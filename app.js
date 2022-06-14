//append search feature using JS
const search = document.querySelector(".search-container");

let form = document.createElement("form");
let action = document.createAttribute("action");
action.value = "#";
let method = document.createAttribute("method");
method.value = "get";
form.setAttributeNode(action);
form.setAttributeNode(method);

let input1 = document.createElement("input");
input1.setAttribute("type", "search");
input1.setAttribute("id", "search-input");
input1.setAttribute("class", "search-input");
input1.setAttribute("placeholder", "Search...");

let input2 = document.createElement("input");
input2.setAttribute("type", "submit");
input2.setAttribute("value", "\uD83D\uDD0D");
input2.setAttribute("id", "search-submit");
input2.setAttribute("class", "search-submit");

search.appendChild(form);
form.insertAdjacentElement(`beforeend`, input1);
form.insertAdjacentElement(`beforeend`, input2);

//console.log(search);

//append Gallery item features using JS
const galleries = document.querySelector("#gallery");

//console.log(galleries);

//getting the data from the URL(random user)
async function getData() {
  await fetch("https://randomuser.me/api/?results=12")
    .then((response) => response.json())
    .then((data) => generateUserCard(data));
}

getData();


let responseData;

function generateUserCard(data) {
  responseData = data.results;
  //   console.log(data);
  //console.log(data.results);
  //   console.log(data.results.length);

  data.results.map((result, index) => {
    let divCard = document.createElement("div");
    let divCardImg1 = document.createElement("div");
    let divCardImg2 = document.createElement("div");
    divCard.setAttribute("class", "card");
    divCard.setAttribute("onclick", `showDetail(${index})`);
    divCardImg1.setAttribute("class", "card-img-container");
    divCardImg2.setAttribute("class", "card-img-container");

    galleries.appendChild(divCard);
    divCard.appendChild(divCardImg1);
    divCard.append(divCardImg2);

    //divCard.addEventListener("click", showDetail(index));
    divCardImg1.innerHTML = `<img class="card-img" src="${result.picture.medium}" alt="profile picture">`;
    divCardImg2.innerHTML = `<h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3><p class="card-text">${result.email}</p><p class="card-text cap">${result.location.city}, ${result.location.state}</p>`;
  });
}

const searchIcon = document.querySelector('#search-submit');

searchIcon.addEventListener("click", async function (e) {
    // e.preventDefault();

    console.log(responseData);
    let name = document.querySelector('#search-input').value;
    console.log(name);
    console.log(responseData.length);
    console.log(responseData[0].name.first);


    for(i = 0; i < responseData.length; i++){
       
        if(responseData[i].name.first === name){
            console.log(responseData[i].name.first);
            showDetail(i);
        }
    }

  });

function showDetail(index) {
  console.log("here");

  let htmlStr = "";
  console.log(responseData[index].location.nat);

  htmlStr = `  <div class="modal-container"> <div class="modal">
<button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeProfile()"><strong>X</strong></button>
<div class="modal-info-container">
    <img class="modal-img" src="${
      responseData[index].picture.medium
    }" alt="profile picture">
    <h3 id="name" class="modal-name cap">${responseData[index].name.first} ${
    responseData[index].name.last
  }</h3>
    <p class="modal-text">${responseData[index].email}</p>
    <p class="modal-text cap">${responseData[index].location.city}</p>
    <hr>
    <p class="modal-text">${responseData[index].phone}</p>
    <p class="modal-text">${responseData[index].location.street.number} ${
    responseData[index].location.street.name
  }, ${responseData[index].location.city}, ${responseData[index].nat} ${
    responseData[index].location.postcode
  }</p>
    <p class="modal-text">Birthday: ${
      responseData[index].dob.date.split("T")[0]
    }</p>
</div </div>`;

  document.querySelector("#popupProfile").innerHTML = htmlStr;

  console.log(document.querySelector("#popupProfile"));
}

function closeProfile() {
  document.querySelector(".modal-container").remove();
}
