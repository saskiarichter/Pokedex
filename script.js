let pokemon = ["charmander", "bulbasaur", "squirtle", "pikachu", "jigglypuff", "eevee", "ho-oh", "mewtwo", "eelektrik", "magikarp", "gengar", "lapras", "snover", "zapdos", "moltres", "togepi", "cyndaquil", "totodile", "chikorita", "mareep", "xerneas", "lugia", "snorlax", "celebi", "treecko", "torchic", "mudkip", "zacian", "gardevoir", "cacturne"]
let currentPokemon;

async function loadPokemon() {
    for (let i = 0; i < pokemon.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon[i]}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        createPokemonCard(i);
        addSecondType(i);
        adjustBackgroundColor(i);
    }
    console.log('loaded Pokemon', currentPokemon);
}

function createPokemonCard(i) {
    let name = currentPokemon['name'];
    let type = currentPokemon['types']['0']['type']['name'];
    let image = currentPokemon['sprites']['front_shiny'];
    document.getElementById('pokemonOverview').innerHTML += templatePokemonCard(i, name, type, image);
}

function templatePokemonCard(i, name, type, image) {
    return /*html*/ `
    <div id="pokedex${i}" class="pokedex" onclick="openPokemonCard(${i})">
        <h2 id="pokemonName" class="pokemonName">${name}</h2>
        <div id="pokemonInfo${i}" class="pokemonInfo">
            <div id="pokemonTypes${i}">
            <button id="pokemonType1" class="pokemonType">${type}</button>
            </div>
            <img id="PokemonImg" src="${image}" alt="Pokemon">
        </div>
    </div> 
    `;
}

function addSecondType(i) {
    if (currentPokemon['types']['1']) {
        document.getElementById(`pokemonTypes${i}`).innerHTML += `
        <button id="pokemonType1" class="pokemonType">${currentPokemon['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustBackgroundColor(i) {
    let type = currentPokemon['types']['0']['type']['name'];
    backgroundColor1(i, type);
    backgroundColor2(i, type);
}

function backgroundColor1(i, type) {
    if (type == 'fire') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRed');
    }
    if (type == 'fairy' || type == 'ghost') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundYellow');
    }
    if (type == 'electric') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundPurple');
    }
    if (type == 'psychic') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRose');
    }
}

function backgroundColor2(i, type) {
    if (type == 'grass') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGreen');
    }
    if (type == 'water') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundBlue');
    }
    if (type == 'normal') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGrey');
    }
}

async function openPokemonCard(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon[i]}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    createSingleCard();
    addSecondTypeSingleCard();
    adjustBackgroundSingleCard();
    openStatistics();

    document.getElementById('body').classList.add('noscroll');
}

function createSingleCard() {
    let name = currentPokemon['name'];
    let type = currentPokemon['types']['0']['type']['name'];
    let image = currentPokemon['sprites']['front_shiny'];
    document.getElementById('containerSingleCard').innerHTML = templateSingleCard(name, type, image);
}

function templateSingleCard(name, type, image) {
    return /*html*/ `
    <div id="singleCard">
        <div class="singleCard-top">
            <div class="card-nav">
                <img onclick="closeSingleCard()" id="card-nav-left" src="./img/arrow-to-left-white.png" alt="Zurück">
                <img id="card-nav-right" src="./img/heart-white.png" alt="Favorit">
            </div>
            <h2 class="pokemonName">${name}</h2>
            <div id="card-types" class="card-types">
                <button >${type}</button>
            </div>
            <div class="card-pokemonImage">
                <img src="${image}" alt="Pokemon">
            </div>
        </div>
        <div class="singleCard-bottom">
            <h3>statistics</h3>
            <div class="div-statistics">
                <canvas id="statistics"></canvas>
            </div>
        </div>
    </div>
    `;
}

function addSecondTypeSingleCard() {
    if (currentPokemon['types']['1']) {
        document.getElementById('card-types').innerHTML += `
        <button>${currentPokemon['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustBackgroundSingleCard() {
    let type = currentPokemon['types']['0']['type']['name'];
    adjustBackgroundColor1(type);
    adjustBackgroundColor2(type);
}

function adjustBackgroundColor1(type) {
    if (type == 'fire') {
        document.getElementById('singleCard').classList.add('backgroundRed');
    }
    if (type == 'fairy' || type == 'ghost') {
        document.getElementById('singleCard').classList.add('backgroundYellow');
    }
    if (type == 'electric') {
        document.getElementById('singleCard').classList.add('backgroundPurple');
    }
    if (type == 'psychic') {
        document.getElementById('singleCard').classList.add('backgroundRose');
    }
}

function adjustBackgroundColor2(type) {
    if (type == 'grass') {
        document.getElementById('singleCard').classList.add('backgroundGreen');
    }
    if (type == 'water') {
        document.getElementById('singleCard').classList.add('backgroundBlue');
    }
    if (type == 'normal') {
        document.getElementById('singleCard').classList.add('backgroundGrey');
    }
}

function openStatistics() {
    let hp = currentPokemon['stats']['0']['base_stat'];
    let attack = currentPokemon['stats']['1']['base_stat'];
    let defense = currentPokemon['stats']['2']['base_stat'];
    let spAttack = currentPokemon['stats']['3']['base_stat'];
    let spDefense = currentPokemon['stats']['4']['base_stat'];
    let speed = currentPokemon['stats']['5']['base_stat'];

    const ctx = document.getElementById('statistics');
    createChart(ctx, hp, attack, defense, spAttack, spDefense, speed);
}

function createChart(ctx, hp, attack, defense, spAttack, spDefense, speed) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'],
            datasets: [{
                data: [hp, attack, defense, spAttack, spDefense, speed],
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
            },
        }
    });
}

function closeSingleCard() {
    document.getElementById('containerSingleCard').innerHTML = '';
    document.getElementById('body').classList.remove('noscroll');
}

function searchPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let pokemons = document.querySelectorAll('.pokedex');

    let list = document.getElementById('pokemonOverview');
    list.innerHTML = '';

    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i].querySelector('h2').textContent;
        if (name.toLowerCase().includes(search)) {
            list.innerHTML = name;
        }
    }
}

async function createCardAfterSearch(){
   
}


