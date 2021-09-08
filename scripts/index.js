const API = 'https://rickandmortyapi.com/api/character/';
const API2 = `https://rickandmortyapi.com/api/character/?name=`;



function searchURL (name) {
    return API2.replace("=", `=${name}`);
}

async function getSearch(name) {
    const URL = searchURL(name);
    const response = await fetch(URL);
    const data = await response.json();
    return data.results[0];
}

function renderCharacter(data) {
    const containerCard = document.getElementsByClassName('container_card');
    containerCard.innerHTML = ``;
    const card = document.createElement("div");
    card.innerHTML = `
    <style>
        .container_card {
            visibility: visible;
        }
        .main_container {
            filter: blur(4px);
        }
    </style>
    <header class="card_header">
        <button class="car_button_close"><img class="icon_close" onclick="closeSearch()" src= "../assets/close-icon.png" alt="close"></button>
    </header>
    <img class="card_img" src="${data.image}" alt="Character">
    <div class="card_info">
        <h5 class="card_info-item">Name: ${data.name}</h5>
        <h5 class="card_info-item">Status: ${data.status}</h5>
        <h5 class="card_info-item">Specie: ${data.species}</h5>
        <h5 class="card_info-item">Origin: ${data.origin.name}</h5>
    </div>
    `;
    containerCard[0].appendChild(card);
}

function closeSearch(){
    const containerCard = document.getElementsByClassName('container_card');
    containerCard[0].innerHTML = `
    <style>
        .container_card {
            visibility: hidden;
        }
    </style>`;
    const button = document.querySelector(".browser_button");
    button.disabled = false;
}

async function search () {
    const button = document.querySelector(".browser_button");
    button.disabled = true;
    const name = document.getElementsByClassName("browser_input");
    const data = await getSearch(name[0].value);
    renderCharacter(data);
}



