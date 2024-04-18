let pokemonNames = [];
let pokemons = [];
let currentPokemon;
let pokemonSearch = [];

async function loadPokemon() {
    for (let i = 1; i <= 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemons.push(currentPokemon);
    }

    createPokemonOverview();
    await loadPokemonNames();
}

async function loadPokemonNames() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0';
    let response = await fetch(url);
    let pokedex = await response.json();
    let allPokemon = pokedex['results'];

    for (let i = 0; i < allPokemon.length; i++) {
        let currentPokemonName = allPokemon[i]['name'];
        pokemonNames.push(currentPokemonName);
    }
}

function createPokemonOverview() {
    document.getElementById('pokemonOverview').innerHTML = '';
    for (let i = 0; i < 20; i++) {
        createPokemonCard(i);
        addSecondType(i);
        adjustColor(i);
    }
}

async function loadMorePokemon() {
    let openPokemon = document.querySelectorAll('.pokedex');
    let number = openPokemon.length;

    for (let i = number; i < number + 10; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemons.push(currentPokemon);

        createPokemonCard(i);
        addSecondType(i);
        adjustColor(i);
    }
}

function createPokemonCard(i){
    const pokemon = pokemons[i];
    let name = pokemon['name'];
    let type = pokemon['types']['0']['type']['name'];
    let image = pokemon['sprites']['other']['official-artwork']['front_default'];

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
    if (pokemons[i]['types']['1']) {
        document.getElementById(`pokemonTypes${i}`).innerHTML += `
        <button id="pokemonType1" class="pokemonType">${pokemons[i]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustColor(i) {
    let type = pokemons[i]['types']['0']['type']['name'];
    color1(i, type);
    color2(i, type);
}

function color1(i, type) {
    if (type == 'fire' | type == 'dragon' | type == 'fighting') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRed');
    }
    if (type == 'fairy' | type == 'ghost' | type == 'flying') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundYellow');
    }
    if (type == 'electric' | type == 'steel') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundPurple');
    }
    if (type == 'psychic' | type == 'poison') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundRose');
    }
}

function color2(i, type) {
    if (type == 'grass' | type == 'bug' | type == 'ground') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGreen');
    }
    if (type == 'water' | type == 'ice') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundBlue');
    }
    if (type == 'normal' | type == 'rock' | type == 'dark') {
        document.getElementById(`pokedex${i}`).classList.add('backgroundGrey');
    }
}

function openPokemonCard(i) {
    document.getElementById('containerSingleCard').classList.remove('d-none');
    createSingleCard(i);
    addSecondTypeSingleCard(i);
    adjustColorSingleCard(i);
    openStatistics(i);
    document.getElementById('body').classList.add('noscroll');
}

function createSingleCard(i) {
    let pokemon = pokemons[i];
    let name = pokemon['name'];
    let type = pokemon['types']['0']['type']['name'];
    let image = pokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('containerSingleCard').innerHTML = templateSingleCard(i, name, type, image);
}

function templateSingleCard(i, name, type, image) {
    return /*html*/ `
    <div class="layoutSingleCard" onclick="doNotClose(event)">
        <div class="skip-img-div">
            <img id="previous${i}" class="skip-img" src="./img/left-white.png" onclick="previousCard(${i})">
        </div>
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
        <div class="skip-img-div">
            <img class="skip-img" src="./img/right-white.png" onclick="nextCard(${i})">
        </div>
    </div>
    `;
}

function addSecondTypeSingleCard(i) {
    if (pokemons[i]['types']['1']) {
        document.getElementById('card-types').innerHTML += `
        <button>${pokemons[i]['types']['1']['type']['name']}</button>
    `;
    }
}

function adjustColorSingleCard(i) {
    let type = pokemons[i]['types']['0']['type']['name'];
    colorSingleCard1(type);
    colorSingleCard2(type);
}

function colorSingleCard1(type) {
    if (type == 'fire' | type == 'dragon' | type == 'fighting') {
        document.getElementById('singleCard').classList.add('backgroundRed');
    }
    if (type == 'fairy' | type == 'ghost' | type == 'flying') {
        document.getElementById('singleCard').classList.add('backgroundYellow');
    }
    if (type == 'electric' | type == 'steel') {
        document.getElementById('singleCard').classList.add('backgroundPurple');
    }
    if (type == 'psychic' | type == 'poison') {
        document.getElementById('singleCard').classList.add('backgroundRose');
    }
}

function colorSingleCard2(type) {
    if (type == 'grass' | type == 'bug' | type == 'ground') {
        document.getElementById('singleCard').classList.add('backgroundGreen');
    }
    if (type == 'water' | type == 'ice') {
        document.getElementById('singleCard').classList.add('backgroundBlue');
    }
    if (type == 'normal' | type == 'rock' | type == 'dark') {
        document.getElementById('singleCard').classList.add('backgroundGrey');
    }
}

function openStatistics(i) {
    let hp = pokemons[i]['stats']['0']['base_stat'];
    let attack = pokemons[i]['stats']['1']['base_stat'];
    let defense = pokemons[i]['stats']['2']['base_stat'];
    let spAttack = pokemons[i]['stats']['3']['base_stat'];
    let spDefense = pokemons[i]['stats']['4']['base_stat'];
    let speed = pokemons[i]['stats']['5']['base_stat'];

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
            maintainAspectRatio: false,
        }
    });
}

function closeSingleCard() {
    document.getElementById('containerSingleCard').classList.add('d-none');
    document.getElementById('body').classList.remove('noscroll');
}

function nextCard(i) {
    i++;
    if (i == pokemons.length) {
        i = 0;
    }
    openPokemonCard(i);
}

function previousCard(i) {
    i--;
    if (i == -1) {
        i = pokemons.length - 1;
    }
    openPokemonCard(i);
}

function doNotClose(event) {
    event.stopPropagation();
}