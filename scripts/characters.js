const API = 'https://rickandmortyapi.com/api/character/?page=';

let selector = 1;

async function getCharacters(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

function generateCharacters(data) {
    const container = document.getElementsByClassName("panel");
    let selector = 0;

    while (selector < 20 ){
        let item = document.createElement('div');
        let characterData = data.results[selector];
        item.className = "panel_item";
        item.onclick = () => {
            renderCharacter(characterData);
        };        
        item.innerHTML = `
            <img class="panel_item-img" src="${data.results[selector].image}" alt="">
            <h3 class="panel_item-name">${data.results[selector].name}</h3>
        `;

        container[0].appendChild(item);
        selector++;
    }
}

async function activateGenerator(URL){
    const data = await getCharacters(URL);
    generateCharacters(data);
}


async function refresh(){
    const container = document.getElementsByClassName("panel");
    let items = document.getElementsByClassName("panel_item");
    
    if(selector<34){
        do{
            container[0].removeChild(items[0]);
        }while(items.length != 0);
        
        selector++;
        let data = await getCharacters(`${API}${selector}`);
        generateCharacters(data);
    }else{
        selector = 0;
    }
}

function renderCharacter(data) {
    console.log(data);
    const containerCard = document.getElementsByClassName('container_card');
    containerCard.innerHTML = ``;
    const card = document.createElement("div");
    card.innerHTML = `
    <style>
        .container_card {
            visibility: visible;
        }
        .main-title {
            filter: blur(4px);
        }
        #main-refresh{
            filter: blur(4px);
        }
        .panel {
            filter: blur(4px);
        }
        .panel_item:hover{
            cursor: default;
        }
    </style>
    <header class="card_header">
        <button class="car_button_close"><img class="icon_close" onclick="closeSearch()" src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png" alt="close"></button>
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
    const bottoms = document.getElementsByClassName('panel_item');
    bottoms.disabled = false;
}


activateGenerator(API);



